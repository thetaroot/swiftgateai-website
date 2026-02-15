'use client';

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { useBackgroundContext } from '@/context/BackgroundContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useSettings } from '@/context/SettingsContext';
import { useMobile } from '@/hooks/useMobile';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const quickSpring = { type: "spring" as const, stiffness: 300, damping: 30 };

function ChatInput() {
  const { t } = useTranslation();
  const { language } = useSettings();
  const isMobile = useMobile();
  const prefersReducedMotion = useReducedMotion();
  const { chatMessages, setChatMessages, setIsChatOpen } = useBackgroundContext();

  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const typewriterEnabled = !isFocused && message.length === 0;
  const { displayText, cursorVisible } = useTypewriter({
    texts: t.chat.suggestions,
    typingSpeed: 50,
    deletingSpeed: 25,
    pauseAfterType: 3000,
    pauseAfterDelete: 500,
    enabled: typewriterEnabled && !prefersReducedMotion,
  });

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleSend = useCallback(async () => {
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;

    const userMsg = { role: 'user' as const, content: trimmed };

    // Add user message to context
    setChatMessages(prev => {
      const updated = [...prev, userMsg];
      return updated.length > 20 ? updated.slice(-20) : updated;
    });

    setMessage('');
    setIsLoading(true);
    setIsChatOpen(true);

    try {
      const history = [...chatMessages, userMsg].slice(-20).map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: history.slice(0, -1),
          language,
        }),
      });

      let reply: string;

      if (response.status === 429) {
        reply = t.ai.rateLimit;
      } else if (!response.ok) {
        reply = t.ai.error;
      } else {
        const data: unknown = await response.json();
        reply = typeof data === 'object' && data !== null && 'reply' in data
          ? String((data as Record<string, unknown>).reply)
          : t.ai.fallback;
      }

      setChatMessages(prev => {
        const updated = [...prev, { role: 'model' as const, content: reply }];
        return updated.length > 20 ? updated.slice(-20) : updated;
      });
    } catch {
      setChatMessages(prev => {
        const updated = [...prev, { role: 'model' as const, content: t.ai.error }];
        return updated.length > 20 ? updated.slice(-20) : updated;
      });
    } finally {
      setIsLoading(false);
    }
  }, [message, isLoading, chatMessages, setChatMessages, setIsChatOpen, language, t.ai]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isMobile) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend, isMobile]);

  const hasText = message.trim().length > 0;

  // ─── MOBILE DESIGN ───
  if (isMobile) {
    return (
      <div className="w-full" style={{ zIndex: 50 }}>
        <div
          className="relative rounded-[20px] overflow-hidden flex items-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.55) 100%)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.6) inset, 0 4px 16px rgba(52, 21, 15, 0.1)',
            minHeight: '56px',
            padding: '8px 14px 8px 18px',
          }}
        >
          <div className="flex-1 relative">
            {/* Typewriter placeholder overlay */}
            {!isFocused && message.length === 0 && (
              <div
                className="absolute inset-0 flex items-center pointer-events-none"
                style={{
                  color: 'rgba(52, 21, 15, 0.35)',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Space Grotesk", sans-serif',
                  fontWeight: 400,
                  padding: '8px 0',
                }}
              >
                <span>{prefersReducedMotion ? t.chat.placeholder : displayText}</span>
                {!prefersReducedMotion && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '1px',
                      height: '18px',
                      backgroundColor: '#D39858',
                      marginLeft: '2px',
                      opacity: cursorVisible ? 1 : 0,
                      transition: 'opacity 0.05s',
                      verticalAlign: 'text-bottom',
                    }}
                  />
                )}
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              rows={1}
              className="flex-1 w-full resize-none focus:outline-none relative bg-transparent"
              style={{
                color: '#1a1a1a',
                fontSize: '16px',
                lineHeight: '1.6',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Space Grotesk", sans-serif',
                fontWeight: 400,
                minHeight: '40px',
                maxHeight: '120px',
                padding: '8px 0',
                caretColor: '#D39858',
              }}
            />
          </div>

          <motion.button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleSend(); }}
            disabled={!hasText || isLoading}
            animate={{ scale: hasText ? 1 : 0.85, opacity: hasText ? 1 : 0.35 }}
            whileTap={hasText ? { scale: 0.9 } : {}}
            transition={quickSpring}
            className="flex-shrink-0 ml-2 flex items-center justify-center"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '14px',
              border: 'none',
              outline: 'none',
              background: hasText ? 'linear-gradient(135deg, #34150F 0%, #52241A 50%, #34150F 100%)' : 'rgba(52, 21, 15, 0.06)',
              cursor: hasText ? 'pointer' : 'default',
              boxShadow: hasText ? '0 4px 12px rgba(52, 21, 15, 0.3)' : 'none',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke={hasText ? '#FDFCFA' : 'rgba(52, 21, 15, 0.15)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </div>
    );
  }

  // ─── DESKTOP DESIGN ───
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 50, paddingBottom: '80px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...quickSpring, duration: 0.8 }}
        className="w-full max-w-xl px-6 pointer-events-auto"
      >
        <motion.div
          className="relative"
          whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
          transition={quickSpring}
        >
          {/* Glow */}
          <motion.div
            className="absolute -inset-4 rounded-[32px]"
            animate={{ opacity: hasText ? 0.8 : 0.4 }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(211, 152, 88, 0.15) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />

          {/* Glass Container */}
          <div
            className="relative rounded-[20px] overflow-hidden flex items-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.55) 100%)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.6) inset, 0 0 0 1px rgba(52, 21, 15, 0.03), 0 4px 8px rgba(52, 21, 15, 0.04), 0 8px 16px rgba(52, 21, 15, 0.06), 0 16px 32px rgba(52, 21, 15, 0.08), 0 32px 64px rgba(52, 21, 15, 0.12)',
              minHeight: '64px',
              padding: '10px 14px 10px 20px',
            }}
          >
            <div className="absolute inset-0 rounded-[20px] pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 50%)' }} />

            <div className="flex-1 relative">
              {/* Typewriter placeholder overlay */}
              {!isFocused && message.length === 0 && (
                <div
                  className="absolute inset-0 flex items-center pointer-events-none"
                  style={{
                    color: 'rgba(52, 21, 15, 0.35)',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Space Grotesk", sans-serif',
                    fontWeight: 400,
                    padding: '10px 0',
                  }}
                >
                  <span>{prefersReducedMotion ? t.chat.placeholder : displayText}</span>
                  {!prefersReducedMotion && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: '1px',
                        height: '18px',
                        backgroundColor: '#D39858',
                        marginLeft: '2px',
                        opacity: cursorVisible ? 1 : 0,
                        transition: 'opacity 0.05s',
                        verticalAlign: 'text-bottom',
                      }}
                    />
                  )}
                </div>
              )}

              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows={1}
                className="flex-1 w-full resize-none focus:outline-none relative bg-transparent"
                style={{
                  color: '#1a1a1a',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Space Grotesk", sans-serif',
                  fontWeight: 400,
                  minHeight: '44px',
                  maxHeight: '120px',
                  padding: '10px 0',
                  caretColor: '#D39858',
                }}
              />
            </div>

            <motion.button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleSend(); }}
              disabled={!hasText || isLoading}
              animate={{ scale: hasText ? 1 : 0.85, opacity: hasText ? 1 : 0.35 }}
              whileHover={hasText ? { scale: 1.1 } : {}}
              whileTap={hasText ? { scale: 0.9 } : {}}
              transition={quickSpring}
              className="flex-shrink-0 ml-2 flex items-center justify-center"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px',
                border: 'none',
                outline: 'none',
                background: hasText ? 'linear-gradient(135deg, #34150F 0%, #52241A 50%, #34150F 100%)' : 'rgba(52, 21, 15, 0.06)',
                cursor: hasText ? 'pointer' : 'default',
                boxShadow: hasText ? '0 0 0 1px rgba(255,255,255,0.1) inset, 0 4px 12px rgba(52, 21, 15, 0.3), 0 8px 20px rgba(52, 21, 15, 0.15)' : 'none',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke={hasText ? '#FDFCFA' : 'rgba(52, 21, 15, 0.15)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default memo(ChatInput);
