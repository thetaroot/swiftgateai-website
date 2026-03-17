'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle, Mail, Calendar, Globe,
  Shield, Brain, GitBranch, ShieldCheck,
  Route, RefreshCw, Eye, UserCheck,
  CheckSquare, Database, Terminal, Code2,
  Lock, Zap, Layers,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';

const smoothSpring = {
  type: "spring" as const,
  stiffness: 150,
  damping: 25,
  mass: 1,
};

// ── Data ──

const TRIGGERS = [
  { label: 'Telegram', icon: MessageCircle },
  { label: 'Email', icon: Mail },
  { label: 'Calendar', icon: Calendar },
  { label: 'API', icon: Globe },
];

const AGENTS = [
  { name: 'Communications', tools: 'Email \u00b7 CRM', icon: Mail, color: '#2563EB' },
  { name: 'Calendar', tools: 'CalDAV \u00b7 Scheduling', icon: Calendar, color: '#D97706' },
  { name: 'Tasks', tools: 'Task Management', icon: CheckSquare, color: '#16A34A' },
  { name: 'Knowledge', tools: 'Vector DB \u00b7 RAG', icon: Database, color: '#DB2777' },
  { name: 'System', tools: 'Infrastructure \u00b7 Logs', icon: Terminal, color: '#7C3AED' },
  { name: 'Code', tools: 'Sandbox \u00b7 Testing', icon: Code2, color: '#EA580C' },
];

// ── Shared Styles (light theme) ──

const glassCard: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.45)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(52, 21, 15, 0.08)',
  boxShadow: '0 2px 12px rgba(52, 21, 15, 0.06)',
};

const sfFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Space Grotesk", sans-serif';
const sfDisplay = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Space Grotesk", sans-serif';

// ── Sub-Components ──

const Connector = ({ height = 28 }: { height?: number }) => (
  <div className="flex flex-col items-center" style={{ height: `${height}px`, position: 'relative' }}>
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: '2px',
        height: '100%',
        background: 'linear-gradient(to bottom, #D39858, rgba(211,152,88,0.2))',
        transformOrigin: 'top',
      }}
    />
  </div>
);

const FeatureBadge = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <motion.div
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
    style={{
      background: 'rgba(211,152,88,0.1)',
      border: '1px solid rgba(211,152,88,0.2)',
    }}
    whileHover={{ scale: 1.05, borderColor: 'rgba(211,152,88,0.4)' }}
    transition={{ duration: 0.2 }}
  >
    <Icon size={11} color="#9A6B3A" strokeWidth={2.5} />
    <span
      style={{
        fontSize: '11px',
        fontWeight: 600,
        color: '#7A5025',
        letterSpacing: '0.02em',
        fontFamily: sfFont,
      }}
    >
      {label}
    </span>
  </motion.div>
);

// ── Main Component ──

