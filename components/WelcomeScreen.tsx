'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

interface WelcomeScreenProps {
  onComplete: () => void;
}

// Check if this is the first visit (not just a refresh)
const isFirstVisit = (): boolean => {
  if (typeof window === 'undefined') return false;

  const hasSeenIntro = sessionStorage.getItem('swiftgate-intro-seen');
  const isNewSession = !sessionStorage.getItem('swiftgate-session');

  sessionStorage.setItem('swiftgate-session', 'true');

  if (hasSeenIntro) return false;
  return isNewSession;
};

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [phase, setPhase] = useState<'loading' | 'logo' | 'exit' | 'done'>('loading');
  const [shouldShow, setShouldShow] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const show = isFirstVisit();
    setShouldShow(show);

    if (!show) {
      onComplete();
      return;
    }

    sessionStorage.setItem('swiftgate-intro-seen', 'true');

    // Loading animation
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    // Phase timing: Loading -> Logo -> Exit -> Done
    const logoTimer = setTimeout(() => setPhase('logo'), 1200);
    const exitTimer = setTimeout(() => setPhase('exit'), 4500);
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 5500);

    return () => {
      clearInterval(loadingInterval);
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    setPhase('done');
    onComplete();
  }, [onComplete]);

  if (!shouldShow || phase === 'done') return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden cursor-pointer"
      style={{
        zIndex: 9999,
        background: 'linear-gradient(135deg, #EACEAA 0%, #E5D4B8 50%, #DCC9A3 100%)',
      }}
      onClick={handleSkip}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Animated Grain Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.08,
          mixBlendMode: 'multiply',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
      />

      {/* Vertical Lines - Brutalist Element */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              left: `${(i + 1) * 8}%`,
              width: '1px',
              background: 'rgba(52, 21, 15, 0.04)',
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase !== 'loading' ? 1 : 0 }}
            transition={{
              duration: 0.8,
              delay: i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl px-8">
        <AnimatePresence mode="wait">
          {/* Phase 1: Loading */}
          {phase === 'loading' && (
            <motion.div
              key="loading"
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Loading Bar */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: '120px',
                  height: '3px',
                  background: 'rgba(52, 21, 15, 0.1)',
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    background: '#34150F',
                    originX: 0,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: Math.min(loadingProgress / 100, 1) }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Loading Text */}
              <motion.span
                className="mt-4"
                style={{
                  fontFamily: 'var(--font-bebas-neue), "Arial Black", sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.3em',
                  color: 'rgba(52, 21, 15, 0.4)',
                }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {t.welcome.loading}
              </motion.span>
            </motion.div>
          )}

          {/* Phase 2: Logo - Full Brutalist */}
          {phase === 'logo' && (
            <motion.div
              key="logo"
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Top Line */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ width: '60px', height: '2px', background: '#34150F' }} />
              </motion.div>

              {/* Main Logo */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: 'var(--font-bebas-neue), "Arial Black", Impact, sans-serif',
                    fontSize: 'clamp(60px, 15vw, 180px)',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    color: '#34150F',
                    lineHeight: 0.85,
                    textTransform: 'uppercase',
                  }}
                >
                  SWIFT
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: 'var(--font-bebas-neue), "Arial Black", Impact, sans-serif',
                    fontSize: 'clamp(60px, 15vw, 180px)',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    color: '#34150F',
                    lineHeight: 0.85,
                    textTransform: 'uppercase',
                    marginLeft: typeof window !== 'undefined' && window.innerWidth < 768 ? '8%' : '15%',
                  }}
                >
                  GATE
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: 'var(--font-bebas-neue), "Arial Black", Impact, sans-serif',
                    fontSize: 'clamp(60px, 15vw, 180px)',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    color: '#D39858',
                    lineHeight: 0.85,
                    textTransform: 'uppercase',
                    marginLeft: '-10%',
                  }}
                >
                  AI
                </motion.h1>
              </div>

              {/* Bottom Line */}
              <motion.div
                className="flex justify-center mt-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ width: '60px', height: '2px', background: '#34150F' }} />
              </motion.div>

              {/* Decorative Corner Elements */}
              <motion.div
                className="absolute top-4 left-4 md:top-8 md:left-8"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{
                  width: '30px',
                  height: '30px',
                  borderTop: '2px solid #34150F',
                  borderLeft: '2px solid #34150F',
                }}
              />
              <motion.div
                className="absolute bottom-4 right-4 md:bottom-8 md:right-8"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                style={{
                  width: '30px',
                  height: '30px',
                  borderBottom: '2px solid #34150F',
                  borderRight: '2px solid #34150F',
                }}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Skip Hint */}
      <motion.p
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase !== 'loading' ? 0.3 : 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          fontFamily: 'var(--font-bebas-neue), sans-serif',
          fontSize: '11px',
          color: '#34150F',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}
      >
        {t.welcome.skip}
      </motion.p>

      {/* Exit Transition Overlay */}
      <AnimatePresence>
        {phase === 'exit' && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'radial-gradient(circle at center, rgba(234, 206, 170, 0) 0%, #EACEAA 70%)',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
