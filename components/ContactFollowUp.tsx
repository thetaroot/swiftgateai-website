'use client';

import { useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';
import { useSettings } from '@/context/SettingsContext';

const quickSpring = { type: "spring" as const, stiffness: 300, damping: 30 };

interface ContactFollowUpProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

function ContactFollowUp({ isOpen, onClose, email }: ContactFollowUpProps) {
  const { t } = useTranslation();
  const { language } = useSettings();
  const isMobile = useMobile();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [isGenerating, setIsGenerating] = useState(false);

  const totalSteps = 3;

  const handleTextChange = useCallback((value: string) => {
    setAnswers(prev => {
      const next = [...prev];
      next[step] = value;
      return next;
    });
  }, [step]);

  const handleNext = useCallback(() => {
    if (step < totalSteps - 1) {
      setStep(s => s + 1);
    }
  }, [step]);

  const handleUrgencySelect = useCallback((value: string) => {
    setAnswers(prev => {
      const next = [...prev];
      next[2] = value;
      return next;
    });
  }, []);

  const handleGenerate = useCallback(async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      // Build synthetic chat history from answers (language-aware labels)
      const lblCompany = language === 'EN' ? 'Company' : 'Unternehmen';
      const lblUrgency = language === 'EN' ? 'Urgency' : 'Dringlichkeit';
      const lblNA = language === 'EN' ? 'Not specified' : 'Nicht angegeben';
      const syntheticHistory = [
        { role: 'user' as const, content: answers[0] || '' },
        { role: 'model' as const, content: '.' },
        { role: 'user' as const, content: `${lblCompany}: ${answers[1] || lblNA}` },
        { role: 'model' as const, content: '.' },
        { role: 'user' as const, content: `${lblUrgency}: ${answers[2] || lblNA}` },
      ];

      const response = await fetch('/api/mail-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: syntheticHistory,
          language,
        }),
      });

      if (!response.ok) {
        setIsGenerating(false);
        return;
      }

      const data = await response.json() as Record<string, unknown>;
      const subject = typeof data.subject === 'string' ? data.subject : '';
      const body = typeof data.body === 'string' ? data.body : '';

      if (!subject || !body) {
        setIsGenerating(false);
        return;
      }

      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(body);
      const mailtoUri = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

      if (mailtoUri.length > 2000) {
        await navigator.clipboard.writeText(body).catch(() => {});
        const fallbackBody = encodeURIComponent(
          language === 'EN' ? 'Please paste the copied text.' : 'Bitte fuegen Sie den kopierten Text ein.'
        );
        window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${fallbackBody}`;
      } else {
        window.location.href = mailtoUri;
      }

      onClose();
    } catch {
      // Silent failure
    } finally {
      setIsGenerating(false);
    }
  }, [answers, email, language, isGenerating, onClose]);

  const handleClose = useCallback(() => {
    setStep(0);
    setAnswers(['', '', '']);
    onClose();
  }, [onClose]);

  const canProceed = step < 2 ? answers[step].trim().length > 0 : answers[2].length > 0;

  const urgencyOptions = [
    { value: 'soon', label: t.followUp.q3optSoon },
    { value: 'quarter', label: t.followUp.q3optQuarter },
    { value: 'exploring', label: t.followUp.q3optExploring },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9998]"
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none" style={{ padding: '24px' }}>
            <motion.div
              className="pointer-events-auto relative w-full overflow-hidden"
              style={{
                maxWidth: '480px',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                borderRadius: '28px',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={quickSpring}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-2">
                <h3 style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1d1d1f',
                }}>
                  {t.followUp.title}
                </h3>
                <motion.button
                  onClick={handleClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.05)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={16} color="#1d1d1f" />
                </motion.button>
              </div>

              {/* Content Area */}
              <div className="px-6 pb-2" style={{ minHeight: '200px' }}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Project need */}
                  {step === 0 && (
                    <motion.div
                      key="step-0"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label style={{
                        display: 'block',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#1d1d1f',
                        marginBottom: '12px',
                        lineHeight: 1.5,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
                      }}>
                        {t.followUp.q1}
                      </label>
                      <textarea
                        value={answers[0]}
                        onChange={(e) => handleTextChange(e.target.value)}
                        rows={3}
                        className="w-full resize-none focus:outline-none"
                        style={{
                          background: 'rgba(255, 255, 255, 0.6)',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          borderRadius: '14px',
                          padding: isMobile ? '12px 16px' : '10px 14px',
                          fontSize: isMobile ? '16px' : '15px',
                          color: '#1d1d1f',
                          lineHeight: 1.5,
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
                        }}
                        autoFocus
                      />
                    </motion.div>
                  )}

                  {/* Step 2: Company */}
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label style={{
                        display: 'block',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#1d1d1f',
                        marginBottom: '12px',
                        lineHeight: 1.5,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
                      }}>
                        {t.followUp.q2}
                      </label>
                      <input
                        type="text"
                        value={answers[1]}
                        onChange={(e) => handleTextChange(e.target.value)}
                        className="w-full focus:outline-none"
                        style={{
                          background: 'rgba(255, 255, 255, 0.6)',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          borderRadius: '14px',
                          padding: isMobile ? '12px 16px' : '10px 14px',
                          fontSize: isMobile ? '16px' : '15px',
                          color: '#1d1d1f',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
                        }}
                        autoFocus
                      />
                    </motion.div>
                  )}

                  {/* Step 3: Urgency */}
                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label style={{
                        display: 'block',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#1d1d1f',
                        marginBottom: '16px',
                        lineHeight: 1.5,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
                      }}>
                        {t.followUp.q3}
                      </label>
                      <div className="flex flex-col gap-2">
                        {urgencyOptions.map((opt) => (
                          <motion.button
                            key={opt.value}
                            onClick={() => handleUrgencySelect(opt.value)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full text-left"
                            style={{
                              background: answers[2] === opt.value
                                ? 'linear-gradient(135deg, #34150F 0%, #52241A 50%, #34150F 100%)'
                                : 'rgba(255, 255, 255, 0.6)',
                              color: answers[2] === opt.value ? '#FDFCFA' : '#1d1d1f',
                              border: answers[2] === opt.value
                                ? '1px solid rgba(211, 152, 88, 0.4)'
                                : '1px solid rgba(0, 0, 0, 0.08)',
                              borderRadius: '14px',
                              padding: '12px 16px',
                              fontSize: '15px',
                              fontWeight: 500,
                              cursor: 'pointer',
                              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
                            }}
                          >
                            {opt.label}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer: Dots + Button */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                {/* Step dots */}
                <div className="flex gap-2">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: i === step
                          ? 'linear-gradient(135deg, #D39858, #85431E)'
                          : i < step ? '#D39858' : 'rgba(0,0,0,0.12)',
                        transition: 'background 0.2s',
                      }}
                    />
                  ))}
                </div>

                {/* Action button */}
                {step < totalSteps - 1 ? (
                  <motion.button
                    onClick={handleNext}
                    disabled={!canProceed}
                    whileHover={canProceed ? { scale: 1.02 } : {}}
                    whileTap={canProceed ? { scale: 0.98 } : {}}
                    className="flex items-center gap-2"
                    style={{
                      background: canProceed
                        ? 'linear-gradient(135deg, #34150F 0%, #52241A 50%, #34150F 100%)'
                        : 'rgba(52, 21, 15, 0.15)',
                      color: canProceed ? '#FDFCFA' : 'rgba(52, 21, 15, 0.4)',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '10px 20px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: canProceed ? 'pointer' : 'default',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
                      boxShadow: canProceed ? '0 4px 12px rgba(52, 21, 15, 0.3)' : 'none',
                    }}
                  >
                    {t.followUp.nextButton}
                    <ArrowRight size={16} />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleGenerate}
                    disabled={!canProceed || isGenerating}
                    whileHover={canProceed && !isGenerating ? { scale: 1.02 } : {}}
                    whileTap={canProceed && !isGenerating ? { scale: 0.98 } : {}}
                    className="flex items-center gap-2"
                    style={{
                      background: canProceed
                        ? 'linear-gradient(135deg, #34150F 0%, #52241A 50%, #34150F 100%)'
                        : 'rgba(52, 21, 15, 0.15)',
                      color: canProceed ? '#FDFCFA' : 'rgba(52, 21, 15, 0.4)',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '10px 20px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: canProceed && !isGenerating ? 'pointer' : 'default',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
                      boxShadow: canProceed ? '0 4px 12px rgba(52, 21, 15, 0.3)' : 'none',
                    }}
                  >
                    <Sparkles size={16} />
                    {isGenerating ? '...' : t.followUp.generateButton}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default memo(ContactFollowUp);
