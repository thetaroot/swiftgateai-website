'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';

const Footer = dynamic(() => import('@/components/Footer'));

export default function Tech() {
  const router = useRouter();

  const technologies = [
    { category: 'Frontend', techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', techs: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'] },
    { category: 'KI & ML', techs: ['TensorFlow', 'PyTorch', 'OpenAI API', 'Langchain', 'Vector DBs'] },
    { category: 'DevOps', techs: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS', 'Vercel'] },
    { category: 'APIs', techs: ['REST', 'GraphQL', 'WebSockets', 'tRPC', 'Prisma'] },
    { category: 'Tools', techs: ['Git', 'VS Code', 'Figma', 'Postman', 'Linear'] }
  ];

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
                TECH & KI
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
                Modernste<br />
                Technologien
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
                KI-Integration, APIs, Cloud-Lösungen und alles dazwischen.
              </p>
            </motion.div>
          </section>

          <section style={{ padding: '120px 40px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    background: 'linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%)',
                    border: '2px solid rgba(26, 77, 46, 0.18)',
                    borderRadius: '8px',
                    padding: '32px 28px',
                    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.12)'
                  }}
                >
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#3E2E1F',
                    marginBottom: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {tech.category}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {tech.techs.map((t, i) => (
                      <span
                        key={i}
                        style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: '13px',
                          fontWeight: 500,
                          color: '#5C4A3A',
                          background: 'rgba(139, 115, 85, 0.1)',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: '1px solid rgba(139, 115, 85, 0.2)'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
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
                Innovative Tech-Lösungen
              </h2>
              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '18px',
                lineHeight: 1.6,
                color: '#4A3428',
                marginBottom: '40px'
              }}>
                Von KI-Integration bis zu komplexen Backend-Architekturen - wir entwickeln zukunftssichere Lösungen.
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
                Tech-Projekt anfragen
              </button>
            </motion.div>
          </section>
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
