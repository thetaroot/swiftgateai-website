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
        className="relative w-full"
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

            {/* Spiral Arrow with Text - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute right-0 md:right-12 bottom-0 md:-bottom-20 flex flex-col items-end"
              style={{ maxWidth: '320px' }}
            >
              {/* Text */}
              <p
                style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: 'clamp(12px, 1.4vw, 15px)',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textAlign: 'right',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                }}
              >
                Es muss nicht schwierig sein,
                <br />
                mit AI und Business-Integrationen
                <br />
                <span style={{ color: '#D39858' }}>2026</span> mitzuhalten.
              </p>

              {/* Spiral Arrow SVG */}
              <motion.svg
                width="180"
                height="200"
                viewBox="0 0 180 200"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
              >
                {/* Spiral path */}
                <motion.path
                  d="M160,20
                     C140,25 120,35 100,50
                     C70,70 50,90 40,115
                     C30,140 35,160 50,175
                     C60,185 45,190 30,195"
                  stroke="url(#spiralGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                />

                {/* Arrow head */}
                <motion.path
                  d="M30,195 L15,185 M30,195 L40,185"
                  stroke="#D39858"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2 }}
                />

                {/* Decorative dots along path */}
                <motion.circle
                  cx="130"
                  cy="35"
                  r="3"
                  fill="#D39858"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                />
                <motion.circle
                  cx="65"
                  cy="100"
                  r="2"
                  fill="rgba(211, 152, 88, 0.5)"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 }}
                />

                <defs>
                  <linearGradient id="spiralGradient" x1="160" y1="20" x2="30" y2="195">
                    <stop offset="0%" stopColor="rgba(211, 152, 88, 0.3)" />
                    <stop offset="50%" stopColor="#D39858" />
                    <stop offset="100%" stopColor="#85431E" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </motion.div>
          </div>

          {/* Side annotation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute left-6 md:left-12 top-1/2 hidden md:flex flex-col gap-4"
          >
            <span
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.25)',
                letterSpacing: '0.15em',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              AI SOLUTIONS
            </span>
          </motion.div>
        </div>

        {/* Spacer for spiral arrow */}
        <div className="h-32 md:h-48" style={{ background: '#0A0A0A' }} />

        {/* Golden Gradient Divider with Grain - Like the screenshot */}
        <div className="relative w-full" style={{ height: 'clamp(300px, 50vw, 600px)' }}>
          {/* Main gradient ellipse */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 120% 100% at 50% 0%, #D39858 0%, rgba(211, 152, 88, 0.8) 30%, rgba(211, 152, 88, 0.4) 50%, rgba(211, 152, 88, 0.1) 70%, transparent 90%)',
            }}
          />

          {/* Inner glow */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 80% at 50% 10%, rgba(234, 206, 170, 0.3) 0%, transparent 50%)',
            }}
          />

          {/* Grain texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              opacity: 0.15,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Dark overlay at bottom for transition */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background: 'linear-gradient(to top, #0A0A0A 0%, transparent 100%)',
            }}
          />

          {/* Transition curve to light section */}
          <svg
            viewBox="0 0 1440 120"
            className="absolute -bottom-1 w-full"
            preserveAspectRatio="none"
            style={{ height: '120px' }}
          >
            <path
              d="M0,120 L0,60 Q720,120 1440,60 L1440,120 Z"
              fill="#EACEAA"
            />
          </svg>
        </div>
      </div>

      {/* New Light Section */}
      <div
        className="relative w-full min-h-screen"
        style={{ background: '#EACEAA' }}
      >
        {/* Grain texture for light section */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.04,
            mixBlendMode: 'multiply',
          }}
        />

        {/* Content placeholder - can be filled later */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '12px',
                color: 'rgba(52, 21, 15, 0.5)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              [ Weiter ]
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(WhatIDoSection);
