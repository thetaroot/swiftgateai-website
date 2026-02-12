'use client';

import { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBackgroundContext } from '@/context/BackgroundContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  status?: 'thinking' | 'streaming' | 'complete';
}

// Animation configs
const smoothSpring = { type: "spring" as const, stiffness: 200, damping: 30, mass: 1 };
const quickSpring = { type: "spring" as const, stiffness: 300, damping: 35, mass: 0.8 };

function ChatWindow() {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExitHint, setShowExitHint] = useState(false);

  // Memoize demo conversation from translations
  const DEMO_CONVERSATION = useMemo<Message[]>(() => {
    return t.chat.demo.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
      status: 'complete'
    }));
  }, [t]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasHitBottom = useRef(false);
  const exitScrollAccumulator = useRef(0);

  const { setIsChatExpanded, chatVisible, setChatVisible } = useBackgroundContext();

  // Sync expanded state
  useEffect(() => {
    setIsChatExpanded(isExpanded);
    if (isExpanded && !chatVisible) {
      setChatVisible(true);
    }
    if (!isExpanded) {
      setShowExitHint(false);
      hasHitBottom.current = false;
      exitScrollAccumulator.current = 0;
    }
  }, [isExpanded, setIsChatExpanded, chatVisible, setChatVisible]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  // Smooth scroll to bottom
  const scrollToBottom = useCallback((immediate = false) => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const targetScroll = container.scrollHeight - container.clientHeight;

    if (immediate) {
      container.scrollTop = targetScroll;
      return;
    }

    const startScroll = container.scrollTop;
    const distance = targetScroll - startScroll;
    const duration = Math.min(400, Math.max(200, Math.abs(distance) * 0.5));
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      container.scrollTop = startScroll + distance * easeOut;
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    if (!isExpanded || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    const isAITyping = lastMessage?.role === 'assistant' &&
      (lastMessage.status === 'thinking' || lastMessage.status === 'streaming');

    if (isAITyping) {
      const t1 = setTimeout(() => scrollToBottom(), 50);
      const t2 = setTimeout(() => scrollToBottom(), 150);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      const t = setTimeout(() => scrollToBottom(), 100);
      return () => clearTimeout(t);
    }
  }, [messages, isExpanded, scrollToBottom]);

  // Check scroll position for exit hint
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || !isExpanded) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 30;

      if (atBottom && messages.length > 0) {
        hasHitBottom.current = true;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isExpanded, messages.length]);

  // Wheel handler for exit flow
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || !isExpanded) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 30;

      if (!atBottom || e.deltaY <= 0) {
        exitScrollAccumulator.current = 0;
        return;
      }

      // At bottom, scrolling down
      if (!hasHitBottom.current) {
        hasHitBottom.current = true;
        return;
      }

      if (!showExitHint) {
        setShowExitHint(true);
        exitScrollAccumulator.current = 0;
        return;
      }

      // Exit hint is showing, accumulate scroll to exit
      exitScrollAccumulator.current += e.deltaY;
      if (exitScrollAccumulator.current > 120) {
        setChatVisible(false);
        setShowExitHint(false);
        exitScrollAccumulator.current = 0;
        hasHitBottom.current = false;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isExpanded, showExitHint, setChatVisible]);

  const handleClose = useCallback(() => {
    setIsExpanded(false);
    setChatVisible(false);
    setTimeout(() => { setMessages([]); setMessage(''); }, 600);
  }, [setChatVisible]);

  // === DISABLED FOR BASIS LAUNCH ===
  const handleSend = useCallback(() => {
    // AI features disabled for basis launch
    return;
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // AI features disabled for basis launch
    e.preventDefault();
  }, []);

  // ========== COLLAPSED STATE ==========
  if (!isExpanded) {
    return (
      <div
        className={isMobile ? 'w-full' : 'absolute inset-0 flex items-center justify-center pointer-events-none'}
        style={isMobile ? { zIndex: 50 } : { zIndex: 50, paddingBottom: '80px' }}
      >        <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ ...smoothSpring, duration: 0.8 }}
        className="w-full max-w-xl px-4 md:px-6 pointer-events-auto"
      >
          <motion.div className="relative" whileHover={{ y: -4, scale: 1.01 }} transition={quickSpring}>
            {/* Glow */}
            <motion.div
              className="absolute -inset-4 rounded-[32px]"
              animate={{ opacity: message.trim() ? 0.8 : 0.4 }}
              style={{ background: 'radial-gradient(ellipse at center, rgba(211, 152, 88, 0.15) 0%, transparent 70%)', filter: 'blur(30px)' }}
            />

            {/* Glass Container */}
            <div
              className="relative rounded-[20px] md:rounded-[24px] overflow-hidden flex items-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.55) 100%)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.6) inset, 0 0 0 1px rgba(52, 21, 15, 0.03), 0 4px 8px rgba(52, 21, 15, 0.04), 0 8px 16px rgba(52, 21, 15, 0.06), 0 16px 32px rgba(52, 21, 15, 0.08), 0 32px 64px rgba(52, 21, 15, 0.12)',
                minHeight: '64px',
                padding: '10px 14px 10px 20px',
              }}
            >
              <div className="absolute inset-0 rounded-[24px] pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 50%)' }} />

              <textarea
                ref={textareaRef}
                value=""
                readOnly
                disabled
                tabIndex={-1}
                rows={1}
                placeholder={t.chat.placeholder}
                className="flex-1 resize-none focus:outline-none relative bg-transparent"
                style={{
                  color: 'rgba(52, 21, 15, 0.25)',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Space Grotesk", sans-serif',
                  fontWeight: 400,
                  minHeight: '44px',
                  maxHeight: '120px',
                  padding: '10px 0',
                  cursor: 'default',
                  opacity: 0.5,
                }}
              />

              <motion.button
                type="button"
                disabled
                tabIndex={-1}
                animate={{ scale: 0.85, opacity: 0.25 }}
                transition={quickSpring}
                className="flex-shrink-0 ml-2 flex items-center justify-center"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '14px',
                  border: 'none',
                  outline: 'none',
                  background: 'rgba(52, 21, 15, 0.06)',
                  cursor: 'default',
                  pointerEvents: 'none',
                }}
              >
                <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="rgba(52, 21, 15, 0.15)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </motion.button>
            </div>
          </motion.div>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-5 flex items-center justify-center gap-2"
          >
            <span
              style={{
                fontSize: '11px',
                color: 'rgba(52, 21, 15, 0.4)',
                fontFamily: '"Courier New", monospace',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '6px 14px',
                border: '1px solid rgba(52, 21, 15, 0.15)',
                borderRadius: '8px',
                background: 'rgba(52, 21, 15, 0.03)',
              }}
            >
              [ COMING SOON ]
            </span>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ========== EXPANDED STATE ==========
  // Don't render expanded overlay when chatVisible is false
  if (!chatVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0"
      style={{ zIndex: 60, background: '#EACEAA' }}
    >
      {/* Close Button */}
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ ...smoothSpring, delay: 0.2 }}
        onClick={handleClose}
        className="fixed top-6 right-6 pointer-events-auto group"
        style={{ zIndex: 70 }}
      >
        <motion.div className="relative" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} transition={quickSpring}>
          <div
            className="relative flex items-center justify-center"
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(52, 21, 15, 0.15), 0 4px 16px rgba(52, 21, 15, 0.1)',
            }}
          >
            <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34150F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" whileHover={{ rotate: 90 }} transition={{ duration: 0.25 }}>
              <path d="M18 6L6 18M6 6l12 12" />
            </motion.svg>
          </div>
        </motion.div>
      </motion.button>

      {/* Messages Container */}
      <motion.div
        ref={messagesContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute inset-0 pointer-events-auto"
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          paddingTop: '100px',
          paddingBottom: '220px',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, index) => (
              <motion.div
                key={`msg-${index}`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ ...smoothSpring, delay: index * 0.08 }}
                className={`mb-5 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div whileHover={{ scale: 1.015, y: -2 }} transition={quickSpring} className="relative max-w-[82%]">
                  {/* Glow */}
                  <motion.div
                    className="absolute -inset-2 rounded-[24px]"
                    style={{
                      background: msg.role === 'user' ? 'radial-gradient(ellipse at center, rgba(52, 21, 15, 0.2) 0%, transparent 70%)' : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                      filter: 'blur(16px)', opacity: 0.6,
                    }}
                  />

                  {/* Bubble */}
                  <div
                    className="relative rounded-[20px] px-5 py-4"
                    style={{
                      background: msg.role === 'user' ? 'linear-gradient(135deg, #34150F 0%, #4A1F14 100%)' : 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F3 100%)',
                      boxShadow: msg.role === 'user'
                        ? '0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 4px 12px rgba(52, 21, 15, 0.3), 0 8px 24px rgba(52, 21, 15, 0.25)'
                        : '0 0 0 1px rgba(52, 21, 15, 0.08), 0 4px 8px rgba(52, 21, 15, 0.08), 0 8px 20px rgba(52, 21, 15, 0.12)',
                    }}
                  >
                    {msg.role === 'assistant' && <div className="absolute inset-0 rounded-[20px] pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 40%)' }} />}

                    {msg.status === 'thinking' ? (
                      <div className="flex items-center gap-2 py-1 px-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                            style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #D39858 0%, #85431E 100%)', boxShadow: '0 2px 8px rgba(211, 152, 88, 0.4)' }}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="relative" style={{ fontSize: '15px', lineHeight: '1.65', color: msg.role === 'user' ? '#FFFFFF' : '#1a1a1a', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif', fontWeight: 400, margin: 0 }}>
                        {msg.content}
                        {msg.status === 'streaming' && (
                          <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }} style={{ display: 'inline-block', width: '2px', height: '16px', background: 'linear-gradient(180deg, #D39858 0%, #85431E 100%)', marginLeft: '4px', verticalAlign: 'text-bottom', borderRadius: '1px', boxShadow: '0 0 8px rgba(211, 152, 88, 0.6)' }} />
                        )}
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div ref={messagesEndRef} style={{ height: '20px' }} />
        </div>
      </motion.div>

      {/* Exit Hint - next to input area */}
      <AnimatePresence>
        {showExitHint && (
          <motion.div
            className="fixed flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            style={{
              bottom: '7rem',
              right: '2rem',
              zIndex: 60,
            }}
          >
            <motion.span
              style={{
                color: 'rgba(52, 21, 15, 0.45)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {t.chat.exitHint}
            </motion.span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(52, 21, 15, 0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Widget */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ ...smoothSpring, delay: 0.15 }}
        className="fixed bottom-0 left-0 right-0 pointer-events-auto"
        style={{ padding: '20px 24px 32px', background: 'linear-gradient(to top, #EACEAA 0%, #EACEAA 70%, transparent 100%)', zIndex: 65 }}
      >
        <motion.div className="max-w-2xl mx-auto relative" whileHover={{ y: -3 }} transition={quickSpring}>
          {/* Glass Container */}
          <div
            className="relative rounded-[22px] overflow-hidden flex items-center"
            style={{
              background: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(52, 21, 15, 0.08), 0 8px 24px rgba(52, 21, 15, 0.12)',
              minHeight: '58px',
              padding: '8px 12px 8px 20px',
            }}
          >

            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder={t.chat.placeholder}
              className="flex-1 resize-none focus:outline-none relative bg-transparent"
              style={{ color: '#1a1a1a', fontSize: '15px', lineHeight: '1.5', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif', fontWeight: 400, minHeight: '42px', maxHeight: '120px', padding: '10px 0' }}
            />

            <motion.button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleSend(); }}
              disabled={!message.trim()}
              animate={{ scale: message.trim() ? 1 : 0.85, opacity: message.trim() ? 1 : 0.35 }}
              whileHover={message.trim() ? { scale: 1.1 } : {}}
              whileTap={message.trim() ? { scale: 0.9 } : {}}
              transition={quickSpring}
              className="flex-shrink-0 ml-3 flex items-center justify-center"
              style={{
                width: '42px', height: '42px', borderRadius: '14px', border: 'none', outline: 'none',
                background: message.trim() ? 'linear-gradient(135deg, #34150F 0%, #52241A 50%, #34150F 100%)' : 'rgba(52, 21, 15, 0.05)',
                cursor: message.trim() ? 'pointer' : 'default',
                boxShadow: message.trim() ? '0 0 0 1px rgba(255,255,255,0.1) inset, 0 4px 12px rgba(52, 21, 15, 0.3), 0 8px 20px rgba(52, 21, 15, 0.15)' : 'none',
              }}
            >
              <motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none" animate={{ x: message.trim() ? 0 : -2 }} transition={quickSpring}>
                <path d="M5 12h14M12 5l7 7-7 7" stroke={message.trim() ? '#FDFCFA' : 'rgba(52, 21, 15, 0.25)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default memo(ChatWindow);
