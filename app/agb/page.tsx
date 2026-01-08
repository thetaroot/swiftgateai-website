'use client';

import LegalNavigation from '@/components/LegalNavigation';
import Footer from '@/components/Footer';

export default function AGB() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F5F1ED]">
      <LegalNavigation />
      <div className="flex-1 pt-32 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-[#8B7355] mb-12">AGB</h1>
          <div className="prose prose-lg text-[#8B7355]">
            <p>Allgemeine Geschäftsbedingungen</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
