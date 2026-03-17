'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

function BrutalistLogo() {
  return (
    <motion.div
      className="select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <span
        style={{
          fontFamily: '"Courier New", monospace',
          fontSize: 'clamp(14px, 1.8vw, 18px)',
          fontWeight: 400,
          color: '#34150F',
          letterSpacing: '0.05em',
        }}
      >
        [ SWIFTGATEAI ]
      </span>
    </motion.div>
  );
}

export default memo(BrutalistLogo);
