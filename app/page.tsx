'use client';

import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import BrowserMockup from '@/components/BrowserMockup';
import ServicesSection from '@/components/ServicesSection';
import PersonalSection from '@/components/PersonalSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col">
      <AnimatedBackground />
      <Navigation />
      <PageTransition>
        <div className="relative z-10 h-screen flex items-end justify-center px-8 pb-16">
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
