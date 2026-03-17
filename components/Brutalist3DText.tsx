'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

interface Brutalist3DTextProps {
  isVisible?: boolean;
}

function Brutalist3DText({ isVisible = true }: Brutalist3DTextProps) {
  const words = ['BUSINESS', 'AI', 'INDIVIDUALISIERT'];

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 8, // Between background (0-5) and foreground (10+)
        perspective: '1200px',
        overflow: 'visible',
      }}
    >
      <motion.div
        className="absolute"
        style={{
          top: '20%',
          left: '5%',
          right: '5%',
          transform: 'rotate(-15deg)',
        }}
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -100,
        }}
        transition={{
          duration: 1.2,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {words.map((word, index) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : -50,
            }}
            transition={{
              duration: 0.8,
              delay: 0.7 + index * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              marginBottom: index === words.length - 1 ? '0' : 'clamp(-30px, -3vw, -15px)',
              marginLeft: `${index * 5}%`,
            }}
          >
            <h2
              className="select-none"
              style={{
                fontFamily: 'var(--font-bebas-neue), "Arial Black", Impact, sans-serif',
                fontSize: 'clamp(70px, 14vw, 180px)',
                fontWeight: 900,
                letterSpacing: '0.02em',
                lineHeight: 0.9,
                color: 'rgba(52, 21, 15, 0.18)',
                textTransform: 'uppercase',
                transform: 'rotateX(12deg) rotateY(-3deg)',
                transformStyle: 'preserve-3d',
                textShadow: `
                  1px 1px 0px rgba(52, 21, 15, 0.15),
                  2px 2px 0px rgba(52, 21, 15, 0.14),
                  3px 3px 0px rgba(52, 21, 15, 0.13),
                  4px 4px 0px rgba(52, 21, 15, 0.12),
                  5px 5px 0px rgba(52, 21, 15, 0.11),
                  6px 6px 0px rgba(52, 21, 15, 0.10),
                  7px 7px 0px rgba(52, 21, 15, 0.09),
                  8px 8px 0px rgba(52, 21, 15, 0.08),
                  9px 9px 0px rgba(52, 21, 15, 0.07),
                  10px 10px 0px rgba(52, 21, 15, 0.06),
                  11px 11px 0px rgba(52, 21, 15, 0.05),
                  12px 12px 0px rgba(52, 21, 15, 0.04),
                  13px 13px 0px rgba(52, 21, 15, 0.03),
                  14px 14px 0px rgba(52, 21, 15, 0.02),
                  15px 15px 20px rgba(52, 21, 15, 0.25)
                `,
                WebkitTextStroke: '0.5px rgba(52, 21, 15, 0.08)',
              }}
            >
              {word}
            </h2>
          </motion.div>
        ))}
      </motion.div>

      {/* Grain overlay on text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.06,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}

export default memo(Brutalist3DText);
