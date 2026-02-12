// Security layer: Origin check, rate limiting, input sanitizer, output validator

// ── Origin Validation ──

const ALLOWED_ORIGINS = [
    'https://swiftgateai.de',
    'https://www.swiftgateai.de',
];

export function validateOrigin(request: Request): boolean {
    const isDev = process.env.NODE_ENV === 'development';

    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    const secFetchSite = request.headers.get('sec-fetch-site');

    // In development, allow localhost
    if (isDev) {
        if (origin?.startsWith('http://localhost:')) return true;
        if (referer?.startsWith('http://localhost:')) return true;
        if (secFetchSite === 'same-origin') return true;
    }

    // Check Origin header (primary)
    if (origin) {
        return ALLOWED_ORIGINS.includes(origin);
    }

    // Fallback: Check Referer header
    if (referer) {
        return ALLOWED_ORIGINS.some((allowed) => referer.startsWith(allowed));
    }

    // Fallback: Sec-Fetch-Site
    if (secFetchSite === 'same-origin') {
        return true;
    }

    return false;
}

// ── CORS Headers ──

export function getCorsHeaders(request: Request): Record<string, string> {
    const origin = request.headers.get('origin') ?? '';
    const isDev = process.env.NODE_ENV === 'development';

    let allowedOrigin = '';

    if (ALLOWED_ORIGINS.includes(origin)) {
        allowedOrigin = origin;
    } else if (isDev && origin.startsWith('http://localhost:')) {
        allowedOrigin = origin;
    }

    return {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    };
}

// ── Rate Limiting ──

interface RateLimitEntry {
    timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_PER_MINUTE = 5;
const RATE_LIMIT_PER_HOUR = 30;
const HOUR_MS = 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;

export function getClientIP(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
    return ip;
}

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();

    // TTL cleanup: remove entries older than 1 hour
    for (const [key, entry] of rateLimitStore.entries()) {
        entry.timestamps = entry.timestamps.filter((ts) => now - ts < HOUR_MS);
        if (entry.timestamps.length === 0) {
            rateLimitStore.delete(key);
        }
    }

    const entry = rateLimitStore.get(ip) ?? { timestamps: [] };

    // Count requests in last minute and last hour
    const lastMinute = entry.timestamps.filter((ts) => now - ts < MINUTE_MS);
    const lastHour = entry.timestamps;

    if (lastMinute.length >= RATE_LIMIT_PER_MINUTE) {
        const oldestInMinute = lastMinute[0];
        const resetIn = Math.ceil((MINUTE_MS - (now - oldestInMinute)) / 1000);
        return { allowed: false, remaining: 0, resetIn };
    }

    if (lastHour.length >= RATE_LIMIT_PER_HOUR) {
        const oldestInHour = lastHour[0];
        const resetIn = Math.ceil((HOUR_MS - (now - oldestInHour)) / 1000);
        return { allowed: false, remaining: 0, resetIn };
    }

    // Record this request
    entry.timestamps.push(now);
    rateLimitStore.set(ip, entry);

    const remaining = Math.min(
        RATE_LIMIT_PER_MINUTE - lastMinute.length - 1,
        RATE_LIMIT_PER_HOUR - lastHour.length - 1
    );

    return { allowed: true, remaining: Math.max(0, remaining), resetIn: 0 };
}

// ── Input Sanitizer ──

const INJECTION_PATTERNS: RegExp[] = [
    /ignore\s*(all|previous|above|prior|my|every|the)\s*(instructions?|prompts?|rules?|directives?)/i,
    /system\s*:?\s*(prompt|instruction|message)/i,
    /(you\s+are\s+now|act\s+as|pretend\s+(to\s+be|you)|roleplay\s+as|play\s+the\s+role)/i,
    /(jailbreak|DAN\s+mode|developer\s+mode|god\s+mode|admin\s+mode)/i,
    /(forget|disregard|override|bypass|ignore)\s*(your|all|every|the|my)?\s*(instructions?|rules?|programming|training|prompt)/i,
    /(new\s+instructions?|new\s+rules?|from\s+now\s+on\s+you)/i,
    /\[system\]|\[inst\]|\[INST\]|<<SYS>>|<\|im_start\|>/i,
];

const MAX_INPUT_LENGTH = 500;

export function sanitizeInput(input: string): { safe: boolean; cleaned: string; reason?: string } {
    // Strip HTML tags
    let cleaned = input.replace(/<[^>]*>/g, '');

    // Remove control characters
    cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

    // Truncate to max length
    if (cleaned.length > MAX_INPUT_LENGTH) {
        cleaned = cleaned.slice(0, MAX_INPUT_LENGTH);
    }

    // Check injection patterns
    for (const pattern of INJECTION_PATTERNS) {
        if (pattern.test(cleaned)) {
            return { safe: false, cleaned: '', reason: 'blocked' };
        }
    }

    return { safe: true, cleaned };
}

// ── Output Validator ──

const MAX_OUTPUT_LENGTH = 1000;

export function validateOutput(response: string): string {
    let output = response;

    // Max length
    if (output.length > MAX_OUTPUT_LENGTH) {
        output = output.slice(0, MAX_OUTPUT_LENGTH) + '...';
    }

    // URL filter: only allow swiftgateai.de URLs
    output = output.replace(
        /https?:\/\/(?!(?:www\.)?swiftgateai\.de)[^\s)}\]>]*/g,
        '[Link entfernt]'
    );

    // Code block filter
    output = output.replace(/```[\s\S]*?```/g, '[Code entfernt]');

    // Inline code filter
    output = output.replace(/`[^`]+`/g, '[Code entfernt]');

    // Markdown heading filter
    output = output.replace(/^#{1,6}\s/gm, '');

    // If empty after filtering, return fallback
    if (output.trim().length === 0) {
        return 'SwiftGate AI steht Ihnen für Fragen zu unseren Services gerne zur Verfügung. Kontaktieren Sie uns unter hello@swiftgateai.de.';
    }

    return output;
}
