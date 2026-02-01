'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
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
    <footer className={`relative z-10 bg-[var(--color-brown)] ${isMobile ? 'py-6 px-5' : 'py-8 px-8'}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col items-center ${isMobile ? 'gap-5' : 'gap-6'}`}>
          {/* Legal Links */}
          <div className={isMobile ? 'flex gap-5' : 'flex gap-6'}>
            <button
              onClick={() => router.push('/impressum')}
              className={`${isMobile ? 'text-xs' : 'text-sm'} text-[var(--color-beige)] hover:text-[var(--color-green)] transition-colors duration-200 font-medium`}
            >
              Impressum
            </button>
            <button
              onClick={() => router.push('/datenschutz')}
              className={`${isMobile ? 'text-xs' : 'text-sm'} text-[var(--color-beige)] hover:text-[var(--color-green)] transition-colors duration-200 font-medium`}
            >
              Datenschutz
            </button>
          </div>

          {/* Copyright & Rights */}
          <div className={`flex flex-col items-center text-center ${isMobile ? 'gap-1.5 px-2' : 'gap-2'}`}>
            <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-[var(--color-beige)] font-semibold`}>
              © {currentYear} Swiftgateai – Alle Rechte vorbehalten
            </div>
            <div className={`${isMobile ? 'text-[11px] leading-relaxed' : 'text-xs'} text-[var(--color-beige)] max-w-2xl`}>
              Sämtliche Inhalte, Texte, Bilder, Grafiken und Designelemente dieser Website unterliegen
              dem Urheberrecht und sind Eigentum von Luis Amadeus Guenther / Swiftgateai.
              Jegliche Verwendung, Vervielfältigung oder Verbreitung ohne ausdrückliche schriftliche
              Genehmigung ist untersagt.
            </div>
          </div>

          {/* Additional Info */}
          <div className={`flex items-center gap-2 ${isMobile ? 'text-[11px]' : 'text-xs'} text-[var(--color-beige)]`}>
            <span>Made with</span>
            <svg
              width={isMobile ? 11 : 12}
              height={isMobile ? 10 : 11}
              viewBox="0 0 24 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>in Essen, Deutschland</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
