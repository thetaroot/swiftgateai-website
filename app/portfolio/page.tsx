'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';

const Footer = dynamic(() => import('@/components/Footer'));

export default function Portfolio() {
  return (
    <main className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navigation />
      <PageTransition>
        <div className="relative z-10">
          {/* Hero Section */}
          <section style={{
            minHeight: '40vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 40px',
            paddingTop: '140px',
            paddingBottom: '60px'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', maxWidth: '800px' }}
            >
              <div style={{
                display: 'inline-block',
                padding: '10px 24px',
                background: 'rgba(26, 77, 46, 0.25)',
                border: '1px solid rgba(26, 77, 46, 0.5)',
                borderRadius: '4px',
                color: '#F5F3ED',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '24px',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
              }}>
                PORTFOLIO
              </div>

              <h1 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '56px',
                fontWeight: 700,
                lineHeight: 1,
                color: '#F5F3ED',
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                marginBottom: '24px',
                textShadow: '0 4px 16px rgba(0, 0, 0, 0.9)'
              }}>
                Featured Project
              </h1>

              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'rgba(245, 243, 237, 0.85)',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
              }}>
                Ein Einblick in meine Arbeit
              </p>
            </motion.div>
          </section>

          {/* Project Card Section */}
          <section style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 40px 120px'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                maxWidth: '1100px',
                width: '100%'
              }}
            >
              <div style={{
                background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                border: '2px solid rgba(26, 77, 46, 0.18)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.2), 0 20px 40px -10px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              }}>
                {/* Screenshot */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '500px',
                  overflow: 'hidden',
                  borderBottom: '2px solid rgba(26, 77, 46, 0.12)'
                }}>
                  <Image
                    src="/pictures/luistravels.com-screenshot.png"
                    alt="Luis Travels Blog - Reise-Blog Website"
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'top'
                    }}
                    priority
                  />
                </div>

                {/* Content */}
                <div style={{
                  padding: '48px 50px'
                }}>
                  {/* Category Badge */}
                  <div style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    background: 'rgba(139, 115, 85, 0.1)',
                    border: '1px solid rgba(139, 115, 85, 0.2)',
                    borderRadius: '4px',
                    marginBottom: '20px'
                  }}>
                    <span style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#8B7355',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}>
                      Travel Blog
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '42px',
                    fontWeight: 700,
                    color: '#3E2E1F',
                    letterSpacing: '-0.02em',
                    marginBottom: '16px',
                    lineHeight: 1.1
                  }}>
                    Luis Travels
                  </h2>

                  {/* URL */}
                  <a
                    href="https://luistravels.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '18px',
                      fontWeight: 500,
                      color: '#8B7355',
                      textDecoration: 'none',
                      marginBottom: '24px',
                      display: 'inline-block',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#5C4A3A'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#8B7355'}
                  >
                    luistravels.com ↗
                  </a>

                  {/* Description */}
                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: 1.8,
                    color: '#4A3428',
                    marginBottom: '32px',
                    maxWidth: '800px'
                  }}>
                    Ein moderner Reise-Blog mit CMS-Integration, optimiert für Performance und SEO.
                    Die Website präsentiert Reiseberichte, Fotogalerien und Reisetipps in einem
                    ansprechenden, responsiven Design.
                  </p>

                  {/* Tech Stack */}
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#8B7355',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: '16px'
                    }}>
                      Tech Stack
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}>
                      {['Next.js', 'TypeScript', 'Sanity CMS', 'Tailwind CSS', 'Framer Motion', 'Vercel'].map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#5C4A3A',
                            background: 'rgba(139, 115, 85, 0.08)',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: '1px solid rgba(139, 115, 85, 0.15)'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div style={{ marginBottom: '40px' }}>
                    <h3 style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#8B7355',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: '16px'
                    }}>
                      Key Features
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '16px'
                    }}>
                      {[
                        'Headless CMS Integration',
                        'Responsive Design',
                        'SEO Optimiert',
                        'Image Optimization',
                        'Fast Page Loads',
                        'Blog & Gallery Features'
                      ].map((feature, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                          }}
                        >
                          <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#8B7355',
                            flexShrink: 0
                          }} />
                          <span style={{
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontSize: '15px',
                            fontWeight: 400,
                            color: '#4A3428'
                          }}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href="https://luistravels.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '16px 32px',
                      background: 'rgba(139, 115, 85, 0.12)',
                      border: '2px solid rgba(139, 115, 85, 0.3)',
                      borderRadius: '6px',
                      color: '#5C4A3A',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 115, 85, 0.18)';
                      e.currentTarget.style.borderColor = 'rgba(139, 115, 85, 0.4)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 115, 85, 0.12)';
                      e.currentTarget.style.borderColor = 'rgba(139, 115, 85, 0.3)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Website Besuchen →
                  </a>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
