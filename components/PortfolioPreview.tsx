'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PortfolioPreviewProps {
  isVisible?: boolean;
}

// Apple-like spring config
const smoothSpring = {
  type: "spring" as const,
  stiffness: 150,
  damping: 25,
  mass: 1,
};

const quickSpring = {
  type: "spring" as const,
  stiffness: 250,
  damping: 30,
  mass: 0.8,
};

// Cards data - outside component
const CARDS = [
  { id: 0, title: 'AI Workflow 1', tech: 'n8n' },
  { id: 1, title: 'AI Workflow 2', tech: 'OpenAI' },
  { id: 2, title: 'AI Workflow 3', tech: 'Supabase' },
] as const;

function PortfolioPreview({ isVisible = true }: PortfolioPreviewProps) {

  return (
    <section
      className="relative flex items-center justify-center"
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ ...smoothSpring, delay: 0.1 }}
          style={{
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 600,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Space Grotesk", sans-serif',
            color: '#EACEAA',
            marginBottom: '16px',
            letterSpacing: '-0.03em',
            lineHeight: '1.1',
          }}
        >
          Intelligente Automationen
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ ...smoothSpring, delay: 0.2 }}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
            color: 'rgba(234, 206, 170, 0.7)',
            marginBottom: '48px',
            lineHeight: '1.6',
            fontWeight: 400,
          }}
        >
          Entdecken Sie, wie wir n8n und AI kombinieren, um komplexe
          <br />
          Workflows zu automatisieren und Ihr Business zu skalieren.
        </motion.p>

        {/* Preview Cards - Glass Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ ...smoothSpring, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-5 mb-12"
        >
          {CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
              transition={{
                ...smoothSpring,
                delay: 0.4 + index * 0.1,
              }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="p-5 rounded-2xl cursor-pointer"
              style={{
                width: '180px',
                background: 'linear-gradient(135deg, rgba(234, 206, 170, 0.12) 0%, rgba(234, 206, 170, 0.06) 100%)',
                backdropFilter: 'blur(20px) saturate(150%)',
                WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid rgba(234, 206, 170, 0.15)',
                boxShadow: `
                  0 0 0 1px rgba(234, 206, 170, 0.08) inset,
                  0 4px 16px rgba(0, 0, 0, 0.2),
                  0 8px 32px rgba(0, 0, 0, 0.15)
                `,
              }}
            >
              {/* Placeholder */}
              <div
                className="mb-4 rounded-xl"
                style={{
                  height: '80px',
                  background: 'linear-gradient(135deg, rgba(234, 206, 170, 0.08) 0%, rgba(234, 206, 170, 0.04) 100%)',
                  border: '1px solid rgba(234, 206, 170, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'rgba(234, 206, 170, 0.35)',
                  letterSpacing: '0.1em',
                }}
              >
                FLOW
              </div>

              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '6px',
                  color: 'rgba(234, 206, 170, 0.9)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                }}
              >
                {card.title}
              </h3>

              <div
                className="inline-block px-2.5 py-1 rounded-lg"
                style={{
                  background: 'rgba(211, 153, 88, 0.2)',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'rgba(234, 206, 170, 0.7)',
                  letterSpacing: '0.05em',
                }}
              >
                {card.tech}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button - Apple Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ ...smoothSpring, delay: 0.6 }}
        >
          <Link href="/portfolio">
            <motion.button
              className="group relative"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={quickSpring}
              style={{
                padding: '18px 40px',
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                color: '#150C0C',
                background: 'linear-gradient(135deg, #EACEAA 0%, #D39858 100%)',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.2) inset,
                  0 4px 16px rgba(0, 0, 0, 0.25),
                  0 8px 32px rgba(0, 0, 0, 0.2)
                `,
                letterSpacing: '-0.01em',
              }}
            >
              {/* Button highlight */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
                }}
              />
              <span className="relative flex items-center gap-2">
                Portfolio ansehen
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={quickSpring}
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(PortfolioPreview);
