'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Mail, MessageCircle, BarChart3, Calendar, CheckSquare, Brain, Instagram, Users, Bell } from 'lucide-react';
import PortfolioModal from './PortfolioModal';
import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';

const smoothSpring = {
  type: "spring" as const,
  stiffness: 150,
  damping: 25,
  mass: 1,
};

const PROJECT_INTEGRATIONS: Record<number, { label: string; Icon: typeof Mail; delay: number; color: string }[]> = {
  1: [
    { label: 'Email', Icon: Mail, delay: 0, color: '#3B82F6' },
    { label: 'Telegram', Icon: MessageCircle, delay: 0.6, color: '#0EA5E9' },
    { label: 'CRM', Icon: BarChart3, delay: 1.2, color: '#8B5CF6' },
    { label: 'Calendar', Icon: Calendar, delay: 0.3, color: '#F59E0B' },
    { label: 'Tasks', Icon: CheckSquare, delay: 0.9, color: '#22C55E' },
    { label: 'Knowledge', Icon: Brain, delay: 1.5, color: '#EC4899' },
  ],
  2: [
    { label: 'Email', Icon: Mail, delay: 0, color: '#3B82F6' },
    { label: 'Instagram', Icon: Instagram, delay: 0.6, color: '#E1306C' },
    { label: 'WhatsApp', Icon: MessageCircle, delay: 1.2, color: '#25D366' },
    { label: 'Scoring', Icon: BarChart3, delay: 0.3, color: '#8B5CF6' },
    { label: 'CRM', Icon: Users, delay: 0.9, color: '#F59E0B' },
    { label: 'Alerts', Icon: Bell, delay: 1.5, color: '#EF4444' },
  ],
};

function PortfolioPreview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialProjectId, setInitialProjectId] = useState<number | null>(null);
  const { t } = useTranslation();
  const isMobile = useMobile();
  const router = useRouter();

  const projects = t.portfolio.projects;

  const handleCardClick = (id: number) => {
    setInitialProjectId(id);
    setIsModalOpen(true);
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center"
      style={{
        minHeight: isMobile ? 'auto' : '100vh',
        width: '100%',
        padding: isMobile ? '60px 20px 40px' : '100px 0',
      }}
    >
      {/* Heading */}
      <div className={`relative z-10 text-center max-w-2xl ${isMobile ? 'px-2 mb-10' : 'px-6 mb-14'}`}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...smoothSpring, delay: 0.05 }}
          style={{
            fontSize: '13px',
            fontWeight: 700,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            color: '#D39858',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          Portfolio
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...smoothSpring, delay: 0.1 }}
          style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 700,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '16px',
            letterSpacing: '-0.03em',
            lineHeight: '1.15',
          }}
        >
          {t.portfolio.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...smoothSpring, delay: 0.2 }}
          style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            color: 'rgba(255, 255, 255, 0.5)',
            lineHeight: '1.6',
            fontWeight: 400,
          }}
        >
          {t.portfolio.subtitle}
        </motion.p>
      </div>

      {/* Project Cards Grid */}
      <div
        className={`grid gap-6 w-full ${isMobile ? 'grid-cols-1 px-0' : 'grid-cols-1 md:grid-cols-2'}`}
        style={{ maxWidth: isMobile ? '100%' : '1080px' }}
      >
        {projects.map((project, idx) => {
          const integrations = PROJECT_INTEGRATIONS[project.id] || PROJECT_INTEGRATIONS[1];

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...smoothSpring, delay: 0.3 + idx * 0.15 }}
              className="cursor-pointer group"
              onClick={() => handleCardClick(project.id)}
            >
              <div
                className="relative overflow-hidden rounded-3xl transition-all duration-500 group-hover:scale-[1.01]"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(40px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Integration Icons Grid */}
                <div
                  className="relative px-6 pt-6 pb-4"
                  style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
                >
                  <div className={`grid ${isMobile ? 'grid-cols-3 gap-3' : 'grid-cols-6 gap-3'} justify-items-center`}>
                    {integrations.map((item, i) => (
                      <motion.div
                        key={item.label}
                        className="flex flex-col items-center gap-1.5"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 3 + i * 0.4,
                          repeat: Infinity,
                          delay: item.delay,
                          ease: 'easeInOut',
                        }}
                      >
                        <div
                          className="flex items-center justify-center rounded-2xl"
                          style={{
                            width: isMobile ? '40px' : '44px',
                            height: isMobile ? '40px' : '44px',
                            background: `${item.color}15`,
                            border: `1px solid ${item.color}25`,
                            boxShadow: `0 2px 12px ${item.color}10`,
                          }}
                        >
                          <item.Icon
                            size={isMobile ? 18 : 20}
                            strokeWidth={1.8}
                            style={{ color: item.color }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: '9px',
                            fontWeight: 600,
                            color: 'rgba(255, 255, 255, 0.35)',
                            letterSpacing: '0.02em',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                          }}
                        >
                          {item.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 py-5">
                  {/* Category + Year */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                      style={{
                        background: 'rgba(211, 152, 88, 0.12)',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#D39858',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}
                    >
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px rgba(34, 197, 94, 0.5)' }} />
                      {project.category}
                    </span>
                    <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'monospace' }}>
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: isMobile ? '20px' : '22px',
                      fontWeight: 700,
                      marginBottom: '8px',
                      color: 'rgba(255, 255, 255, 0.92)',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="line-clamp-2"
                    style={{
                      fontSize: '13px',
                      color: 'rgba(255, 255, 255, 0.45)',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      lineHeight: '1.55',
                      marginBottom: '14px',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-lg"
                        style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.5)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span
                        className="px-2 py-0.5 rounded-lg"
                        style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>

              {/* Per-card CTA Buttons */}
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-2 mt-4`}>
                <motion.button
                  onClick={(e) => { e.stopPropagation(); handleCardClick(project.id); }}
                  className="group/btn relative"
                  style={{
                    padding: '11px 24px',
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    color: 'rgba(255, 255, 255, 0.7)',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    letterSpacing: '-0.01em',
                    flex: isMobile ? undefined : 1,
                    width: isMobile ? '100%' : undefined,
                  }}
                  whileHover={{ scale: 1.02, background: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.portfolio.cta}
                </motion.button>

                {project.demoUrl && (
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); router.push(project.demoUrl!); }}
                    className="group/btn relative"
                    style={{
                      padding: '11px 24px',
                      fontSize: '13px',
                      fontWeight: 600,
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      color: '#fff',
                      background: 'linear-gradient(135deg, #D39858 0%, #B07830 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      letterSpacing: '-0.01em',
                      flex: isMobile ? undefined : 1,
                      width: isMobile ? '100%' : undefined,
                    }}
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(211, 152, 88, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)' }} />
                      {t.portfolio.demoCta}
                    </span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <PortfolioModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setInitialProjectId(null); }}
        initialProjectId={initialProjectId}
      />
    </section>
  );
}

export default memo(PortfolioPreview);
