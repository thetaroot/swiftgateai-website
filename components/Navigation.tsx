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

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 101,
              }}
              aria-label="Menu"
            >
              <span
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#F5F3ED',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: isMenuOpen ? 'rotate(45deg)' : 'none',
                  position: isMenuOpen ? 'absolute' : 'relative',
                }}
              />
              <span
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#F5F3ED',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  opacity: isMenuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#F5F3ED',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: isMenuOpen ? 'rotate(-45deg)' : 'none',
                  position: isMenuOpen ? 'absolute' : 'relative',
                }}
              />
            </button>
          </div>
        </nav>

        {/* Fullscreen Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(18, 36, 24, 0.98)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                zIndex: 99,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '80px 40px 40px',
              }}
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  width: '100%',
                  maxWidth: '320px',
                }}
              >
                {navItems.map((item, index) => {
                  const isActive = pathname === item.path;
                  return (
                    <motion.button
                      key={item.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
                      onClick={() => handleNavClick(item.path)}
                      style={{
                        background: isActive ? 'rgba(26, 77, 46, 0.2)' : 'transparent',
                        border: isActive ? '2px solid rgba(26, 77, 46, 0.4)' : '2px solid rgba(245, 243, 237, 0.1)',
                        borderRadius: '8px',
                        padding: '24px 28px',
                        color: isActive ? '#F5F3ED' : 'rgba(245, 243, 237, 0.8)',
                        fontSize: '24px',
                        fontWeight: 600,
                        fontFamily: 'Space Grotesk, sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </motion.div>
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
