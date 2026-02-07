'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

function WhatIDoSection() {
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

        {/* Floating accent elements */}
        <motion.div
          className="absolute"
          style={{ left: '15%', top: '60%' }}
          animate={{
            y: [0, -8, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: 'linear-gradient(135deg, #D39858 0%, #85431E 100%)' }}
          />
        </motion.div>

        <motion.div
          className="absolute"
          style={{ right: '20%', top: '40%' }}
          animate={{
            y: [0, 6, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: '#D39858', opacity: 0.6 }}
          />
        </motion.div>
      </div>

      {/* Main Content Area - Dark Background */}
      <div
        className="relative w-full min-h-screen"
        style={{ background: '#0A0A0A' }}
      >
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(211, 152, 88, 0.03) 0%, transparent 50%)',
          }}
        />

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">

          {/* Small Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '12px',
                color: 'rgba(211, 152, 88, 0.7)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              [ Services ]
            </span>
          </motion.div>

          {/* Main Typography Block */}
          <div className="relative">
            {/* WHAT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2
                style={{
                  fontFamily: '"Space Grotesk", -apple-system, sans-serif',
                  fontSize: 'clamp(80px, 18vw, 200px)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.85,
                  margin: 0,
                }}
              >
                WHAT
              </h2>
            </motion.div>

            {/* I - with Portrait integrated */}
            <div className="relative flex items-end gap-4 md:gap-8 my-2 md:my-4">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2
                  style={{
                    fontFamily: '"Space Grotesk", -apple-system, sans-serif',
                    fontSize: 'clamp(80px, 18vw, 200px)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '-0.04em',
                    lineHeight: 0.85,
                    margin: 0,
                  }}
                >
                  I
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
                    fontSize: 'clamp(40px, 8vw, 80px)',
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
                className="relative mb-2 md:mb-4"
                style={{
                  width: 'clamp(100px, 20vw, 180px)',
                  height: 'clamp(120px, 24vw, 220px)',
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
                    className="object-cover"
                    style={{ filter: 'contrast(1.05) saturate(0.9)' }}
                  />

                  {/* Subtle overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, transparent 60%, rgba(10, 10, 10, 0.4) 100%)',
                    }}
                  />
                </div>

                {/* Decorative bracket */}
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="absolute -right-6 top-1/2 -translate-y-1/2"
                  style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '24px',
                    color: 'rgba(211, 152, 88, 0.5)',
                  }}
                >
                  )
                </motion.span>
              </motion.div>
            </div>

            {/* DO */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2
                style={{
                  fontFamily: '"Space Grotesk", -apple-system, sans-serif',
                  fontSize: 'clamp(80px, 18vw, 200px)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.85,
                  margin: 0,
                }}
              >
                DO
              </h2>
            </motion.div>
          </div>

          {/* Side annotations */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute right-6 md:right-12 top-1/3 hidden md:flex flex-col gap-4"
          >
            <span
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.3)',
                letterSpacing: '0.15em',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              FULL-STACK DEVELOPMENT
            </span>
          </motion.div>

          {/* Bottom description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 md:mt-24 max-w-xl"
          >
            <p
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: 'clamp(16px, 2vw, 20px)',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.7,
              }}
            >
              Moderne Webentwicklung mit Fokus auf Performance,
              Design und User Experience. Von der Konzeption
              bis zum Launch.
            </p>

            {/* Service tags */}
            <div className="flex flex-wrap gap-3 mt-8">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'UI/UX'].map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '12px',
                    color: 'rgba(211, 152, 88, 0.8)',
                    padding: '8px 16px',
                    border: '1px solid rgba(211, 152, 88, 0.3)',
                    borderRadius: '4px',
                    background: 'rgba(211, 152, 88, 0.05)',
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(WhatIDoSection);
