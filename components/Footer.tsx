'use client';

import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-[#F5F1ED] py-8 px-8 border-t border-[#E8E5D9]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          {/* Legal Links */}
          <div className="flex gap-6">
            <button
              onClick={() => router.push('/impressum')}
              className="text-sm text-[#8B7355] hover:text-[#6B5745] transition-colors duration-200 font-medium"
            >
              Impressum
            </button>
            <button
              onClick={() => router.push('/datenschutz')}
              className="text-sm text-[#8B7355] hover:text-[#6B5745] transition-colors duration-200 font-medium"
            >
              Datenschutz
            </button>
          </div>

          {/* Copyright & Rights */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="text-sm text-[#8B7355] font-semibold">
              © {currentYear} Swiftgateai – Alle Rechte vorbehalten
            </div>
            <div className="text-xs text-[#8B7355]/80 max-w-2xl">
              Sämtliche Inhalte, Texte, Bilder, Grafiken und Designelemente dieser Website unterliegen
              dem Urheberrecht und sind Eigentum von Luis Amadeus Guenther / Swiftgateai.
              Jegliche Verwendung, Vervielfältigung oder Verbreitung ohne ausdrückliche schriftliche
              Genehmigung ist untersagt.
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex items-center gap-2 text-xs text-[#8B7355]/60">
            <span>Made with</span>
            <svg
              width="12"
              height="11"
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
