'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import Breadcrumbs from '@/components/Breadcrumbs';

const Footer = dynamic(() => import('@/components/Footer'));

export default function Kontakt() {
  return (
    <main className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navigation />
      <Breadcrumbs />
      <PageTransition>
        <div className="relative z-10">
          {/* Hero Section */}
          <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: 'center', maxWidth: '900px' }}
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
                marginBottom: '32px',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
              }}>
                KONTAKT
              </div>

              <h1 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '72px',
                fontWeight: 700,
                lineHeight: 0.95,
                color: '#F5F3ED',
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                marginBottom: '32px',
                textShadow: '0 4px 16px rgba(0, 0, 0, 0.9)'
              }}>
                Schreiben Sie mir
              </h1>

              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '22px',
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'rgba(245, 243, 237, 0.85)',
                maxWidth: '700px',
                margin: '0 auto',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
              }}>
                Webdesign, Development oder einfach eine Idee? Ich freue mich auf Ihre Nachricht.
              </p>
            </motion.div>
          </section>

          {/* Main Contact Section */}
          <section style={{ padding: '80px 40px 120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ maxWidth: '900px', width: '100%' }}
            >
              <div style={{
                background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                border: '2px solid rgba(26, 77, 46, 0.18)',
                borderRadius: '8px',
                padding: '60px 50px',
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              }}>
                {/* Email */}
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                  <h2 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#8B7355',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '16px'
                  }}>
                    E-Mail
                  </h2>
                  <a
                    href="mailto:kontakt@swiftgateai.de"
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '32px',
                      fontWeight: 600,
                      color: '#3E2E1F',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#5C4A3A'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#3E2E1F'}
                  >
                    kontakt@swiftgateai.de
                  </a>
                </div>

                <div style={{ height: '1px', background: 'rgba(139, 115, 85, 0.15)', marginBottom: '48px' }}></div>

                {/* What to contact about */}
                <div style={{ marginBottom: '48px' }}>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#3E2E1F',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    marginBottom: '32px'
                  }}>
                    Wofür Sie mich kontaktieren können
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                      <span style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#8B7355',
                        minWidth: '32px'
                      }}>01</span>
                      <div>
                        <h4 style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: '20px',
                          fontWeight: 600,
                          color: '#3E2E1F',
                          marginBottom: '8px',
                          margin: 0
                        }}>
                          Webdesign & Development
                        </h4>
                        <p style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: '16px',
                          fontWeight: 400,
                          lineHeight: 1.6,
                          color: '#4A3428',
                          margin: 0
                        }}>
                          Von der ersten Idee bis zum fertigen Projekt – das ist meine Kernkompetenz.
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                      <span style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#8B7355',
                        minWidth: '32px'
                      }}>02</span>
                      <div>
                        <h4 style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: '20px',
                          fontWeight: 600,
                          color: '#3E2E1F',
                          marginBottom: '8px',
                          margin: 0
                        }}>
                          Design-Anfragen
                        </h4>
                        <p style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: '16px',
                          fontWeight: 400,
                          lineHeight: 1.6,
                          color: '#4A3428',
                          margin: 0
                        }}>
                          Branding, UI/UX Design oder visuelle Konzepte – ich helfe gerne.
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                      <span style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#8B7355',
                        minWidth: '32px'
                      }}>03</span>
                      <div>
                        <h4 style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: '20px',
                          fontWeight: 600,
                          color: '#3E2E1F',
                          marginBottom: '8px',
                          margin: 0
                        }}>
                          Zusammenarbeit & Partnerschaften
                        </h4>
                        <p style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: '16px',
                          fontWeight: 400,
                          lineHeight: 1.6,
                          color: '#4A3428',
                          margin: 0
                        }}>
                          Sie haben eine Idee für eine Kooperation? Lassen Sie uns darüber sprechen.
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                      <span style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#8B7355',
                        minWidth: '32px'
                      }}>04</span>
                      <div>
                        <h4 style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: '20px',
                          fontWeight: 600,
                          color: '#3E2E1F',
                          marginBottom: '8px',
                          margin: 0
                        }}>
                          Einfach so
                        </h4>
                        <p style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: '16px',
                          fontWeight: 400,
                          lineHeight: 1.6,
                          color: '#4A3428',
                          margin: 0
                        }}>
                          Manchmal entstehen die besten Projekte aus einem lockeren Gespräch. Zögern Sie nicht!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ height: '1px', background: 'rgba(139, 115, 85, 0.15)', marginBottom: '48px' }}></div>

                {/* Response Time */}
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#8B7355',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '12px'
                  }}>
                    Antwortzeit
                  </h3>
                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#4A3428',
                    margin: 0
                  }}>
                    Innerhalb von 24 Stunden
                  </p>
                </div>

                {/* CTA Button */}
                <div style={{ textAlign: 'center' }}>
                  <a
                    href="mailto:kontakt@swiftgateai.de"
                    style={{
                      display: 'inline-block',
                      padding: '18px 48px',
                      background: 'rgba(139, 115, 85, 0.12)',
                      border: '2px solid rgba(139, 115, 85, 0.3)',
                      borderRadius: '4px',
                      color: '#5C4A3A',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '18px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
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
                    E-Mail schreiben
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
