'use client';

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBackgroundContext } from '@/context/BackgroundContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  status?: 'thinking' | 'streaming' | 'complete';
}

// Animation configs
const smoothSpring = { type: "spring" as const, stiffness: 200, damping: 30, mass: 1 };
const quickSpring = { type: "spring" as const, stiffness: 300, damping: 35, mass: 0.8 };

// Demo conversation
const DEMO_CONVERSATION: Message[] = [
  { role: 'user', content: 'Hallo! Können Sie mir mehr über Ihre Services erzählen?', status: 'complete' },
  { role: 'assistant', content: 'Gerne! Ich biete Full-Service Webentwicklung mit modernsten Technologien wie React, Next.js und TypeScript. Von der initialen Beratung bis zum finalen Launch begleite ich Projekte komplett.', status: 'complete' },
  { role: 'user', content: 'Wie lange dauert typischerweise ein Projekt?', status: 'complete' },
  { role: 'assistant', content: 'Das hängt stark vom Umfang ab. Ein kleineres Portfolio-Projekt kann in 2-3 Wochen fertig sein, während größere E-Commerce Plattformen 2-3 Monate benötigen. Ich plane immer realistisch und transparent.', status: 'complete' },
];

function ChatWindow() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showPortfolioHint, setShowPortfolioHint] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const portfolioScrollAccumulator = useRef(0);

  const { setIsChatExpanded, setCanScrollToPortfolio } = useBackgroundContext();

  // Sync expanded state
  useEffect(() => {
    setIsChatExpanded(isExpanded);
    if (!isExpanded) {
      setShowPortfolioHint(false);
      setIsAtBottom(false);
      portfolioScrollAccumulator.current = 0;
    }
  }, [isExpanded, setIsChatExpanded]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  // Smooth scroll to bottom - used for AI messages
  const scrollToBottom = useCallback((immediate = false) => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const targetScroll = container.scrollHeight - container.clientHeight;

    if (immediate) {
      container.scrollTop = targetScroll;
      return;
    }

    // Smooth scroll animation using requestAnimationFrame
    const startScroll = container.scrollTop;
    const distance = targetScroll - startScroll;
    const duration = Math.min(400, Math.max(200, Math.abs(distance) * 0.5)); // Dynamic duration based on distance
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);

      container.scrollTop = startScroll + distance * easeOut;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  // Auto-scroll when messages change or AI is typing/streaming
  useEffect(() => {
    if (!isExpanded || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    const isAITyping = lastMessage?.role === 'assistant' &&
                       (lastMessage.status === 'thinking' || lastMessage.status === 'streaming');

    // Scroll immediately for new messages, with slight delay for streaming updates
    if (isAITyping) {
      // During streaming, scroll frequently to keep up with new content
      const t1 = setTimeout(() => scrollToBottom(), 50);
      const t2 = setTimeout(() => scrollToBottom(), 150);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      // For complete messages, smooth scroll once
      const t = setTimeout(() => scrollToBottom(), 100);
      return () => clearTimeout(t);
    }
  }, [messages, isExpanded, scrollToBottom]);

  // Check scroll position
  const checkScrollPosition = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 30;
    setIsAtBottom(atBottom);

    // Show portfolio hint after being at bottom for a moment
    if (atBottom && messages.length > 0) {
      setShowPortfolioHint(true);
    }
  }, [messages.length]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || !isExpanded) return;

    container.addEventListener('scroll', checkScrollPosition, { passive: true });
    checkScrollPosition();

    return () => container.removeEventListener('scroll', checkScrollPosition);
  }, [isExpanded, checkScrollPosition]);

  // Handle wheel on messages container - only allow portfolio transition when hint is shown
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || !isExpanded) return;

    const handleWheel = (e: WheelEvent) => {
      // If we're at bottom AND portfolio hint is shown AND scrolling down
      if (showPortfolioHint && isAtBottom && e.deltaY > 0) {
        portfolioScrollAccumulator.current += e.deltaY;

        // Require significant scroll to transition
        if (portfolioScrollAccumulator.current > 150) {
          setCanScrollToPortfolio(true);
          // Reset for next time
          portfolioScrollAccumulator.current = 0;
        }
      } else {
        // Reset accumulator if not in the right state
        portfolioScrollAccumulator.current = 0;
        setCanScrollToPortfolio(false);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isExpanded, showPortfolioHint, isAtBottom, setCanScrollToPortfolio]);

  const handleClose = useCallback(() => {
    setIsExpanded(false);
    setCanScrollToPortfolio(false);
    setTimeout(() => { setMessages([]); setMessage(''); }, 600);
  }, [setCanScrollToPortfolio]);

  const handleSend = useCallback(() => {
    if (!message.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, content: message, status: 'complete' as const }];
    setMessages(newMessages);
    setMessage('');
    setShowPortfolioHint(false);

    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => setMessages(DEMO_CONVERSATION), 800);
    } else {
      setTimeout(() => setMessages([...newMessages, { role: 'assistant', content: '', status: 'thinking' }]), 400);
      setTimeout(() => setMessages([...newMessages, { role: 'assistant', content: 'Das ist eine Demo-Antwort. In der finalen Version wird hier die echte AI antworten.', status: 'streaming' }]), 1400);
      setTimeout(() => setMessages([...newMessages, { role: 'assistant', content: 'Das ist eine Demo-Antwort. In der finalen Version wird hier die echte AI antworten.', status: 'complete' }]), 2200);
    }
  }, [message, messages, isExpanded]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && message.trim()) {
      e.preventDefault();
      handleSend();
    }
  }, [message, handleSend]);

  // ========== COLLAPSED STATE ==========
  if (!isExpanded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 50 }}>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ ...smoothSpring, duration: 0.8 }}
          className="w-full max-w-xl px-6 pointer-events-auto"
        >
          <motion.div className="relative" whileHover={{ y: -4, scale: 1.01 }} transition={quickSpring}>
            {/* Glow */}
            <motion.div
              className="absolute -inset-4 rounded-[32px]"
              animate={{ opacity: message.trim() ? 0.8 : 0.4 }}
              style={{ background: 'radial-gradient(ellipse at center, rgba(211, 152, 88, 0.15) 0%, transparent 70%)', filter: 'blur(30px)' }}
            />

            {/* Glass Container with Flexbox for proper centering */}
            <div
              className="relative rounded-[24px] overflow-hidden flex items-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.55) 100%)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.6) inset, 0 0 0 1px rgba(52, 21, 15, 0.03), 0 4px 8px rgba(52, 21, 15, 0.04), 0 8px 16px rgba(52, 21, 15, 0.06), 0 16px 32px rgba(52, 21, 15, 0.08), 0 32px 64px rgba(52, 21, 15, 0.12)',
                minHeight: '72px',
                padding: '12px 16px 12px 24px',
              }}
            >
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-[24px] pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 50%)' }} />

              {/* Textarea - grows to fill */}
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Fragen Sie mich etwas..."
                className="flex-1 resize-none focus:outline-none relative bg-transparent"
                style={{
                  color: '#1a1a1a',
                  fontSize: '17px',
                  lineHeight: '1.6',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Space Grotesk", sans-serif',
                  fontWeight: 400,
                  minHeight: '48px',
                  maxHeight: '120px',
                  padding: '12px 0',
                }}
              />

              {/* Send Button - properly centered with flexbox */}
              <motion.button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleSend(); }}
                disabled={!message.trim()}
                animate={{ scale: message.trim() ? 1 : 0.85, opacity: message.trim() ? 1 : 0.4 }}
                whileHover={message.trim() ? { scale: 1.1 } : {}}
                whileTap={message.trim() ? { scale: 0.9 } : {}}
                transition={quickSpring}
                className="flex-shrink-0 ml-3 flex items-center justify-center"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  border: 'none',
                  outline: 'none',
                  background: message.trim() ? 'linear-gradient(135deg, #34150F 0%, #52241A 50%, #34150F 100%)' : 'rgba(52, 21, 15, 0.06)',
                  cursor: message.trim() ? 'pointer' : 'default',
                  boxShadow: message.trim() ? '0 0 0 1px rgba(255,255,255,0.1) inset, 0 4px 12px rgba(52, 21, 15, 0.35), 0 8px 24px rgba(52, 21, 15, 0.2)' : 'none',
                }}
              >
                <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none" animate={{ x: message.trim() ? 0 : -2 }} transition={quickSpring}>
                  <path d="M5 12h14M12 5l7 7-7 7" stroke={message.trim() ? '#FDFCFA' : 'rgba(52, 21, 15, 0.3)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </motion.button>
            </div>
          </motion.div>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-5"
            style={{ fontSize: '13px', color: 'rgba(52, 21, 15, 0.35)', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontWeight: 500 }}
          >
            Enter zum Senden
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // ========== EXPANDED STATE ==========
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0"
      style={{ zIndex: 50 }}
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
        style={{ zIndex: 60 }}
      >
        <motion.div className="relative" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} transition={quickSpring}>
          <motion.div
            className="absolute -inset-3 rounded-full"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{ background: 'radial-gradient(circle, rgba(52, 21, 15, 0.12) 0%, transparent 70%)', filter: 'blur(12px)' }}
          />
          <div
            className="relative flex items-center justify-center"
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
              backdropFilter: 'blur(30px) saturate(180%)',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.5) inset, 0 0 0 1px rgba(52, 21, 15, 0.04), 0 4px 12px rgba(52, 21, 15, 0.1)',
            }}
          >
            <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(52, 21, 15, 0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" whileHover={{ rotate: 90 }} transition={{ duration: 0.25 }}>
              <path d="M18 6L6 18M6 6l12 12" />
            </motion.svg>
          </div>
        </motion.div>
      </motion.button>

      {/* Messages Container - Native scrolling */}
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
                      background: msg.role === 'user' ? 'linear-gradient(135deg, rgba(52, 21, 15, 0.95) 0%, rgba(74, 31, 20, 0.9) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.65) 100%)',
                      backdropFilter: msg.role === 'assistant' ? 'blur(40px) saturate(180%)' : 'none',
                      boxShadow: msg.role === 'user'
                        ? '0 0 0 1px rgba(255, 255, 255, 0.08) inset, 0 4px 12px rgba(52, 21, 15, 0.25), 0 8px 24px rgba(52, 21, 15, 0.2)'
                        : '0 0 0 1px rgba(255, 255, 255, 0.6) inset, 0 0 0 1px rgba(52, 21, 15, 0.03), 0 2px 6px rgba(52, 21, 15, 0.04), 0 6px 16px rgba(52, 21, 15, 0.06)',
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
                      <p className="relative" style={{ fontSize: '15px', lineHeight: '1.65', color: msg.role === 'user' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(26, 26, 26, 0.9)', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif', fontWeight: 400, margin: 0 }}>
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

          {/* Portfolio Hint - only shows when at bottom */}
          <AnimatePresence>
            {showPortfolioHint && isAtBottom && messages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center py-8"
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2"
                  style={{ color: 'rgba(52, 21, 15, 0.4)' }}
                >
                  <span style={{ fontSize: '11px', fontFamily: '-apple-system, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    Weiter scrollen für Portfolio
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} style={{ height: '20px' }} />
        </div>
      </motion.div>

      {/* Input Widget */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ ...smoothSpring, delay: 0.15 }}
        className="fixed bottom-0 left-0 right-0 pointer-events-auto"
        style={{ padding: '20px 24px 32px', background: 'linear-gradient(to top, rgba(234, 206, 170, 0.98) 0%, rgba(234, 206, 170, 0.9) 60%, transparent 100%)', zIndex: 55 }}
      >
        <motion.div className="max-w-2xl mx-auto relative" whileHover={{ y: -3 }} transition={quickSpring}>
          {/* Glow */}
          <motion.div
            className="absolute -inset-3 rounded-[28px]"
            animate={{ opacity: message.trim() ? 0.7 : 0.4 }}
            style={{ background: 'radial-gradient(ellipse at center, rgba(211, 152, 88, 0.12) 0%, transparent 70%)', filter: 'blur(24px)' }}
          />

          {/* Glass Container with Flexbox */}
          <div
            className="relative rounded-[22px] overflow-hidden flex items-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.7) 100%)',
              backdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.6) inset, 0 0 0 1px rgba(52, 21, 15, 0.03), 0 4px 8px rgba(52, 21, 15, 0.04), 0 8px 20px rgba(52, 21, 15, 0.06), 0 16px 40px rgba(52, 21, 15, 0.1)',
              minHeight: '58px',
              padding: '8px 12px 8px 20px',
            }}
          >
            <div className="absolute inset-0 rounded-[22px] pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 50%)' }} />

            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Nachricht eingeben..."
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
