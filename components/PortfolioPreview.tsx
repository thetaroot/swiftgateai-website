'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PortfolioPreview() {
  // 10 Karten - VOLLE VIEWPORT-HÖHE
  // Negative Delays = Vorladen
  // Y-Position in VH: 5vh - 88vh (VOLLE TIEFE!)
  const cards = [
    { id: 0, title: 'AI Workflow 1', tech: 'n8n', delay: -8, yPosition: 5, duration: 22, zIndex: 1, opacity: 0.28 },
    { id: 1, title: 'AI Workflow 2', tech: 'OpenAI', delay: -5, yPosition: 14, duration: 28, zIndex: 2, opacity: 0.38 },
    { id: 2, title: 'AI Workflow 3', tech: 'Supabase', delay: -2, yPosition: 27, duration: 24, zIndex: 3, opacity: 0.48 },
    { id: 3, title: 'AI Workflow 4', tech: 'n8n', delay: 1, yPosition: 39, duration: 20, zIndex: 4, opacity: 0.58 },
    { id: 4, title: 'AI Workflow 5', tech: 'OpenAI', delay: 4, yPosition: 52, duration: 26, zIndex: 5, opacity: 0.68 },
    { id: 5, title: 'AI Workflow 6', tech: 'Supabase', delay: 7, yPosition: 64, duration: 23, zIndex: 6, opacity: 0.76 },
    { id: 6, title: 'AI Workflow 7', tech: 'n8n', delay: 10, yPosition: 75, duration: 25, zIndex: 7, opacity: 0.84 },
    { id: 7, title: 'AI Workflow 8', tech: 'OpenAI', delay: 13, yPosition: 82, duration: 21, zIndex: 8, opacity: 0.91 },
    { id: 8, title: 'AI Workflow 9', tech: 'Supabase', delay: 16, yPosition: 88, duration: 27, zIndex: 9, opacity: 0.96 },
    { id: 9, title: 'AI Workflow 10', tech: 'n8n', delay: 19, yPosition: 19, duration: 24, zIndex: 10, opacity: 1.0 },
  ];

  return (
    <section
      className="relative"
      style={{
        height: '100vh',
        background: '#182818',
        overflow: 'hidden', // Karten bleiben in der Section
        scrollSnapAlign: 'start', // Snap-Scrolling
      }}
    >
      {/* Flying Cards Layer - NUR in dieser Section */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          overflow: 'hidden', // Karten bleiben innerhalb
        }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="absolute will-change-transform"
            initial={{
              x: '-350px',
              top: `${card.yPosition}vh`, // VH statt %, direkt am Viewport
            }}
            animate={{
              x: 'calc(100vw + 50px)',
            }}
            transition={{
              duration: card.duration,
              repeat: Infinity,
              delay: card.delay,
              ease: 'linear',
            }}
            style={{
              width: '280px',
              zIndex: card.zIndex,
            }}
          >
            {/* Flat Card mit dynamischer Opacity */}
            <div
              className="p-5 rounded-xl"
              style={{
                background: `rgba(229, 225, 216, ${0.1 + card.opacity * 0.08})`,
                backdropFilter: 'blur(8px)',
                border: `1px solid rgba(255, 255, 255, ${0.1 + card.opacity * 0.1})`,
                boxShadow: `0 8px 32px rgba(0, 0, 0, ${0.15 + card.opacity * 0.1})`,
                opacity: card.opacity,
              }}
            >
              <div
                style={{
                  color: '#E5E1D8',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                {/* Placeholder Flow */}
                <div
                  className="mb-3 rounded-lg"
                  style={{
                    height: '120px',
                    background: 'rgba(229, 225, 216, 0.08)',
                    border: '1px solid rgba(229, 225, 216, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'rgba(229, 225, 216, 0.3)',
                    letterSpacing: '0.05em',
                  }}
                >
                  FLOW DIAGRAM
                </div>

                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    marginBottom: '6px',
                    color: 'rgba(229, 225, 216, 0.9)',
                  }}
                >
                  {card.title}
                </h3>

                <div
                  className="inline-block px-2 py-1 rounded-md"
                  style={{
                    background: 'rgba(229, 225, 216, 0.15)',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: 'rgba(229, 225, 216, 0.7)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {card.tech}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section - DARÜBER */}
      <div
        className="relative flex items-center justify-center px-6"
        style={{
          minHeight: '100vh',
          zIndex: 10,
        }}
      >
        <div className="text-center max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: '48px',
              fontWeight: 700,
              fontFamily: 'Space Grotesk, sans-serif',
              color: '#E5E1D8',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              position: 'relative',
              zIndex: 10,
            }}
          >
            Intelligente Automationen
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: '18px',
              fontFamily: 'Space Grotesk, sans-serif',
              color: 'rgba(229, 225, 216, 0.7)',
              marginBottom: '40px',
              lineHeight: '1.6',
              position: 'relative',
              zIndex: 10,
            }}
          >
            Entdecken Sie, wie wir n8n und AI kombinieren, um komplexe
            <br />
            Workflows zu automatisieren und Ihr Business zu skalieren.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <Link href="/portfolio">
              <motion.button
                className="group relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '18px 40px',
                  fontSize: '16px',
                  fontWeight: 600,
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: '#1a2e20',
                  background: 'rgba(229, 225, 216, 0.98)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Portfolio ansehen
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="group-hover:translate-x-1"
                    style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
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
      </div>
    </section>
  );
}
