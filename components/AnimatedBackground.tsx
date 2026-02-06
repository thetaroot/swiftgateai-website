'use client';

import { useEffect, useRef, memo } from 'react';
import { useBackgroundContext } from '@/context/BackgroundContext';

// Pre-computed blob configurations - outside component for performance
const BLOBS = [
  { radius: 0.58, speedX: 0.0008, speedY: 0.0012, phaseX: 0, phaseY: Math.PI / 2 },
  { radius: 0.52, speedX: 0.001, speedY: 0.0006, phaseX: Math.PI, phaseY: 0 },
  { radius: 0.64, speedX: 0.0006, speedY: 0.0009, phaseX: Math.PI / 3, phaseY: Math.PI / 4 },
  { radius: 0.55, speedX: 0.0011, speedY: 0.0007, phaseX: Math.PI * 1.5, phaseY: Math.PI / 6 },
] as const;

// Color parsing cache for performance
const colorCache = new Map<string, [number, number, number]>();

function parseColor(hex: string): [number, number, number] {
  const cached = colorCache.get(hex);
  if (cached) return cached;

  const c = parseInt(hex.slice(1), 16);
  const result: [number, number, number] = [(c >> 16) & 255, (c >> 8) & 255, c & 255];
  colorCache.set(hex, result);
  return result;
}

function interpolateColor(current: string, target: string, factor: number): string {
  const [r1, g1, b1] = parseColor(current);
  const [r2, g2, b2] = parseColor(target);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function AnimatedBackground() {
  const { colors } = useBackgroundContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const currentColorsRef = useRef(colors);
  const targetColorsRef = useRef(colors);
  const lastFrameTimeRef = useRef(0);

  // Update target colors when props change
  useEffect(() => {
    targetColorsRef.current = colors;
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // alpha: false for better performance
    if (!ctx) return;

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Debounced resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before resize
        resizeCanvas();
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Pre-calculate constants
    const TARGET_FPS = 30;
    const FRAME_DELAY = 1000 / TARGET_FPS;
    const LERP_FACTOR = 0.06; // Smooth color transitions
    const MOVEMENT_SCALE = 0.28;

    // Animation loop
    const animate = (currentTime: number) => {
      // Frame rate limiting
      const elapsed = currentTime - lastFrameTimeRef.current;
      if (elapsed < FRAME_DELAY) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTimeRef.current = currentTime - (elapsed % FRAME_DELAY);

      timeRef.current += FRAME_DELAY;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const time = timeRef.current;
      const minDim = Math.min(width, height);
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Smooth color interpolation
      const current = currentColorsRef.current;
      const target = targetColorsRef.current;

      currentColorsRef.current = {
        primary: interpolateColor(current.primary, target.primary, LERP_FACTOR),
        secondary: interpolateColor(current.secondary, target.secondary, LERP_FACTOR),
        background: interpolateColor(current.background, target.background, LERP_FACTOR),
      };

      const smoothColors = currentColorsRef.current;

      // Clear and draw background
      ctx.fillStyle = smoothColors.background;
      ctx.fillRect(0, 0, width, height);

      // Disable shadows for performance - use gradients only
      ctx.shadowBlur = 0;

      // Draw blobs
      for (let i = 0; i < BLOBS.length; i++) {
        const blob = BLOBS[i];

        // Lissajous movement
        const offsetX = Math.sin(time * blob.speedX + blob.phaseX) * width * MOVEMENT_SCALE;
        const offsetY = Math.cos(time * blob.speedY + blob.phaseY) * height * MOVEMENT_SCALE;

        const x = centerX + offsetX;
        const y = centerY + offsetY;
        const radius = minDim * blob.radius;

        // Create gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const color = i % 2 === 0 ? smoothColors.primary : smoothColors.secondary;

        gradient.addColorStop(0, `${color}66`);
        gradient.addColorStop(0.4, `${color}33`);
        gradient.addColorStop(0.7, `${color}15`);
        gradient.addColorStop(1, `${color}00`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []); // Empty deps - animation runs independently

  return (
    <>
      {/* Canvas - GPU accelerated */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          transform: 'translate3d(0,0,0)', // Force GPU layer
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

// Memo to prevent re-renders from parent
export default memo(AnimatedBackground);
