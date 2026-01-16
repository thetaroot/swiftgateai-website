'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navItems = [
    { label: 'Über mich', path: '/ueber-mich' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Kontakt', path: '/kontakt' },
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Header */}
        <nav
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            paddingTop: 'max(20px, env(safe-area-inset-top))',
            paddingBottom: '20px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            background: 'linear-gradient(180deg, rgba(18, 36, 24, 0.98) 0%, rgba(18, 36, 24, 0.95) 85%, rgba(18, 36, 24, 0.75) 100%)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo */}
            <button
              onClick={() => handleNavClick('/')}
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#F5F3ED',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-0.02em',
              }}
            >
              SWIFTGATE
            </button>

            {/* Menu Button - Modern Icon */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: isMenuOpen
                  ? 'rgba(26, 77, 46, 0.2)'
                  : 'rgba(245, 243, 237, 0.1)',
                border: isMenuOpen
                  ? '2px solid rgba(26, 77, 46, 0.4)'
                  : '2px solid rgba(245, 243, 237, 0.2)',
                borderRadius: '12px',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 101,
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                // X Close Icon
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M15 5L5 15M5 5L15 15"
                    stroke="#F5F3ED"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                // Menu Dots Icon
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="4" r="1.5" fill="#F5F3ED" />
                  <circle cx="10" cy="10" r="1.5" fill="#F5F3ED" />
                  <circle cx="10" cy="16" r="1.5" fill="#F5F3ED" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Modern Glassmorphism Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: 'fixed',
                top: 'max(84px, calc(env(safe-area-inset-top) + 64px))',
                left: '20px',
                right: '20px',
                zIndex: 98,
                pointerEvents: 'auto'
              }}
            >
              <div style={{
                background: 'rgba(18, 36, 24, 0.75)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                borderRadius: '24px',
                border: '1px solid rgba(26, 77, 46, 0.3)',
                boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                padding: '20px',
                overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.path;
                    return (
                      <motion.button
                        key={item.path}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
                        onClick={() => handleNavClick(item.path)}
                        style={{
                          background: isActive
                            ? 'rgba(26, 77, 46, 0.3)'
                            : 'rgba(245, 243, 237, 0.05)',
                          border: isActive
                            ? '2px solid rgba(26, 77, 46, 0.5)'
                            : '2px solid rgba(245, 243, 237, 0.1)',
                          borderRadius: '16px',
                          padding: '18px 24px',
                          color: isActive ? '#F5F3ED' : 'rgba(245, 243, 237, 0.85)',
                          fontSize: '18px',
                          fontWeight: isActive ? 600 : 500,
                          fontFamily: 'Space Grotesk, sans-serif',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                          transition: 'all 0.2s ease',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.transform = 'scale(0.98)';
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            style={{
                              position: 'absolute',
                              left: '12px',
                              top: '50%',
                              width: '4px',
                              height: '60%',
                              background: 'linear-gradient(180deg, rgba(26, 77, 46, 0.8) 0%, rgba(26, 77, 46, 0.4) 100%)',
                              borderRadius: '2px',
                              transform: 'translateY(-50%)',
                              boxShadow: '0 0 8px rgba(26, 77, 46, 0.6)'
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 30
                            }}
                          />
                        )}
                        <span style={{ position: 'relative', zIndex: 1, paddingLeft: isActive ? '12px' : '0' }}>
                          {item.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop Navigation (unchanged)
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        paddingTop: '32px',
        paddingBottom: '16px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: 'linear-gradient(180deg, rgba(18, 36, 24, 0.85) 0%, rgba(18, 36, 24, 0.75) 70%, rgba(18, 36, 24, 0) 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto" style={{ padding: '0 32px' }}>
        <div className="flex justify-between items-center relative">
          <button
            onClick={() => handleNavClick('/')}
            className="font-bold tracking-tight hover:opacity-90 transition-all duration-300"
            style={{
              fontSize: '24px',
              color: '#F5F3ED',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
            }}
          >
            SWIFTGATE
          </button>

          <div className="flex items-center" style={{ gap: '8px' }}>
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="relative hover:opacity-100 transition-all duration-300 font-medium tracking-tight uppercase"
                  style={{
                    padding: '6px 16px',
                    fontSize: '16px',
                    color: isActive ? '#F5F3ED' : 'rgba(245, 243, 237, 0.7)',
                    textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 backdrop-blur-sm rounded-full"
                      style={{
                        background: 'rgba(26, 77, 46, 0.15)',
                        border: '1px solid rgba(26, 77, 46, 0.25)'
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 35,
                        mass: 0.8,
                      }}
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
