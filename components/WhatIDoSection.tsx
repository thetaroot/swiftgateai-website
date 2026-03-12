'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ServicesAccordion from './ServicesAccordion';
import ArchitectureSection from './ArchitectureSection';
import AboutMeModal from './AboutMeModal';
import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';

function WhatIDoSection() {
  const [showAboutMe, setShowAboutMe] = useState(false);
  const { t } = useTranslation();
  const isMobile = useMobile();

  // Removed useScroll for performance optimizations. Now using whileInView.

  return (
    <section className="relative w-full">
      {/* Creative Dark Divider with Rounded Top */}
      <div className="relative w-full h-32 overflow-hidden">
        {/* Main curve */}
        <svg
          viewBox="0 0 1440 128"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Organic wave shape */}
          <path
            d="M0,128 L0,64 Q360,0 720,32 Q1080,64 1440,16 L1440,128 Z"
            fill="#0A0A0A"
          />
          {/* Subtle inner highlight curve */}
          <path
            d="M0,128 L0,80 Q360,24 720,48 Q1080,72 1440,32 L1440,128 Z"
            fill="#111111"
          />
        </svg>

        {/* Static accent dots - no animation for better scroll perf */}
        <div
          className="absolute w-3 h-3 rounded-full"
          style={{ left: '15%', top: '60%', background: 'linear-gradient(135deg, #D39858 0%, #85431E 100%)' }}
        />
        <div
          className="absolute w-2 h-2 rounded-full"
          style={{ right: '20%', top: '40%', background: '#D39858', opacity: 0.6 }}
        />
      </div>

      {/* Main Content Area - Dark Background */}
      <div
        data-section="dark"
        className="relative w-full"
        style={{ background: '#0A0A0A', contain: 'layout style paint' }}
      >
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(211, 152, 88, 0.03) 0%, transparent 50%)',
          }}
        />

        {/* Content Container */}
        <div className={`relative max-w-7xl mx-auto ${isMobile ? 'px-5 py-16' : 'px-6 md:px-12 py-24 md:py-32'}`}>

          {/* MAIN HEADER ROW */}
          <div className="relative w-full flex flex-col items-center lg:items-start z-10">
            {/* BIG TITLE BLOCK */}
            <div className={`w-full lg:w-max relative z-10 ${isMobile ? 'mb-16' : 'mb-8'}`}>

              {/* WORD 1 */}
              <motion.div
                initial={isMobile ? { opacity: 0, x: -30 } : { opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2
                  style={{
                    fontFamily: '"Space Grotesk", -apple-system, sans-serif',
                    fontSize: isMobile ? 'clamp(48px, 15vw, 70px)' : 'clamp(60px, 18vw, 200px)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '-0.04em',
                    lineHeight: 0.85,
                    margin: 0,
                  }}
                >
                  {t.whatIDo.bigTitle.word1}
                </h2>
              </motion.div>

              {/* WORD 2 - with Portrait integrated */}
              <div className={`relative flex items-center ${isMobile ? 'gap-4 my-2' : 'gap-4 md:gap-8 my-2 md:my-4'}`}>
                <motion.div
                  initial={isMobile ? { opacity: 0, x: -30 } : { opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2
                    style={{
                      fontFamily: '"Space Grotesk", -apple-system, sans-serif',
                      fontSize: isMobile ? 'clamp(48px, 15vw, 70px)' : 'clamp(60px, 18vw, 200px)',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      letterSpacing: '-0.04em',
                      lineHeight: 0.85,
                      margin: 0,
                      marginBottom: isMobile ? '4px' : '20px',
                      marginTop: isMobile ? '4px' : '20px',
                    }}
                  >
                    {t.whatIDo.bigTitle.word2}
                  </h2>
                </motion.div>

                {/* Asterisk Symbol */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-4 md:mb-8"
                >
                  <span
                    style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: 'clamp(30px, 8vw, 80px)',
                      fontWeight: 700,
                      color: '#D39858',
                    }}
                  >
                    *
                  </span>
                </motion.div>

                {/* Portrait Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative ${isMobile ? 'mb-1' : 'mb-2 md:mb-4'}`}
                  style={{
                    width: isMobile ? '70px' : 'clamp(80px, 20vw, 180px)',
                    height: isMobile ? '88px' : 'clamp(100px, 24vw, 220px)',
                    top: isMobile ? '4px' : '0',
                  }}
                >
                  {/* Frame decoration */}
                  <div
                    className="absolute -inset-2"
                    style={{
                      background: 'linear-gradient(135deg, rgba(211, 152, 88, 0.3) 0%, rgba(133, 67, 30, 0.1) 100%)',
                      filter: 'blur(20px)',
                      borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%',
                    }}
                  />

                  {/* Image container */}
                  <button
                    onClick={() => setShowAboutMe(true)}
                    className="relative w-full h-full overflow-hidden group cursor-pointer"
                    style={{
                      borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%',
                      border: 'none',
                      padding: 0,
                      margin: 0,
                      background: 'none',
                      display: 'block'
                    }}
                    aria-label="About Me"
                  >
                    <Image
                      src="/pictures/portrait.jpg"
                      alt="Portrait"
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ filter: 'contrast(1.05) saturate(0.9)' }}
                    />
                    {/* Dark hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex items-center justify-center backdrop-blur-[2px]">
                      <span className="text-white font-mono text-sm tracking-widest font-semibold flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        {t.whatIDo.teaser.cta} <span className="text-[#D39858]">→</span>
                      </span>
                    </div>
                  </button>
                </motion.div>
              </div>

              {/* WORD 3 */}
              <motion.div
                initial={isMobile ? { opacity: 0, x: -30 } : { opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2
                  style={{
                    fontFamily: '"Space Grotesk", -apple-system, sans-serif',
                    fontSize: isMobile ? 'clamp(48px, 15vw, 70px)' : 'clamp(60px, 18vw, 200px)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '-0.04em',
                    lineHeight: 0.85,
                    margin: 0,
                  }}
                >
                  {t.whatIDo.bigTitle.word3}
                </h2>
              </motion.div>
            </div>

            {/* Removed old disjointed SVG connector */}

            {/* "KI als Mitarbeiter" Title */}
            <div className="w-full flex justify-center mt-12 lg:mt-24 mb-12 lg:mb-24 relative z-10">
              <div id="ai-employee-anchor" style={{ position: 'absolute', top: '-10px', scrollMarginTop: '70px' }} />
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                  fontFamily: '"Space Grotesk", -apple-system, sans-serif',
                  fontSize: isMobile ? '36px' : 'clamp(42px, 5vw, 64px)',
                  fontWeight: 600,
                  color: '#D39858',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                {t.whatIDo.sideText.p1}
              </motion.h3>
            </div>
          </div>

          {/* TIMELINE GRID SECTION */}
          <div className="relative w-full pt-8 pb-8 px-4 md:px-0">
            {/* Desktop 3-Column Grid */}
            {!isMobile && (
              <div className="grid grid-cols-[1fr_80px_1fr] w-full max-w-[1200px] mx-auto gap-0">
                {t.whatIDo.sideText.sections?.map((section: { id: string; title: string; text: string }, idx: number) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <div key={idx} className="contents group">
                      {/* Left Col */}
                      <div className={`flex w-full h-full items-center py-16 lg:py-24 ${isLeft ? 'justify-end pr-[48px]' : ''}`}>
                        {isLeft && <TimelineCard section={section} isLeft={true} isMobile={false} />}
                      </div>

                      {/* Center Spine Col */}
                      <div className="relative w-full h-full flex justify-center">
                        <svg
                          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <path
                            d={isLeft
                              ? "M 50 -2 C 50 25, 0 40, 0 50 C 0 60, 50 75, 50 102"
                              : "M 50 -2 C 50 25, 100 40, 100 50 C 100 60, 50 75, 50 102"
                            }
                            vectorEffect="non-scaling-stroke"
                            fill="none"
                            stroke="#D39858"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            style={{ filter: 'drop-shadow(0 0 6px rgba(211,152,88,0.5))' }}
                          />
                        </svg>

                        {/* Node Dot exactly at the curve's apex */}
                        <div
                          className="absolute z-10 w-[22px] h-[22px] rounded-full bg-[#0A0A0A] border-[3px] border-[#D39858] shadow-[0_0_15px_rgba(211,152,88,0.8)]"
                          style={{
                            top: '50%',
                            left: isLeft ? '0%' : '100%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />

                        {/* The Horizontal Connector Branch to the Card */}
                        <div
                          className="absolute h-[2px] top-1/2 z-0"
                          style={{
                            width: '48px',
                            background: isLeft ? 'linear-gradient(to left, rgba(211,152,88,0.1), #D39858)' : 'linear-gradient(to right, rgba(211,152,88,0.1), #D39858)',
                            [isLeft ? 'right' : 'left']: '100%',
                            transform: 'translateY(-50%)'
                          }}
                        />
                      </div>

                      {/* Right Col */}
                      <div className={`flex w-full h-full items-center py-16 lg:py-24 ${!isLeft ? 'justify-start pl-[48px]' : ''}`}>
                        {!isLeft && <TimelineCard section={section} isLeft={false} isMobile={false} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Mobile 2-Column Grid */}
            {isMobile && (
              <div className="grid grid-cols-[40px_1fr] w-full gap-4 max-w-lg mx-auto">
                {t.whatIDo.sideText.sections?.map((section: { id: string; title: string; text: string }, idx: number) => {
                  return (
                    <div key={idx} className="contents group">
                      {/* Spine Col */}
                      <div className="relative w-full h-full">
                        <svg
                          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M 50 -2 C 50 25, 100 40, 100 50 C 100 60, 50 75, 50 102"
                            vectorEffect="non-scaling-stroke"
                            fill="none"
                            stroke="#D39858"
                            strokeWidth="3"
                            strokeLinecap="round"
                            style={{ filter: 'drop-shadow(0 0 4px rgba(211,152,88,0.5))' }}
                          />
                        </svg>

                        {/* Node Dot exactly at the curve's apex */}
                        <div
                          className="absolute z-10 w-[18px] h-[18px] rounded-full bg-[#0A0A0A] border-[2px] border-[#D39858] shadow-[0_0_10px_rgba(211,152,88,0.8)]"
                          style={{
                            top: '50%',
                            left: '100%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />

                        {/* Mobile Horizontal Connector */}
                        <div
                          className="absolute h-[2px] top-1/2 z-0"
                          style={{
                            width: '24px',
                            background: 'linear-gradient(to right, #D39858, rgba(211,152,88,0.1))',
                            left: '100%',
                            transform: 'translateY(-50%)'
                          }}
                        />
                      </div>

                      {/* Card Col */}
                      <div className="flex w-full h-full items-center py-10 pl-[24px]">
                        <TimelineCard section={section} isLeft={false} isMobile={true} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Spacer for text overflow */}
        <div className={isMobile ? 'h-4' : 'h-6 md:h-8'} style={{ background: '#0A0A0A' }} />
      </div>

      {/* Gradient transition: dark → light */}
      <div
        className="relative w-full"
        style={{
          height: isMobile ? 'clamp(80px, 18vw, 140px)' : 'clamp(120px, 18vw, 220px)',
          background: 'linear-gradient(to bottom, #0A0A0A 0%, #1a1008 14%, #3d2514 28%, #6b3d1e 42%, #9b6235 56%, #c08a52 70%, #d4a56c 82%, #e2be8e 92%, #EACEAA 100%)',
        }}
      />

      {/* About Me Modal */}
      <AboutMeModal isOpen={showAboutMe} onClose={() => setShowAboutMe(false)} />

      {/* Light section: Architecture + Services */}
      <div
        data-section="light"
        className="relative w-full"
        style={{ background: '#EACEAA' }}
      >
        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.03,
            mixBlendMode: 'multiply',
            background: 'repeating-conic-gradient(rgba(0,0,0,0.1) 0% 25%, transparent 0% 50%) 0 0 / 3px 3px',
          }}
        />

        {/* Architecture Diagram Section */}
        <ArchitectureSection />

        {/* SERVICES watermark title */}
        <div className="relative w-full overflow-hidden">
          <div id="services-anchor" style={{ position: 'absolute', top: '-80px' }} />
          <motion.div
            className="flex justify-center pointer-events-none select-none"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              style={{
                fontFamily: '"Space Grotesk", -apple-system, sans-serif',
                fontSize: isMobile ? 'clamp(60px, 20vw, 100px)' : 'clamp(120px, 22vw, 320px)',
                fontWeight: 800,
                color: '#1a0f0a',
                letterSpacing: '-0.04em',
                lineHeight: 0.85,
                textAlign: 'center',
                opacity: isMobile ? 0.15 : 0.07,
                whiteSpace: 'nowrap',
              }}
            >
              {t.whatIDo.servicesTitle}
            </h2>
          </motion.div>
        </div>

        {/* Services Accordion */}
        <div className="relative">
          <ServicesAccordion />
        </div>
      </div>
    </section>
  );
}

export default memo(WhatIDoSection);

const TimelineCard = ({ section, isLeft, isMobile }: { section: { id: string; title: string; text: string }, isLeft: boolean, isMobile: boolean }) => (
  <div
    className={`w-full ${isMobile ? 'max-w-md' : 'max-w-xl'} bg-[#13100e]/80 backdrop-blur-md border border-[#D39858]/10 hover:border-[#D39858]/40 p-6 md:p-10 rounded-[2rem] hover:-translate-y-1 transition-all duration-300 relative group`}
    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
  >
    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#D39858]/0 to-[#D39858]/0 group-hover:from-[#D39858]/5 group-hover:to-transparent transition-colors duration-500 pointer-events-none" />
    <h4 className="flex items-center gap-4 mb-5 relative z-10">
      <span className="font-mono text-[14px] md:text-[15px] tracking-widest text-[#D39858] font-bold bg-[#D39858]/10 px-3 py-1.5 rounded-lg border border-[#D39858]/30">
        {section.id}
      </span>
      <span className="font-bold text-[22px] md:text-[26px] text-white/95 tracking-tight leading-tight">
        {section.title}
      </span>
    </h4>
    <p className="font-medium text-white/70 leading-[1.7] text-[16px] md:text-[18px] relative z-10">
      {section.text}
    </p>
  </div>
);
