'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ChatInput from '@/components/ChatInput';
import ChatOverlay from '@/components/ChatOverlay';
import ChatBubble from '@/components/ChatBubble';
import PortfolioPreview from '@/components/PortfolioPreview';
import Footer from '@/components/Footer';
import BrutalistTextBlock from '@/components/BrutalistTextBlock';
import WhatIDoSection from '@/components/WhatIDoSection';
import ContactSection from '@/components/ContactSection';
import MobileMenu from '@/components/MobileMenu';
import SettingsModal from '@/components/SettingsModal';
import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';

export default function Home() {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const [isInDarkSection, setIsInDarkSection] = useState(false);
  const [isPastFirstSection, setIsPastFirstSection] = useState(false);
  const pageScrollRef = useRef<HTMLDivElement>(null);
  const chatSectionRef = useRef<HTMLElement>(null);

  const handleScrollTo = (id: string) => {
    const targetId = id === 'services' ? 'services-anchor' : id === 'portfolio' ? 'portfolio-anchor' : id === 'architecture' ? 'architecture-anchor' : id;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // IntersectionObserver for nav color switching
  useEffect(() => {
    const container = pageScrollRef.current;
    if (!container) return;

    const darkSections = container.querySelectorAll('[data-section="dark"]');
    if (darkSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
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
        rootMargin: '0px 0px -80% 0px',
        threshold: 0,
      }
    );

    darkSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

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

  return (
    <>
      {/* Main Content */}
      <div
        style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 10, background: '#EACEAA' }}
      >
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
              {/* Logo — clickable and scroll to top */}
              <motion.button
                className="select-none hidden md:block bg-transparent border-none cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <span
                  className="transition-colors duration-500 hover:opacity-80"
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
              </motion.button>

              {/* Navigation & Settings */}
              <div className="flex items-center gap-3 md:gap-8">
                {/* Desktop Nav Links */}
                <motion.nav
                  className="hidden md:flex items-center gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {[
                    { key: 'architecture', label: t.common.architecture },
                    { key: 'services', label: t.common.services },
                    { key: 'portfolio', label: t.common.portfolio, disabled: false },
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
            </div>
          </div>
        </motion.div>

        {/* Brutalist Text Block - Fixed on desktop, hidden on mobile (shown inline in hero) */}
        {!isMobile && !isPastFirstSection && (
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
            ref={chatSectionRef}
            data-section="light"
            className="relative"
            style={{ background: '#EACEAA', contain: 'layout style', minHeight: isMobile ? '100dvh' : '100vh' }}
          >
            {/* Mobile Hero — centered vertical layout */}
            {isMobile ? (
              <div
                className="flex flex-col h-full"
                style={{
                  minHeight: '100dvh',
                  padding: '80px 24px 32px', // Standard padding + header height
                }}
              >
                {/* Centered Content Wrapper */}
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                  {/* Brand Heading — desktop-style with AI INTELLIGENCE subtitle */}
                  <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-center mb-8"
                  >
                    <h1
                      style={{
                        fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                        fontSize: 'clamp(56px, 16vw, 80px)',
                        fontWeight: 400,
                        color: '#34150F',
                        letterSpacing: '0.05em',
                        lineHeight: 0.9,
                        margin: 0,
                      }}
                    >
                      SWIFTGATE
                    </h1>
                    <span
                      style={{
                        fontFamily: '"Courier New", monospace',
                        fontSize: '12px',
                        color: 'rgba(52, 21, 15, 0.45)',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginTop: '6px',
                      }}
                    >
                      AI SYSTEMS
                    </span>
                  </motion.div>

                  {/* Chat Input — centered */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="w-full mb-10"
                  >
                    <ChatInput />
                  </motion.div>

                  {/* Description Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="w-full flex justify-center"
                  >
                    <BrutalistTextBlock isVisible />
                  </motion.div>
                </div>

                {/* Scroll Down Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="pt-6 pb-2"
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
              <div className="flex flex-col items-center justify-center w-full h-full max-w-4xl mx-auto px-4" style={{ minHeight: '100vh', paddingTop: '80px' }}>
                {/* Desktop Hero Layout: Clean Center Stack */}

                {/* 1. Large Brand Heading (Optional, users usually want logo + clear text. The prompt says "swiftgate logo -> chat -> text") */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-12 text-center"
                >
                  <h1
                    style={{
                      fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                      fontSize: 'clamp(60px, 8vw, 100px)',
                      color: 'var(--text-primary)',
                      letterSpacing: '0.05em',
                      lineHeight: 0.9,
                      margin: 0,
                    }}
                  >
                    SWIFTGATE
                  </h1>
                  <span
                    style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: '14px',
                      color: 'rgba(52, 21, 15, 0.45)',
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginTop: '8px'
                    }}
                  >
                    AI SYSTEMS
                  </span>
                </motion.div>

                {/* 2. Chat Input - CENTRAL FOCUS */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full max-w-2xl mb-12 relative z-20"
                >
                  <ChatInput />
                </motion.div>

              </div>
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
            <div id="portfolio-anchor" style={{ scrollMarginTop: '60px' }} />
            <PortfolioPreview />
          </div>

          {/* New Contact Section */}
          <div id="kontakt" data-section="dark" style={{ background: '#0A0A0A' }}>
            <ContactSection />
          </div>

          <div id="footer" data-section="dark">
            <Footer />
          </div>
        </div>
      </div>

      {/* Chat Overlay (portal) */}
      <ChatOverlay />

      {/* Chat Bubble (floating button) */}
      <ChatBubble chatSectionRef={chatSectionRef} />
    </>
  );
}
