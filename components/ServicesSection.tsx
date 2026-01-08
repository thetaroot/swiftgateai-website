'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ServicesSection() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-8 py-32">
      <motion.div
        className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12"
        style={{ display: 'grid', gridAutoRows: '1fr' }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Work Card */}
        <motion.div
          variants={cardVariants}
          className="card-wrapper"
        >
          <div className="card-badge">METHODE</div>
          <h2 className="card-main-title">Wie ich Arbeite</h2>

          <div className="glass-scene">
            <div className="glass-container">
              <div className="glass-content">
                <div className="method-text">
                  <p>
                    Mein Ansatz ist transparent und partnerschaftlich: Von der ersten Beratung über Design und Entwicklung bis zum Launch begleite ich Sie Schritt für Schritt. Dabei erkläre ich technische Entscheidungen verständlich, hole regelmäßig Feedback ein und passe mich Ihren Bedürfnissen an.
                  </p>
                  <p className="method-highlight">
                    Das Ergebnis: Eine Lösung, die genau zu Ihrem Business passt – und eine langfristige Partnerschaft, bei der ich auch nach dem Go-Live an Ihrer Seite stehe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Service Card */}
        <motion.div
          variants={cardVariants}
          className="card-wrapper"
        >
          <div className="card-badge">ANGEBOT</div>
          <h2 className="card-main-title">Mein Service</h2>

          <div className="glass-scene">
            <div className="glass-container">
              <div className="glass-content">
                <div className="keypoints-list">
                  <div className="keypoint-item">
                    <span className="keypoint-number">01</span>
                    <span>Design & Entwicklung</span>
                  </div>
                  <div className="keypoint-item">
                    <span className="keypoint-number">02</span>
                    <span>Performance & SEO</span>
                  </div>
                  <div className="keypoint-item">
                    <span className="keypoint-number">03</span>
                    <span>Security & DSGVO</span>
                  </div>
                  <div className="keypoint-item">
                    <span className="keypoint-number">04</span>
                    <span>Hosting & Deployment</span>
                  </div>
                  <div className="keypoint-item">
                    <span className="keypoint-number">05</span>
                    <span>Support & Wartung 24/7</span>
                  </div>

                  <button
                    className="service-button"
                    onClick={() => router.push('/services')}
                  >
                    <span>Mehr erfahren</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .card-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .card-badge {
          display: inline-block;
          width: fit-content;
          padding: 10px 20px;
          background: rgba(26, 77, 46, 0.25);
          border: 1px solid rgba(26, 77, 46, 0.5);
          border-radius: 4px;
          color: #F5F3ED;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 24px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
        }

        .card-main-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 44px;
          font-weight: 700;
          line-height: 0.95;
          color: #F5F3ED;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          margin-bottom: 40px;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9);
        }

        .glass-scene {
          perspective: 2000px;
          width: 100%;
          flex: 1;
          display: flex;
        }

        .glass-container {
          position: relative;
          width: 100%;
          flex: 1;
          display: flex;
        }

        .glass-content {
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, #E8E5D9 0%, #EAE7DC 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 2px solid rgba(26, 77, 46, 0.18);
          border-radius: 8px;
          padding: 48px 40px;
          box-shadow:
            0 30px 60px -12px rgba(0, 0, 0, 0.15),
            0 18px 36px -18px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .glass-container:hover .glass-content {
          border-color: rgba(26, 77, 46, 0.28);
          box-shadow:
            0 40px 80px -12px rgba(0, 0, 0, 0.2),
            0 24px 48px -18px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .glass-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at top left,
            rgba(139, 115, 85, 0.04) 0%,
            transparent 50%
          );
          border-radius: 8px;
          pointer-events: none;
        }

        .method-text {
          display: flex;
          flex-direction: column;
          gap: 32px;
          position: relative;
          z-index: 1;
        }

        .method-text p {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 500;
          line-height: 1.7;
          color: #4A3428;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .method-highlight {
          font-weight: 500 !important;
          color: #5C4A3A !important;
          border-top: 1px solid rgba(139, 115, 85, 0.15);
          padding-top: 32px;
        }

        .keypoints-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
          position: relative;
          z-index: 1;
        }

        .keypoint-item {
          display: flex;
          align-items: center;
          gap: 20px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 500;
          color: #4A3428;
          letter-spacing: -0.01em;
          text-shadow: none;
        }

        .keypoint-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(26, 77, 46, 0.4), rgba(26, 77, 46, 0.2));
          border: 1px solid rgba(26, 77, 46, 0.3);
          flex-shrink: 0;
        }

        .keypoint-number {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #8B7355;
          flex-shrink: 0;
          min-width: 32px;
          text-shadow: none;
        }

        .service-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 36px;
          background: rgba(139, 115, 85, 0.12);
          border: 2px solid rgba(139, 115, 85, 0.3);
          border-radius: 4px;
          color: #5C4A3A;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          z-index: 2;
          text-shadow: none;
        }

        .service-button:hover {
          background: rgba(139, 115, 85, 0.18);
          border-color: rgba(139, 115, 85, 0.4);
          transform: translateX(4px);
        }

        .service-button svg {
          transition: transform 0.2s ease;
        }

        .service-button:hover svg {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .card-main-title {
            font-size: 40px;
            line-height: 0.95;
          }

          .glass-content {
            padding: 32px 24px;
            min-height: 350px;
          }

          .keypoint-item {
            font-size: 18px;
          }

          .service-button {
            padding: 16px 28px;
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}
