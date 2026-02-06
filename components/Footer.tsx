'use client';

import { useRouter } from 'next/navigation';
import { useCallback, memo } from 'react';
import { useMobile } from '@/hooks/useMobile';

// Current year - computed once
const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  const router = useRouter();
  const isMobile = useMobile();

  const handleNavigate = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  return (
    <footer
      className={`relative z-10 ${isMobile ? 'py-6 px-5' : 'py-8 px-8'}`}
      style={{ background: 'var(--color-balsamico)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col items-center ${isMobile ? 'gap-5' : 'gap-6'}`}>
          {/* Legal Links */}
          <div className={isMobile ? 'flex gap-5' : 'flex gap-6'}>
            <button
              onClick={() => handleNavigate('/impressum')}
              className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium transition-colors duration-200 hover:text-[var(--color-whiskey)]`}
              style={{ color: 'var(--color-champagne)', textShadow: '0 1px 4px rgba(21, 12, 12, 0.6)' }}
            >
              Impressum
            </button>
            <button
              onClick={() => handleNavigate('/datenschutz')}
              className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium transition-colors duration-200 hover:text-[var(--color-whiskey)]`}
              style={{ color: 'var(--color-champagne)', textShadow: '0 1px 4px rgba(21, 12, 12, 0.6)' }}
            >
              Datenschutz
            </button>
          </div>

          {/* Copyright */}
          <div className={`flex flex-col items-center text-center ${isMobile ? 'gap-1.5 px-2' : 'gap-2'}`}>
            <div
              className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold`}
              style={{ color: 'var(--color-champagne)' }}
            >
              © {CURRENT_YEAR} Swiftgateai – Alle Rechte vorbehalten
            </div>
            <div
              className={`${isMobile ? 'text-[11px] leading-relaxed' : 'text-xs'} max-w-2xl`}
              style={{ color: 'rgba(234, 206, 170, 0.75)' }}
            >
              Sämtliche Inhalte, Texte, Bilder, Grafiken und Designelemente dieser Website unterliegen
              dem Urheberrecht und sind Eigentum von Luis Amadeus Guenther / Swiftgateai.
              Jegliche Verwendung, Vervielfältigung oder Verbreitung ohne ausdrückliche schriftliche
              Genehmigung ist untersagt.
            </div>
          </div>

          {/* Made with love */}
          <div
            className={`flex items-center gap-2 ${isMobile ? 'text-[11px]' : 'text-xs'}`}
            style={{ color: 'rgba(234, 206, 170, 0.8)' }}
          >
            <span>Made with</span>
            <svg
              width={isMobile ? 11 : 12}
              height={isMobile ? 10 : 11}
              viewBox="0 0 24 22"
              fill="none"
              stroke="#D39858"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
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

export default memo(Footer);
