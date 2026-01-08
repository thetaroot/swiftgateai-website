'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Über mich', path: '/ueber-mich' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Kontakt', path: '/kontakt' },
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center relative">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="text-2xl font-bold tracking-tight hover:opacity-90 transition-all duration-300"
            style={{
              color: '#F5F3ED',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
            }}
          >
            SWIFTGATE
          </button>

          {/* Navigation Items */}
          <div className="flex gap-2 items-center">
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="relative px-4 py-1.5 hover:opacity-100 transition-all duration-300 text-base font-medium tracking-tight uppercase"
                  style={{
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
