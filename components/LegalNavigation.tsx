'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LegalNavigation() {
  const router = useRouter();

  useEffect(() => {
    // Save current scroll position and URL before navigating to legal pages
    const handleBeforeUnload = () => {
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        // Only save if not already on a legal page
        if (!currentPath.includes('/impressum') && !currentPath.includes('/datenschutz')) {
          sessionStorage.setItem('lastNonLegalPage', currentPath);
          sessionStorage.setItem('lastScrollPosition', window.scrollY.toString());
        }
      }
    };

    // Save on component mount (user is navigating TO legal page)
    handleBeforeUnload();
  }, []);

  const handleBackClick = () => {
    if (typeof window !== 'undefined') {
      const lastPage = sessionStorage.getItem('lastNonLegalPage');
      const lastScroll = sessionStorage.getItem('lastScrollPosition');

      if (lastPage) {
        router.push(lastPage);
        // Restore scroll position after navigation
        setTimeout(() => {
          if (lastScroll) {
            window.scrollTo(0, parseInt(lastScroll, 10));
          }
        }, 100);
      } else {
        // Fallback to home if no previous page stored
        router.push('/');
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-8 pb-4 bg-[#F5F1ED]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="text-[#8B7355] hover:text-[#6B5745] transition-colors duration-200 text-base font-medium"
          >
            ← Zurück
          </button>

          {/* Logo */}
          <button
            onClick={() => router.push('/')}
            className="text-[#8B7355] text-2xl font-bold tracking-tight hover:text-[#6B5745] transition-colors duration-200"
          >
            SWIFTGATE
          </button>
        </div>
      </div>
    </nav>
  );
}
