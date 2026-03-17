'use client';

import { memo } from 'react';
import { useBackgroundContext } from '@/context/BackgroundContext';

function AnimatedBackground() {
  const { colors } = useBackgroundContext();

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: `radial-gradient(ellipse at 30% 20%, ${colors.primary}40 0%, transparent 50%),
                       radial-gradient(ellipse at 70% 80%, ${colors.secondary}40 0%, transparent 50%),
                       ${colors.background}`,
          transition: 'background 0.5s ease-out',
        }}
        aria-hidden="true"
      />

      {/* Sand grain texture - single optimized layer */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' seed='5'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          opacity: 0.22,
          mixBlendMode: 'multiply',
        }}
        aria-hidden="true"
      />
    </>
  );
}

export default memo(AnimatedBackground);
