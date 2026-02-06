'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from '@/components/ChatWindow';
import PortfolioPreview from '@/components/PortfolioPreview';
import Footer from '@/components/Footer';
import WelcomeScreen from '@/components/WelcomeScreen';
import { useBackgroundContext } from '@/context/BackgroundContext';

// Ultra-smooth spring configurations
const sectionTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 25,
  mass: 1,
};

const quickTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 30,
  mass: 0.8,
};

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Hint states - only show when user has hit the edge
  const [showChatHint, setShowChatHint] = useState(false); // On Portfolio, show "scroll for Chat"
  const [showPortfolioHint, setShowPortfolioHint] = useState(false); // On Chat, show "scroll for Portfolio"

  const { setColors, isChatExpanded, canScrollToPortfolio } = useBackgroundContext();

  // Callback when intro animation completes
  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  // Refs for scroll detection
  const transitionAccumulator = useRef(0);
  const touchStartY = useRef(0);
  const scrollCooldown = useRef(false);
  const portfolioContainerRef = useRef<HTMLDivElement>(null);
  const hasHitEdge = useRef(false);

  // Update colors based on section
  useEffect(() => {
    if (!showPortfolio) {
      setColors({
        primary: '#D39858',
        secondary: '#85431E',
        background: '#EACEAA',
      });
    } else {
      setColors({
        primary: '#D39858',
        secondary: '#EACEAA',
        background: '#34150F',
      });
    }
  }, [showPortfolio, setColors]);

  // Reset hints when section changes
  useEffect(() => {
    setShowChatHint(false);
    setShowPortfolioHint(false);
    hasHitEdge.current = false;
    transitionAccumulator.current = 0;
  }, [showPortfolio]);

  // Navigate to portfolio with animation
  const goToPortfolio = useCallback(() => {
    if (isAnimating || scrollCooldown.current || showPortfolio) return;
    if (!showPortfolioHint) return; // Only allow if hint is showing

    scrollCooldown.current = true;
    setTimeout(() => { scrollCooldown.current = false; }, 800);

    setIsAnimating(true);
    setShowPortfolio(true);
    setShowPortfolioHint(false);

    setTimeout(() => { setIsAnimating(false); }, 1000);
  }, [isAnimating, showPortfolio, showPortfolioHint]);

  // Navigate back to chat
  const goToChat = useCallback(() => {
    if (isAnimating || scrollCooldown.current || !showPortfolio) return;
    if (!showChatHint) return; // Only allow if hint is showing

    scrollCooldown.current = true;
    setTimeout(() => { scrollCooldown.current = false; }, 800);

    setIsAnimating(true);
    setShowPortfolio(false);
    setShowChatHint(false);

    setTimeout(() => { setIsAnimating(false); }, 1000);
  }, [isAnimating, showPortfolio, showChatHint]);

  // Wheel handler for Chat section (collapsed state)
  useEffect(() => {
    if (showPortfolio || isChatExpanded) return;

    const SCROLL_THRESHOLD = 120;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating || scrollCooldown.current) return;

      // Only care about scrolling down
      if (e.deltaY <= 0) {
        transitionAccumulator.current = 0;
        return;
      }

      // First phase: hit the edge -> show hint
      if (!showPortfolioHint) {
        transitionAccumulator.current += e.deltaY;
        if (transitionAccumulator.current > SCROLL_THRESHOLD) {
          setShowPortfolioHint(true);
          transitionAccumulator.current = 0;
        }
        return;
      }

      // Second phase: hint is showing -> accumulate for transition
      transitionAccumulator.current += e.deltaY;
      if (transitionAccumulator.current > SCROLL_THRESHOLD) {
        goToPortfolio();
        transitionAccumulator.current = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [showPortfolio, isChatExpanded, isAnimating, showPortfolioHint, goToPortfolio]);

  // Wheel handler for Chat section (expanded state) - uses canScrollToPortfolio from ChatWindow
  useEffect(() => {
    if (showPortfolio || !isChatExpanded) return;

    const SCROLL_THRESHOLD = 150;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating || scrollCooldown.current) return;
      if (e.deltaY <= 0) {
        transitionAccumulator.current = 0;
        return;
      }

      // Only proceed if ChatWindow says we can scroll to portfolio (user at bottom + hint shown)
      if (!canScrollToPortfolio) {
        transitionAccumulator.current = 0;
        return;
      }

      // Show our hint if not showing
      if (!showPortfolioHint) {
        setShowPortfolioHint(true);
        transitionAccumulator.current = 0;
        return;
      }

      // Accumulate for transition
      transitionAccumulator.current += e.deltaY;
      if (transitionAccumulator.current > SCROLL_THRESHOLD) {
        goToPortfolio();
        transitionAccumulator.current = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [showPortfolio, isChatExpanded, isAnimating, canScrollToPortfolio, showPortfolioHint, goToPortfolio]);

  // Wheel handler for Portfolio section - back to chat
  useEffect(() => {
    const container = portfolioContainerRef.current;
    if (!container || !showPortfolio) return;

    const SCROLL_THRESHOLD = 100;

    const handlePortfolioWheel = (e: WheelEvent) => {
      if (isAnimating || scrollCooldown.current) return;

      const isAtTop = container.scrollTop <= 0;

      // If not at top or scrolling down, reset everything
      if (!isAtTop || e.deltaY >= 0) {
        if (showChatHint) setShowChatHint(false);
        transitionAccumulator.current = 0;
        hasHitEdge.current = false;
        return;
      }

      // At top and scrolling up
      // First: mark that we hit the edge
      if (!hasHitEdge.current) {
        hasHitEdge.current = true;
        transitionAccumulator.current = 0;
        return;
      }

      // Second: show the hint after hitting edge
      if (!showChatHint) {
        transitionAccumulator.current += Math.abs(e.deltaY);
        if (transitionAccumulator.current > 30) {
          setShowChatHint(true);
          transitionAccumulator.current = 0;
        }
        return;
      }

      // Third: hint is showing, accumulate for transition
      transitionAccumulator.current += Math.abs(e.deltaY);
      if (transitionAccumulator.current > SCROLL_THRESHOLD) {
        goToChat();
        transitionAccumulator.current = 0;
      }
    };

    container.addEventListener('wheel', handlePortfolioWheel, { passive: true });
    return () => container.removeEventListener('wheel', handlePortfolioWheel);
  }, [showPortfolio, showChatHint, isAnimating, goToChat]);

  // Touch handlers
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating || scrollCooldown.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      const SWIPE_THRESHOLD = 100;

      if (showPortfolio) {
        // On Portfolio - swipe down to go to chat (only if hint showing)
        const container = portfolioContainerRef.current;
        if (container && container.scrollTop <= 0 && deltaY < -SWIPE_THRESHOLD) {
          if (showChatHint) {
            goToChat();
          } else {
            setShowChatHint(true);
          }
        }
        return;
      }

      // On Chat
      if (isChatExpanded) {
        if (canScrollToPortfolio && deltaY > SWIPE_THRESHOLD) {
          if (showPortfolioHint) {
            goToPortfolio();
          } else {
            setShowPortfolioHint(true);
          }
        }
        return;
      }

      // Chat collapsed - swipe up to show hint, then transition
      if (deltaY > SWIPE_THRESHOLD) {
        if (showPortfolioHint) {
          goToPortfolio();
        } else {
          setShowPortfolioHint(true);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [showPortfolio, isChatExpanded, isAnimating, canScrollToPortfolio, showPortfolioHint, showChatHint, goToPortfolio, goToChat]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating || scrollCooldown.current) return;

      if (showPortfolio) {
        // On Portfolio - Escape or ArrowUp to go back (if hint showing)
        if ((e.key === 'Escape' || e.key === 'ArrowUp') && showChatHint) {
          e.preventDefault();
          goToChat();
        }
        return;
      }

      if (isChatExpanded) return;

      // On Chat collapsed
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (showPortfolioHint) {
          goToPortfolio();
        } else {
          setShowPortfolioHint(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPortfolio, isChatExpanded, isAnimating, showPortfolioHint, showChatHint, goToPortfolio, goToChat]);

  return (
    <>
      {/* Welcome Screen - First Visit Only */}
      <WelcomeScreen onComplete={handleIntroComplete} />

      {/* Main Content */}
      <motion.div
        style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
      {/* Chat Section */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          opacity: !showPortfolio ? 1 : 0,
          scale: !showPortfolio ? 1 : 0.92,
          y: !showPortfolio ? 0 : '-8%',
          filter: !showPortfolio ? 'blur(0px)' : 'blur(8px)',
        }}
        transition={sectionTransition}
        style={{
          zIndex: !showPortfolio ? 10 : 5,
          pointerEvents: !showPortfolio ? 'auto' : 'none',
          willChange: 'transform, opacity, filter',
        }}
      >
        <ChatWindow />
      </motion.div>

      {/* Portfolio Section - Scrollable Container */}
      <motion.div
        ref={portfolioContainerRef}
        className="absolute inset-0"
        initial={false}
        animate={{
          opacity: showPortfolio ? 1 : 0,
          scale: showPortfolio ? 1 : 1.08,
          y: showPortfolio ? 0 : '8%',
          filter: showPortfolio ? 'blur(0px)' : 'blur(8px)',
        }}
        transition={sectionTransition}
        style={{
          zIndex: showPortfolio ? 10 : 5,
          pointerEvents: showPortfolio ? 'auto' : 'none',
          willChange: 'transform, opacity, filter',
          overflowY: showPortfolio ? 'auto' : 'hidden',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <PortfolioPreview isVisible={showPortfolio} />
        <Footer />
      </motion.div>

      {/* Section Indicator */}
      <motion.div
        className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-2 rounded-full"
        style={{
          zIndex: 60,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, ...quickTransition }}
      >
        <motion.button
          onClick={() => showChatHint && goToChat()}
          className="rounded-full cursor-pointer"
          style={{ width: '10px', height: '10px', border: 'none', outline: 'none' }}
          animate={{
            scale: !showPortfolio ? 1.4 : 1,
            backgroundColor: !showPortfolio
              ? '#34150F'
              : (showPortfolio ? 'rgba(234, 206, 170, 0.25)' : 'rgba(52, 21, 15, 0.25)'),
            boxShadow: !showPortfolio ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
          }}
          transition={quickTransition}
          whileHover={{ scale: 1.6 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Go to chat section"
        />
        <motion.button
          onClick={() => showPortfolioHint && goToPortfolio()}
          className="rounded-full cursor-pointer"
          style={{ width: '10px', height: '10px', border: 'none', outline: 'none' }}
          animate={{
            scale: showPortfolio ? 1.4 : 1,
            backgroundColor: showPortfolio
              ? '#EACEAA'
              : (!showPortfolio ? 'rgba(52, 21, 15, 0.25)' : 'rgba(234, 206, 170, 0.25)'),
            boxShadow: showPortfolio ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
          }}
          transition={quickTransition}
          whileHover={{ scale: 1.6 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Go to portfolio section"
        />
      </motion.div>

      {/* Scroll Hint on Chat - Only shows after user has "hit the edge" */}
      <AnimatePresence>
        {!showPortfolio && !isAnimating && !isChatExpanded && showPortfolioHint && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: 20 }}
          >
            <motion.span
              style={{
                color: 'rgba(52, 21, 15, 0.5)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Weiter scrollen für Portfolio
            </motion.span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(52, 21, 15, 0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Chat hint on Portfolio - Only shows after user hits top edge */}
      <AnimatePresence>
        {showPortfolio && !isAnimating && showChatHint && (
          <motion.div
            className="fixed top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: 20 }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(234, 206, 170, 0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </motion.div>
            <motion.span
              style={{
                color: 'rgba(234, 206, 170, 0.6)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Weiter scrollen für Chat
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </>
  );
}
