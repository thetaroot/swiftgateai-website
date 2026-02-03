'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface PortfolioPreviewProps {
  isVisible?: boolean;
}

export default function PortfolioPreview({ isVisible = true }: PortfolioPreviewProps) {
  // Simplified cards - keine komplexen Animationen mehr
  const cards = [
    { id: 0, title: 'AI Workflow 1', tech: 'n8n' },
    { id: 1, title: 'AI Workflow 2', tech: 'OpenAI' },
    { id: 2, title: 'AI Workflow 3', tech: 'Supabase' },
  ];

  return (
    <section
      className="relative flex items-center justify-center"
      style={{
        height: '100vh',
        width: '100vw',
        // KEIN Background - AnimatedBackground macht das global
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 700,
            fontFamily: 'Space Grotesk, sans-serif',
            color: '#EACEAA', // Champagne
            marginBottom: '16px',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
          }}
        >
          Intelligente Automationen
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontFamily: 'Space Grotesk, sans-serif',
            color: 'rgba(234, 206, 170, 0.75)', // Champagne transparent
            marginBottom: '48px',
            lineHeight: '1.6',
          }}
        >
          Entdecken Sie, wie wir n8n und AI kombinieren, um komplexe
          <br />
          Workflows zu automatisieren und Ihr Business zu skalieren.
        </motion.p>

        {/* Preview Cards - Simple Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.6 + index * 0.1,
              }}
              className="p-4 rounded-xl"
              style={{
                width: '180px',
                background: 'rgba(234, 206, 170, 0.08)', // Champagne sehr subtle
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(234, 206, 170, 0.15)',
              }}
            >
              {/* Placeholder */}
              <div
                className="mb-3 rounded-lg"
                style={{
                  height: '80px',
                  background: 'rgba(234, 206, 170, 0.06)',
                  border: '1px solid rgba(234, 206, 170, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'rgba(234, 206, 170, 0.4)',
                  letterSpacing: '0.05em',
                }}
              >
                FLOW
              </div>

              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '4px',
                  color: 'rgba(234, 206, 170, 0.9)',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                {card.title}
              </h3>

              <div
                className="inline-block px-2 py-0.5 rounded"
                style={{
                  background: 'rgba(211, 153, 88, 0.2)', // Whiskey
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'rgba(234, 206, 170, 0.7)',
                  letterSpacing: '0.03em',
                }}
              >
                {card.tech}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        >
          <Link href="/portfolio">
            <motion.button
              className="group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '16px 36px',
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: 'Space Grotesk, sans-serif',
                color: '#150C0C', // Balsamico
                background: 'linear-gradient(135deg, #EACEAA 0%, #D39858 100%)',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              }}
            >
              <span className="flex items-center gap-2">
                Portfolio ansehen
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
