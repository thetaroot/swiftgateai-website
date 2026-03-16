import { NextResponse } from 'next/server';
import {
    validateOrigin,
    getCorsHeaders,
    getClientIP,
} from '@/lib/security';

export const maxDuration = 15;

const MOLTBOT_API_URL = process.env.MOLTBOT_API_URL;
const MOLTBOT_PUBLIC_CHAT_TOKEN = process.env.MOLTBOT_PUBLIC_CHAT_TOKEN;

// Stricter rate limit for tickets: 3 per hour
const ticketTimestamps: Map<string, number[]> = new Map();
const TICKET_LIMIT = 3;
const TICKET_WINDOW = 3600_000; // 1 hour in ms

function checkTicketRateLimit(ip: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const timestamps = (ticketTimestamps.get(ip) || []).filter(t => now - t < TICKET_WINDOW);
    ticketTimestamps.set(ip, timestamps);
    if (timestamps.length >= TICKET_LIMIT) {
        return { allowed: false, remaining: 0 };
    }
    timestamps.push(now);
    return { allowed: true, remaining: TICKET_LIMIT - timestamps.length };
}

interface TicketBody {
    name: string;
    email: string;
    phone?: string;
    summary: string;
    lead_score: number;
    lead_data: Record<string, unknown>;
    chat_history: { role: string; content: string }[];
    language: string;
}

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

function isValidTicketBody(body: unknown): body is TicketBody {
    if (typeof body !== 'object' || body === null) return false;
    const obj = body as Record<string, unknown>;
    return (
        typeof obj.name === 'string' && obj.name.trim().length > 0 && obj.name.length <= 100 &&
        typeof obj.email === 'string' && obj.email.length <= 150 && EMAIL_RE.test(obj.email) &&
        typeof obj.summary === 'string' && obj.summary.length <= 2000
    );
}

export async function OPTIONS(request: Request) {
    return new NextResponse(null, {
        status: 204,
        headers: getCorsHeaders(request),
    });
}

export async function POST(request: Request) {
    const corsHeaders = getCorsHeaders(request);

    if (!validateOrigin(request)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403, headers: corsHeaders });
    }

    const ip = getClientIP(request);
    const rateResult = checkTicketRateLimit(ip);
    if (!rateResult.allowed) {
        return NextResponse.json(
            { error: 'Ticket rate limit exceeded' },
            { status: 429, headers: corsHeaders }
        );
    }

    if (!MOLTBOT_API_URL || !MOLTBOT_PUBLIC_CHAT_TOKEN) {
        return NextResponse.json(
            { error: 'Ticket service unavailable' },
            { status: 503, headers: corsHeaders }
        );
    }

    try {
        const body: unknown = await request.json().catch(() => null);
        if (!isValidTicketBody(body)) {
            return NextResponse.json(
                { error: 'Invalid request' },
                { status: 400, headers: corsHeaders }
            );
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10_000);

        const res = await fetch(`${MOLTBOT_API_URL}/api/public/ticket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': MOLTBOT_PUBLIC_CHAT_TOKEN,
            },
            signal: controller.signal,
            body: JSON.stringify(body),
        });

        clearTimeout(timeout);

        if (!res.ok) {
            console.error(`[Ticket API] VPS returned ${res.status}`);
            return NextResponse.json(
                { error: 'Failed to create ticket' },
                { status: 502, headers: corsHeaders }
            );
        }

        const data = await res.json();
        return NextResponse.json(data, { status: 200, headers: corsHeaders });
    } catch (error) {
        console.error('[Ticket API] Error:', error);
        return NextResponse.json(
            { error: 'Internal error' },
            { status: 500, headers: corsHeaders }
        );
    }
}
