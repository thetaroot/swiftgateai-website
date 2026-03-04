// Central Gemini API client with Revolver logic for multiple API keys

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

// ── Key Management ──

const API_KEYS = [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
    process.env.GEMINI_API_KEY_4,
    process.env.GEMINI_API_KEY, // Legacy/Fallback
].filter((key): key is string => typeof key === 'string' && key.length > 0 && !key.startsWith('your-') && !key.startsWith('AIzaSy...'));

let currentKeyIndex = 0;

// ── API Client ──

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';
const TIMEOUT_MS = 25_000;
const MAX_RETRIES = 3;

export async function callGemini(
    systemPrompt: string,
    contents: GeminiContent[],
    safetySettings?: SafetySetting[]
): Promise<string> {
    if (API_KEYS.length === 0) {
        throw new Error('GEMINI_API_KEY not configured');
    }

    let lastError: unknown = null;

    for (let attempt = 0; attempt < MAX_RETRIES + 1; attempt++) {
        const apiKey = API_KEYS[currentKeyIndex];
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
                console.warn(`[Gemini] Rate limit hit on key index ${currentKeyIndex}. Rotating...`);
                currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
                if (attempt < MAX_RETRIES) {
                    await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
                    continue;
                }
                throw new Error('RATE_LIMIT_EXCEEDED');
            }

            if (response.status === 403) {
                console.warn(`[Gemini] API key invalid (403) on key index ${currentKeyIndex}. Rotating...`);
                currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
                if (attempt < MAX_RETRIES) continue;
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

            if (data.error) {
                console.error('[Gemini] API error:', data.error.message);
                throw new Error(`GEMINI_API_ERROR`);
            }

            const candidates = data.candidates;
            if (!candidates || candidates.length === 0) {
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
            lastError = error;

            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    if (attempt < MAX_RETRIES) continue;
                    throw new Error('TIMEOUT');
                }
                // Known non-retryable errors
                if (['BAD_REQUEST', 'GEMINI_API_ERROR'].includes(error.message)) {
                    throw error;
                }
            }
            
            if (attempt < MAX_RETRIES) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
        }
    }

    // If we reach here, all retries failed
    console.error('[Gemini] Unexpected final error:', lastError);
    throw lastError || new Error('UNKNOWN_ERROR');
}
