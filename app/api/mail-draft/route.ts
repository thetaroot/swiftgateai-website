import { NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';
import type { GeminiContent } from '@/lib/gemini';
import { MAIL_SYSTEM_PROMPT, MAIL_REINFORCEMENT } from '@/lib/prompts';
import {
    validateOrigin,
    getCorsHeaders,
    getClientIP,
    checkRateLimit,
    sanitizeInput,
} from '@/lib/security';

export const maxDuration = 30;

interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

interface MailDraftRequestBody {
    history: ChatMessage[];
    language: 'DE' | 'EN';
}

function isValidBody(body: unknown): body is MailDraftRequestBody {
    if (typeof body !== 'object' || body === null) return false;
    const obj = body as Record<string, unknown>;
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

        const { history, language } = body;

        if (history.length < 2) {
            return NextResponse.json(
                { error: 'Insufficient conversation history' },
                { status: 400, headers: rateLimitHeaders }
            );
        }

        // Build contents: the conversation as context, then a final user request
        const sanitizedHistory: GeminiContent[] = [];
        for (const msg of history) {
            if (msg.role !== 'user' && msg.role !== 'model') continue;
            const sanitizedMsg = sanitizeInput(msg.content);
            if (!sanitizedMsg.safe) continue;
            sanitizedHistory.push({
                role: msg.role,
                parts: [{ text: sanitizedMsg.cleaned }],
            });
        }

        // Ensure alternating user/model, starting with user
        const validHistory: GeminiContent[] = [];
        let expectedRole: 'user' | 'model' = 'user';
        for (const msg of sanitizedHistory) {
            if (msg.role === expectedRole) {
                validHistory.push(msg);
                expectedRole = expectedRole === 'user' ? 'model' : 'user';
            }
        }

        // Build final contents: conversation summary as a user message + reinforcement
        const conversationText = validHistory
            .map((msg) => `${msg.role === 'user' ? 'Besucher' : 'Assistent'}: ${msg.parts[0].text}`)
            .join('\n');

        const promptLanguage = language === 'EN'
            ? 'Create the email in English.'
            : 'Erstelle die Email auf Deutsch.';

        const contents: GeminiContent[] = [
            {
                role: 'user',
                parts: [{
                    text: `Hier ist die Chat-Konversation:\n\n${conversationText}\n\n${promptLanguage}\n\n${MAIL_REINFORCEMENT}`,
                }],
            },
        ];

        // Call Gemini
        const rawReply = await callGemini(MAIL_SYSTEM_PROMPT, contents);

        // Parse JSON response
        let subject = '';
        let mailBody = '';

        try {
            // Try to extract JSON from the response
            const jsonMatch = rawReply.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed: unknown = JSON.parse(jsonMatch[0]);
                if (typeof parsed === 'object' && parsed !== null) {
                    const obj = parsed as Record<string, unknown>;
                    if (typeof obj.subject === 'string' && typeof obj.body === 'string') {
                        subject = obj.subject;
                        mailBody = obj.body;
                    }
                }
            }
        } catch {
            // JSON parsing failed
        }

        if (!subject || !mailBody) {
            // Fallback if Gemini didn't return valid JSON
            subject = language === 'EN' ? 'Project Inquiry via SwiftGate AI' : 'Projektanfrage über SwiftGate AI';
            mailBody = language === 'EN'
                ? 'Hello,\n\nI visited your website and would like to discuss a potential project.\n\nBest regards'
                : 'Guten Tag,\n\nIch habe Ihre Website besucht und würde gerne ein mögliches Projekt besprechen.\n\nMit freundlichen Grüßen';
        }

        return NextResponse.json(
            { subject, body: mailBody },
            { status: 200, headers: rateLimitHeaders }
        );
    } catch (error: unknown) {
        console.error('[Mail-Draft API] Error:', error);

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
            { error: 'Failed to generate email draft' },
            { status: 500, headers: rateLimitHeaders }
        );
    }
}
