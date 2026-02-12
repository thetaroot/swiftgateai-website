// Central Gemini API client — the only file that uses process.env.GEMINI_API_KEY

// ── Types ──

export interface GeminiPart {
    text: string;
}

export interface GeminiContent {
    role: 'user' | 'model';
    parts: GeminiPart[];
}

export interface SafetySetting {
    category: string;
    threshold: string;
}

interface GeminiCandidate {
    content: {
        parts: GeminiPart[];
        role: string;
    };
    finishReason: string;
}

interface GeminiResponse {
    candidates?: GeminiCandidate[];
    usageMetadata?: {
        promptTokenCount: number;
        candidatesTokenCount: number;
        totalTokenCount: number;
    };
    error?: {
        code: number;
        message: string;
        status: string;
    };
}

// ── Default Safety Settings ──

const DEFAULT_SAFETY_SETTINGS: SafetySetting[] = [
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_LOW_AND_ABOVE' },
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_LOW_AND_ABOVE' },
    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_LOW_AND_ABOVE' },
];

// ── Fallback Response ──

const FALLBACK_RESPONSE = 'SwiftGate AI steht Ihnen für Fragen zu unseren Services gerne zur Verfügung. Kontaktieren Sie uns unter hello@swiftgateai.de.';

// ── API Client ──

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';
const TIMEOUT_MS = 25_000;

export async function callGemini(
    systemPrompt: string,
    contents: GeminiContent[],
    safetySettings?: SafetySetting[]
): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY not configured');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: systemPrompt }],
                },
                contents,
                safetySettings: safetySettings ?? DEFAULT_SAFETY_SETTINGS,
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 300,
                    topP: 0.8,
                },
            }),
        });

        clearTimeout(timeout);

        if (response.status === 429) {
            throw new Error('RATE_LIMIT_EXCEEDED');
        }
        if (response.status === 403) {
            throw new Error('API_KEY_INVALID');
        }
        if (response.status === 400) {
            const errorBody = await response.text().catch(() => '');
            console.error('[Gemini] Bad request:', errorBody);
            throw new Error('BAD_REQUEST');
        }
        if (!response.ok) {
            throw new Error(`GEMINI_ERROR_${response.status}`);
        }

        const data: GeminiResponse = await response.json();

        // Check for API-level error
        if (data.error) {
            console.error('[Gemini] API error:', data.error.message);
            throw new Error(`GEMINI_API_ERROR`);
        }

        // Extract response text
        const candidates = data.candidates;
        if (!candidates || candidates.length === 0) {
            // Safety block or empty response
            return FALLBACK_RESPONSE;
        }

        const candidate = candidates[0];
        const text = candidate.content?.parts?.[0]?.text;

        if (!text || text.trim().length === 0) {
            return FALLBACK_RESPONSE;
        }

        return text;
    } catch (error: unknown) {
        clearTimeout(timeout);

        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('TIMEOUT');
            }
            // Re-throw known errors
            if (['RATE_LIMIT_EXCEEDED', 'API_KEY_INVALID', 'BAD_REQUEST', 'GEMINI_API_ERROR', 'GEMINI_API_KEY not configured'].includes(error.message) || error.message.startsWith('GEMINI_ERROR_')) {
                throw error;
            }
        }

        console.error('[Gemini] Unexpected error:', error);
        throw new Error('UNKNOWN_ERROR');
    }
}
