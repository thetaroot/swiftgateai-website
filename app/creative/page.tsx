'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';

const Footer = dynamic(() => import('@/components/Footer'));

export default function Creative() {
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

  const projects = [
    { icon: '🎨', title: 'Interactive Web Experiences', desc: 'Immersive Websites mit WebGL, Three.js und GSAP Animationen' },
    { icon: '🎬', title: 'Motion Design', desc: 'Flüssige Animationen und Mikrointeraktionen für bessere UX' },
    { icon: '🎭', title: 'Brand Websites', desc: 'Markenidentität digital erlebbar machen' },
    { icon: '🎪', title: 'Landing Pages', desc: 'High-Converting Pages mit außergewöhnlichem Design' },
    { icon: '🎯', title: 'Portfolio Sites', desc: 'Kreative Selbstdarstellung für Artists und Agenturen' },
    { icon: '✨', title: 'Custom Animations', desc: 'Maßgeschneiderte Animationen und Transitions' }
  ];

  // ============================================================================
  // MOBILE VERSION - Complete Redesign
  // ============================================================================
  if (isMobile) {
    return (
      <main className="min-h-screen flex flex-col">
        <AnimatedBackground />
        <Navigation />
        <PageTransition>
          <div className="relative z-10">
            {/* Hero Section */}
            <section style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '120px 20px 60px'
            }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', maxWidth: '400px', width: '100%' }}
              >
                <div style={{
                  display: 'inline-block',
                  padding: '8px 18px',
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
                  CREATIVE PROJECTS
                </div>

                <h1 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '44px',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: '#F5F3ED',
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  marginBottom: '24px',
                  textShadow: '0 4px 16px rgba(0, 0, 0, 0.9)'
                }}>
                  Kreativität trifft Code
                </h1>

                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: 'rgba(245, 243, 237, 0.85)',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
                }}>
                  Außergewöhnliche Web-Erlebnisse mit modernsten Animationen und interaktiven Elementen.
                </p>
              </motion.div>
            </section>

            {/* Projects Grid */}
            <section style={{ padding: '40px 20px 60px' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '28px',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                      background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                      border: '2px solid rgba(26, 77, 46, 0.18)',
                      borderRadius: '8px',
                      padding: '32px 24px',
                      boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.12)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '42px', marginBottom: '14px' }}>{project.icon}</div>
                    <h3 style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#3E2E1F',
                      marginBottom: '10px',
                      lineHeight: 1.2
                    }}>
                      {project.title}
                    </h3>
                    <p style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: '#4A3428'
                    }}>
                      {project.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '40px 20px 100px' }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                  maxWidth: '400px',
                  margin: '0 auto',
                  textAlign: 'center',
                  background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                  border: '2px solid rgba(26, 77, 46, 0.18)',
                  borderRadius: '8px',
                  padding: '40px 32px',
                  boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <h2 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '34px',
                  fontWeight: 700,
                  color: '#3E2E1F',
                  marginBottom: '20px',
                  lineHeight: 1.1
                }}>
                  Lassen Sie uns etwas Besonderes schaffen
                </h2>
                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '17px',
                  lineHeight: 1.6,
                  color: '#4A3428',
                  marginBottom: '32px'
                }}>
                  Kreative Projekte brauchen kreative Lösungen. Lassen Sie uns gemeinsam Ihr nächstes Web-Erlebnis entwickeln.
                </p>
                <button
                  onClick={() => router.push('/kontakt')}
                  style={{
                    padding: '16px 32px',
                    background: 'rgba(139, 115, 85, 0.12)',
                    border: '2px solid rgba(139, 115, 85, 0.3)',
                    borderRadius: '4px',
                    color: '#5C4A3A',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 115, 85, 0.18)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 115, 85, 0.12)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Projekt besprechen
                </button>
              </motion.div>
            </section>
          </div>
        </PageTransition>
        <Footer />
      </main>
    );
  }

  // ============================================================================
  // DESKTOP VERSION - Unchanged (Approved)
  // ============================================================================
  return (
    <main className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navigation />
      <PageTransition>
        <div className="relative z-10">
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
                CREATIVE PROJECTS
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
                Kreativität trifft<br />
                Code
              </h1>

              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '22px',
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'rgba(245, 243, 237, 0.85)',
                maxWidth: '700px',
                margin: '0 auto 60px',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
              }}>
                Außergewöhnliche Web-Erlebnisse mit modernsten Animationen und interaktiven Elementen.
              </p>
            </motion.div>
          </section>

          <section style={{ padding: '120px 40px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                    border: '2px solid rgba(26, 77, 46, 0.18)',
                    borderRadius: '8px',
                    padding: '40px 32px',
                    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>{project.icon}</div>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#3E2E1F',
                    marginBottom: '12px'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '16px',
                    lineHeight: 1.6,
                    color: '#4A3428'
                  }}>
                    {project.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          <section style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 40px'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                maxWidth: '800px',
                textAlign: 'center',
                background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                border: '2px solid rgba(26, 77, 46, 0.18)',
                borderRadius: '8px',
                padding: '60px 50px',
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15)'
              }}
            >
              <h2 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '42px',
                fontWeight: 700,
                color: '#3E2E1F',
                marginBottom: '24px'
              }}>
                Lassen Sie uns etwas Besonderes schaffen
              </h2>
              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '18px',
                lineHeight: 1.6,
                color: '#4A3428',
                marginBottom: '40px'
              }}>
                Kreative Projekte brauchen kreative Lösungen. Lassen Sie uns gemeinsam Ihr nächstes Web-Erlebnis entwickeln.
              </p>
              <button
                onClick={() => router.push('/kontakt')}
                style={{
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
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 115, 85, 0.18)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 115, 85, 0.12)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Projekt besprechen
              </button>
            </motion.div>
          </section>
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
