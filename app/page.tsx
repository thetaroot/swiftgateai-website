'use client';

import { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from '@/components/ChatWindow';
import PortfolioPreview from '@/components/PortfolioPreview';
import Footer from '@/components/Footer';
import WelcomeScreen from '@/components/WelcomeScreen';
import BrutalistLogo from '@/components/BrutalistLogo';
import BrutalistNav from '@/components/BrutalistNav';
import BrutalistTextBlock from '@/components/BrutalistTextBlock';
import WhatIDoSection from '@/components/WhatIDoSection';
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

  // Scroll lock state - only active when chat is expanded
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const [showUnlockHint, setShowUnlockHint] = useState(false);

  // Hint states for portfolio transition
  const [showChatHint, setShowChatHint] = useState(false);
  const [showPortfolioHint, setShowPortfolioHint] = useState(false);

  // Track if user has scrolled past the first section (for sticky nav styling)
  const [isInDarkSection, setIsInDarkSection] = useState(false);

  const { setColors, isChatExpanded, canScrollToPortfolio, setIsPageScrollUnlocked } = useBackgroundContext();

  // Refs
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const transitionAccumulator = useRef(0);
  const touchStartY = useRef(0);
  const scrollCooldown = useRef(false);
  const portfolioContainerRef = useRef<HTMLDivElement>(null);
  const hasHitEdge = useRef(false);
  const unlockAccumulator = useRef(0);

  // Callback when intro animation completes
  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  // Reset scroll lock when chat collapses
  useEffect(() => {
    if (!isChatExpanded) {
      setIsScrollLocked(true);
      setShowUnlockHint(false);
      unlockAccumulator.current = 0;
      setIsPageScrollUnlocked(false);
    }
  }, [isChatExpanded, setIsPageScrollUnlocked]);

  // Sync scroll lock state with context
  useEffect(() => {
    setIsPageScrollUnlocked(!isScrollLocked);
  }, [isScrollLocked, setIsPageScrollUnlocked]);

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

  // Reset portfolio scroll position BEFORE paint
  useLayoutEffect(() => {
    const container = portfolioContainerRef.current;
    if (!container) return;

    if (showPortfolio) {
      container.scrollTop = 0;
      requestAnimationFrame(() => {
        container.scrollTop = 0;
      });
    }
  }, [showPortfolio]);

  // Initialize portfolio container with scrollTop = 0 on mount
  useLayoutEffect(() => {
    const container = portfolioContainerRef.current;
    if (container) {
      container.scrollTop = 0;
    }
  }, []);

  // Navigate to portfolio with animation
  const goToPortfolio = useCallback(() => {
    if (isAnimating || scrollCooldown.current || showPortfolio) return;
    if (!showPortfolioHint) return;

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
    if (!showChatHint) return;

    scrollCooldown.current = true;
    setTimeout(() => { scrollCooldown.current = false; }, 800);

    setIsAnimating(true);
    setShowPortfolio(false);
    setShowChatHint(false);

    // Scroll back to top of main content
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }

    setTimeout(() => { setIsAnimating(false); }, 1000);
  }, [isAnimating, showPortfolio, showChatHint]);

  // Check if at bottom of second section for portfolio transition
  const checkPortfolioTransition = useCallback(() => {
    const container = mainScrollRef.current;
    const secondSection = secondSectionRef.current;
    if (!container || !secondSection) return false;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
    return isAtBottom;
  }, []);

  // Show unlock hint when chat signals it's ready
  useEffect(() => {
    if (isChatExpanded && isScrollLocked && canScrollToPortfolio && !showUnlockHint) {
      setShowUnlockHint(true);
    }
  }, [isChatExpanded, isScrollLocked, canScrollToPortfolio, showUnlockHint]);

  // Window-level wheel handler for unlocking scroll when chat is expanded
  useEffect(() => {
    if (showPortfolio || !isChatExpanded || !isScrollLocked || !showUnlockHint) return;

    const UNLOCK_THRESHOLD = 150;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating || scrollCooldown.current) return;

      if (e.deltaY > 0) {
        unlockAccumulator.current += e.deltaY;
        if (unlockAccumulator.current > UNLOCK_THRESHOLD) {
          setIsScrollLocked(false);
          setShowUnlockHint(false);
          unlockAccumulator.current = 0;
        }
      } else {
        unlockAccumulator.current = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [showPortfolio, isChatExpanded, isScrollLocked, showUnlockHint, isAnimating]);

  // Handle scroll on main container for portfolio transition (light section)
  useEffect(() => {
    if (showPortfolio) return;

    const container = mainScrollRef.current;
    if (!container) return;

    const PORTFOLIO_THRESHOLD = 120;

    const handleScroll = () => {
      // Check for portfolio transition hint (only when not locked)
      if (!isChatExpanded || !isScrollLocked) {
        if (checkPortfolioTransition() && !showPortfolioHint) {
          setShowPortfolioHint(true);
        } else if (!checkPortfolioTransition() && showPortfolioHint) {
          setShowPortfolioHint(false);
        }
      }

      // Check if scrolled into dark section (past first viewport)
      const scrolledPastFirst = container.scrollTop > window.innerHeight * 0.7;
      if (scrolledPastFirst !== isInDarkSection) {
        setIsInDarkSection(scrolledPastFirst);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating || scrollCooldown.current) return;

      // Skip if chat is expanded and locked (handled by window-level handler)
      if (isChatExpanded && isScrollLocked) return;

      // Normal scrolling - check for portfolio transition
      if (e.deltaY > 0 && checkPortfolioTransition()) {
        if (!showPortfolioHint) {
          setShowPortfolioHint(true);
          transitionAccumulator.current = 0;
          return;
        }

        transitionAccumulator.current += e.deltaY;
        if (transitionAccumulator.current > PORTFOLIO_THRESHOLD) {
          goToPortfolio();
          transitionAccumulator.current = 0;
        }
      } else {
        transitionAccumulator.current = 0;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [showPortfolio, isChatExpanded, isScrollLocked, isAnimating, showPortfolioHint, checkPortfolioTransition, goToPortfolio, isInDarkSection]);

  // Wheel handler for Portfolio section - back to chat
  useEffect(() => {
    const container = portfolioContainerRef.current;
    if (!container || !showPortfolio) return;

    const SCROLL_THRESHOLD = 100;

    const handlePortfolioWheel = (e: WheelEvent) => {
      if (isAnimating || scrollCooldown.current) return;

      const isAtTop = container.scrollTop <= 0;

      if (!isAtTop || e.deltaY >= 0) {
        if (showChatHint) setShowChatHint(false);
        transitionAccumulator.current = 0;
        hasHitEdge.current = false;
        return;
      }

      if (!hasHitEdge.current) {
        hasHitEdge.current = true;
        transitionAccumulator.current = 0;
        return;
      }

      if (!showChatHint) {
        transitionAccumulator.current += Math.abs(e.deltaY);
        if (transitionAccumulator.current > 30) {
          setShowChatHint(true);
          transitionAccumulator.current = 0;
        }
        return;
      }

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

      // On light section
      if (isChatExpanded && isScrollLocked) {
        if (canScrollToPortfolio && deltaY > SWIPE_THRESHOLD) {
          if (showUnlockHint) {
            setIsScrollLocked(false);
            setShowUnlockHint(false);
          } else {
            setShowUnlockHint(true);
          }
        }
        return;
      }

      // Check for portfolio transition
      if (checkPortfolioTransition() && deltaY > SWIPE_THRESHOLD) {
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
  }, [showPortfolio, isChatExpanded, isScrollLocked, isAnimating, canScrollToPortfolio, showUnlockHint, showPortfolioHint, showChatHint, checkPortfolioTransition, goToPortfolio, goToChat]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating || scrollCooldown.current) return;

      if (showPortfolio) {
        if ((e.key === 'Escape' || e.key === 'ArrowUp') && showChatHint) {
          e.preventDefault();
          goToChat();
        }
        return;
      }

      if (isChatExpanded && isScrollLocked) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (checkPortfolioTransition()) {
          e.preventDefault();
          if (showPortfolioHint) {
            goToPortfolio();
          } else {
            setShowPortfolioHint(true);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPortfolio, isChatExpanded, isScrollLocked, isAnimating, showPortfolioHint, showChatHint, checkPortfolioTransition, goToPortfolio, goToChat]);

  return (
    <>
      {/* Welcome Screen - First Visit Only */}
      <WelcomeScreen onComplete={handleIntroComplete} />

      {/* Main Content Container */}
      <motion.div
        style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Light Section - Normal Scrollable Page */}
        <motion.div
          ref={mainScrollRef}
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
            overflowY: (!showPortfolio && (!isChatExpanded || !isScrollLocked)) ? 'auto' : 'hidden',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Sticky Header with Logo and Nav */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="px-6 py-4 transition-all duration-500"
              style={{
                background: isInDarkSection
                  ? 'rgba(10, 10, 10, 0.85)'
                  : 'rgba(234, 206, 170, 0.8)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderBottom: isInDarkSection
                  ? '1px solid rgba(211, 152, 88, 0.1)'
                  : '1px solid rgba(52, 21, 15, 0.05)',
              }}
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <motion.div className="select-none">
                  <span
                    className="transition-colors duration-500"
                    style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: 'clamp(14px, 1.8vw, 18px)',
                      fontWeight: 400,
                      color: isInDarkSection ? '#EACEAA' : '#34150F',
                      letterSpacing: '0.05em',
                    }}
                  >
                    [ SWIFTGATEAI ]
                  </span>
                </motion.div>

                {/* Navigation */}
                {!isChatExpanded && (
                  <motion.nav
                    className="flex items-center gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    {['SERVICES', 'PORTFOLIO', 'KONTAKT'].map((link, index) => (
                      <motion.button
                        key={link}
                        className="cursor-pointer hover:opacity-60 transition-all duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        style={{
                          fontFamily: '"Courier New", monospace',
                          fontSize: 'clamp(12px, 1.5vw, 16px)',
                          fontWeight: 400,
                          color: isInDarkSection ? '#EACEAA' : '#34150F',
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
                )}
              </div>
            </div>
          </motion.div>

          {/* Vertical Nav when chat expanded */}
          {isChatExpanded && (
            <div className="fixed top-24 left-6" style={{ zIndex: 55 }}>
              <BrutalistNav isVertical />
            </div>
          )}

          {/* First Section - Chat Area */}
          <div
            className="relative min-h-screen"
            style={{ background: '#EACEAA' }}
          >
            {/* Brutalist Text Block - Bottom Right (hidden when chat expanded) */}
            <div className="fixed bottom-6 right-6" style={{ zIndex: 55 }}>
              <BrutalistTextBlock isVisible={!isChatExpanded} />
            </div>

            <ChatWindow />
          </div>

          {/* Second Section - What I Do */}
          <div
            ref={secondSectionRef}
            className="relative"
            style={{ background: '#EACEAA' }}
          >
            {/* WhatIDoSection with integrated divider */}
            <WhatIDoSection />

            {/* Portfolio Transition Hint at Bottom of WhatIDoSection */}
            <AnimatePresence>
              {showPortfolioHint && !isAnimating && (
                <motion.div
                  className="flex flex-col items-center gap-2 py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: '#0A0A0A' }}
                >
                  <motion.span
                    className="text-center whitespace-nowrap"
                    style={{
                      color: 'rgba(211, 152, 88, 0.5)',
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(211, 152, 88, 0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Unlock Scroll Hint - Shows when chat expanded and at bottom */}
        <AnimatePresence>
          {!showPortfolio && isChatExpanded && isScrollLocked && showUnlockHint && (
            <motion.div
              className="fixed bottom-8 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              style={{ zIndex: 100, left: '50%', transform: 'translateX(-50%)' }}
            >
              <motion.span
                className="text-center whitespace-nowrap"
                style={{
                  color: 'rgba(52, 21, 15, 0.5)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Weiter scrollen um Chat zu verlassen
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

        {/* Portfolio Section - Animated Transition */}
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

        {/* Back to Chat hint on Portfolio */}
        <AnimatePresence>
          {showPortfolio && !isAnimating && showChatHint && (
            <motion.div
              className="fixed top-8 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ zIndex: 20, left: '50%', transform: 'translateX(-50%)' }}
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
                className="text-center whitespace-nowrap"
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
