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

const MAX_HISTORY_LENGTH = 20;

const FALLBACK_REPLY = 'SwiftGate AI steht Ihnen für Fragen zu unseren Services gerne zur Verfügung. Kontaktieren Sie uns unter hello@swiftgateai.de.';

interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

interface ChatRequestBody {
    message: string;
    history: ChatMessage[];
    language: 'DE' | 'EN';
}

function isValidBody(body: unknown): body is ChatRequestBody {
    if (typeof body !== 'object' || body === null) return false;
    const obj = body as Record<string, unknown>;
    if (typeof obj.message !== 'string') return false;
    if (!Array.isArray(obj.history)) return false;
    if (obj.language !== 'DE' && obj.language !== 'EN') return false;
    return true;
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

        const { message, history, language } = body;

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

        // Build contents array from history
        let trimmedHistory = history.slice(-(MAX_HISTORY_LENGTH));

        // Sanitize all history messages
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

        // Ensure contents alternates user/model and starts with user
        const contents: GeminiContent[] = [];
        let expectedRole: 'user' | 'model' = 'user';
        for (const msg of sanitizedHistory) {
            if (msg.role === expectedRole) {
                contents.push(msg);
                expectedRole = expectedRole === 'user' ? 'model' : 'user';
            }
        }

        // Layer 4: Prompt sandwich — append current message with reinforcement
        const userMessageWithReinforcement = sanitized.cleaned + '\n\n' + CHAT_REINFORCEMENT;
        contents.push({
            role: 'user',
            parts: [{ text: userMessageWithReinforcement }],
        });

        // Call Gemini
        const rawReply = await callGemini(CHAT_SYSTEM_PROMPT, contents);

        // Layer 5: Output validator
        const reply = validateOutput(rawReply);

        return NextResponse.json(
            { reply },
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
