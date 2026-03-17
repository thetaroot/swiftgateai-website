'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function PersonalSection() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // ============================================================================
  // MOBILE VERSION - Complete Redesign
  // ============================================================================
  if (isMobile) {
    return (
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px'
      }}>
        <motion.div
          style={{ width: '100%', maxWidth: '400px' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '44px',
            alignItems: 'center'
          }}>
            {/* Image */}
            <div style={{
              width: 'min(calc(100vw - 40px), 320px)',
              height: 'min(calc((100vw - 40px) * 1.27), 400px)',
              background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
              border: '2px solid rgba(26, 77, 46, 0.3)',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.4), inset 0 4px 12px rgba(0, 0, 0, 0.6)'
            }}>
              <Image
                src="/pictures/portrait.jpg"
                alt="Luis Guenther - Full-Stack Webentwickler und Gründer von SwiftGate AI"
                fill
                style={{
                  objectFit: 'cover',
                  filter: 'grayscale(100%) contrast(110%)'
                }}
                priority
                sizes="300px"
              />
            </div>

            {/* Text Section */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
              width: '100%'
            }}>
              <h2 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                lineHeight: 1.05,
                color: '#F5F3ED',
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                margin: 0,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
              }}>
                <span style={{ display: 'inline-block', fontSize: 'clamp(24px, 8vw, 32px)' }}>KI kann Code</span><br />
                <span style={{ display: 'inline-block', fontSize: 'clamp(23px, 7.8vw, 31px)' }}>produzieren aber</span><br />
                <span style={{ display: 'inline-block', fontSize: 'clamp(22px, 7.6vw, 30px)' }}>deinem Projekt</span><br />
                <span style={{ display: 'inline-block', fontSize: 'clamp(21px, 7.4vw, 29px)' }}>keine Geschichte</span><br />
                <span style={{ display: 'inline-block', fontSize: 'clamp(20px, 7.2vw, 28px)' }}>und kein Gesicht</span><br />
                <span style={{ display: 'inline-block', fontSize: 'clamp(19px, 7vw, 27px)' }}>geben.</span><br />
                <br />
                <span style={{ display: 'inline-block', fontSize: 'clamp(18px, 6.8vw, 26px)' }}>Ich setze auf</span><br />
                <span style={{ display: 'inline-block', fontSize: 'clamp(18px, 6.8vw, 26px)' }}>Mensch zu Mensch.</span>
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                alignItems: 'flex-start'
              }}>
                <button
                  onClick={() => router.push('/ueber-mich')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
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
                    width: 'fit-content',
                    textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 77, 46, 0.25)';
                    e.currentTarget.style.borderColor = 'rgba(26, 77, 46, 0.4)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 77, 46, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(26, 77, 46, 0.3)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span>Mehr über mich</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  lineHeight: 1.4,
                  color: '#C4C1BC',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)'
                }}>
                  Persönlich da für Sie.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ============================================================================
  // DESKTOP VERSION - Unchanged (Approved)
  // ============================================================================
  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-8 py-32">
      <motion.div
        className="w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="personal-container">
          {/* Image Section */}
          <div className="image-placeholder">
            <Image
              src="/pictures/portrait.jpg"
              alt="Luis Guenther - Full-Stack Webentwickler und Gründer von SwiftGate AI"
              fill
              className="portrait-image"
              style={{ objectFit: 'cover' }}
              priority
              sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 480px"
            />
          </div>

          {/* Text Section */}
          <div className="text-section">
            <h2 className="personal-title">
              <span className="line line-1">KI kann Code</span><br />
              <span className="line line-2">produzieren aber</span><br />
              <span className="line line-3">deinem Projekt</span><br />
              <span className="line line-4">keine Geschichte</span><br />
              <span className="line line-5">und kein Gesicht</span><br />
              <span className="line line-6">geben.</span><br />
              <br />
              <span className="line line-7">Ich setze auf</span><br />
              <span className="line line-8">Mensch zu Mensch.</span>
            </h2>

            <div className="button-group">
              <button
                className="about-button"
                onClick={() => router.push('/ueber-mich')}
              >
                <span>Mehr über mich</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <p className="personal-tagline">
                Persönlich da für Sie.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .personal-container {
          display: grid;
          grid-template-columns: 480px 1fr;
          gap: 40px;
          align-items: stretch;
          padding-left: 40px;
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          min-height: 680px;
          background: linear-gradient(145deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%);
          border: 2px solid rgba(26, 77, 46, 0.3);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          position: relative;
          transform: perspective(1200px) rotateY(-1deg);
          overflow: hidden;
          box-shadow:
            inset 0 4px 12px rgba(0, 0, 0, 0.6),
            inset 0 2px 4px rgba(0, 0, 0, 0.8),
            inset 0 -2px 4px rgba(255, 255, 255, 0.03),
            30px 0 60px -10px rgba(0, 0, 0, 0.6),
            50px 0 80px -20px rgba(0, 0, 0, 0.4),
            70px 0 100px -30px rgba(0, 0, 0, 0.25);
        }

        .portrait-image {
          filter: grayscale(100%) contrast(110%);
          transition: filter 0.3s ease;
        }

        .image-placeholder::after {
          content: '';
          position: absolute;
          top: 0;
          right: -80px;
          width: 80px;
          height: 100%;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%);
          pointer-events: none;
        }

        .image-placeholder:hover {
          border-color: rgba(26, 77, 46, 0.5);
        }

        .image-placeholder:hover .portrait-image {
          filter: grayscale(80%) contrast(105%);
        }

        .text-section {
          display: flex;
          flex-direction: column;
          gap: 48px;
          justify-content: center;
          align-items: flex-start;
          text-align: left;
          position: relative;
          z-index: 2;
        }

        .personal-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          line-height: 0.95;
          color: #F5F3ED;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          margin: 0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        .personal-title .line {
          display: inline-block;
        }

        .personal-title .line-1 { font-size: 48px; }
        .personal-title .line-2 { font-size: 46px; }
        .personal-title .line-3 { font-size: 44px; }
        .personal-title .line-4 { font-size: 42px; }
        .personal-title .line-5 { font-size: 40px; }
        .personal-title .line-6 { font-size: 38px; }
        .personal-title .line-7 { font-size: 36px; }
        .personal-title .line-8 { font-size: 34px; }

        .button-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }

        .personal-tagline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.4;
          color: #C4C1BC;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
        }

        .about-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 36px;
          background: rgba(26, 77, 46, 0.15);
          border: 2px solid rgba(26, 77, 46, 0.3);
          border-radius: 4px;
          color: #F5F3ED;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: fit-content;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.7);
        }

        .about-button:hover {
          background: rgba(26, 77, 46, 0.25);
          border-color: rgba(26, 77, 46, 0.4);
          transform: translateX(4px);
        }

        .about-button svg {
          transition: transform 0.2s ease;
        }

        .about-button:hover svg {
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
}
