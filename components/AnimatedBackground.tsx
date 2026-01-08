'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const grainCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const grainCanvas = grainCanvasRef.current;
    if (!grainCanvas) return;

    const grainCtx = grainCanvas.getContext('2d');
    if (!grainCtx) return;

    const setCanvasSize = () => {
      grainCanvas.width = window.innerWidth;
      grainCanvas.height = window.innerHeight;
      createGrain();
    };

    // Create static grain overlay
    const createGrain = () => {
      if (!grainCtx || !grainCanvas) return;

      const imageData = grainCtx.createImageData(grainCanvas.width, grainCanvas.height);
      const pixels = imageData.data;

      for (let i = 0; i < pixels.length; i += 4) {
        const noise = Math.random() * 255;
        const alpha = Math.random() * 0.8;

        pixels[i] = noise;
        pixels[i + 1] = noise;
        pixels[i + 2] = noise;
        pixels[i + 3] = alpha * 255;
      }

      grainCtx.putImageData(imageData, 0, 0);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Liquid gradient layer - CSS animiert für bessere Performance */}
      <div className="absolute inset-0 w-full h-full liquid-gradient" />

      {/* Grain overlay */}
      <canvas
        ref={grainCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.5, mixBlendMode: 'overlay' }}
      />
    </div>
  );
}
