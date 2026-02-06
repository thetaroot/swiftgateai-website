'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BrutalistTextBlockProps {
  isVisible?: boolean;
}

function BrutalistTextBlock({ isVisible = true }: BrutalistTextBlockProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
      style={{
        maxWidth: '380px',
      }}
    >
      {/* Bracket corners */}
      <div className="relative">
        <span
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: 'clamp(12px, 1.5vw, 16px)',
            color: '#34150F',
            position: 'absolute',
            top: '-8px',
            left: '-8px',
          }}
        >
          [
        </span>
        <span
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: 'clamp(12px, 1.5vw, 16px)',
            color: '#34150F',
            position: 'absolute',
            bottom: '-8px',
            right: '-8px',
          }}
        >
          ]
        </span>

        {/* Text content - justified to look boxed */}
        <p
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: 'clamp(11px, 1.3vw, 14px)',
            lineHeight: 1.7,
            color: '#34150F',
            margin: 0,
            padding: '12px 16px',
            textAlign: 'justify',
            hyphens: 'auto',
          }}
        >
          Swiftgate entwickelt massgeschneiderte KI-Loesungen
          fuer moderne Unternehmen. Wir automatisieren Ihre
          Geschaeftsprozesse mit intelligenten Workflows und
          schaffen individuelle Systeme, die Ihr Business
          skalierbar machen. Von der Beratung bis zur
          vollstaendigen Integration - wir sind Ihr Partner
          fuer digitale Transformation durch kuenstliche
          Intelligenz.
        </p>
      </div>

      {/* Bottom tag */}
      <motion.div
        className="mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <span
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: 'clamp(10px, 1.2vw, 13px)',
            color: 'rgba(52, 21, 15, 0.6)',
            letterSpacing: '0.1em',
          }}
        >
          [ ESSEN, DEUTSCHLAND ]
        </span>
      </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(BrutalistTextBlock);
