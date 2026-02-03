'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';
import ChatWindow from '@/components/ChatWindow';
import PortfolioPreview from '@/components/PortfolioPreview';
import { useBackgroundContext } from '@/context/BackgroundContext';

// Sections configuration
const SECTIONS = ['chat', 'portfolio'] as const;
type Section = typeof SECTIONS[number];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { setColors } = useBackgroundContext();

  // Refs for scroll detection
  const wheelAccumulator = useRef(0);
  const lastWheelTime = useRef(0);
  const touchStartY = useRef(0);

  // Setze Farben direkt wenn Section wechselt - AnimatedBackground handled smooth transition
  useEffect(() => {
    if (currentIndex === 0) {
      // Chat Section - Helle Palette
      setColors({
        primary: '#D39858',   // Whiskey
        secondary: '#85431E', // Honey
        background: '#EACEAA', // Champagne
      });
    } else {
      // Portfolio Section - Dunkle Palette
      setColors({
        primary: '#D39858',   // Whiskey (bleibt)
        secondary: '#EACEAA', // Champagne (invertiert)
        background: '#34150F', // Burnt Coffee
      });
    }
  }, [currentIndex, setColors]);

  // Navigate to section with cinematic animation
  const navigateToSection = useCallback((index: number) => {
    if (isAnimating) return;
    if (index < 0 || index >= SECTIONS.length) return;
    if (index === currentIndex) return;

    setIsAnimating(true);
    setCurrentIndex(index);

    // Animation duration - dann unlock
    setTimeout(() => {
      setIsAnimating(false);
    }, 1200);
  }, [currentIndex, isAnimating]);

  // Wheel handler - detect intention, trigger navigation
  useEffect(() => {
    const SCROLL_THRESHOLD = 50;
    const COOLDOWN = 100; // ms between scroll checks

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isAnimating) return;

      const now = Date.now();

      // Reset accumulator if too much time passed
      if (now - lastWheelTime.current > 300) {
        wheelAccumulator.current = 0;
      }
      lastWheelTime.current = now;

      // Accumulate scroll delta
      wheelAccumulator.current += e.deltaY;

      // Check threshold
      if (Math.abs(wheelAccumulator.current) > SCROLL_THRESHOLD) {
        if (wheelAccumulator.current > 0) {
          // Scroll down - go to next section
          navigateToSection(currentIndex + 1);
        } else {
          // Scroll up - go to previous section
          navigateToSection(currentIndex - 1);
        }
        wheelAccumulator.current = 0;
      }
    };

    // Touch handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      const SWIPE_THRESHOLD = 50;

      if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
        if (deltaY > 0) {
          navigateToSection(currentIndex + 1);
        } else {
          navigateToSection(currentIndex - 1);
        }
      }
    };

    // Keyboard support
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        navigateToSection(currentIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        navigateToSection(currentIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isAnimating, navigateToSection]);

  const currentSection = SECTIONS[currentIndex];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
      }}
    >
      {/* Chat Section */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          opacity: currentSection === 'chat' ? 1 : 0,
          scale: currentSection === 'chat' ? 1 : 0.95,
          y: currentSection === 'chat' ? 0 : -50,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          zIndex: currentSection === 'chat' ? 10 : 5,
          pointerEvents: currentSection === 'chat' ? 'auto' : 'none',
        }}
      >
        <ChatWindow />
      </motion.div>

      {/* Portfolio Section */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          opacity: currentSection === 'portfolio' ? 1 : 0,
          scale: currentSection === 'portfolio' ? 1 : 1.05,
          y: currentSection === 'portfolio' ? 0 : 50,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          zIndex: currentSection === 'portfolio' ? 10 : 5,
          pointerEvents: currentSection === 'portfolio' ? 'auto' : 'none',
        }}
      >
        <PortfolioPreview isVisible={currentSection === 'portfolio'} />
      </motion.div>

      {/* Section Indicator */}
      <div
        className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3"
        style={{ zIndex: 100 }}
      >
        {SECTIONS.map((section, index) => (
          <motion.button
            key={section}
            onClick={() => navigateToSection(index)}
            className="w-2 h-2 rounded-full cursor-pointer"
            animate={{
              scale: currentIndex === index ? 1.5 : 1,
              backgroundColor: currentIndex === index
                ? (currentSection === 'chat' ? '#34150F' : '#EACEAA')
                : (currentSection === 'chat' ? 'rgba(52, 21, 15, 0.3)' : 'rgba(234, 206, 170, 0.3)'),
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.8 }}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </div>

      {/* Scroll Hint - only on chat section */}
      <AnimatePresence>
        {currentSection === 'chat' && !isAnimating && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 1 }}
            style={{ zIndex: 100 }}
          >
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{
                color: 'rgba(52, 21, 15, 0.5)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(52, 21, 15, 0.5)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
