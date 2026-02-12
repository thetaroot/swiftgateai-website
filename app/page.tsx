'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from '@/components/ChatWindow';
import PortfolioPreview from '@/components/PortfolioPreview';
import Footer from '@/components/Footer';
import WelcomeScreen from '@/components/WelcomeScreen';
import BrutalistNav from '@/components/BrutalistNav';
import BrutalistTextBlock from '@/components/BrutalistTextBlock';
import WhatIDoSection from '@/components/WhatIDoSection';
import { useBackgroundContext } from '@/context/BackgroundContext';
import ContactSection from '@/components/ContactSection';
import MobileMenu from '@/components/MobileMenu';
import SettingsModal from '@/components/SettingsModal';
import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';

export default function Home() {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const [introComplete, setIntroComplete] = useState(false);
  const [isInDarkSection, setIsInDarkSection] = useState(false);
  const [showScrollUpHint, setShowScrollUpHint] = useState(false);
  const [isPastFirstSection, setIsPastFirstSection] = useState(false);

  const { isChatExpanded, chatVisible, setChatVisible } = useBackgroundContext();

  const pageScrollRef = useRef<HTMLDivElement>(null);
  const topScrollAccumulator = useRef(0);

  const handleScrollTo = (id: string) => {
    // Special case for services to hit the anchor deep inside component
    const targetId = id === 'services' ? 'services-anchor' : id;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  // IntersectionObserver for nav color switching
  useEffect(() => {
    const container = pageScrollRef.current;
    if (!container) return;

    const darkSections = container.querySelectorAll('[data-section="dark"]');
    if (darkSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Check if any dark section is intersecting the top area
        let anyDarkVisible = false;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            anyDarkVisible = true;
            break;
          }
        }
        setIsInDarkSection(anyDarkVisible);
      },
      {
        root: container,
        // Only trigger when section enters the top 20% of the viewport
        rootMargin: '0px 0px -80% 0px',
        threshold: 0,
      }
    );

    darkSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [introComplete]);

  // Track scroll position to hide BrutalistTextBlock once past first section
  useEffect(() => {
    const container = pageScrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const pastThreshold = container.scrollTop > window.innerHeight * 0.4;
      setIsPastFirstSection(pastThreshold);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Chat re-entry: scrolling up at scrollTop=0 (only when chat was expanded and scrolled out)
  useEffect(() => {
    const container = pageScrollRef.current;
    if (!container || chatVisible || !isChatExpanded) return;

    const handleWheel = (e: WheelEvent) => {
      if (container.scrollTop > 0 || e.deltaY >= 0) {
        topScrollAccumulator.current = 0;
        if (showScrollUpHint) setShowScrollUpHint(false);
        return;
      }

      // Scrolling up at top
      topScrollAccumulator.current += Math.abs(e.deltaY);

      if (!showScrollUpHint && topScrollAccumulator.current > 30) {
        setShowScrollUpHint(true);
      }

      if (topScrollAccumulator.current > 150) {
        setChatVisible(true);
        setShowScrollUpHint(false);
        topScrollAccumulator.current = 0;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [chatVisible, setChatVisible, showScrollUpHint, isChatExpanded]);

  // Touch support for chat re-entry
  useEffect(() => {
    const container = pageScrollRef.current;
    if (!container || chatVisible || !isChatExpanded) return;

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (container.scrollTop > 0) return;

      const deltaY = touchStartY - e.changedTouches[0].clientY;
      // Swiping down (pulling content down = negative deltaY = scrolling up)
      if (deltaY < -80) {
        if (showScrollUpHint) {
          setChatVisible(true);
          setShowScrollUpHint(false);
        } else {
          setShowScrollUpHint(true);
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [chatVisible, setChatVisible, showScrollUpHint, isChatExpanded]);

  // Reset scroll up hint when chat becomes visible
  useEffect(() => {
    if (chatVisible) {
      setShowScrollUpHint(false);
      topScrollAccumulator.current = 0;
    }
  }, [chatVisible]);

  return (
    <>
      {/* Welcome Screen */}
      <WelcomeScreen onComplete={handleIntroComplete} />

      {/* Main Content */}
      <motion.div
        style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ... (rest of the component content remains the same, just unindented or inside fragment) ... */}
        {/* Sticky Header */}
        <motion.div
          className="fixed top-0 left-0 right-0"
          style={{ zIndex: 100 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="px-4 md:px-6 py-3 md:py-5"
            style={{ background: 'transparent' }}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Logo — hidden on mobile (brand heading shown in hero instead) */}
              <motion.div className="select-none hidden md:block">
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

              {/* Navigation & Settings - hide when chat overlay is showing */}
              {!isChatExpanded && (
                <div className="flex items-center gap-3 md:gap-8">
                  {/* Desktop Nav Links */}
                  <motion.nav
                    className="hidden md:flex items-center gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    {[
                      { key: 'services', label: t.common.services },
                      { key: 'portfolio', label: t.common.portfolio, disabled: true },
                      { key: 'kontakt', label: t.common.contact }
                    ].map((item, index) => (
                      <motion.button
                        key={item.key}
                        className="cursor-pointer transition-all duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        onClick={() => !item.disabled && handleScrollTo(item.key.toLowerCase())}
                        tabIndex={item.disabled ? -1 : 0}
                        style={{
                          fontFamily: '"Courier New", monospace',
                          fontSize: 'clamp(12px, 1.5vw, 16px)',
                          fontWeight: 400,
                          color: isInDarkSection ? '#EACEAA' : '#34150F',
                          letterSpacing: '0.05em',
                          background: 'none',
                          border: 'none',
                          padding: '4px 0',
                          borderBottom: '1px solid transparent',
                          ...(item.disabled ? { opacity: 0.25, pointerEvents: 'none' as const, cursor: 'default' } : {}),
                        }}
                        whileHover={item.disabled ? {} : {
                          borderBottomColor: isInDarkSection ? '#EACEAA' : '#34150F',
                        }}
                      >
                        [ {item.label} ]
                      </motion.button>
                    ))}
                  </motion.nav>

                  {/* Settings Trigger */}
                  <div className={isInDarkSection ? 'text-[#EACEAA]' : 'text-[#34150F]'}>
                    <SettingsModal />
                  </div>

                  {/* Mobile Hamburger */}
                  <div className="md:hidden">
                    <MobileMenu isInDarkSection={isInDarkSection} onScrollTo={handleScrollTo} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Vertical Nav when chat expanded */}
        <AnimatePresence>
          {chatVisible && isChatExpanded && (
            <motion.div
              className="fixed top-24 left-6"
              style={{ zIndex: 55 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <BrutalistNav isVertical />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brutalist Text Block - Fixed on desktop, hidden on mobile (shown inline in ChatWindow) */}
        {!isMobile && !isChatExpanded && !isPastFirstSection && !chatVisible && (
          <div
            className="fixed bottom-6 right-6"
            style={{ zIndex: 55 }}
            onWheel={(e) => {
              if (pageScrollRef.current) {
                pageScrollRef.current.scrollTop += e.deltaY;
              }
            }}
          >
            <BrutalistTextBlock isVisible />
          </div>
        )}

        {/* ===== SINGLE SCROLL CONTAINER ===== */}
        <div
          ref={pageScrollRef}
          className="absolute inset-0"
          style={{
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Chat Section - Light */}
          <section
            data-section="light"
            className="relative"
            style={{ background: '#EACEAA', contain: 'layout style', minHeight: isMobile ? '100dvh' : '100vh' }}
          >
            {/* Mobile Hero — vertical stacked layout */}
            {isMobile && !isChatExpanded && !chatVisible ? (
              <div
                className="flex flex-col items-center"
                style={{
                  minHeight: '100dvh',
                  padding: '72px 20px 24px',
                }}
              >
                {/* Brand Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-center mb-2 mt-4"
                >
                  <h1
                    style={{
                      fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                      fontSize: 'clamp(52px, 14vw, 72px)',
                      fontWeight: 400,
                      color: '#34150F',
                      letterSpacing: '0.06em',
                      lineHeight: 0.95,
                      margin: 0,
                    }}
                  >
                    SWIFTGATE
                  </h1>
                  <span
                    style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: '11px',
                      color: 'rgba(52, 21, 15, 0.45)',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                    }}
                  >
                    AI
                  </span>
                </motion.div>

                {/* Description Text */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="w-full flex justify-center"
                  style={{ flex: '1 1 0', display: 'flex', alignItems: 'center' }}
                >
                  <BrutalistTextBlock isVisible />
                </motion.div>

                {/* Chat Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="w-full"
                >
                  <ChatWindow />
                </motion.div>

                {/* Scroll Down Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="mt-6 mb-2"
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    style={{ opacity: 0.3 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34150F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            ) : (
              <ChatWindow />
            )}
          </section>

          {/* Services Section - has internal dark/light data-section attributes */}
          <div id="services">
            <WhatIDoSection />
          </div>

          {/* Portfolio Section - Dark with gradient transition */}
          <div id="portfolio" data-section="dark" style={{ background: '#0A0A0A' }}>
            {/* Gradient from light to dark (EACEAA → dark) */}
            <div
              style={{
                height: 'clamp(100px, 15vw, 200px)',
                background: 'linear-gradient(to bottom, #EACEAA 0%, #c8a87a 25%, #8b6b45 50%, #3d2a1a 75%, #0A0A0A 100%)',
              }}
            />

            <PortfolioPreview />
          </div>

          {/* New Contact Section */}
          <div id="kontakt" data-section="dark" style={{ background: '#0A0A0A' }}>
            <ContactSection />
          </div>

          {/* Footer - also mark as dark for nav color sensing */}
          <div id="footer" data-section="dark">
            <Footer />
          </div>
        </div>

        {/* Scroll Up Hint — DISABLED FOR BASIS LAUNCH (chat is disabled) */}
      </motion.div>
    </>
  );
}
