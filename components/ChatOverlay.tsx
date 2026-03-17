'use client';

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X, Send } from 'lucide-react';
import { useBackgroundContext, ChatMessage } from '@/context/BackgroundContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import TicketForm from '@/components/chat/TicketForm';

const quickSpring = { type: "spring" as const, stiffness: 300, damping: 30 };

interface InternalMessage {
  role: 'user' | 'model';
  content: string;
  status: 'thinking' | 'typing' | 'complete';
  displayContent?: string;
  showTicketForm?: boolean;
}

// ─── AI TYPING COMPONENT ───
function AITypingText({
  content,
  onComplete,
  speed,
  reducedMotion,
}: {
  content: string;
  onComplete: () => void;
  speed: { min: number; max: number };
  reducedMotion: boolean;
}) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [cursorBlink, setCursorBlink] = useState(true);
  const charIndexRef = useRef(0);
  const rafIdRef = useRef(0);
  const lastTickRef = useRef(0);
  const completeRef = useRef(false);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorBlink(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(content);
      setShowCursor(false);
      onComplete();
      return;
    }

    charIndexRef.current = 0;
    completeRef.current = false;
    setDisplayed('');
    setShowCursor(true);
    lastTickRef.current = 0;

    const tick = (timestamp: number) => {
      if (completeRef.current) return;
      if (lastTickRef.current === 0) lastTickRef.current = timestamp;

      const elapsed = timestamp - lastTickRef.current;
      const delay = speed.min + Math.random() * (speed.max - speed.min);

      if (elapsed >= delay) {
        charIndexRef.current++;
        const newText = content.slice(0, charIndexRef.current);
        setDisplayed(newText);
        lastTickRef.current = timestamp;

        if (charIndexRef.current >= content.length) {
          completeRef.current = true;
          // Cursor blinks 2x then fades
          setTimeout(() => setShowCursor(false), 1060);
          onComplete();
          return;
        }
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => { if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current); };
  }, [content, onComplete, speed, reducedMotion]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <span
          style={{
            display: 'inline-block',
            width: '1px',
            height: '18px',
            backgroundColor: '#D39858',
            marginLeft: '2px',
            opacity: cursorBlink ? 1 : 0,
            verticalAlign: 'text-bottom',
          }}
        />
      )}
    </span>
  );
}

// ─── THINKING DOTS ───
function ThinkingDots() {
  return (
    <div className="flex items-center gap-2 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            display: 'block',
            background: 'linear-gradient(135deg, #D39858 0%, #85431E 100%)',
            boxShadow: '0 2px 8px rgba(211, 152, 88, 0.4)',
          }}
        />
      ))}
    </div>
  );
}

