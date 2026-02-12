'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ServicesAccordion from './ServicesAccordion';
import AboutMeModal from './AboutMeModal';
import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';

function WhatIDoSection() {
  const [showAboutMe, setShowAboutMe] = useState(false);
  const { t } = useTranslation();
  const isMobile = useMobile();

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

          {/* Main Typography Block */}
          <div className="relative">
            {/* WORD 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
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
            <div className={`relative flex items-end ${isMobile ? 'gap-3 my-1' : 'gap-4 md:gap-8 my-2 md:my-4'}`}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
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
                }}
              >
                {/* Frame decoration */}
                <div
                  className="absolute -inset-2 rounded-[20px]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(211, 152, 88, 0.3) 0%, rgba(133, 67, 30, 0.1) 100%)',
                    filter: 'blur(20px)',
                  }}
                />

                {/* Image container with organic shape */}
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%',
                    border: '2px solid rgba(211, 152, 88, 0.3)',
                  }}
                >
                  <Image
                    src="/pictures/portrait.jpg"
                    alt="Portrait"
                    fill
                    priority
                    className="object-cover"
                    style={{ filter: 'contrast(1.05) saturate(0.9)' }}
                  />

                  {/* Clickable Overlay for Portrait */}
                  <button
                    onClick={() => setShowAboutMe(true)}
                    className="absolute inset-0 z-10 cursor-pointer opacity-0 hover:opacity-10 transition-opacity bg-white"
                    aria-label="About Me"
                  />

                  {/* Subtle overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, transparent 60%, rgba(10, 10, 10, 0.4) 100%)',
                    }}
                  />
                </div>


              </motion.div>
            </div>

            {/* WORD 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
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

            {/* Text block - Right Side on desktop, below on mobile */}
            {isMobile ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8"
              >
                <div>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    style={{
                      fontFamily: '"Space Grotesk", -apple-system, sans-serif',
                      fontSize: '18px',
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.85)',
                      lineHeight: 1.4,
                      margin: 0,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {t.whatIDo.sideText.p1}
                    <br />
                    <span style={{ color: '#D39858', fontWeight: 600 }}>{t.whatIDo.sideText.p2}</span>
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.9)',
                      lineHeight: 1.6,
                      margin: 0,
                      marginTop: '8px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {t.whatIDo.sideText.sub}
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute right-0 md:right-8 bottom-0 md:-bottom-8 flex flex-col items-end"
                style={{ maxWidth: '380px' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    style={{
                      fontFamily: '"Space Grotesk", -apple-system, sans-serif',
                      fontSize: 'clamp(18px, 2.5vw, 26px)',
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.85)',
                      lineHeight: 1.4,
                      margin: 0,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {t.whatIDo.sideText.p1}
                    <br />
                    <span style={{ color: '#D39858', fontWeight: 600 }}>{t.whatIDo.sideText.p2}</span>
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: 'clamp(12px, 1.4vw, 15px)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      lineHeight: 1.6,
                      margin: 0,
                      marginTop: '8px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {t.whatIDo.sideText.sub}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </div>

          {/* New About Me Teaser Block - repositioned for mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className={isMobile
              ? 'mt-10 max-w-full'
              : 'absolute right-4 md:right-12 bottom-[-100px] md:bottom-[-80px] z-10 max-w-[280px]'
            }
          >
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
              <p className="text-[#D39858] text-xs font-mono mb-2 tracking-widest uppercase">{t.whatIDo.teaser.label}</p>
              <p className="text-white/80 text-sm font-medium leading-relaxed mb-3">
                {t.whatIDo.teaser.text}
              </p>
              <button
                onClick={() => setShowAboutMe(true)}
                className="text-xs font-bold text-white flex items-center gap-2 group"
              >
                {t.whatIDo.teaser.cta}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </motion.div>

          {/* Side annotation */}

        </div>

        {/* Spacer for text overflow */}
        <div className={isMobile ? 'h-8' : 'h-16 md:h-24'} style={{ background: '#0A0A0A' }} />

        {/* Gradient transition zone with loopy arrow */}
        <div
          className="relative w-full"
          style={{
            height: isMobile ? 'clamp(200px, 40vw, 350px)' : 'clamp(400px, 60vw, 700px)',
            background: 'linear-gradient(to bottom, #0A0A0A 0%, #1a1008 12%, #3d2514 26%, #6b3d1e 40%, #9b6235 52%, #c08a52 64%, #d4a56c 75%, #e2be8e 86%, #EACEAA 100%)',
          }}
        >
          {/* Grain texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.12,
              mixBlendMode: 'overlay',
              background: 'repeating-conic-gradient(rgba(255,255,255,0.15) 0% 25%, transparent 0% 50%) 0 0 / 3px 3px',
            }}
          />

          {/* Arrow Removed as requested */}
        </div>
      </div>

      {/* About Me Modal */}
      <AboutMeModal isOpen={showAboutMe} onClose={() => setShowAboutMe(false)} />

      {/* SERVICES title wrapper - positioned to overlap gradient and light section */}
      <div className="relative w-full" style={{ marginTop: '-1px' }}>
        {/* SERVICES text - top portion visible, bottom hidden behind light bg */}
        <motion.div
          className="absolute left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden"
          style={{
            top: isMobile ? '-60px' : 'clamp(-450px, -20vw, -200px)',
            zIndex: 1,
          }}
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
              color: isMobile ? '#EACEAA' : '#34150F',
              letterSpacing: '-0.04em',
              lineHeight: 0.85,
              textAlign: 'center',
              opacity: isMobile ? 0.35 : 0.15,
              whiteSpace: 'nowrap',
            }}
          >
            {t.whatIDo.servicesTitle}
          </h2>
        </motion.div>

        {/* Light section covers the bottom third of SERVICES */}
        <div
          data-section="light"
          className="relative w-full"
          style={{ background: '#EACEAA', zIndex: 2 }}
        >
          {/* Detailed Scroll Target for Nav */}
          <div id="services-anchor" className="absolute -top-24" />

          {/* Subtle noise for light section */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.03,
              mixBlendMode: 'multiply',
              background: 'repeating-conic-gradient(rgba(0,0,0,0.1) 0% 25%, transparent 0% 50%) 0 0 / 3px 3px',
            }}
          />

          {/* Services Accordion */}
          <div className="relative">
            <ServicesAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(WhatIDoSection);
