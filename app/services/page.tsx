'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';

const Footer = dynamic(() => import('@/components/Footer'));

export default function ServicesPage() {
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
    {
      number: '01',
      title: 'Beratung & Konzept',
      subtitle: 'Der Grundstein für Ihren Erfolg',
      description: 'Bevor eine Zeile Code geschrieben wird, verstehe ich Ihr Business, Ihre Ziele und Ihre Zielgruppe. Gemeinsam entwickeln wir eine Strategie, die technisch umsetzbar ist und Ihre Vision zum Leben erweckt.',
      details: [
        'Anforderungsanalyse & Zieldefinition',
        'Technologie-Beratung & Architektur',
        'User Experience Konzeption',
        'Projektplanung & Roadmap'
      ],
      align: 'left'
    },
    {
      number: '02',
      title: 'Design & Entwicklung',
      subtitle: 'Wo Ästhetik auf Funktionalität trifft',
      description: 'Ich entwickle moderne, responsive Websites mit den neuesten Technologien. Das Design ist nicht nur schön – es ist intuitiv, barrierefrei und auf Conversion optimiert. Der Code ist sauber, wartbar und zukunftssicher.',
      details: [
        'Modernes UI/UX Design',
        'React, Next.js & TypeScript',
        'Responsive & Mobile-First',
        'Barrierefreie Umsetzung (WCAG)'
      ],
      align: 'right'
    },
    {
      number: '03',
      title: 'Performance & SEO',
      subtitle: 'Schnell gefunden, schnell geladen',
      description: 'Eine langsame Website verliert Besucher. Schlechtes SEO verliert Kunden. Ich optimiere Ihre Website für maximale Performance und Sichtbarkeit in Suchmaschinen – von der ersten Zeile Code an.',
      details: [
        'Core Web Vitals Optimierung',
        'SEO-Optimierung & Meta-Daten',
        'Bildoptimierung & Lazy Loading',
        'Caching & CDN Integration'
      ],
      align: 'left'
    },
    {
      number: '04',
      title: 'Security & DSGVO',
      subtitle: 'Ihre Daten, sicher verwahrt',
      description: 'Datenschutz und Sicherheit gehören von Anfang an dazu. Ich implementiere moderne Security-Maßnahmen und stelle sicher, dass Ihre Website DSGVO-konform ist – ohne Kompromisse.',
      details: [
        'SSL/TLS Verschlüsselung',
        'DSGVO-konforme Implementierung',
        'Sichere Authentifizierung',
        'Regular Security Updates'
      ],
      align: 'right'
    },
    {
      number: '05',
      title: 'Hosting & Deployment',
      subtitle: 'Von lokal zu live',
      description: 'Der Launch ist mehr als nur "hochladen". Ich kümmere mich um professionelles Hosting, CI/CD-Pipelines und stelle sicher, dass Ihre Website stabil, schnell und skalierbar läuft.',
      details: [
        'Professionelles Cloud-Hosting',
        'Automatisierte Deployments',
        'Domain & DNS Management',
        'Monitoring & Uptime-Garantie'
      ],
      align: 'left'
    },
    {
      number: '06',
      title: 'Support & Wartung',
      subtitle: 'Langfristig an Ihrer Seite',
      description: 'Nach dem Launch geht die Arbeit weiter. Ich biete kontinuierlichen Support, Updates und Optimierungen – damit Ihre Website nicht nur heute, sondern auch morgen perfekt funktioniert.',
      details: [
        'Content-Updates & Anpassungen',
        'Performance-Monitoring',
        'Regelmäßige Backups',
        '24/7 Support bei kritischen Issues'
      ],
      align: 'right'
    }
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
                  SERVICES
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
                  Von der Idee<br />bis zum Launch
                </h1>

                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: 'rgba(245, 243, 237, 0.85)',
                  marginBottom: '48px',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
                }}>
                  Ihr Full-Service Partner für moderne Webentwicklung. Von der ersten Beratung bis zum langfristigen Support – alles aus einer Hand.
                </p>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  width: '100%'
                }}>
                  <button
                    onClick={() => router.push('/portfolio')}
                    style={{
                      padding: '16px 32px',
                      background: 'rgba(245, 243, 237, 0.1)',
                      border: '2px solid rgba(245, 243, 237, 0.3)',
                      borderRadius: '4px',
                      color: '#F5F3ED',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '15px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(245, 243, 237, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(245, 243, 237, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Portfolio ansehen
                  </button>

                  <button
                    onClick={() => router.push('/kontakt')}
                    style={{
                      padding: '16px 32px',
                      background: 'rgba(26, 77, 46, 0.25)',
                      border: '2px solid rgba(26, 77, 46, 0.4)',
                      borderRadius: '4px',
                      color: '#F5F3ED',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '15px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(26, 77, 46, 0.35)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(26, 77, 46, 0.25)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Projekt starten
                  </button>
                </div>
              </motion.div>
            </section>

            {/* Services Cards */}
            <section style={{ padding: '40px 20px 80px' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                {services.map((service, index) => (
                  <motion.div
                    key={service.number}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    style={{
                      background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                      border: '2px solid rgba(26, 77, 46, 0.18)',
                      borderRadius: '8px',
                      padding: '32px 28px',
                      boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <div style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#8B7355',
                      letterSpacing: '0.5px',
                      marginBottom: '16px'
                    }}>
                      {service.number}
                    </div>

                    <h2 style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '34px',
                      fontWeight: 700,
                      lineHeight: 1,
                      color: '#3E2E1F',
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                      marginBottom: '12px'
                    }}>
                      {service.title}
                    </h2>

                    <p style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#5C4A3A',
                      marginBottom: '20px'
                    }}>
                      {service.subtitle}
                    </p>

                    <p style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '17px',
                      fontWeight: 400,
                      lineHeight: 1.7,
                      color: '#4A3428',
                      marginBottom: '28px'
                    }}>
                      {service.description}
                    </p>

                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      {service.details.map((detail, i) => (
                        <li key={i} style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: '15px',
                          fontWeight: 500,
                          color: '#5C4A3A',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}>
                          <span style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: '#8B7355',
                            flexShrink: 0
                          }} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section style={{
              padding: '40px 20px 100px'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                {/* Portfolio Box */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{
                    background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                    border: '2px solid rgba(26, 77, 46, 0.18)',
                    borderRadius: '8px',
                    padding: '40px 32px',
                    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <h2 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '36px',
                    fontWeight: 700,
                    lineHeight: 1,
                    color: '#3E2E1F',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    marginBottom: '20px'
                  }}>
                    Überzeugt?
                  </h2>

                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '17px',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#4A3428',
                    marginBottom: '32px'
                  }}>
                    Sehen Sie sich meine bisherigen Projekte an und überzeugen Sie sich selbst von der Qualität meiner Arbeit.
                  </p>

                  <button
                    onClick={() => router.push('/portfolio')}
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
                    Portfolio entdecken
                  </button>
                </motion.div>

                {/* Contact Box */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  style={{
                    background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                    border: '2px solid rgba(26, 77, 46, 0.18)',
                    borderRadius: '8px',
                    padding: '40px 32px',
                    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <h2 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '36px',
                    fontWeight: 700,
                    lineHeight: 1,
                    color: '#3E2E1F',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    marginBottom: '20px'
                  }}>
                    Bereit für Ihr nächstes Projekt?
                  </h2>

                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '17px',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#4A3428',
                    marginBottom: '32px'
                  }}>
                    Lassen Sie uns gemeinsam Ihre Vision verwirklichen. Ich freue mich auf Ihre Nachricht.
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
                    Jetzt Kontakt aufnehmen
                  </button>
                </motion.div>
              </div>
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
                SERVICES
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
                Von der Idee<br />
                bis zum Launch
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
                Ihr Full-Service Partner für moderne Webentwicklung. Von der ersten Beratung bis zum langfristigen Support – alles aus einer Hand.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
                width: '100%',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => router.push('/portfolio')}
                    style={{
                      padding: '18px 36px',
                      background: 'rgba(245, 243, 237, 0.1)',
                      border: '2px solid rgba(245, 243, 237, 0.3)',
                      borderRadius: '4px',
                      color: '#F5F3ED',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(245, 243, 237, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(245, 243, 237, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Portfolio ansehen
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <button
                    onClick={() => router.push('/kontakt')}
                    style={{
                      padding: '18px 36px',
                      background: 'rgba(26, 77, 46, 0.25)',
                      border: '2px solid rgba(26, 77, 46, 0.4)',
                      borderRadius: '4px',
                      color: '#F5F3ED',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(26, 77, 46, 0.35)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(26, 77, 46, 0.25)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Projekt starten
                  </button>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Vertical Timeline Line - starts early */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '75vh',
            bottom: '0',
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, rgba(26, 77, 46, 0.3) 5%, rgba(26, 77, 46, 0.3) 95%, transparent)',
            transform: 'translateX(-50%)',
            zIndex: 1
          }} />

          {/* Services Timeline */}
          <section style={{ position: 'relative', padding: '120px 0 40px' }}>

            {services.map((service, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  position: 'relative',
                  maxWidth: '1400px',
                  margin: '0 auto',
                  padding: '30px 40px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '80px',
                  alignItems: 'center'
                }}
              >
                {/* Timeline Dot */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(26, 77, 46, 0.4)',
                  border: '4px solid rgb(12, 35, 18)',
                  boxShadow: '0 0 0 4px rgba(26, 77, 46, 0.2)',
                  zIndex: 2
                }} />

                {/* Big Number Background */}
                <div style={{
                  position: 'absolute',
                  left: service.align === 'left' ? '10%' : 'auto',
                  right: service.align === 'right' ? '10%' : 'auto',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '280px',
                  fontWeight: 700,
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: 'rgba(26, 77, 46, 0.08)',
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none'
                }}>
                  {service.number}
                </div>

                {/* Content */}
                <div style={{
                  gridColumn: service.align === 'left' ? '1' : '2',
                  textAlign: service.align === 'left' ? 'right' : 'left',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{
                    display: 'inline-block',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#8B7355',
                    letterSpacing: '0.5px',
                    marginBottom: '12px',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)'
                  }}>
                    {service.number}
                  </div>

                  <h2 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '56px',
                    fontWeight: 700,
                    lineHeight: 0.95,
                    color: '#F5F3ED',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                    textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)'
                  }}>
                    {service.title}
                  </h2>

                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'rgba(245, 243, 237, 0.75)',
                    marginBottom: '24px',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
                  }}>
                    {service.subtitle}
                  </p>

                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: 'rgba(245, 243, 237, 0.85)',
                    marginBottom: '32px',
                    maxWidth: '520px',
                    marginLeft: service.align === 'left' ? 'auto' : '0',
                    marginRight: service.align === 'right' ? 'auto' : '0',
                    textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)'
                  }}>
                    {service.description}
                  </p>

                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    maxWidth: '520px',
                    marginLeft: service.align === 'left' ? 'auto' : '0',
                    marginRight: service.align === 'right' ? 'auto' : '0'
                  }}>
                    {service.details.map((detail, i) => (
                      <li key={i} style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'rgba(245, 243, 237, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        justifyContent: service.align === 'left' ? 'flex-end' : 'flex-start',
                        textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)'
                      }}>
                        {service.align === 'right' && (
                          <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: 'rgba(139, 115, 85, 0.6)',
                            flexShrink: 0
                          }} />
                        )}
                        <span>{detail}</span>
                        {service.align === 'left' && (
                          <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: 'rgba(139, 115, 85, 0.6)',
                            flexShrink: 0
                          }} />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </section>

          {/* CTA Section */}
          <section style={{
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 40px',
            position: 'relative'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '1400px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '60px',
              alignItems: 'stretch'
            }}>
              {/* Portfolio Box - Left */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                  width: '100%',
                  minHeight: '340px',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(26, 77, 46, 0.18)',
                  borderRadius: '8px',
                  padding: '48px 40px',
                  boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                  zIndex: 2
                }}
              >
                <h2 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '48px',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: '#3E2E1F',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  marginBottom: '24px'
                }}>
                  Überzeugt?
                </h2>

                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: '#4A3428',
                  marginBottom: '40px'
                }}>
                  Sehen Sie sich meine bisherigen Projekte an und überzeugen Sie sich selbst von der Qualität meiner Arbeit.
                </p>

                <button
                  onClick={() => router.push('/portfolio')}
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
                    transition: 'all 0.2s ease',
                    marginTop: 'auto'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 115, 85, 0.18)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 115, 85, 0.12)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  Portfolio entdecken
                </button>
              </motion.div>

              {/* CTA Box - Right */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  width: '100%',
                  minHeight: '340px',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(26, 77, 46, 0.18)',
                  borderRadius: '8px',
                  padding: '48px 40px',
                  boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                  zIndex: 2
                }}
              >
                <h2 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '48px',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: '#3E2E1F',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  marginBottom: '24px'
                }}>
                  Bereit für Ihr<br />
                  nächstes Projekt?
                </h2>

                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: '#4A3428',
                  marginBottom: '40px'
                }}>
                  Lassen Sie uns gemeinsam Ihre Vision verwirklichen. Ich freue mich auf Ihre Nachricht.
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
                    transition: 'all 0.2s ease',
                    marginTop: 'auto'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 115, 85, 0.18)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 115, 85, 0.12)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  Jetzt Kontakt aufnehmen
                </button>
              </motion.div>
            </div>
          </section>
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
