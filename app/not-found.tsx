'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navigation />

      <div className="relative z-10 flex-1 flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', maxWidth: '800px' }}
        >
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '120px',
            fontWeight: 700,
            lineHeight: 1,
            color: '#F5F3ED',
            letterSpacing: '-0.03em',
            marginBottom: '24px',
            textShadow: '0 4px 16px rgba(0, 0, 0, 0.9)'
          }}>
            404
          </div>

          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: 1.2,
            color: '#F5F3ED',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: '24px',
            textShadow: '0 4px 16px rgba(0, 0, 0, 0.9)'
          }}>
            Seite nicht gefunden
          </h1>

          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'rgba(245, 243, 237, 0.85)',
            marginBottom: '48px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
          }}>
            Die gesuchte Seite existiert leider nicht. Vielleicht finden Sie, wonach Sie suchen, auf einer dieser Seiten:
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center'
          }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '16px 32px',
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
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(26, 77, 46, 0.35)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(26, 77, 46, 0.25)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                Startseite
              </button>
            </Link>

            <Link href="/services" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '16px 32px',
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
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(245, 243, 237, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(245, 243, 237, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                Services
              </button>
            </Link>

            <Link href="/portfolio" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '16px 32px',
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
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(245, 243, 237, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(245, 243, 237, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                Portfolio
              </button>
            </Link>

            <Link href="/kontakt" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '16px 32px',
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
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(245, 243, 237, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(245, 243, 237, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                Kontakt
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
