'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, memo } from 'react';
import { useMobile } from '@/hooks/useMobile';

// Animation configs - defined outside component
const springConfig = { type: 'spring' as const, stiffness: 400, damping: 30 };
const fadeConfig = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };

// Navigation items - defined outside component
const NAV_ITEMS = [
  { label: 'Über mich', path: '/ueber-mich' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Kontakt', path: '/kontakt' },
] as const;

function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const handleNavClick = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Mobile Navigation
  if (isMobile) {
    return (
      <>
        {/* Mobile Header */}
        <nav className="fixed top-0 left-0 right-0 z-[100]" style={{
          paddingTop: 'max(20px, env(safe-area-inset-top))',
          paddingBottom: '20px',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          background: 'linear-gradient(180deg, rgba(21, 12, 12, 0.95) 0%, rgba(52, 21, 15, 0.9) 85%, rgba(52, 21, 15, 0.7) 100%)',
          boxShadow: '0 4px 20px rgba(21, 12, 12, 0.4)',
        }}>
          <div className="flex justify-between items-center px-5">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('/')}
              className="text-xl font-bold tracking-tight"
              style={{ color: '#EACEAA', textShadow: '0 2px 8px rgba(21, 12, 12, 0.8)' }}
            >
              SWIFTGATE
            </button>

            {/* Menu Button */}
            <motion.button
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 flex justify-center items-center rounded-xl z-[101]"
              style={{
                background: isMenuOpen ? 'rgba(133, 67, 30, 0.3)' : 'rgba(234, 206, 170, 0.15)',
                border: `2px solid ${isMenuOpen ? 'rgba(211, 153, 88, 0.5)' : 'rgba(234, 206, 170, 0.3)'}`,
                backdropFilter: 'blur(8px)',
                boxShadow: isMenuOpen ? '0 0 16px rgba(211, 153, 88, 0.4)' : 'none',
              }}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <path d="M15 5L5 15M5 5L15 15" stroke="#EACEAA" strokeWidth="2.5" strokeLinecap="round" />
                ) : (
                  <>
                    <circle cx="10" cy="4" r="1.5" fill="#EACEAA" />
                    <circle cx="10" cy="10" r="1.5" fill="#EACEAA" />
                    <circle cx="10" cy="16" r="1.5" fill="#EACEAA" />
                  </>
                )}
              </motion.svg>
            </motion.button>
          </div>
        </nav>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={fadeConfig}
              className="fixed left-5 right-5 z-[98]"
              style={{ top: 'max(84px, calc(env(safe-area-inset-top) + 64px))' }}
            >
              <div className="rounded-3xl overflow-hidden" style={{
                background: 'rgba(52, 21, 15, 0.9)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                border: '1px solid rgba(133, 67, 30, 0.4)',
                boxShadow: '0 20px 60px -10px rgba(21, 12, 12, 0.6), inset 0 1px 0 rgba(234, 206, 170, 0.15)',
                padding: '20px',
              }}>
                <div className="flex flex-col gap-3">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = pathname === item.path;
                    return (
                      <motion.button
                        key={item.path}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                        onClick={() => handleNavClick(item.path)}
                        className="relative rounded-2xl py-4 px-6 text-left text-lg font-medium uppercase tracking-wide"
                        style={{
                          background: isActive ? 'rgba(133, 67, 30, 0.35)' : 'rgba(234, 206, 170, 0.08)',
                          border: `2px solid ${isActive ? 'rgba(211, 153, 88, 0.6)' : 'rgba(234, 206, 170, 0.15)'}`,
                          color: isActive ? '#EACEAA' : 'rgba(234, 206, 170, 0.85)',
                          textShadow: '0 2px 8px rgba(21, 12, 12, 0.8)',
                          boxShadow: isActive ? '0 4px 12px rgba(211, 153, 88, 0.3)' : 'none',
                        }}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-1 h-3/5 rounded-full"
                            style={{
                              background: 'linear-gradient(180deg, rgba(211, 153, 88, 0.9) 0%, rgba(133, 67, 30, 0.5) 100%)',
                              boxShadow: '0 0 10px rgba(211, 153, 88, 0.7)',
                            }}
                            transition={springConfig}
                          />
                        )}
                        <span className={isActive ? 'pl-3' : ''}>{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop Navigation
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{
      paddingTop: '32px',
      paddingBottom: '16px',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      background: 'linear-gradient(180deg, rgba(21, 12, 12, 0.90) 0%, rgba(52, 21, 15, 0.80) 70%, rgba(52, 21, 15, 0) 100%)',
    }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleNavClick('/')}
            className="text-2xl font-bold tracking-tight transition-opacity duration-300 hover:opacity-90"
            style={{ color: '#EACEAA', textShadow: '0 2px 8px rgba(21, 12, 12, 0.8)' }}
          >
            SWIFTGATE
          </button>

          <div className="flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="relative py-1.5 px-4 text-base font-medium tracking-tight uppercase transition-all duration-300"
                  style={{
                    color: isActive ? '#EACEAA' : 'rgba(234, 206, 170, 0.75)',
                    textShadow: '0 1px 6px rgba(21, 12, 12, 0.7)',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'rgba(133, 67, 30, 0.25)',
                        border: '1px solid rgba(211, 153, 88, 0.4)',
                        boxShadow: '0 0 12px rgba(211, 153, 88, 0.3)',
                        backdropFilter: 'blur(4px)',
                      }}
                      transition={springConfig}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default memo(Navigation);
