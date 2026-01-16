'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function UeberMich() {
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
            {/* Hero Section - Mobile */}
            <section style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '120px 20px 60px'
            }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', maxWidth: '360px', width: '100%' }}
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
                  ÜBER MICH
                </div>

                <h1 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '36px',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  color: '#F5F3ED',
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  marginBottom: '24px',
                  textShadow: '0 4px 16px rgba(0, 0, 0, 0.9)'
                }}>
                  Nicht automatisiert.<br />
                  Nicht ausgelagert.<br />
                  Persönlich.
                </h1>

                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: 'rgba(245, 243, 237, 0.85)',
                  margin: 0,
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
                }}>
                  Luis Günther – Ihr Partner für moderne Webentwicklung
                </p>
              </motion.div>
            </section>

            {/* Personal Story Section - Mobile */}
            <section style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 20px',
              overflow: 'hidden'
            }}>
              <div style={{ maxWidth: '360px', width: '100%', display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center', overflow: 'hidden' }}>
                {/* Portrait */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  style={{
                    width: '280px',
                    height: '360px',
                    background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                    border: '2px solid rgba(26, 77, 46, 0.3)',
                    borderRadius: '8px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.4), inset 0 4px 12px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  <Image
                    src="/pictures/portrait.jpg"
                    alt="Luis Günther Portrait"
                    fill
                    style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(110%)' }}
                    priority
                    sizes="280px"
                  />
                </motion.div>

                {/* Story Text */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}
                >
                  <h2 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '28px',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: '#F5F3ED',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)',
                    textAlign: 'center',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                    width: '100%',
                    hyphens: 'auto',
                    WebkitHyphens: 'auto',
                    maxWidth: '100%'
                  }}>
                    Warum persönlicher Service im digitalen Zeitalter wichtiger denn je ist
                  </h2>

                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '17px',
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: 'rgba(245, 243, 237, 0.85)',
                    textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)',
                    textAlign: 'center'
                  }}>
                    Natürlich nutze ich moderne Tools und Technologien – auch KI, wo es sinnvoll ist. Aber ich bin überzeugt: Ihr Projekt verdient mehr als automatisierte Lösungen und Templates. Es verdient einen Menschen, der zuhört, versteht und mitdenkt.
                  </p>

                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '17px',
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: 'rgba(245, 243, 237, 0.85)',
                    textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)',
                    textAlign: 'center'
                  }}>
                    Bei mir bekommen Sie keine vorgefertigten Lösungen. Sie bekommen ehrliche Beratung, transparente Kommunikation und einen Partner, der auch nach dem Launch an Ihrer Seite bleibt. Denn erfolgreiche Projekte entstehen nicht durch Templates, sondern durch individuelle Betreuung.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Story Section - Mobile */}
            <section style={{ padding: '60px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ maxWidth: '360px', width: '100%' }}
              >
                <div style={{
                  background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                  border: '2px solid rgba(26, 77, 46, 0.18)',
                  borderRadius: '8px',
                  padding: '40px 24px',
                  boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                }}>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#3E2E1F',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    marginBottom: '24px',
                    textAlign: 'center'
                  }}>
                    Mein Weg
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <p style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: 1.7,
                      color: '#4A3428',
                      margin: 0,
                      textAlign: 'center'
                    }}>
                      Nach meiner Zeit bei Microsoft und einem StartUp-Projekt im Bereich AI-Termin-Management bin ich heute als digitaler Nomade unterwegs – aber mit festen Wurzeln in Essen, Deutschland.
                    </p>

                    <p style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: 1.7,
                      color: '#4A3428',
                      margin: 0,
                      textAlign: 'center'
                    }}>
                      Meine ersten Zeilen Code? HTML und CSS. Das war mein Einstieg als Programmierer – und Webdesign begeistert mich bis heute. Alles self-made, selbstgelernt durch harte Arbeit und viel Trial & Error. Design war zeitweise sogar meine Haupteinnahmequelle als Freelancer.
                    </p>

                    <p style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: 1.7,
                      color: '#5C4A3A',
                      margin: 0,
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(139, 115, 85, 0.15)',
                      textAlign: 'center'
                    }}>
                      Heute, mit über 5 Jahren Erfahrung, arbeite ich mit Kunden aus ganz Deutschland – und dank exzellenter Englischkenntnisse auch international.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Values Section - Mobile */}
            <section style={{ padding: '60px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ maxWidth: '360px', width: '100%' }}>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '36px',
                    fontWeight: 700,
                    lineHeight: 1,
                    color: '#F5F3ED',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    marginBottom: '40px',
                    textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)'
                  }}
                >
                  Wofür ich stehe
                </motion.h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {/* Card 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                      background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                      border: '2px solid rgba(26, 77, 46, 0.18)',
                      borderRadius: '8px',
                      padding: '36px 24px',
                      boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px'
                    }}
                  >
                    <h3 style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '26px',
                      fontWeight: 700,
                      color: '#3E2E1F',
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                      margin: 0,
                      textAlign: 'center'
                    }}>
                      Transparenz
                    </h3>
                    <p style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: '#4A3428',
                      margin: 0,
                      textAlign: 'center'
                    }}>
                      Sie wissen immer, woran ich arbeite, warum ich bestimmte Entscheidungen treffe und was als Nächstes kommt. Keine Black Box, keine Überraschungen.
                    </p>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{
                      background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                      border: '2px solid rgba(26, 77, 46, 0.18)',
                      borderRadius: '8px',
                      padding: '36px 24px',
                      boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px'
                    }}
                  >
                    <h3 style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '26px',
                      fontWeight: 700,
                      color: '#3E2E1F',
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                      margin: 0,
                      textAlign: 'center'
                    }}>
                      Qualität vor Quantität
                    </h3>
                    <p style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: '#4A3428',
                      margin: 0,
                      textAlign: 'center'
                    }}>
                      Ich nehme nur Projekte an, denen ich voll und ganz gerecht werden kann. Ihre Website ist kein Fließband-Produkt – sie ist maßgeschneidert.
                    </p>
                  </motion.div>

                  {/* Card 3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                      background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                      border: '2px solid rgba(26, 77, 46, 0.18)',
                      borderRadius: '8px',
                      padding: '36px 24px',
                      boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px'
                    }}
                  >
                    <h3 style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '26px',
                      fontWeight: 700,
                      color: '#3E2E1F',
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                      margin: 0,
                      textAlign: 'center'
                    }}>
                      Langfristige Partnerschaft
                    </h3>
                    <p style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: '#4A3428',
                      margin: 0,
                      textAlign: 'center'
                    }}>
                      Der Launch ist nicht das Ende, sondern der Anfang. Ich bleibe Ihr Ansprechpartner – auch wenn es mal schnell gehen muss.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Tech Stack Section - Mobile */}
            <section style={{ padding: '60px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ maxWidth: '360px', width: '100%', textAlign: 'center' }}
              >
                <h2 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '32px',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: '#F5F3ED',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  marginBottom: '24px',
                  textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)'
                }}>
                  Meine Expertise
                </h2>

                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '17px',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: 'rgba(245, 243, 237, 0.85)',
                  marginBottom: '36px',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)'
                }}>
                  Ich arbeite mit bewährten, modernen Technologien, die sich in der Praxis durchgesetzt haben. Kein Hype, sondern verlässliche Tools für nachhaltige Lösungen:
                </p>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  justifyContent: 'center',
                  marginBottom: '36px'
                }}>
                  {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Vercel', 'Git'].map((tech) => (
                    <span key={tech} style={{
                      display: 'inline-block',
                      padding: '10px 18px',
                      background: 'rgba(26, 77, 46, 0.2)',
                      border: '2px solid rgba(26, 77, 46, 0.3)',
                      borderRadius: '4px',
                      color: '#F5F3ED',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '13px',
                      fontWeight: 600,
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>

                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: 'rgba(245, 243, 237, 0.75)',
                  fontStyle: 'italic',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)'
                }}>
                  Und: Ich entwickle mich weiter. Technologie verändert sich – ich bleibe auf dem neuesten Stand, ohne jedem Trend hinterherzulaufen.
                </p>
              </motion.div>
            </section>

            {/* CTA Section - Mobile */}
            <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                  maxWidth: '360px',
                  width: '100%',
                  background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                  border: '2px solid rgba(26, 77, 46, 0.18)',
                  borderRadius: '8px',
                  padding: '40px 28px',
                  boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                  textAlign: 'center'
                }}
              >
                <h2 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '32px',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: '#3E2E1F',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  marginBottom: '20px'
                }}>
                  Lassen Sie uns sprechen
                </h2>

                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '17px',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: '#4A3428',
                  marginBottom: '32px'
                }}>
                  Sie haben ein Projekt? Ich nehme mir Zeit für ein Gespräch. Unverbindlich.
                </p>

                <button
                  onClick={() => router.push('/kontakt')}
                  style={{
                    padding: '16px 36px',
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
                    width: '100%'
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
                  Kontakt aufnehmen
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
                ÜBER MICH
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
                Nicht automatisiert.<br />
                Nicht ausgelagert.<br />
                Persönlich.
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
                Luis Günther – Ihr Partner für moderne Webentwicklung
              </p>
            </motion.div>
          </section>

          {/* Personal Story Section */}
          <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>
            <div style={{ maxWidth: '1400px', width: '100%', display: 'grid', gridTemplateColumns: '480px 1fr', gap: '60px', alignItems: 'center' }}>
              {/* Portrait */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                  width: '100%',
                  height: '680px',
                  background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                  border: '2px solid rgba(26, 77, 46, 0.3)',
                  borderRadius: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: 'perspective(1200px) rotateY(-1deg)',
                  boxShadow: `
                    inset 0 4px 12px rgba(0, 0, 0, 0.6),
                    inset 0 2px 4px rgba(0, 0, 0, 0.8),
                    inset 0 -2px 4px rgba(255, 255, 255, 0.03),
                    30px 0 60px -10px rgba(0, 0, 0, 0.6),
                    50px 0 80px -20px rgba(0, 0, 0, 0.4)
                  `
                }}
              >
                <Image
                  src="/pictures/portrait.jpg"
                  alt="Luis Günther Portrait"
                  fill
                  style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(110%)' }}
                  priority
                />
              </motion.div>

              {/* Story Text */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
              >
                <h2 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '48px',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: '#F5F3ED',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)'
                }}>
                  Warum persönlicher Service im digitalen Zeitalter wichtiger denn je ist
                </h2>

                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: 'rgba(245, 243, 237, 0.85)',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)'
                }}>
                  Natürlich nutze ich moderne Tools und Technologien – auch KI, wo es sinnvoll ist. Aber ich bin überzeugt: Ihr Projekt verdient mehr als automatisierte Lösungen und Templates. Es verdient einen Menschen, der zuhört, versteht und mitdenkt.
                </p>

                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: 'rgba(245, 243, 237, 0.85)',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)'
                }}>
                  Bei mir bekommen Sie keine vorgefertigten Lösungen. Sie bekommen ehrliche Beratung, transparente Kommunikation und einen Partner, der auch nach dem Launch an Ihrer Seite bleibt. Denn erfolgreiche Projekte entstehen nicht durch Templates, sondern durch individuelle Betreuung.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Story Section */}
          <section style={{ padding: '80px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#3E2E1F',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  marginBottom: '32px'
                }}>
                  Mein Weg
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: '#4A3428',
                    margin: 0
                  }}>
                    Nach meiner Zeit bei Microsoft und einem StartUp-Projekt im Bereich AI-Termin-Management bin ich heute als digitaler Nomade unterwegs – aber mit festen Wurzeln in Essen, Deutschland.
                  </p>

                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: '#4A3428',
                    margin: 0
                  }}>
                    Meine ersten Zeilen Code? HTML und CSS. Das war mein Einstieg als Programmierer – und Webdesign begeistert mich bis heute. Alles self-made, selbstgelernt durch harte Arbeit und viel Trial & Error. Design war zeitweise sogar meine Haupteinnahmequelle als Freelancer.
                  </p>

                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '18px',
                    fontWeight: 500,
                    lineHeight: 1.7,
                    color: '#5C4A3A',
                    margin: 0,
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(139, 115, 85, 0.15)'
                  }}>
                    Heute, mit über 5 Jahren Erfahrung, arbeite ich mit Kunden aus ganz Deutschland – und dank exzellenter Englischkenntnisse auch international.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Values Section */}
          <section style={{ padding: '80px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '1400px', width: '100%' }}>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '56px',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: '#F5F3ED',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  marginBottom: '60px',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)'
                }}
              >
                Wofür ich stehe
              </motion.h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
                {/* Card 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{
                    background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                    border: '2px solid rgba(26, 77, 46, 0.18)',
                    borderRadius: '8px',
                    padding: '48px 40px',
                    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                  }}
                >
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '32px',
                    fontWeight: 700,
                    color: '#3E2E1F',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    margin: 0
                  }}>
                    Transparenz
                  </h3>
                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#4A3428',
                    margin: 0
                  }}>
                    Sie wissen immer, woran ich arbeite, warum ich bestimmte Entscheidungen treffe und was als Nächstes kommt. Keine Black Box, keine Überraschungen.
                  </p>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  style={{
                    background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                    border: '2px solid rgba(26, 77, 46, 0.18)',
                    borderRadius: '8px',
                    padding: '48px 40px',
                    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                  }}
                >
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '32px',
                    fontWeight: 700,
                    color: '#3E2E1F',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    margin: 0
                  }}>
                    Qualität vor Quantität
                  </h3>
                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#4A3428',
                    margin: 0
                  }}>
                    Ich nehme nur Projekte an, denen ich voll und ganz gerecht werden kann. Ihre Website ist kein Fließband-Produkt – sie ist maßgeschneidert.
                  </p>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{
                    background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                    border: '2px solid rgba(26, 77, 46, 0.18)',
                    borderRadius: '8px',
                    padding: '48px 40px',
                    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                  }}
                >
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '32px',
                    fontWeight: 700,
                    color: '#3E2E1F',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    margin: 0
                  }}>
                    Langfristige Partnerschaft
                  </h3>
                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#4A3428',
                    margin: 0
                  }}>
                    Der Launch ist nicht das Ende, sondern der Anfang. Ich bleibe Ihr Ansprechpartner – auch wenn es mal schnell gehen muss.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Tech Stack Section */}
          <section style={{ padding: '80px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}
            >
              <h2 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '48px',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#F5F3ED',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                marginBottom: '32px',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)'
              }}>
                Meine Expertise
              </h2>

              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'rgba(245, 243, 237, 0.85)',
                marginBottom: '48px',
                textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)'
              }}>
                Ich arbeite mit bewährten, modernen Technologien, die sich in der Praxis durchgesetzt haben. Kein Hype, sondern verlässliche Tools für nachhaltige Lösungen:
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                justifyContent: 'center',
                marginBottom: '48px'
              }}>
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Vercel', 'Git'].map((tech) => (
                  <span key={tech} style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    background: 'rgba(26, 77, 46, 0.2)',
                    border: '2px solid rgba(26, 77, 46, 0.3)',
                    borderRadius: '4px',
                    color: '#F5F3ED',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>

              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'rgba(245, 243, 237, 0.75)',
                fontStyle: 'italic',
                textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)'
              }}>
                Und: Ich entwickle mich weiter. Technologie verändert sich – ich bleibe auf dem neuesten Stand, ohne jedem Trend hinterherzulaufen.
              </p>
            </motion.div>
          </section>

          {/* CTA Section */}
          <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                maxWidth: '800px',
                width: '100%',
                background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                border: '2px solid rgba(26, 77, 46, 0.18)',
                borderRadius: '8px',
                padding: '60px 50px',
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                textAlign: 'center'
              }}
            >
              <h2 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '48px',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#3E2E1F',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                marginBottom: '24px'
              }}>
                Lassen Sie uns sprechen
              </h2>

              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: 1.7,
                color: '#4A3428',
                marginBottom: '40px'
              }}>
                Sie haben ein Projekt? Ich nehme mir Zeit für ein Gespräch. Unverbindlich.
              </p>

              <button
                onClick={() => router.push('/kontakt')}
                style={{
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
                  cursor: 'pointer',
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
                Kontakt aufnehmen
              </button>
            </motion.div>
          </section>
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
