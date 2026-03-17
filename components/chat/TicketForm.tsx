'use client';

import { useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';
import { useBackgroundContext } from '@/context/BackgroundContext';

const quickSpring = { type: "spring" as const, stiffness: 300, damping: 30 };

interface TicketFormProps {
  summary: string;
  leadScore: number;
  leadData: Record<string, unknown>;
}

function TicketForm({ summary, leadScore, leadData }: TicketFormProps) {
  const { t, language } = useTranslation();
  const isMobile = useMobile();
  const { chatMessages, ticketSubmitted, setTicketSubmitted } = useBackgroundContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(ticketSubmitted);
  const [error, setError] = useState(false);

  const isValid = name.trim().length > 0 && email.includes('@') && email.includes('.');

  const handleSubmit = useCallback(async () => {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);
    setError(false);

    try {
      const response = await fetch('/api/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          summary,
          lead_score: leadScore,
          lead_data: leadData,
          chat_history: chatMessages.slice(-10).map(m => ({ role: m.role, content: m.content })),
          language,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTicketSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [name, email, summary, leadScore, leadData, chatMessages, language, isValid, isSubmitting, setTicketSubmitted]);

  // Success state — stays visible permanently
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={quickSpring}
        className="rounded-[20px] p-5"
        style={{
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(74, 222, 128, 0.3)',
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle size={20} color="#4ade80" />
          <span style={{
            fontWeight: 600,
            color: '#1d1d1f',
            fontSize: '15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
          }}>
            {t.ticket.successTitle}
          </span>
        </div>
        <p style={{
          fontSize: '14px',
          color: '#1d1d1f',
          opacity: 0.7,
          lineHeight: 1.5,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
          margin: 0,
        }}>
          {t.ticket.successMessage}
        </p>
        <p style={{
          fontSize: '13px',
          color: '#1d1d1f',
          opacity: 0.45,
          lineHeight: 1.4,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
          marginTop: '8px',
          marginBottom: 0,
        }}>
          {t.ticket.successContinue}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={quickSpring}
      className="rounded-[20px] overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.55)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="p-5">
        {/* Title */}
        <p style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#1d1d1f',
          marginBottom: '4px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
        }}>
          {t.ticket.formTitle}
        </p>
        <p style={{
          fontSize: '13px',
          color: '#1d1d1f',
          opacity: 0.6,
          marginBottom: '16px',
          lineHeight: 1.4,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
        }}>
          {t.ticket.formSubtitle}
        </p>

        {/* Name field */}
        <div className="mb-3">
          <label style={{
            fontSize: '12px',
            fontWeight: 500,
            color: '#1d1d1f',
            opacity: 0.5,
            display: 'block',
            marginBottom: '4px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}>
            {t.ticket.nameLabel}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.ticket.namePlaceholder}
            className="w-full focus:outline-none"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '12px',
              padding: isMobile ? '10px 14px' : '8px 12px',
              fontSize: isMobile ? '16px' : '14px',
              color: '#1d1d1f',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
            }}
          />
        </div>

        {/* Email field */}
        <div className="mb-4">
          <label style={{
            fontSize: '12px',
            fontWeight: 500,
            color: '#1d1d1f',
            opacity: 0.5,
            display: 'block',
            marginBottom: '4px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}>
            {t.ticket.emailLabel}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.ticket.emailPlaceholder}
            className="w-full focus:outline-none"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '12px',
              padding: isMobile ? '10px 14px' : '8px 12px',
              fontSize: isMobile ? '16px' : '14px',
              color: '#1d1d1f',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
            }}
          />
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                fontSize: '13px',
                color: '#ef4444',
                marginBottom: '12px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              }}
            >
              {t.ticket.errorMessage}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Submit button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          whileHover={isValid && !isSubmitting ? { scale: 1.02 } : {}}
          whileTap={isValid && !isSubmitting ? { scale: 0.98 } : {}}
          className="w-full flex items-center justify-center gap-2"
          style={{
            background: isValid
              ? 'linear-gradient(135deg, #34150F 0%, #52241A 50%, #34150F 100%)'
              : 'rgba(52, 21, 15, 0.15)',
            color: isValid ? '#FDFCFA' : 'rgba(52, 21, 15, 0.4)',
            border: 'none',
            borderRadius: '14px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: isValid && !isSubmitting ? 'pointer' : 'default',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
            boxShadow: isValid ? '0 4px 12px rgba(52, 21, 15, 0.3)' : 'none',
          }}
        >
          <Send size={16} />
          {isSubmitting ? t.ticket.submitting : t.ticket.submitButton}
        </motion.button>

        {/* Privacy note */}
        <p style={{
          fontSize: '11px',
          color: '#1d1d1f',
          opacity: 0.35,
          textAlign: 'center',
          marginTop: '10px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}>
          {t.ticket.privacyNote}
        </p>
      </div>
    </motion.div>
  );
}

export default memo(TicketForm);
