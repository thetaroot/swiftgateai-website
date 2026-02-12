'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';

interface BrutalistTextBlockProps {
  isVisible?: boolean;
}

function BrutalistTextBlock({ isVisible = true }: BrutalistTextBlockProps) {
  const { t } = useTranslation();
  const isMobile = useMobile();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="select-text cursor-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: isMobile ? 'min(calc(100vw - 48px), 340px)' : '380px',
          }}
        >
          {/* Bracket corners — desktop only */}
          <div className="relative">
            {!isMobile && (
              <>
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
              </>
            )}

            {/* Text content */}
            <p
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: isMobile ? '12px' : 'clamp(11px, 1.3vw, 14px)',
                lineHeight: 1.7,
                color: '#34150F',
                margin: 0,
                padding: isMobile ? '0 4px' : '12px 16px',
                textAlign: isMobile ? 'center' : 'justify',
                hyphens: 'auto',
              }}
            >
              {t.hero.textBlock}
            </p>
          </div>

          {/* Bottom tag */}
          <motion.div
            className={isMobile ? 'mt-3 text-center' : 'mt-3'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: isMobile ? '10px' : 'clamp(10px, 1.2vw, 13px)',
                color: 'rgba(52, 21, 15, 0.5)',
                letterSpacing: '0.1em',
              }}
            >
              {t.hero.location}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(BrutalistTextBlock);
