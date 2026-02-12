'use client';

import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function CardIndexNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  // 5 Karteikarten - BRUTALISMUS - Schmal mit großer Typographie
  const cards = [
    {
      id: 1,
      label: 'KONTAKT',
      path: '/kontakt',
      color: '#150C0C', // Balsamico - Dunkel (LINKS)
      leftPosition: 0,
      zIndex: 1,
    },
    {
      id: 2,
      label: 'ÜBER UNS',
      path: '/ueber-mich',
      color: '#34150F', // Burnt Coffee
      leftPosition: 40,
      zIndex: 2,
    },
    {
      id: 3,
      label: 'PORTFOLIO',
      path: '/portfolio',
      color: '#85431E', // Honey Garlic - Mitte
      leftPosition: 80,
      zIndex: 3,
    },
    {
      id: 4,
      label: 'SERVICE',
      path: '/services',
      color: '#D39858', // Whiskey Sour
      leftPosition: 120,
      zIndex: 4,
    },
    {
      id: 5,
      label: 'HOME',
      path: '/',
      color: '#EACEAA', // Champagne - Hell (RECHTS)
      leftPosition: 160,
      zIndex: 5,
    },
  ];


  return (
    <div
      className="fixed left-0 z-50 pointer-events-none"
      style={{
        top: 0,
        bottom: 0,
        width: '240px', // SCHMALER für Brutalismus
      }}
    >
      {/* Karteikarten Container */}
      <div className="relative h-full">
        {cards.map((card) => {
          const isActive = pathname === card.path;
          // Bestimme ob Karte hell oder dunkel ist (für Text-Kontrast)
          const isDark = card.id <= 3; // Kontakt, Über uns, Portfolio sind dunkel (LINKS)
          const textColor = isDark ? '#EACEAA' : '#150C0C';
          const borderColor = isDark ? 'rgba(234, 206, 170, 0.25)' : 'rgba(21, 12, 12, 0.2)';
          const activeBorderColor = isDark ? 'rgba(234, 206, 170, 0.5)' : 'rgba(21, 12, 12, 0.4)';
          const numberColor = isDark ? 'rgba(234, 206, 170, 0.15)' : 'rgba(21, 12, 12, 0.15)';

          return (
            <motion.button
              key={card.id}
              onClick={() => router.push(card.path)}
              className="absolute pointer-events-auto cursor-pointer transition-all duration-300 hover:brightness-110 hover:-translate-x-1"
              style={{
                left: `${card.leftPosition}px`,
                top: 0,
                bottom: 0,
                width: '60px', // SCHMALER für Brutalismus
                zIndex: card.zIndex,
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Kartenfläche - BRUTALISMUS */}
              <div
                className="h-full flex flex-col justify-between relative"
                style={{
                  background: card.color,
                  borderRight: isActive ? `2px solid ${activeBorderColor}` : `1px solid ${borderColor}`,
                  borderTop: `1px solid ${borderColor}`,
                  borderBottom: `1px solid ${borderColor}`,
                  // 3D-Schatten für Tiefeneffekt - angepasst für Cocktail Palette
                  boxShadow: isActive
                    ? `3px 0 10px rgba(21, 12, 12, 0.3),
                       6px 0 18px rgba(21, 12, 12, 0.15),
                       inset 0 1px 0 ${isDark ? 'rgba(234, 206, 170, 0.15)' : 'rgba(255, 255, 255, 0.7)'},
                       inset -1px 0 0 ${isDark ? 'rgba(234, 206, 170, 0.08)' : 'rgba(133, 67, 30, 0.1)'}`
                    : `2px 0 8px rgba(21, 12, 12, 0.2),
                       4px 0 15px rgba(21, 12, 12, 0.1),
                       inset 0 1px 0 ${isDark ? 'rgba(234, 206, 170, 0.1)' : 'rgba(255, 255, 255, 0.5)'}`,
                }}
              >
                {/* Vertikaler Text oben - BRUTALISMUS */}
                <div className="flex-1 flex items-start justify-center pt-12 px-2">
                  <div className="flex flex-col items-center gap-0.5">
                    {card.label.split('').map((letter, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '9px',
                          fontWeight: isActive ? 800 : 700,
                          color: textColor,
                          opacity: isActive ? 1 : 0.8,
                          fontFamily: 'Space Grotesk, sans-serif',
                          letterSpacing: '0.15em',
                          lineHeight: '1.4',
                          textTransform: 'uppercase',
                        }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </span>
                    ))}
                  </div>
                </div>

                {/* BRUTALISTISCHE NUMMER - Groß und Statement */}
                <div className="flex items-center justify-center pb-8">
                  <div
                    style={{
                      fontSize: isActive ? '80px' : '72px',
                      fontWeight: 900,
                      color: textColor,
                      opacity: isActive ? 0.35 : 0.2,
                      fontFamily: 'Space Grotesk, sans-serif',
                      letterSpacing: '-0.08em',
                      lineHeight: '1',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {card.id}
                  </div>
                </div>

                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeCardIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2"
                    style={{
                      width: '3px',
                      height: '40%',
                      background: isDark
                        ? 'linear-gradient(180deg, rgba(211, 153, 88, 0.8) 0%, rgba(234, 206, 170, 0.5) 100%)'
                        : 'linear-gradient(180deg, rgba(133, 67, 30, 0.7) 0%, rgba(52, 21, 15, 0.4) 100%)',
                      borderRadius: '0 2px 2px 0',
                      boxShadow: isDark
                        ? '0 0 10px rgba(211, 153, 88, 0.6)'
                        : '0 0 8px rgba(133, 67, 30, 0.5)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
