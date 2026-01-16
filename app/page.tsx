'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import BrowserMockup from '@/components/BrowserMockup';

// Lazy load below-the-fold components
const ServicesSection = dynamic(() => import('@/components/ServicesSection'), {
  loading: () => <div style={{ minHeight: '100vh' }} />,
});
const PersonalSection = dynamic(() => import('@/components/PersonalSection'), {
  loading: () => <div style={{ minHeight: '100vh' }} />,
});
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div style={{ minHeight: '200px' }} />,
});

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="flex flex-col">
      <AnimatedBackground />
      <Navigation />
      <PageTransition>
        <div className={`relative z-10 h-screen flex justify-center ${isMobile ? 'items-center px-5 pt-8' : 'items-end px-8 pb-16'}`}>
          <div className="w-full flex items-center justify-center">
            <BrowserMockup />
          </div>
        </div>
        <ServicesSection />
        <PersonalSection />
      </PageTransition>
      <Footer />
    </main>
  );
}
