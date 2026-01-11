'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import Breadcrumbs from '@/components/Breadcrumbs';

const Footer = dynamic(() => import('@/components/Footer'));

export default function Business() {
  const router = useRouter();

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
                BUSINESS LÖSUNGEN
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
                Enterprise-grade<br />
                Web-Lösungen
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
                Professionelle B2B-Lösungen für Unternehmen. Skalierbar, sicher und performant.
              </p>
            </motion.div>
          </section>

          {/* Features Section */}
          <section style={{ padding: '120px 40px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
              {[
                {
                  title: 'E-Commerce Plattformen',
                  description: 'Leistungsstarke Online-Shops mit Payment-Integration, Inventory-Management und Customer Analytics.',
                  features: ['Stripe/PayPal Integration', 'Warenwirtschaft', 'Multi-Channel Verkauf', 'Mobile Commerce']
                },
                {
                  title: 'B2B Portale',
                  description: 'Sichere Kundenportale mit Rollen-Management, Dokumenten-Sharing und erweiterten Workflows.',
                  features: ['User Management', 'SSO Integration', 'API Schnittstellen', 'White-Label Optionen']
                },
                {
                  title: 'SaaS Plattformen',
                  description: 'Vollständige Software-as-a-Service Lösungen mit Subscription-Management und Skalierbarkeit.',
                  features: ['Subscription Billing', 'Multi-Tenancy', 'Auto-Scaling', 'Analytics Dashboard']
                },
                {
                  title: 'CRM & ERP Systeme',
                  description: 'Maßgeschneiderte Business-Software für Vertrieb, Kundenmanagement und Ressourcenplanung.',
                  features: ['Lead Management', 'Pipeline Tracking', 'Reporting', 'Integration APIs']
                },
                {
                  title: 'Intranet Lösungen',
                  description: 'Moderne Mitarbeiter-Plattformen für interne Kommunikation, Dokumente und Prozesse.',
                  features: ['Document Management', 'Team Collaboration', 'Workflow Automation', 'Mobile Access']
                },
                {
                  title: 'Business Intelligence',
                  description: 'Datenvisualisierung und Reporting-Dashboards für fundierte Geschäftsentscheidungen.',
                  features: ['Real-time Dashboards', 'Data Visualization', 'Export Functions', 'KPI Tracking']
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                    border: '2px solid rgba(26, 77, 46, 0.18)',
                    borderRadius: '8px',
                    padding: '40px 32px',
                    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#3E2E1F',
                    marginBottom: '16px'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '16px',
                    lineHeight: 1.7,
                    color: '#4A3428',
                    marginBottom: '24px'
                  }}>
                    {feature.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {feature.features.map((item, i) => (
                      <li key={i} style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '14px',
                        color: '#8B7355',
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#8B7355'
                        }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
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
                Bereit für Ihr Business-Projekt?
              </h2>
              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '18px',
                lineHeight: 1.6,
                color: '#4A3428',
                marginBottom: '40px'
              }}>
                Lassen Sie uns über Ihre Anforderungen sprechen und eine maßgeschneiderte Lösung entwickeln.
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
                Jetzt Anfrage stellen
              </button>
            </motion.div>
          </section>
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
