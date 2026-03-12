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
  { name: 'Communications', tools: 'Email \u00b7 CRM', icon: Mail, color: '#3B82F6' },
  { name: 'Calendar', tools: 'CalDAV \u00b7 Scheduling', icon: Calendar, color: '#F59E0B' },
  { name: 'Tasks', tools: 'Task Management', icon: CheckSquare, color: '#22C55E' },
  { name: 'Knowledge', tools: 'Vector DB \u00b7 RAG', icon: Database, color: '#EC4899' },
  { name: 'System', tools: 'Infrastructure \u00b7 Logs', icon: Terminal, color: '#8B5CF6' },
  { name: 'Code', tools: 'Sandbox \u00b7 Testing', icon: Code2, color: '#F97316' },
];

// ── Shared Styles ──

const glassCard: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
};

const sfFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
const sfDisplay = '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';

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
        background: 'linear-gradient(to bottom, rgba(211,152,88,0.5), rgba(211,152,88,0.08))',
        transformOrigin: 'top',
      }}
    />
  </div>
);

const FeatureBadge = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <motion.div
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
    style={{
      background: 'rgba(211,152,88,0.06)',
      border: '1px solid rgba(211,152,88,0.12)',
    }}
    whileHover={{ scale: 1.05, borderColor: 'rgba(211,152,88,0.3)' }}
    transition={{ duration: 0.2 }}
  >
    <Icon size={11} color="#D39858" strokeWidth={2.5} />
    <span
      style={{
        fontSize: '11px',
        fontWeight: 600,
        color: '#D39858',
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
    <div className="relative w-full" style={{ background: '#0A0A0A' }}>
      <div id="architecture-anchor" style={{ position: 'absolute', top: '-80px' }} />

      <div
        className={`relative mx-auto ${isMobile ? 'px-5 py-16' : 'px-6 py-20 md:py-28'}`}
        style={{ maxWidth: '860px' }}
      >
        {/* Subtle glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(211,152,88,0.04) 0%, transparent 60%)',
          }}
        />

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
              color: '#D39858',
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
              color: 'rgba(255,255,255,0.95)',
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
              color: 'rgba(255,255,255,0.45)',
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
                    width: isMobile ? '38px' : '42px',
                    height: isMobile ? '38px' : '42px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  whileHover={{
                    scale: 1.12,
                    borderColor: 'rgba(211,152,88,0.3)',
                    background: 'rgba(211,152,88,0.08)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <trigger.icon
                    size={isMobile ? 16 : 18}
                    color="rgba(255,255,255,0.5)"
                    strokeWidth={1.8}
                  />
                </motion.div>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.3)',
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
            <Shield size={15} color="#D39858" strokeWidth={2} />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.7)',
                fontFamily: sfFont,
              }}
            >
              Guardrails & Policy
            </span>
            <span
              className="hidden sm:inline"
              style={{ color: 'rgba(255,255,255,0.12)', margin: '0 4px' }}
            >
              &mdash;
            </span>
            <span
              className="hidden sm:inline"
              style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontFamily: sfFont }}
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
              borderColor: 'rgba(211,152,88,0.12)',
              borderRadius: '24px',
              padding: isMobile ? '20px 16px' : '28px 32px',
              maxWidth: '680px',
              margin: '0 auto',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Animated golden accent line at top */}
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
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(211,152,88,0.4), transparent)',
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
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: isMobile ? '14px 12px' : '16px 16px',
                  textAlign: 'center',
                  width: isMobile ? '100%' : undefined,
                }}
                whileHover={{
                  borderColor: 'rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                }}
                transition={{ duration: 0.2 }}
              >
                <GitBranch
                  size={20}
                  color="rgba(255,255,255,0.6)"
                  strokeWidth={1.8}
                  style={{ margin: '0 auto' }}
                />
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.85)',
                    marginTop: '8px',
                    fontFamily: sfFont,
                  }}
                >
                  Hybrid Planner
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>
                  DAG + ReAct
                </div>
              </motion.div>

              {/* Connector */}
              {isMobile ? (
                <div style={{ width: '2px', height: '12px', background: 'rgba(211,152,88,0.3)' }} />
              ) : (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  style={{
                    width: '20px',
                    height: '2px',
                    background: 'rgba(211,152,88,0.3)',
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Orchestrator (accent node) — pulsing glow */}
              <motion.div
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: 'rgba(211,152,88,0.08)',
                  border: '1px solid rgba(211,152,88,0.2)',
                  borderRadius: '16px',
                  padding: isMobile ? '14px 12px' : '16px 16px',
                  textAlign: 'center',
                  width: isMobile ? '100%' : undefined,
                }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(211,152,88,0.06)',
                    '0 0 35px rgba(211,152,88,0.12)',
                    '0 0 20px rgba(211,152,88,0.06)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  borderColor: 'rgba(211,152,88,0.4)',
                  background: 'rgba(211,152,88,0.12)',
                }}
              >
                <Brain
                  size={22}
                  color="#D39858"
                  strokeWidth={1.8}
                  style={{ margin: '0 auto' }}
                />
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#D39858',
                    marginTop: '8px',
                    fontFamily: sfFont,
                  }}
                >
                  Orchestrator
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(211,152,88,0.6)', marginTop: '2px' }}>
                  Coordinator
                </div>
              </motion.div>

              {/* Connector */}
              {isMobile ? (
                <div style={{ width: '2px', height: '12px', background: 'rgba(211,152,88,0.3)' }} />
              ) : (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  style={{
                    width: '20px',
                    height: '2px',
                    background: 'rgba(211,152,88,0.3)',
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Critic */}
              <motion.div
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: isMobile ? '14px 12px' : '16px 16px',
                  textAlign: 'center',
                  width: isMobile ? '100%' : undefined,
                }}
                whileHover={{
                  borderColor: 'rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                }}
                transition={{ duration: 0.2 }}
              >
                <ShieldCheck
                  size={20}
                  color="rgba(255,255,255,0.6)"
                  strokeWidth={1.8}
                  style={{ margin: '0 auto' }}
                />
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.85)',
                    marginTop: '8px',
                    fontFamily: sfFont,
                  }}
                >
                  Critic & Validator
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>
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
                <RefreshCw size={12} color="rgba(211,152,88,0.5)" strokeWidth={2} />
              </motion.div>
              <span
                style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.3)',
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
                background: 'rgba(211,152,88,0.05)',
                border: '1px solid rgba(211,152,88,0.1)',
                borderRadius: '12px',
                padding: isMobile ? '10px 14px' : '11px 20px',
              }}
              whileHover={{
                borderColor: 'rgba(211,152,88,0.25)',
                background: 'rgba(211,152,88,0.08)',
              }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center justify-center gap-5'}`}
              >
                <div className="flex items-center gap-2">
                  <Route size={13} color="#D39858" strokeWidth={2} />
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.65)',
                      fontFamily: sfFont,
                    }}
                  >
                    Routing Controller
                  </span>
                </div>
                <div
                  className={`flex ${isMobile ? 'flex-col gap-1' : 'items-center gap-4'}`}
                >
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                    {t.architecture.routerSmart}
                  </span>
                  {!isMobile && (
                    <span style={{ color: 'rgba(255,255,255,0.12)' }}>|</span>
                  )}
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
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

          {/* TIER 4: Agent Grid */}
          <div
            className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3 md:grid-cols-6'} gap-3 w-full`}
            style={{ maxWidth: '680px' }}
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
                  borderColor: `${agent.color}15`,
                  borderRadius: '16px',
                  padding: isMobile ? '16px 10px' : '18px 12px',
                  textAlign: 'center',
                }}
                whileHover={{
                  y: -4,
                  borderColor: `${agent.color}40`,
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
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${agent.color}30, transparent)`,
                  }}
                />

                <motion.div
                  style={{
                    width: isMobile ? '36px' : '40px',
                    height: isMobile ? '36px' : '40px',
                    borderRadius: '11px',
                    background: `${agent.color}10`,
                    border: `1px solid ${agent.color}18`,
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
                    fontSize: isMobile ? '11px' : '12px',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.85)',
                    fontFamily: sfFont,
                    marginBottom: '3px',
                    lineHeight: '1.2',
                  }}
                >
                  {agent.name}
                </div>

                <div
                  style={{
                    fontSize: '9px',
                    color: 'rgba(255,255,255,0.3)',
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
                borderRadius: '14px',
                padding: '14px 16px',
              }}
              whileHover={{
                borderColor: 'rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Eye size={14} color="rgba(255,255,255,0.5)" strokeWidth={2} />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.7)',
                    fontFamily: sfFont,
                  }}
                >
                  Observability & Evals
                </span>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.3)',
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
                borderRadius: '14px',
                padding: '14px 16px',
              }}
              whileHover={{
                borderColor: 'rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <UserCheck size={14} color="rgba(255,255,255,0.5)" strokeWidth={2} />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.7)',
                    fontFamily: sfFont,
                  }}
                >
                  Human-in-the-Loop
                </span>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.3)',
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
