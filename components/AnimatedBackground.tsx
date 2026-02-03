'use client';

import { useEffect, useRef } from 'react';
import { useBackgroundContext } from '@/context/BackgroundContext';

export default function AnimatedBackground() {
  const { colors, setAnimationTime } = useBackgroundContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);
  const currentColorsRef = useRef(colors);
  const targetColorsRef = useRef(colors);

  // Color interpolation helper
  const interpolateColor = (current: string, target: string, factor: number): string => {
    const c1 = parseInt(current.slice(1), 16);
    const c2 = parseInt(target.slice(1), 16);

    const r1 = (c1 >> 16) & 255;
    const g1 = (c1 >> 8) & 255;
    const b1 = c1 & 255;

    const r2 = (c2 >> 16) & 255;
    const g2 = (c2 >> 8) & 255;
    const b2 = c2 & 255;

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  useEffect(() => {
    targetColorsRef.current = colors;
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size - DEBOUNCED für Performance
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    };
    window.addEventListener('resize', debouncedResize);

    // Metaball/Blob parameters - OPTIMIERT (5 statt 8)
    const blobs = [
      { x: 0.5, y: 0.5, radius: 0.58, speedX: 0.0008, speedY: 0.0012, phaseX: 0, phaseY: Math.PI / 2 },
      { x: 0.5, y: 0.5, radius: 0.52, speedX: 0.001, speedY: 0.0006, phaseX: Math.PI, phaseY: 0 },
      { x: 0.5, y: 0.5, radius: 0.64, speedX: 0.0006, speedY: 0.0009, phaseX: Math.PI / 3, phaseY: Math.PI / 4 },
      { x: 0.5, y: 0.5, radius: 0.55, speedX: 0.0011, speedY: 0.0007, phaseX: Math.PI * 1.5, phaseY: Math.PI / 6 },
      { x: 0.5, y: 0.5, radius: 0.6, speedX: 0.0009, speedY: 0.001, phaseX: Math.PI / 6, phaseY: Math.PI * 1.3 },
    ];

    // Animation loop - OPTIMIERT auf ~30fps
    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameDelay = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (!canvas || !ctx) return;

      // Throttle to 30fps
      if (currentTime - lastFrameTime < frameDelay) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      timeRef.current += frameDelay; // ~30fps
      setAnimationTime(timeRef.current);

      const width = canvas.width;
      const height = canvas.height;
      const time = timeRef.current;

      // Ultra-smooth color interpolation (0.12 = faster, more responsive)
      const lerpFactor = 0.12;
      currentColorsRef.current = {
        primary: interpolateColor(currentColorsRef.current.primary, targetColorsRef.current.primary, lerpFactor),
        secondary: interpolateColor(currentColorsRef.current.secondary, targetColorsRef.current.secondary, lerpFactor),
        background: interpolateColor(currentColorsRef.current.background, targetColorsRef.current.background, lerpFactor),
      };

      const smoothColors = currentColorsRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw background with smooth colors
      ctx.fillStyle = smoothColors.background;
      ctx.fillRect(0, 0, width, height);

      // Create gradient blobs with organic movement
      blobs.forEach((blob, index) => {
        // Organic movement from center point
        const centerX = width * 0.5;
        const centerY = height * 0.5;

        // Lissajous curves for organic movement - GRÖSSERER BEWEGUNGSRADIUS
        const offsetX = Math.sin(time * blob.speedX + blob.phaseX) * width * 0.28;
        const offsetY = Math.cos(time * blob.speedY + blob.phaseY) * height * 0.28;

        const x = centerX + offsetX;
        const y = centerY + offsetY;
        const radius = Math.min(width, height) * blob.radius;

        // Create radial gradient - STÄRKERE OPACITY
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

        // Alternate between primary and secondary colors - mit smooth interpolation
        if (index % 2 === 0) {
          gradient.addColorStop(0, `${smoothColors.primary}70`); // 44% opacity
          gradient.addColorStop(0.4, `${smoothColors.primary}40`); // 25% opacity
          gradient.addColorStop(0.7, `${smoothColors.primary}18`); // 9% opacity
          gradient.addColorStop(1, `${smoothColors.primary}00`); // 0% opacity
        } else {
          gradient.addColorStop(0, `${smoothColors.secondary}65`); // 40% opacity
          gradient.addColorStop(0.4, `${smoothColors.secondary}38`); // 22% opacity
          gradient.addColorStop(0.7, `${smoothColors.secondary}15`); // 8% opacity
          gradient.addColorStop(1, `${smoothColors.secondary}00`); // 0% opacity
        }

        // Draw blob - WENIGER BLUR für schärfere Kanten
        ctx.fillStyle = gradient;
        ctx.shadowBlur = radius * 0.12; // REDUZIERTER BLUR
        ctx.shadowColor = index % 2 === 0 ? smoothColors.primary : smoothColors.secondary;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      });

      // Blend mode for organic overlapping effect
      ctx.globalCompositeOperation = 'source-over';

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [colors, setAnimationTime]);

  return (
    <>
      {/* Canvas for organic blobs - UNTEN (z-index 0) - GPU-OPTIMIERT */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          width: '100vw',
          height: '100vh',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />

      {/* OPTIMIERTER GRAIN LAYER 1 - Performance-optimiert */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          width: '100vw',
          height: '100vh',
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='1.8' numOctaves='3' seed='15'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
          opacity: 0.45,
          mixBlendMode: 'multiply',
          willChange: 'contents',
        }}
      />

      {/* OPTIMIERTER GRAIN LAYER 2 - Feineres Grain */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 6,
          width: '100vw',
          height: '100vh',
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='2.5' numOctaves='2' seed='42'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='128' height='128' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '80px 80px',
          opacity: 0.32,
          mixBlendMode: 'overlay',
          willChange: 'contents',
        }}
      />
    </>
  );
}