function ArchitectureSection() {
  const { t } = useTranslation();
  const isMobile = useMobile();

  return (
    <div className="relative w-full">
      <div id="architecture-anchor" style={{ position: 'absolute', top: '-80px' }} />

      <div
        className={`relative mx-auto ${isMobile ? 'px-5 py-16' : 'px-6 py-20 md:py-28'}`}
        style={{ maxWidth: '900px' }}
      >
        {/* ── Header ── */}
        <div className="text-center mb-14 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smoothSpring, delay: 0.05 }}
            style={{
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: sfFont,
              color: '#9A6B3A',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Architecture
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smoothSpring, delay: 0.1 }}
            style={{
              fontSize: 'clamp(26px, 5vw, 44px)',
              fontWeight: 700,
              fontFamily: sfDisplay,
              color: '#1a0f0a',
              marginBottom: '16px',
              letterSpacing: '-0.03em',
              lineHeight: '1.15',
            }}
          >
            {t.architecture.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smoothSpring, delay: 0.15 }}
            style={{
              fontSize: 'clamp(14px, 1.8vw, 17px)',
              fontFamily: sfFont,
              color: 'rgba(52, 21, 15, 0.55)',
              lineHeight: '1.6',
              maxWidth: '540px',
              margin: '0 auto',
            }}
          >
            {t.architecture.subtitle}
          </motion.p>
        </div>

        {/* ── Diagram ── */}
        <div className="flex flex-col items-center relative z-10">

          {/* TIER 1: Event Sources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothSpring, delay: 0.2 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            {TRIGGERS.map((trigger, idx) => (
              <motion.div
                key={trigger.label}
                className="flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...smoothSpring, delay: 0.2 + idx * 0.08 }}
              >
                <motion.div
                  style={{
                    width: isMobile ? '38px' : '44px',
                    height: isMobile ? '38px' : '44px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.5)',
                    border: '1px solid rgba(52, 21, 15, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(52, 21, 15, 0.06)',
                  }}
                  whileHover={{
                    scale: 1.12,
                    borderColor: 'rgba(211,152,88,0.4)',
                    boxShadow: '0 4px 16px rgba(211, 152, 88, 0.15)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <trigger.icon
                    size={isMobile ? 16 : 18}
                    color="#4a3020"
                    strokeWidth={1.8}
                  />
                </motion.div>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    color: 'rgba(52, 21, 15, 0.5)',
                    letterSpacing: '0.03em',
                    fontFamily: sfFont,
                  }}
                >
                  {trigger.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <Connector />

          {/* TIER 2: Guardrails */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...smoothSpring, delay: 0.25 }}
            className={`flex items-center justify-center ${isMobile ? 'gap-2' : 'gap-3'} w-full`}
            style={{
              ...glassCard,
              borderRadius: '14px',
              padding: isMobile ? '10px 14px' : '12px 24px',
              maxWidth: '520px',
            }}
          >
            <Shield size={15} color="#9A6B3A" strokeWidth={2} />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#34150F',
                fontFamily: sfFont,
              }}
            >
              Guardrails & Policy
            </span>
            <span
              className="hidden sm:inline"
              style={{ color: 'rgba(52, 21, 15, 0.15)', margin: '0 4px' }}
            >
              &mdash;
            </span>
            <span
              className="hidden sm:inline"
              style={{ fontSize: '11px', color: 'rgba(52, 21, 15, 0.45)', fontFamily: sfFont }}
            >
              {t.architecture.guardrailDesc}
            </span>
          </motion.div>

          <Connector />

          {/* TIER 3: Orchestration Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothSpring, delay: 0.3 }}
            className="w-full"
            style={{
              ...glassCard,
              background: 'rgba(255, 255, 255, 0.5)',
              borderColor: 'rgba(211,152,88,0.2)',
              borderRadius: '24px',
              padding: isMobile ? '20px 16px' : '28px 32px',
              maxWidth: '720px',
              margin: '0 auto',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Golden accent line at top */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(211,152,88,0.5), transparent)',
              }}
            />

            {/* Three orchestrator nodes */}
            <div
              className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-center gap-3`}
            >
              {/* Planner */}
              <motion.div
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(52, 21, 15, 0.08)',
                  borderRadius: '16px',
                  padding: isMobile ? '14px 12px' : '16px 16px',
                  textAlign: 'center',
                  width: isMobile ? '100%' : undefined,
                  boxShadow: '0 1px 6px rgba(52, 21, 15, 0.04)',
                }}
                whileHover={{
                  borderColor: 'rgba(211,152,88,0.3)',
                  boxShadow: '0 4px 16px rgba(211, 152, 88, 0.1)',
                }}
                transition={{ duration: 0.2 }}
              >
                <GitBranch
                  size={20}
                  color="#4a3020"
                  strokeWidth={1.8}
                  style={{ margin: '0 auto' }}
                />
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#1a0f0a',
                    marginTop: '8px',
                    fontFamily: sfFont,
                  }}
                >
                  Hybrid Planner
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(52, 21, 15, 0.45)', marginTop: '2px' }}>
                  DAG + ReAct
                </div>
              </motion.div>

              {/* Connector */}
              {isMobile ? (
                <div style={{ width: '2px', height: '12px', background: 'rgba(211,152,88,0.4)' }} />
              ) : (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  style={{
                    width: '20px',
                    height: '2px',
                    background: 'rgba(211,152,88,0.4)',
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Orchestrator (accent node) — pulsing glow */}
              <motion.div
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: 'rgba(211,152,88,0.12)',
                  border: '1.5px solid rgba(211,152,88,0.3)',
                  borderRadius: '16px',
                  padding: isMobile ? '14px 12px' : '16px 16px',
                  textAlign: 'center',
                  width: isMobile ? '100%' : undefined,
                }}
                animate={{
                  boxShadow: [
                    '0 0 12px rgba(211,152,88,0.08)',
                    '0 0 24px rgba(211,152,88,0.18)',
                    '0 0 12px rgba(211,152,88,0.08)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  borderColor: 'rgba(211,152,88,0.5)',
                  background: 'rgba(211,152,88,0.18)',
                }}
              >
                <Brain
                  size={22}
                  color="#9A6B3A"
                  strokeWidth={1.8}
                  style={{ margin: '0 auto' }}
                />
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#7A5025',
                    marginTop: '8px',
                    fontFamily: sfFont,
                  }}
                >
                  Orchestrator
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(122, 80, 37, 0.7)', marginTop: '2px' }}>
                  Coordinator
                </div>
              </motion.div>

              {/* Connector */}
              {isMobile ? (
                <div style={{ width: '2px', height: '12px', background: 'rgba(211,152,88,0.4)' }} />
              ) : (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  style={{
                    width: '20px',
                    height: '2px',
                    background: 'rgba(211,152,88,0.4)',
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Critic */}
              <motion.div
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(52, 21, 15, 0.08)',
                  borderRadius: '16px',
                  padding: isMobile ? '14px 12px' : '16px 16px',
                  textAlign: 'center',
                  width: isMobile ? '100%' : undefined,
                  boxShadow: '0 1px 6px rgba(52, 21, 15, 0.04)',
                }}
                whileHover={{
                  borderColor: 'rgba(211,152,88,0.3)',
                  boxShadow: '0 4px 16px rgba(211, 152, 88, 0.1)',
                }}
                transition={{ duration: 0.2 }}
              >
                <ShieldCheck
                  size={20}
                  color="#4a3020"
                  strokeWidth={1.8}
                  style={{ margin: '0 auto' }}
                />
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#1a0f0a',
                    marginTop: '8px',
                    fontFamily: sfFont,
                  }}
                >
                  Critic & Validator
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(52, 21, 15, 0.45)', marginTop: '2px' }}>
                  Quality Gate
                </div>
              </motion.div>
            </div>

            {/* Feedback loop indicator */}
            <motion.div
              className="flex items-center justify-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw size={12} color="rgba(154, 107, 58, 0.6)" strokeWidth={2} />
              </motion.div>
              <span
                style={{
                  fontSize: '11px',
                  color: 'rgba(52, 21, 15, 0.4)',
                  fontFamily: '"Courier New", monospace',
                  letterSpacing: '0.03em',
                }}
              >
                Feedback & Replanning Loop
              </span>
            </motion.div>

            {/* Routing Controller */}
            <motion.div
              className="mt-4"
              style={{
                background: 'rgba(211,152,88,0.08)',
                border: '1px solid rgba(211,152,88,0.18)',
                borderRadius: '12px',
                padding: isMobile ? '10px 14px' : '11px 20px',
              }}
              whileHover={{
                borderColor: 'rgba(211,152,88,0.35)',
                background: 'rgba(211,152,88,0.12)',
              }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center justify-center gap-5'}`}
              >
                <div className="flex items-center gap-2">
                  <Route size={13} color="#9A6B3A" strokeWidth={2} />
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#34150F',
                      fontFamily: sfFont,
                    }}
                  >
                    Routing Controller
                  </span>
                </div>
                <div
                  className={`flex ${isMobile ? 'flex-col gap-1' : 'items-center gap-4'}`}
                >
                  <span style={{ fontSize: '11px', color: 'rgba(52, 21, 15, 0.5)' }}>
                    {t.architecture.routerSmart}
                  </span>
                  {!isMobile && (
                    <span style={{ color: 'rgba(52, 21, 15, 0.15)' }}>|</span>
                  )}
                  <span style={{ fontSize: '11px', color: 'rgba(52, 21, 15, 0.5)' }}>
                    {t.architecture.routerEfficient}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature badges: orchestration */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center justify-center gap-2 flex-wrap mt-4 mb-2"
          >
            <FeatureBadge icon={Route} label={t.architecture.badgeRouting} />
            <FeatureBadge icon={Layers} label={t.architecture.badgePlanning} />
          </motion.div>

          <Connector />

          {/* TIER 4: Agent Grid — 3 columns for readable labels */}
          <div
            className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-3 w-full`}
            style={{ maxWidth: '720px' }}
          >
            {AGENTS.map((agent, idx) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 25, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...smoothSpring, delay: 0.35 + idx * 0.07 }}
                className="group relative overflow-hidden"
                style={{
                  ...glassCard,
                  background: 'rgba(255, 255, 255, 0.5)',
                  borderColor: `${agent.color}20`,
                  borderRadius: '16px',
                  padding: isMobile ? '16px 10px' : '18px 14px',
                  textAlign: 'center',
                }}
                whileHover={{
                  y: -4,
                  borderColor: `${agent.color}50`,
                  boxShadow: `0 8px 24px ${agent.color}15`,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Colored accent at top */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '50%',
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${agent.color}50, transparent)`,
                  }}
                />

                <motion.div
                  style={{
                    width: isMobile ? '36px' : '40px',
                    height: isMobile ? '36px' : '40px',
                    borderRadius: '11px',
                    background: `${agent.color}12`,
                    border: `1px solid ${agent.color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px',
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <agent.icon
                    size={isMobile ? 17 : 19}
                    color={agent.color}
                    strokeWidth={1.8}
                  />
                </motion.div>

                <div
                  style={{
                    fontSize: isMobile ? '11px' : '13px',
                    fontWeight: 700,
                    color: '#1a0f0a',
                    fontFamily: sfFont,
                    marginBottom: '3px',
                    lineHeight: '1.2',
                  }}
                >
                  {agent.name}
                </div>

                <div
                  style={{
                    fontSize: '10px',
                    color: 'rgba(52, 21, 15, 0.4)',
                    fontFamily: '"Courier New", monospace',
                    letterSpacing: '0.02em',
                  }}
                >
                  {agent.tools}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature badges: agents */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center justify-center gap-2 flex-wrap mt-4 mb-2"
          >
            <FeatureBadge icon={Lock} label={t.architecture.badgeIsolated} />
            <FeatureBadge icon={Zap} label={t.architecture.badgeParallel} />
          </motion.div>

          <Connector />

          {/* TIER 5: Bottom Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothSpring, delay: 0.5 }}
            className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3 w-full`}
            style={{ maxWidth: '520px' }}
          >
            {/* Observability */}
            <motion.div
              style={{
                ...glassCard,
                background: 'rgba(255, 255, 255, 0.45)',
                borderRadius: '14px',
                padding: '14px 16px',
              }}
              whileHover={{
                borderColor: 'rgba(52, 21, 15, 0.15)',
                boxShadow: '0 4px 16px rgba(52, 21, 15, 0.08)',
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Eye size={14} color="#4a3020" strokeWidth={2} />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#34150F',
                    fontFamily: sfFont,
                  }}
                >
                  Observability & Evals
                </span>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  color: 'rgba(52, 21, 15, 0.5)',
                  fontFamily: sfFont,
                }}
              >
                {t.architecture.observabilityDesc}
              </span>
            </motion.div>

            {/* Human-in-the-Loop */}
            <motion.div
              style={{
                ...glassCard,
                background: 'rgba(255, 255, 255, 0.45)',
                borderRadius: '14px',
                padding: '14px 16px',
              }}
              whileHover={{
                borderColor: 'rgba(52, 21, 15, 0.15)',
                boxShadow: '0 4px 16px rgba(52, 21, 15, 0.08)',
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <UserCheck size={14} color="#4a3020" strokeWidth={2} />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#34150F',
                    fontFamily: sfFont,
                  }}
                >
                  Human-in-the-Loop
                </span>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  color: 'rgba(52, 21, 15, 0.5)',
                  fontFamily: sfFont,
                }}
              >
                {t.architecture.humanDesc}
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default memo(ArchitectureSection);
