'use client';

import { useState, useEffect } from 'react';

export default function BrowserMockup() {
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
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '380px',
          background: 'linear-gradient(145deg, #F5F3ED 0%, #EAE7DC 100%)',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.25), 0 15px 30px -10px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          border: '2px solid rgba(26, 77, 46, 0.15)',
        }}>
          {/* Browser Header */}
          <div style={{
            background: 'linear-gradient(145deg, #E8E5D9 0%, #DDD9CD 100%)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid rgba(139, 115, 85, 0.15)'
          }}>
            {/* Traffic Lights */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF5F57 0%, #FF3B30 100%)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }} />
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFBD2E 0%, #FFAA00 100%)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }} />
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #28CD41 0%, #25B83A 100%)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }} />
            </div>

            {/* URL Bar */}
            <div style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '6px',
              padding: '6px 12px',
              border: '1px solid rgba(139, 115, 85, 0.15)',
              boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
            }}>
              <span style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                color: '#8B7355',
                letterSpacing: '0.2px'
              }}>
                swiftgateai.de
              </span>
            </div>
          </div>

          {/* Browser Content */}
          <div style={{
            padding: '32px 24px'
          }}>
            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '32px',
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#3E2E1F',
              letterSpacing: '-0.02em',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.4)',
              marginBottom: '24px'
            }}>
              Swiftgate bedeutet Funktionalität und Ruhe von IT.
            </h1>

            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.65,
              color: '#4A3428',
              letterSpacing: '-0.01em',
              margin: 0
            }}>
              Mein Webdesign ist serviceorientiert mit langfristiger Begleitung: Von Beratung und Design über Launch bis zu Instandhaltung und Support 24/7.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // DESKTOP VERSION - Unchanged (Approved)
  // ============================================================================
  return (
    <div className="browser-scene">
      <div
        className="browser-container"
        style={{
          transform: `perspective(2000px) rotateY(0deg)`,
          transition: 'transform 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Front Side - Browser Window */}
        <div className="browser-side browser-front">
        <div className="browser-window">
          {/* Top Bar */}
          <div className="browser-header">
            {/* Traffic Lights */}
            <div className="traffic-lights">
              <span className="light red"></span>
              <span className="light yellow"></span>
              <span className="light green"></span>
            </div>

            {/* URL Bar */}
            <div className="url-bar">
              <span className="url-text">swiftgateai.de/ihr-projekt</span>
            </div>
          </div>

          {/* Browser Content */}
          <div className="browser-content">
            <div className="content-split">
              <div className="content-left">
                <h1 className="main-header">
                  Swiftgate bedeutet<br />
                  Funktionalität und Ruhe<br />
                  von IT.
                </h1>
              </div>
              <div className="content-right">
                <p className="main-text">
                  Mein Webdesign ist serviceorientiert mit langfristiger Begleitung: Von Beratung und Design über Launch bis zu Instandhaltung und Support 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Back Side - After 180deg rotation */}
        <div className="browser-side browser-back">
        <div className="browser-window">
          <div className="browser-header">
            <div className="traffic-lights">
              <span className="light red"></span>
              <span className="light yellow"></span>
              <span className="light green"></span>
            </div>
            <div className="url-bar">
              <span className="url-text">swiftgateai.de</span>
            </div>
          </div>
          <div className="browser-content">
            <div className="content-inner">
              {/* Placeholder for future flip feature */}
            </div>
          </div>
        </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .browser-scene {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 2000px;
        }

        .browser-container {
          transform-style: preserve-3d;
          position: relative;
          width: 1000px;
          height: 620px;
        }

        .browser-side {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .browser-front {
          transform: rotateY(0deg);
        }

        .browser-back {
          transform: rotateY(180deg);
        }

        .browser-window {
          width: 1000px;
          height: 620px;
          background: linear-gradient(145deg, #F5F3ED 0%, #EAE7DC 100%);
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 50px 100px -20px rgba(0, 0, 0, 0.3),
            0 30px 60px -30px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(26, 77, 46, 0.15);
        }

        .browser-header {
          background: #E8E5D9;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid rgba(74, 52, 40, 0.12);
        }

        .traffic-lights {
          display: flex;
          gap: 8px;
        }

        .light {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .light.red {
          background: linear-gradient(135deg, #ff5f56 0%, #e0443e 100%);
        }

        .light.yellow {
          background: linear-gradient(135deg, #ffbd2e 0%, #f0a020 100%);
        }

        .light.green {
          background: linear-gradient(135deg, #27c93f 0%, #20b634 100%);
        }

        .url-bar {
          flex: 1;
          background: #DBD8CC;
          padding: 6px 16px;
          border-radius: 6px;
          max-width: 400px;
        }

        .url-text {
          color: #4A3428;
          font-size: 13px;
          font-weight: 400;
        }

        .browser-content {
          height: calc(100% - 50px);
          background: linear-gradient(135deg,
            #F5F3ED 0%,
            #F0EDE3 25%,
            #F5F3ED 50%,
            #F0EDE3 75%,
            #F5F3ED 100%
          );
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .browser-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(26, 77, 46, 0.06) 0%, transparent 60%);
          animation: glowPulse 6s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        .content-inner {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 60px 40px;
          max-width: 700px;
          margin: 0 auto;
        }

        .content-split {
          display: flex;
          flex-direction: column;
          gap: 42px;
          padding: 55px 70px;
          width: 100%;
          height: 100%;
          justify-content: center;
        }

        .content-left {
          width: 60%;
          text-align: left;
        }

        .content-right {
          width: 45%;
          text-align: right;
          margin-left: auto;
        }

        .main-header {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 44px;
          font-weight: 700;
          line-height: 1.1;
          color: #3E2E1F;
          letter-spacing: -0.02em;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.4);
        }

        .main-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px;
          font-weight: 400;
          line-height: 1.6;
          color: #4A3428;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
