'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import ChatWindow from '@/components/ChatWindow';
import PortfolioPreview from '@/components/PortfolioPreview';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBackgroundColor = (progress: number) => {
    if (progress < 0.3) return 'rgba(0, 0, 0, 0)';
    if (progress > 0.7) return 'rgba(24, 40, 24, 1)';
    const opacity = (progress - 0.3) / 0.4;
    return `rgba(24, 40, 24, ${opacity})`;
  };

  return (
    <div
      style={{
        scrollSnapType: 'y mandatory',
      }}
    >
      {/* Background Overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundColor: getBackgroundColor(scrollProgress),
          transition: 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* ChatWindow - FIXED */}
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: 10,
          opacity: scrollProgress < 0.4 ? 1 : 0,
          pointerEvents: scrollProgress < 0.4 ? 'auto' : 'none',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <ChatWindow />
      </motion.div>

      {/* Chat Section */}
      <section
        style={{
          height: '100vh',
          scrollSnapAlign: 'start',
        }}
      />

      {/* Portfolio Section */}
      <section
        style={{
          scrollSnapAlign: 'start',
        }}
      >
        <PortfolioPreview />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
