'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

interface BrutalistNavProps {
  isVertical?: boolean;
}

function BrutalistNav({ isVertical = false }: BrutalistNavProps) {
  const links = ['SERVICES', 'PORTFOLIO', 'KONTAKT'];

  if (isVertical) {
    // Vertical mode: Stack letters vertically
    return (
      <motion.nav
        className="flex flex-col gap-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
      >
        {links.map((link, linkIndex) => (
          <motion.button
            key={link}
            className="cursor-pointer hover:opacity-60 transition-opacity flex flex-col items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: linkIndex * 0.1 }}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
            }}
          >
            {/* Opening bracket - rotated 90deg */}
            <span
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: 'clamp(11px, 1.4vw, 14px)',
                fontWeight: 400,
                color: '#34150F',
                letterSpacing: '0.05em',
                lineHeight: 1.2,
                display: 'inline-block',
                transform: 'rotate(90deg)',
                transformOrigin: 'center center',
                paddingLeft: '2px',
              }}
            >
              [
            </span>

            {/* Letters stacked vertically */}
            {link.split('').map((letter, letterIndex) => (
              <span
                key={letterIndex}
                style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: 'clamp(11px, 1.4vw, 14px)',
                  fontWeight: 400,
                  color: '#34150F',
                  letterSpacing: '0.05em',
                  lineHeight: 1.2,
                  paddingLeft: '2px',
                }}
              >
                {letter}
              </span>
            ))}

            {/* Closing bracket - rotated 90deg */}
            <span
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: 'clamp(11px, 1.4vw, 14px)',
                fontWeight: 400,
                color: '#34150F',
                letterSpacing: '0.05em',
                lineHeight: 1.2,
                display: 'inline-block',
                transform: 'rotate(90deg)',
                transformOrigin: 'center center',
                paddingLeft: '2px',
              }}
            >
              ]
            </span>
          </motion.button>
        ))}
      </motion.nav>
    );
  }

  // Horizontal mode: Normal layout
  return (
    <motion.nav
      className="flex items-center gap-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {links.map((link, index) => (
        <motion.button
          key={link}
          className="cursor-pointer hover:opacity-60 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: 'clamp(12px, 1.5vw, 16px)',
            fontWeight: 400,
            color: '#34150F',
            letterSpacing: '0.05em',
            background: 'none',
            border: 'none',
            padding: 0,
          }}
        >
          [ {link} ]
        </motion.button>
      ))}
    </motion.nav>
  );
}

export default memo(BrutalistNav);
