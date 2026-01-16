'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ServicesSection() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const services = [
    'Design & Entwicklung',
    'Performance & SEO',
    'Security & DSGVO',
    'Hosting & Deployment',
    'Support & Wartung 24/7'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // ============================================================================
  // MOBILE VERSION - Creative Timeline Design
  // ============================================================================
  if (isMobile) {
    return (
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px'
      }}>
        <motion.div
          style={{
            width: '100%',
            maxWidth: '360px',
            position: 'relative'
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '60px', textAlign: 'center' }}
          >
            <div style={{
              display: 'inline-block',
              padding: '8px 18px',
              background: 'rgba(26, 77, 46, 0.25)',
              border: '1px solid rgba(26, 77, 46, 0.5)',
              borderRadius: '4px',
              color: '#F5F3ED',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
            }}>
              SERVICES
            </div>

            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '36px',
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#F5F3ED',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              marginBottom: '16px',
              textShadow: '0 4px 16px rgba(0, 0, 0, 0.9)'
            }}>
              Mein Service
            </h2>

            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '17px',
              fontWeight: 400,
              lineHeight: 1.6,
              color: 'rgba(245, 243, 237, 0.85)',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
            }}>
              Vom ersten Entwurf bis zum 24/7-Support
            </p>
          </motion.div>

          {/* Timeline */}
          <div style={{
            position: 'relative',
            paddingLeft: '60px'
          }}>
            {/* Vertical Line */}
            <div style={{
              position: 'absolute',
              left: '28px',
              top: '0',
              bottom: '0',
              width: '2px',
              background: 'linear-gradient(180deg, rgba(26, 77, 46, 0.4) 0%, rgba(26, 77, 46, 0.6) 50%, rgba(26, 77, 46, 0.4) 100%)',
              boxShadow: '0 0 8px rgba(26, 77, 46, 0.3)'
            }} />

            {/* Service Items */}
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{
                  position: 'relative',
                  marginBottom: index === services.length - 1 ? '0' : '48px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {/* Number Circle */}
                <div style={{
                  position: 'absolute',
                  left: '-60px',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(26, 77, 46, 0.3) 0%, rgba(26, 77, 46, 0.15) 100%)',
                  border: '2px solid rgba(26, 77, 46, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
                  zIndex: 2
                }}>
                  <span style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#F5F3ED',
                    textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)'
                  }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Service Text */}
                <div style={{
                  flex: 1,
                  paddingLeft: '8px'
                }}>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: '#F5F3ED',
                    margin: 0,
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                    letterSpacing: '-0.01em'
                  }}>
                    {service}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            onClick={() => router.push('/services')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '16px 32px',
              background: 'rgba(26, 77, 46, 0.15)',
              border: '2px solid rgba(26, 77, 46, 0.3)',
              borderRadius: '4px',
              color: '#F5F3ED',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: '100%',
              marginTop: '60px',
              textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(26, 77, 46, 0.25)';
              e.currentTarget.style.borderColor = 'rgba(26, 77, 46, 0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(26, 77, 46, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(26, 77, 46, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Mehr erfahren</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // ============================================================================
  // DESKTOP VERSION - Unchanged (Approved)
  // ============================================================================
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <div style={{
      position: 'relative',
      zIndex: 10,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '128px 32px'
    }}>
      <motion.div
        style={{
          width: '100%',
          maxWidth: '1280px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '48px',
          gridAutoRows: '1fr'
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Work Card */}
        <motion.div
          variants={cardVariants}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <div style={{
            display: 'inline-block',
            width: 'fit-content',
            padding: '10px 20px',
            background: 'rgba(26, 77, 46, 0.25)',
            border: '1px solid rgba(26, 77, 46, 0.5)',
            borderRadius: '4px',
            color: '#F5F3ED',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '24px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
          }}>
            METHODE
          </div>

          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '44px',
            fontWeight: 700,
            lineHeight: 0.95,
            color: '#F5F3ED',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            marginBottom: '40px',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)'
          }}>
            Wie ich Arbeite
          </h2>

          <div style={{
            perspective: '2000px',
            width: '100%',
            flex: 1,
            display: 'flex'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              flex: 1,
              display: 'flex'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '2px solid rgba(26, 77, 46, 0.18)',
                borderRadius: '8px',
                padding: '48px 40px',
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: 1.7,
                    color: '#4A3428',
                    margin: 0,
                    letterSpacing: '-0.01em'
                  }}>
                    Mein Ansatz ist transparent und partnerschaftlich: Von der ersten Beratung über Design und Entwicklung bis zum Launch begleite ich Sie Schritt für Schritt. Dabei erkläre ich technische Entscheidungen verständlich, hole regelmäßig Feedback ein und passe mich Ihren Bedürfnissen an.
                  </p>

                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: 1.7,
                    color: '#5C4A3A',
                    margin: 0,
                    letterSpacing: '-0.01em',
                    borderTop: '1px solid rgba(139, 115, 85, 0.15)',
                    paddingTop: '32px'
                  }}>
                    Das Ergebnis: Eine Lösung, die genau zu Ihrem Business passt – und eine langfristige Partnerschaft, bei der ich auch nach dem Go-Live an Ihrer Seite stehe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Service Card */}
        <motion.div
          variants={cardVariants}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <div style={{
            display: 'inline-block',
            width: 'fit-content',
            padding: '10px 20px',
            background: 'rgba(26, 77, 46, 0.25)',
            border: '1px solid rgba(26, 77, 46, 0.5)',
            borderRadius: '4px',
            color: '#F5F3ED',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '24px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
          }}>
            ANGEBOT
          </div>

          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '44px',
            fontWeight: 700,
            lineHeight: 0.95,
            color: '#F5F3ED',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            marginBottom: '40px',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)'
          }}>
            Mein Service
          </h2>

          <div style={{
            perspective: '2000px',
            width: '100%',
            flex: 1,
            display: 'flex'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              flex: 1,
              display: 'flex'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '2px solid rgba(26, 77, 46, 0.18)',
                borderRadius: '8px',
                padding: '48px 40px',
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {services.map((text, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '20px',
                        fontWeight: 500,
                        color: '#4A3428',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      <span style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#8B7355',
                        flexShrink: 0,
                        minWidth: '32px'
                      }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{text}</span>
                    </div>
                  ))}

                  <button
                    onClick={() => router.push('/services')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '18px 36px',
                      background: 'rgba(139, 115, 85, 0.12)',
                      border: '2px solid rgba(139, 115, 85, 0.3)',
                      borderRadius: '4px',
                      color: '#5C4A3A',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      zIndex: 2,
                      marginTop: '0'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 115, 85, 0.18)';
                      e.currentTarget.style.borderColor = 'rgba(139, 115, 85, 0.4)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 115, 85, 0.12)';
                      e.currentTarget.style.borderColor = 'rgba(139, 115, 85, 0.3)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <span>Mehr erfahren</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
