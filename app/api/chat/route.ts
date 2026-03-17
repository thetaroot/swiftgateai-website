import { NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';
import type { GeminiContent } from '@/lib/gemini';
import { CHAT_SYSTEM_PROMPT, CHAT_REINFORCEMENT } from '@/lib/prompts';
import {
    validateOrigin,
    getCorsHeaders,
    getClientIP,
    checkRateLimit,
    sanitizeInput,
    validateOutput,
} from '@/lib/security';

export const maxDuration = 30;

const FALLBACK_REPLY = 'SwiftGate AI steht Ihnen für Fragen zu unseren Services gerne zur Verfügung. Kontaktieren Sie uns unter hello@swiftgateai.de.';

const MOLTBOT_API_URL = process.env.MOLTBOT_API_URL;
const MOLTBOT_PUBLIC_CHAT_TOKEN = process.env.MOLTBOT_PUBLIC_CHAT_TOKEN;

interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

interface LeadContext {
    project_need: string | null;
    company: string | null;
    urgency: string | null;
    ticket_already_suggested?: boolean;
    ticket_submitted?: boolean;
}

interface ChatRequestBody {
    message: string;
    history: ChatMessage[];
    language: 'DE' | 'EN' | 'AUTO';
    context?: LeadContext | null;
}

interface VPSResponse {
    reply: string;
    lead_score?: number;
    extracted?: {
        project_need: string | null;
        company: string | null;
        urgency: string | null;
    };
    suggest_ticket?: boolean;
    phase?: string;
}

function isValidBody(body: unknown): body is ChatRequestBody {
    if (typeof body !== 'object' || body === null) return false;
    const obj = body as Record<string, unknown>;
    if (typeof obj.message !== 'string') return false;
    if (!Array.isArray(obj.history)) return false;
    if (obj.language !== 'DE' && obj.language !== 'EN' && obj.language !== 'AUTO') return false;
    return true;
}

/**
 * Try VPS backend first (has RAG + key rotation + sales funnel).
 * Returns the full structured response on success, or null on failure.
 */
async function callVPS(
    message: string,
    history: ChatMessage[],
    language: string,
    context: LeadContext | null,
): Promise<VPSResponse | null> {
    if (!MOLTBOT_API_URL || !MOLTBOT_PUBLIC_CHAT_TOKEN) return null;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    try {
        const res = await fetch(`${MOLTBOT_API_URL}/api/public/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': MOLTBOT_PUBLIC_CHAT_TOKEN,
            },
            signal: controller.signal,
            body: JSON.stringify({ message, history, language, context }),
        });

        clearTimeout(timeout);

        if (!res.ok) {
            console.warn(`[Chat API] VPS returned ${res.status}`);
            return null;
        }

        const data = await res.json();
        // VPS returns structured response with reply + metadata
        if (data && typeof data.reply === 'string') {
            return {
                reply: data.reply,
                lead_score: typeof data.lead_score === 'number' ? data.lead_score : 0,
                extracted: data.extracted || { project_need: null, company: null, urgency: null },
                suggest_ticket: Boolean(data.suggest_ticket),
                phase: data.phase || 'discovery',
            };
        }
        return null;
    } catch (error) {
        clearTimeout(timeout);
        console.warn('[Chat API] VPS call failed, falling back to Gemini:', error instanceof Error ? error.message : error);
        return null;
    }
}

export async function OPTIONS(request: Request) {
    return new NextResponse(null, {
        status: 204,
        headers: getCorsHeaders(request),
    });
}

export async function POST(request: Request) {
    const corsHeaders = getCorsHeaders(request);

    // Layer 1: Origin check
    if (!validateOrigin(request)) {
        return NextResponse.json(
            { error: 'Forbidden' },
            { status: 403, headers: corsHeaders }
        );
    }

    // Layer 2: Rate limiting
    const ip = getClientIP(request);
    const rateResult = checkRateLimit(ip);

    const rateLimitHeaders: Record<string, string> = {
        ...corsHeaders,
        'X-RateLimit-Limit': '5',
        'X-RateLimit-Remaining': String(rateResult.remaining),
    };

    if (!rateResult.allowed) {
        return NextResponse.json(
            { error: 'Rate limit exceeded' },
            {
                status: 429,
                headers: {
                    ...rateLimitHeaders,
                    'Retry-After': String(rateResult.resetIn),
                },
            }
        );
    }

    try {
        // Parse body
        const body: unknown = await request.json().catch(() => null);
        if (!isValidBody(body)) {
            return NextResponse.json(
                { error: 'Invalid request' },
                { status: 400, headers: rateLimitHeaders }
            );
        }

        const { message, history, language, context } = body;

        // Sanitize context fields (prevent prompt injection via leadContext)
        let cleanContext: LeadContext | null = null;
        if (context && typeof context === 'object') {
            const c = context as unknown as Record<string, unknown>;
            const VALID_URGENCY = new Set(['low', 'medium', 'high']);
            cleanContext = {
                project_need: typeof c.project_need === 'string' ? c.project_need.slice(0, 120).replace(/[<>\[\]{}]/g, '') : null,
                company: typeof c.company === 'string' ? c.company.slice(0, 80).replace(/[<>\[\]{}]/g, '') : null,
                urgency: typeof c.urgency === 'string' && VALID_URGENCY.has(c.urgency) ? c.urgency : null,
                ticket_already_suggested: c.ticket_already_suggested === true ? true : undefined,
                ticket_submitted: c.ticket_submitted === true ? true : undefined,
            };
        }

        // Layer 3: Input sanitizer
        const sanitized = sanitizeInput(message);
        if (!sanitized.safe) {
            return NextResponse.json(
                { reply: language === 'EN' ? 'Your message could not be processed.' : 'Ihre Nachricht konnte nicht verarbeitet werden.' },
                { status: 200, headers: rateLimitHeaders }
            );
        }

        if (sanitized.cleaned.trim().length === 0) {
            return NextResponse.json(
                { reply: language === 'EN' ? 'Please enter a message.' : 'Bitte geben Sie eine Nachricht ein.' },
                { status: 200, headers: rateLimitHeaders }
            );
        }

        // === Primary: VPS backend (has RAG + sales funnel) ===
        const vpsResponse = await callVPS(sanitized.cleaned, history, language, cleanContext);
        if (vpsResponse) {
            vpsResponse.reply = validateOutput(vpsResponse.reply);
            return NextResponse.json(vpsResponse, { status: 200, headers: rateLimitHeaders });
        }

        // === Fallback: Direct Gemini call (basic Q&A only, no sales features) ===
        const trimmedHistory = history.slice(-10);
        const sanitizedHistory: GeminiContent[] = [];
        for (const msg of trimmedHistory) {
            if (msg.role !== 'user' && msg.role !== 'model') continue;
            const sanitizedMsg = sanitizeInput(msg.content);
            if (!sanitizedMsg.safe) continue;
            sanitizedHistory.push({
                role: msg.role,
                parts: [{ text: sanitizedMsg.cleaned }],
            });
        }

        const contents: GeminiContent[] = [];
        let expectedRole: 'user' | 'model' = 'user';
        for (const msg of sanitizedHistory) {
            if (msg.role === expectedRole) {
                contents.push(msg);
                expectedRole = expectedRole === 'user' ? 'model' : 'user';
            }
        }

        const userMessageWithReinforcement = sanitized.cleaned + '\n\n' + CHAT_REINFORCEMENT;
        contents.push({
            role: 'user',
            parts: [{ text: userMessageWithReinforcement }],
        });

        const rawReply = await callGemini(CHAT_SYSTEM_PROMPT, contents);
        const reply = validateOutput(rawReply);

        // Fallback returns basic format with default metadata
        return NextResponse.json(
            {
                reply,
                lead_score: 0,
                extracted: { project_need: null, company: null, urgency: null },
                suggest_ticket: false,
                phase: 'discovery',
            },
            { status: 200, headers: rateLimitHeaders }
        );
    } catch (error: unknown) {
        console.error('[Chat API] Error:', error);

        const errorMessage = error instanceof Error ? error.message : '';

        if (errorMessage === 'RATE_LIMIT_EXCEEDED') {
            return NextResponse.json(
                { error: 'Service temporarily unavailable. Please try again later.' },
                { status: 429, headers: { ...rateLimitHeaders, 'Retry-After': '60' } }
            );
        }

        if (errorMessage === 'GEMINI_API_KEY not configured') {
            return NextResponse.json(
                { error: 'Service unavailable' },
                { status: 500, headers: rateLimitHeaders }
            );
        }

        return NextResponse.json(
            { reply: FALLBACK_REPLY },
            { status: 200, headers: rateLimitHeaders }
        );
    }
}
