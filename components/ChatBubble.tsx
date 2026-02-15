'use client';

import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useBackgroundContext } from '@/context/BackgroundContext';
import { useMobile } from '@/hooks/useMobile';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const quickSpring = { type: "spring" as const, stiffness: 300, damping: 30 };

interface ChatBubbleProps {
  chatSectionRef: React.RefObject<HTMLElement | null>;
}

function ChatBubble({ chatSectionRef }: ChatBubbleProps) {
  const isMobile = useMobile();
  const prefersReducedMotion = useReducedMotion();
  const { isChatOpen, setIsChatOpen, chatMessages } = useBackgroundContext();

  const [visible, setVisible] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  // IntersectionObserver: show bubble when chat section is out of view
  useEffect(() => {
    const section = chatSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [chatSectionRef]);

  // Track unread: mark as unread when new model message arrives while overlay is closed
  useEffect(() => {
    const lastMsg = chatMessages[chatMessages.length - 1];
    if (lastMsg && lastMsg.role === 'model' && !isChatOpen) {
      setHasUnread(true);
    }
  }, [chatMessages, isChatOpen]);

  // Clear unread when overlay opens
  useEffect(() => {
    if (isChatOpen) {
      setHasUnread(false);
    }
  }, [isChatOpen]);

  const shouldShow = visible && !isChatOpen;

  if (isMobile) {
    return (
      <AnimatePresence>
        {shouldShow && (
          <motion.button
            className="fixed flex items-center justify-center"
            style={{
              zIndex: 90,
              right: '16px',
              bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #34150F, #4A1F14)',
              boxShadow: '0 4px 12px rgba(52, 21, 15, 0.3)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              touchAction: 'manipulation',
            }}
            initial={prefersReducedMotion ? { opacity: 1 } : { y: 16, opacity: 0, scale: 0.85 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            transition={prefersReducedMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 250, damping: 25 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle size={20} color="#EACEAA" />

            {/* Unread dot */}
            {hasUnread && chatMessages.length > 0 && (
              <motion.span
                className="absolute"
                style={{
                  top: '-2px',
                  right: '-2px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#D39858',
                }}
                animate={prefersReducedMotion ? {} : {
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    );
  }

  // ─── DESKTOP ───
  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.button
          className="fixed flex items-center justify-center"
          style={{
            zIndex: 90,
            right: '24px',
            bottom: '24px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #34150F, #4A1F14)',
            boxShadow: '0 4px 12px rgba(52, 21, 15, 0.3), 0 8px 24px rgba(52, 21, 15, 0.15)',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
          initial={prefersReducedMotion ? { opacity: 1 } : { y: 20, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          transition={prefersReducedMotion ? { duration: 0.01 } : quickSpring}
          whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle size={22} color="#EACEAA" />

          {/* Unread dot */}
          {hasUnread && chatMessages.length > 0 && (
            <motion.span
              className="absolute"
              style={{
                top: '-2px',
                right: '-2px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#D39858',
              }}
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default memo(ChatBubble);