function ChatOverlay() {
  const { t, language } = useTranslation();
  const isMobile = useMobile();
  const prefersReducedMotion = useReducedMotion();
  const {
    chatMessages, setChatMessages, isChatOpen, setIsChatOpen,
    leadContext, setLeadContext, leadScore, setLeadScore,
    setShowTicketForm, ticketSubmitted,
    lastAISummary, setLastAISummary,
  } = useBackgroundContext();

  const [internalMessages, setInternalMessages] = useState<InternalMessage[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  // Track which chatMessage indices should show the ticket form (survives sync effect)
  const ticketFormIndicesRef = useRef<Set<number>>(new Set());

  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);

  // Sync chatMessages → internalMessages
  const prevChatLengthRef = useRef(0);

  useEffect(() => {
    if (!isChatOpen) return;
    if (chatMessages.length === 0) {
      setInternalMessages([]);
      prevChatLengthRef.current = 0;
      return;
    }

    const prevLen = prevChatLengthRef.current;
    const curLen = chatMessages.length;
    prevChatLengthRef.current = curLen;

    const lastMsg = chatMessages[curLen - 1];

    // New message added
    if (curLen > prevLen) {
      if (lastMsg.role === 'user') {
        // User sent a message → show all + thinking dots
        const synced: InternalMessage[] = chatMessages.map((m, i) => ({
          role: m.role, content: m.content, status: 'complete' as const,
          showTicketForm: ticketFormIndicesRef.current.has(i),
        }));
        synced.push({ role: 'model', content: '', status: 'thinking' });
        setInternalMessages(synced);
      } else if (lastMsg.role === 'model') {
        // AI response arrived → show all previous as complete, last as typing
        const synced: InternalMessage[] = chatMessages.map((m, i) => ({
          role: m.role,
          content: m.content,
          status: i === curLen - 1 ? 'typing' as const : 'complete' as const,
          showTicketForm: ticketFormIndicesRef.current.has(i),
        }));
        setInternalMessages(synced);
      }
    } else if (prevLen === 0 && curLen > 0) {
      // Overlay just opened with existing messages
      setInternalMessages(chatMessages.map((m, i) => ({
        role: m.role, content: m.content, status: 'complete' as const,
        showTicketForm: ticketFormIndicesRef.current.has(i),
      })));
    }
  }, [chatMessages, isChatOpen]);

  // Body scroll lock
  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isChatOpen]);

  // ESC to close
  useEffect(() => {
    if (!isChatOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsChatOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isChatOpen, setIsChatOpen]);

  // Auto-focus input on desktop
  useEffect(() => {
    if (isChatOpen && !isMobile && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [isChatOpen, isMobile]);

  // Virtual keyboard handling (mobile)
  useEffect(() => {
    if (!isMobile) return;
    const viewport = window.visualViewport;
    if (!viewport) return;
    const onResize = () => {
      const kbHeight = window.innerHeight - viewport.height;
      setKeyboardOffset(Math.max(0, kbHeight));
    };
    viewport.addEventListener('resize', onResize);
    return () => viewport.removeEventListener('resize', onResize);
  }, [isMobile]);

  // Auto-scroll
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);

  useEffect(() => {
    if (isChatOpen && internalMessages.length > 0) {
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [internalMessages, isChatOpen, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleClose = useCallback(() => {
    setIsChatOpen(false);
  }, [setIsChatOpen]);

  const handleSend = useCallback(async () => {
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed };

    setChatMessages(prev => {
      const updated = [...prev, userMsg];
      return updated.length > 20 ? updated.slice(-20) : updated;
    });

    setMessage('');
    setIsLoading(true);

    try {
      const history = [...chatMessages, userMsg].slice(-20).map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: history.slice(0, -1),
          language: 'AUTO',
          context: leadContext,
        }),
      });

      let reply: string;
      let shouldSuggestTicket = false;
      if (response.status === 429) {
        reply = t.ai.rateLimit;
      } else if (!response.ok) {
        reply = t.ai.error;
      } else {
        const data = await response.json() as Record<string, unknown>;
        reply = typeof data.reply === 'string' ? data.reply : t.ai.fallback;

        // Update lead state from expanded response
        if (typeof data.lead_score === 'number') setLeadScore(data.lead_score);
        if (data.extracted && typeof data.extracted === 'object') {
          const ext = data.extracted as Record<string, unknown>;
          setLeadContext(prev => ({
            project_need: typeof ext.project_need === 'string' ? ext.project_need : prev.project_need,
            company: typeof ext.company === 'string' ? ext.company : prev.company,
            urgency: (ext.urgency === 'low' || ext.urgency === 'medium' || ext.urgency === 'high') ? ext.urgency : prev.urgency,
          }));
        }
        if (data.suggest_ticket && !ticketSubmitted) {
          shouldSuggestTicket = true;
          setLastAISummary(reply);
          setShowTicketForm(true);
        }
      }

      // Mark the ticket form index BEFORE setChatMessages triggers the sync effect
      if (shouldSuggestTicket) {
        // The new model message will be at the end of chatMessages after the update
        const nextIndex = chatMessages.length + 1; // +1 for the user msg already added
        ticketFormIndicesRef.current.add(nextIndex);
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
  }, [message, isLoading, chatMessages, setChatMessages, language, t.ai, leadContext, setLeadContext, setLeadScore, ticketSubmitted, setLastAISummary, setShowTicketForm]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isMobile) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend, isMobile]);

  const handleTypingComplete = useCallback((index: number) => {
    setInternalMessages(prev =>
      prev.map((m, i) => i === index ? { ...m, status: 'complete' as const } : m)
    );
    scrollToBottom();
  }, [scrollToBottom]);

  // Mobile swipe-to-dismiss


  if (!mounted) return null;

  const hasText = message.trim().length > 0;

  // ─── SHARED MESSAGE LIST ───
  const renderMessages = () => (
    <div className="flex flex-col gap-5">
      {internalMessages.map((msg, index) => {
        if (msg.role === 'user') {
          return (
            <motion.div
              key={`msg-${index}`}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={quickSpring}
              className="flex justify-end"
            >
              <div
                className="max-w-[85%] rounded-[20px] px-5 py-4"
                style={{
                  background: 'linear-gradient(135deg, #34150F, #4A1F14)',
                  boxShadow: '0 4px 12px rgba(52, 21, 15, 0.3)',
                }}
              >
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.65',
                  color: '#FFFFFF',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
                  fontWeight: 400,
                  margin: 0,
                }}>
                  {msg.content}
                </p>
              </div>
            </motion.div>
          );
        }

        // AI message
        return (
          <motion.div
            key={`msg-${index}`}
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex justify-start"
          >
            <div className="max-w-[85%]">
              {msg.status === 'thinking' ? (
                <ThinkingDots />
              ) : (
                <>
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.65',
                    color: '#1d1d1f',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
                    fontWeight: 400,
                    margin: 0,
                  }}>
                    {msg.status === 'typing' ? (
                      <AITypingText
                        content={msg.content}
                        onComplete={() => handleTypingComplete(index)}
                        speed={isMobile ? { min: 20, max: 30 } : { min: 15, max: 25 }}
                        reducedMotion={prefersReducedMotion}
                      />
                    ) : (
                      msg.content
                    )}
                  </p>
                  {msg.showTicketForm && msg.status === 'complete' && !ticketSubmitted && (
                    <div style={{ marginTop: '12px' }}>
                      <TicketForm
                        summary={lastAISummary}
                        leadScore={leadScore}
                        leadData={leadContext as unknown as Record<string, unknown>}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        );
      })}
      <div ref={messagesEndRef} style={{ height: '1px' }} />
    </div>
  );

  // ─── SHARED INPUT BAR ───
  const renderInputBar = () => (
    <div className="flex items-center gap-3 w-full">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder={t.chat.placeholder}
        className="flex-1 resize-none focus:outline-none bg-transparent"
        style={{
          color: '#1a1a1a',
          fontSize: isMobile ? '16px' : '15px',
          lineHeight: '1.5',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
          fontWeight: 400,
          minHeight: '40px',
          maxHeight: '120px',
          padding: '10px 0',
          caretColor: '#D39858',
        }}
      />
      <motion.button
        type="button"
        onClick={(e) => { e.preventDefault(); handleSend(); }}
        disabled={!hasText || isLoading}
        animate={{ scale: hasText ? 1 : 0.85, opacity: hasText ? 1 : 0.35 }}
        whileHover={!isMobile && hasText ? { scale: 1.1 } : {}}
        whileTap={hasText ? { scale: 0.9 } : {}}
        transition={quickSpring}
        className="flex-shrink-0 flex items-center justify-center"
        style={{
          width: isMobile ? '38px' : '42px',
          height: isMobile ? '38px' : '42px',
          borderRadius: '14px',
          border: 'none',
          outline: 'none',
          background: hasText ? 'linear-gradient(135deg, #34150F 0%, #52241A 50%, #34150F 100%)' : 'rgba(52, 21, 15, 0.06)',
          cursor: hasText ? 'pointer' : 'default',
          boxShadow: hasText ? '0 4px 12px rgba(52, 21, 15, 0.3)' : 'none',
        }}
      >
        <Send size={isMobile ? 18 : 20} color={hasText ? '#FDFCFA' : 'rgba(52, 21, 15, 0.15)'} />
      </motion.button>
    </div>
  );

  // ─── SHARED HEADER ───
  const renderHeader = () => (
    <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
      <span style={{
        fontFamily: '"Courier New", monospace',
        fontSize: '13px',
        color: '#34150F',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontWeight: 400,
      }}>
        {t.chat.overlayTitle}
      </span>
      <motion.button
        onClick={handleClose}
        className="flex items-center justify-center"
        whileHover={isMobile ? {} : { scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.05)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <X size={16} color="#34150F" />
      </motion.button>
    </div>
  );

  // ─── MOBILE: APPLE GLASS MODAL ───
  if (isMobile) {
    return createPortal(
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[9998]"
              style={{
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
            />

            {/* Modal Container */}
            <div
              className="fixed inset-0 z-[9999] flex flex-col pointer-events-none"
              style={{
                padding: '12px',
                paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)',
                paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + ${keyboardOffset > 0 ? keyboardOffset + 'px' : '12px'})`,
              }}
            >
              <motion.div
                ref={sheetRef}
                className="pointer-events-auto relative w-full flex-1 flex flex-col overflow-hidden rounded-[32px] border border-white/20"
                style={{
                  background: 'rgba(255, 255, 255, 0.75)', // Slightly more opaque for better legibility
                  backdropFilter: 'blur(30px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.1 }
                    : { type: 'spring', stiffness: 350, damping: 25 }
                }
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/10">
                  <span style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '13px',
                    color: '#1d1d1f',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}>
                    {t.chat.overlayTitle}
                  </span>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full hover:bg-black/5 transition-colors text-[#1d1d1f]/60"
                    style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    <X size={18} color="#1d1d1f" />
                  </button>
                </div>

                {/* Messages */}
                <div
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto"
                  style={{
                    padding: '16px 16px 8px',
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehavior: 'contain',
                  }}
                >
                  {renderMessages()}
                </div>

                {/* Input — glass pill */}
                <div
                  className="border-t border-white/10"
                  style={{ padding: '10px 12px 12px' }}
                >
                  <div
                    className="flex items-center rounded-2xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03) inset',
                      padding: '4px 6px 4px 14px',
                    }}
                  >
                    {renderInputBar()}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>,
      document.body
    );
  }

  // ─── DESKTOP: CENTERED MODAL ───
  return createPortal(
    <AnimatePresence>
      {isChatOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0"
            style={{
              zIndex: 9998,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 9999, padding: '24px' }}>
            <motion.div
              className="pointer-events-auto relative w-full max-w-2xl flex flex-col overflow-hidden rounded-[32px] border border-white/20"
              style={{
                maxHeight: '85vh',
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.01 }
                  : { type: 'spring', stiffness: 300, damping: 30 }
              }
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {renderHeader()}

              {/* Messages */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto"
                style={{
                  padding: '20px 24px 12px',
                  minHeight: '200px',
                }}
              >
                {renderMessages()}
              </div>

              {/* Input */}
              <div
                className="border-t border-white/10"
                style={{ padding: '12px 20px 16px' }}
              >
                {renderInputBar()}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default memo(ChatOverlay);
