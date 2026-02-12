'use client';

import { useState, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Cpu, Layers, Headset } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';

const panelTransition = {
  type: 'spring' as const,
  stiffness: 150,
  damping: 22,
  mass: 0.8,
};

// Icons corresponding to the order in de.ts/en.ts: Strategy, AI, Dev, Support
const icons = [Layers, Cpu, Code, Headset];

function ServicesAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { t } = useTranslation();
  const isMobile = useMobile();

  const services = useMemo(() => {
    return t.services.items.map((item, index) => ({
      ...item,
      number: `0${index + 1}`,
      icon: icons[index % icons.length],
      bullets: item.features,
    }));
  }, [t]);

  const handleToggle = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className={`max-w-7xl mx-auto ${isMobile ? 'px-4 py-10' : 'px-6 md:px-12 py-16 md:py-24'}`}>
      {/* Service panels */}
      <div className="flex flex-col">
        {services.map((service, index) => {
          const isOpen = activeIndex === index;
          const isLast = index === services.length - 1;
          const Icon = service.icon;

          return (
            <div key={service.number}>
              {/* Divider line */}
              <div
                style={{
                  height: '1px',
                  background: 'rgba(52, 21, 15, 0.15)',
                  width: '100%',
                }}
              />

              {/* Panel header - clickable */}
              <motion.button
                className="w-full cursor-pointer"
                onClick={() => handleToggle(index)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  textAlign: 'left',
                }}
                whileHover={{ backgroundColor: 'rgba(52, 21, 15, 0.03)' }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`flex items-center ${isMobile ? 'gap-4 py-6 px-1' : 'gap-6 md:gap-10 py-8 md:py-10 px-2 md:px-4'}`}
                  style={{ minHeight: isMobile ? '70px' : 'clamp(80px, 12vw, 120px)' }}
                >
                  {/* Icon - left */}
                  <motion.div
                    className="flex-shrink-0 flex items-center justify-center rounded-lg"
                    style={{
                      width: isMobile ? '40px' : 'clamp(44px, 5vw, 56px)',
                      height: isMobile ? '40px' : 'clamp(44px, 5vw, 56px)',
                      background: 'rgba(52, 21, 15, 0.06)',
                      color: isOpen ? '#D39858' : '#34150F',
                    }}
                    animate={{ rotate: isOpen ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon size={isMobile ? 22 : 28} strokeWidth={1.5} />
                  </motion.div>

                  {/* Title - center, big and bold */}
                  <div className={`flex-1 flex items-baseline ${isMobile ? 'gap-3' : 'gap-4 md:gap-6'}`}>
                    <h3
                      style={{
                        fontFamily: '"Space Grotesk", -apple-system, sans-serif',
                        fontSize: isMobile ? 'clamp(22px, 7vw, 36px)' : 'clamp(32px, 6vw, 72px)',
                        fontWeight: 700,
                        color: '#34150F',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        margin: 0,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Number - right, brutalist */}
                  <div className="flex-shrink-0 flex items-center gap-4">
                    <span
                      style={{
                        fontFamily: '"Courier New", monospace',
                        fontSize: 'clamp(12px, 1.5vw, 16px)',
                        color: 'rgba(52, 21, 15, 0.4)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      [ {service.number} ]
                    </span>

                    {/* Expand indicator */}
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={panelTransition}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="#34150F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      >
                        <line x1="10" y1="4" x2="10" y2="16" />
                        <line x1="4" y1="10" x2="16" y2="10" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.button>

              {/* Expandable content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`panel-${service.number}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: {
                        duration: 0.45,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      },
                      opacity: {
                        duration: 0.25,
                        ease: 'easeInOut',
                      },
                    }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-2 md:px-4 pb-10 md:pb-14">
                      {/* Content wrapper with left offset matching icon width */}
                      <div
                        className="md:ml-[calc(clamp(44px,5vw,56px)+2.5rem)]"
                        style={{ maxWidth: '680px' }}
                      >
                        {/* Decorative top accent */}
                        <div
                          style={{
                            width: '40px',
                            height: '2px',
                            background: '#D39858',
                            marginBottom: '20px',
                          }}
                        />

                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.15 }}
                          style={{
                            marginBottom: '24px',
                          }}
                        >
                          {service.description.split('\n\n').map((paragraph, pIdx) => (
                            <p
                              key={pIdx}
                              style={{
                                fontFamily: '"Space Grotesk", -apple-system, sans-serif',
                                fontSize: 'clamp(15px, 1.8vw, 18px)',
                                lineHeight: 1.7,
                                color: 'rgba(52, 21, 15, 0.85)',
                                margin: 0,
                                marginBottom: pIdx < service.description.split('\n\n').length - 1 ? '16px' : '0',
                                fontWeight: pIdx === 0 ? 600 : 400,
                              }}
                            >
                              {paragraph}
                            </p>
                          ))}
                        </motion.div>

                        {/* Bullet Points */}
                        <motion.ul
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.25 }}
                          style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                          }}
                        >
                          {service.bullets.map((bullet, bulletIndex) => (
                            <motion.li
                              key={bulletIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.3 + bulletIndex * 0.08 }}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px',
                                fontFamily: '"Courier New", monospace',
                                fontSize: 'clamp(13px, 1.5vw, 15px)',
                                lineHeight: 1.6,
                                color: 'rgba(52, 21, 15, 0.7)',
                              }}
                            >
                              <span
                                style={{
                                  flexShrink: 0,
                                  width: '6px',
                                  height: '6px',
                                  background: '#D39858',
                                  borderRadius: '50%',
                                  marginTop: '8px',
                                }}
                              />
                              {bullet}
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom divider for last item */}
              {isLast && (
                <div
                  style={{
                    height: '1px',
                    background: 'rgba(52, 21, 15, 0.15)',
                    width: '100%',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(ServicesAccordion);
