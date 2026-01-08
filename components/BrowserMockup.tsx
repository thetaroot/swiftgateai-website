'use client';

// 🚧 DISABLED IMPORTS - Uncomment when re-enabling flip feature
// import { useState, useEffect, useRef } from 'react';

export default function BrowserMockup() {
  // ============================================================================
  // 🚧 TEMPORARILY DISABLED - Browser Flip Feature
  // ============================================================================
  // To re-enable: Uncomment the states and useEffect below
  // ============================================================================

  // const [targetRotation, setTargetRotation] = useState(0); // 0 or 180
  // const [isAnimating, setIsAnimating] = useState(false);
  // const [isMouseOverBrowser, setIsMouseOverBrowser] = useState(false);
  // const containerRef = useRef<HTMLDivElement>(null);
  // const scrollThrottleTimer = useRef<NodeJS.Timeout | null>(null);

  // Wheel event for browser rotation (only when mouse is over browser)
  // useEffect(() => {
  //   const handleWheel = (e: WheelEvent) => {
  //     // Only handle rotation when mouse is over the browser window
  //     if (!isMouseOverBrowser) {
  //       return; // Allow normal page scroll
  //     }

  //     e.preventDefault();

  //     const scrollingDown = e.deltaY > 0;
  //     const scrollingUp = e.deltaY < 0;

  //     console.log('🔍 Wheel over browser:', {
  //       targetRotation,
  //       scrollingDown,
  //       scrollingUp,
  //       isAnimating,
  //       hasThrottle: !!scrollThrottleTimer.current
  //     });

  //     // Only block if currently animating
  //     if (isAnimating) {
  //       console.log('⏸️ BLOCKED by animation');
  //       return;
  //     }

  //     console.log('✅ Triggering rotation');

  //     // Clear any existing throttle timer
  //     if (scrollThrottleTimer.current) {
  //       clearTimeout(scrollThrottleTimer.current);
  //       scrollThrottleTimer.current = null;
  //     }

  //     // Trigger smooth snap animation
  //     setIsAnimating(true);

  //     if (scrollingDown && targetRotation === 0) {
  //       console.log('⬇️ Rotating 0° → 180°');
  //       setTargetRotation(180);
  //       scrollThrottleTimer.current = setTimeout(() => {
  //         scrollThrottleTimer.current = null;
  //       }, 1700);
  //       setTimeout(() => setIsAnimating(false), 1600);
  //     } else if (scrollingUp && targetRotation === 180) {
  //       console.log('⬆️ Rotating 180° → 0°');
  //       setTargetRotation(0);
  //       scrollThrottleTimer.current = setTimeout(() => {
  //         scrollThrottleTimer.current = null;
  //       }, 1700);
  //       setTimeout(() => setIsAnimating(false), 1600);
  //     } else {
  //       console.log('❌ Invalid state:', { scrollingDown, scrollingUp, targetRotation });
  //       // Invalid scroll direction - reset animation immediately
  //       setIsAnimating(false);
  //     }
  //   };

  //   window.addEventListener('wheel', handleWheel, { passive: false });
  //   return () => {
  //     window.removeEventListener('wheel', handleWheel);
  //     if (scrollThrottleTimer.current) {
  //       clearTimeout(scrollThrottleTimer.current);
  //     }
  //   };
  // }, [targetRotation, isAnimating, isMouseOverBrowser]);

  // ============================================================================
  // END OF TEMPORARILY DISABLED CODE
  // ============================================================================

  return (
    <div className="browser-scene">
      <div
        className="browser-container"
        // 🚧 DISABLED: Mouse events for flip interaction
        // onMouseEnter={() => {
        //   console.log('🖱️ Mouse entered browser');
        //   setIsMouseOverBrowser(true);
        // }}
        // onMouseLeave={() => {
        //   console.log('🖱️ Mouse left browser');
        //   setIsMouseOverBrowser(false);
        // }}
        style={{
          transform: `perspective(2000px) rotateY(0deg)`, // Fixed at 0deg (front side only)
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
        {/* 🚧 NOTE: This back side is currently hidden because flip feature is disabled */}
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
              {/* TODO: Add content here when re-enabling flip feature */}
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotateY(-2deg) rotateX(2deg);
          }
          50% {
            transform: translateY(-8px) rotateY(2deg) rotateX(-2deg);
          }
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

        .content-badge {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 32px;
        }

        .main-title {
          font-size: 56px;
          font-weight: 700;
          color: white;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .main-subtitle {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 40px;
          line-height: 1.6;
          font-weight: 400;
        }

        .cta-button {
          padding: 16px 40px;
          background: white;
          color: #0a0a0a;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 600px;
          margin: 0 auto;
          text-align: left;
        }

        .feature-item {
          padding-left: 20px;
          border-left: 2px solid rgba(255, 255, 255, 0.3);
        }

        .feature-item strong {
          font-family: 'Space Grotesk', sans-serif;
          color: white;
          font-size: 20px;
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }

        .main-title {
          font-family: 'Space Grotesk', sans-serif;
        }

        .cta-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 64px;
        }

        .btn-primary {
          padding: 16px 32px;
          background: white;
          color: #0a0a0a;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-primary:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-1px);
        }

        .btn-secondary {
          padding: 16px 32px;
          background: transparent;
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-secondary:hover {
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.03);
          transform: translateY(-1px);
        }

        .trust-section {
          display: flex;
          gap: 48px;
          justify-content: center;
          align-items: center;
        }

        .trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .trust-icon {
          font-size: 28px;
          line-height: 1;
        }

        .trust-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        @media (max-width: 768px) {
          .browser-window {
            width: 100%;
            max-width: 400px;
            height: 350px;
          }

          .content-split {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 40px 24px;
          }

          .content-left,
          .content-right {
            text-align: left;
          }

          .main-header {
            font-size: 32px;
          }

          .main-text {
            font-size: 16px;
          }

          .main-title {
            font-size: 36px !important;
          }

          .features-list {
            gap: 20px;
          }

          .feature-item strong {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}
