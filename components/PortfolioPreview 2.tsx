'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import PortfolioModal from './PortfolioModal';
import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';

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

// Cards data
const CARDS = [
  { id: 0, title: 'AI Workflow 1', tech: 'n8n' },
  { id: 1, title: 'AI Workflow 2', tech: 'OpenAI' },
  { id: 2, title: 'AI Workflow 3', tech: 'Supabase' },
] as const;

// Duplicate cards to ensure seamless loop
// We need enough copies to fill the screen width + buffer for smooth looping
const MARQUEE_CARDS = [...CARDS, ...CARDS, ...CARDS, ...CARDS];

function PortfolioPreview() {
  const [isModalOpen] = useState(false); // === DISABLED FOR BASIS LAUNCH ===
  const { t } = useTranslation();
  const isMobile = useMobile();

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        minHeight: isMobile ? 'auto' : '100vh',
        width: '100%',
        padding: isMobile ? '60px 0 40px' : '100px 0',
      }}
    >
      {/* === DISABLED OVERLAY FOR BASIS LAUNCH === */}
      <div
        className="absolute inset-0 z-20"
        style={{ pointerEvents: 'all' }}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
      />      {/* Content Container */}
      <div className={`relative z-10 text-center max-w-3xl ${isMobile ? 'px-5 mb-10' : 'px-6 mb-16'}`} style={{ opacity: 0.3, filter: 'grayscale(60%)' }}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
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
          {t.portfolio.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...smoothSpring, delay: 0.2 }}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif',
            color: 'rgba(234, 206, 170, 0.7)',
            lineHeight: '1.6',
            fontWeight: 400,
          }}
        >
          {t.portfolio.subtitle}
        </motion.p>
      </div>

      {/* Infinite Marquee Carousel */}
      <div className={`w-full overflow-hidden ${isMobile ? 'mb-10' : 'mb-16'} relative`} style={{ opacity: 0.3, filter: 'grayscale(60%)', pointerEvents: 'none' }}>

        {/* Gradient Masks for fade effect */}
        <div className={`absolute left-0 top-0 bottom-0 ${isMobile ? 'w-16' : 'w-32'} z-10 bg-gradient-to-r from-black to-transparent pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 ${isMobile ? 'w-16' : 'w-32'} z-10 bg-gradient-to-l from-black to-transparent pointer-events-none`} />

        <motion.div
          className={`flex ${isMobile ? 'gap-4' : 'gap-6'} w-max`}
          animate={{
            x: ["0%", "-25%"], // Move by 25% (since we quadrupled the list, 25% is one full set)
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20, // Adjust speed here
              ease: "linear",
            },
          }}
        >
          {MARQUEE_CARDS.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="flex-shrink-0 p-5 rounded-2xl cursor-pointer hover:brightness-110 transition-all"
              style={{
                width: isMobile ? '200px' : '260px',
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
                  height: isMobile ? '90px' : '120px',
                  background: 'linear-gradient(135deg, rgba(234, 206, 170, 0.08) 0%, rgba(234, 206, 170, 0.04) 100%)',
                  border: '1px solid rgba(234, 206, 170, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'rgba(234, 206, 170, 0.35)',
                  letterSpacing: '0.1em',
                }}
              >
                FLOW
              </div>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: 'rgba(234, 206, 170, 0.9)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                }}
              >
                {card.title}
              </h3>

              <div
                className="inline-block px-3 py-1 rounded-lg"
                style={{
                  background: 'rgba(211, 153, 88, 0.2)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'rgba(234, 206, 170, 0.7)',
                  letterSpacing: '0.05em',
                }}
              >
                {card.tech}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA Button — DISABLED */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ ...smoothSpring, delay: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.button
          disabled
          tabIndex={-1}
          className="group relative"
          style={{
            padding: isMobile ? '14px 28px' : '18px 40px',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: 600,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            color: 'rgba(21, 12, 12, 0.3)',
            background: 'linear-gradient(135deg, rgba(234, 206, 170, 0.3) 0%, rgba(211, 152, 88, 0.3) 100%)',
            border: 'none',
            borderRadius: '16px',
            cursor: 'default',
            pointerEvents: 'none',
            boxShadow: 'none',
            letterSpacing: '-0.01em',
            filter: 'grayscale(60%)',
            opacity: 0.35,
          }}
        >
          <span className="relative flex items-center gap-2">
            {t.portfolio.cta}
          </span>
        </motion.button>

        {/* Coming Soon Badge */}
        <span
          style={{
            fontSize: '11px',
            color: 'rgba(234, 206, 170, 0.5)',
            fontFamily: '"Courier New", monospace',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '6px 14px',
            border: '1px solid rgba(234, 206, 170, 0.2)',
            borderRadius: '8px',
            background: 'rgba(234, 206, 170, 0.05)',
          }}
        >
          [ COMING SOON ]
        </span>
      </motion.div>

      <PortfolioModal isOpen={isModalOpen} onClose={() => { /* disabled for basis launch */ }} />
    </section>
  );
}

export default memo(PortfolioPreview);
