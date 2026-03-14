'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Database, BarChart3, Users, Bell, MessageSquare, ShieldAlert, TrendingUp, Activity, FileText, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import type { LeadStep } from './leadScenarios';
import type { DemoTheme } from '../theme';
import LeadIdleDashboard from './LeadIdleDashboard';

interface LeadDashboardProps {
  steps: LeadStep[];
  theme: DemoTheme;
}

const scoreColors: Record<string, string> = {
  HOT: '#EF4444',
  WARM: '#F59E0B',
  COLD: '#6B7280',
};

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function AnimatedScore({ target, theme }: { target: number; theme: DemoTheme }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (target === 0) { setCurrent(0); return; }
    let frame: number;
    const start = performance.now();
    const duration = 1200;
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <span style={{ color: theme.text, fontFamily: 'monospace' }}>{current}</span>;
}

// ─── Step Icon + Color mapping ───

function getStepMeta(type: string) {
  switch (type) {
    case 'ai_analyzing':   return { icon: Loader2, color: '#A78BFA', label: 'AI Analysis' };
    case 'crm_lookup':     return { icon: Database, color: '#3B82F6', label: 'CRM Lookup' };
    case 'crm_result':     return { icon: Database, color: '#3B82F6', label: 'CRM Result' };
    case 'rag_search':     return { icon: Search, color: '#F59E0B', label: 'Knowledge Base' };
    case 'rag_result':     return { icon: FileText, color: '#F59E0B', label: 'Documents Found' };
    case 'score_update':   return { icon: BarChart3, color: '#8B5CF6', label: 'Lead Score' };
    case 'crm_update':     return { icon: Users, color: '#22C55E', label: 'CRM Update' };
    case 'pipeline_move':  return { icon: ArrowRight, color: '#22C55E', label: 'Pipeline' };
    case 'notification':   return { icon: Bell, color: '#F59E0B', label: 'Notification' };
    case 'auto_reply':     return { icon: MessageSquare, color: '#3B82F6', label: 'Auto-Reply' };
    case 'filter_action':  return { icon: ShieldAlert, color: '#6B7280', label: 'Filter' };
    case 'analytics_update': return { icon: TrendingUp, color: '#22C55E', label: 'Analytics' };
    default:               return { icon: Activity, color: '#A8A29E', label: 'Processing' };
  }
}

export default function LeadDashboard({ steps, theme }: LeadDashboardProps) {
  const { language } = useTranslation();
  const isLight = theme.mode === 'light';
  const scrollRef = useRef<HTMLDivElement>(null);
  const [latestIdx, setLatestIdx] = useState(-1);

  // Skip 'incoming_message' steps — those are shown on the left panel
  const dashboardSteps = steps.filter(s => s.type !== 'incoming_message');

  useEffect(() => {
    setLatestIdx(dashboardSteps.length - 1);
  }, [dashboardSteps.length]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [dashboardSteps.length]);

  if (steps.length === 0) {
    return <LeadIdleDashboard theme={theme} />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 shrink-0" style={{ borderBottom: `1px solid ${theme.border}`, background: isLight ? 'rgba(0,0,0,0.01)' : 'rgba(255,255,255,0.02)' }}>
        <Activity size={13} style={{ color: theme.accent }} />
        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: theme.accent }}>
          {language === 'EN' ? 'AI Agent Activity' : 'KI-Agent Aktivität'}
        </span>
        <span className="text-[10px] ml-auto" style={{ color: theme.textMuted }}>
          {dashboardSteps.length} {language === 'EN' ? 'steps' : 'Schritte'}
        </span>
      </div>

      {/* Timeline */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 scrollbar-thin">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-3 bottom-3 w-px" style={{ background: theme.border }} />

          {dashboardSteps.map((step, i) => {
            const meta = getStepMeta(step.type);
            const Icon = meta.icon;
            const isLatest = i === latestIdx;
            const rgb = hexToRgb(meta.color);

            return (
              <div key={i} className="relative flex gap-3 pb-4 animate-fadeIn" style={{ animationDelay: `${i * 50}ms` }}>
                {/* Timeline dot */}
                <div className="relative z-10 shrink-0">
                  <div
                    className="w-[23px] h-[23px] rounded-full flex items-center justify-center transition-all duration-500"
                    style={{
                      background: isLatest ? meta.color : `rgba(${rgb}, ${isLight ? '0.1' : '0.15'})`,
                      boxShadow: isLatest ? `0 0 8px rgba(${rgb}, 0.3)` : 'none',
                    }}
                  >
                    <Icon size={11} style={{ color: isLatest ? '#fff' : meta.color }} className={step.type === 'ai_analyzing' && isLatest ? 'animate-spin' : ''} />
                  </div>
                </div>

                {/* Step content */}
                <div
                  className="flex-1 min-w-0 rounded-lg px-3 py-2 transition-all duration-500"
                  style={{
                    background: isLatest ? `rgba(${rgb}, ${isLight ? '0.05' : '0.08'})` : 'transparent',
                    border: isLatest ? `1px solid rgba(${rgb}, 0.15)` : '1px solid transparent',
                  }}
                >
                  {/* Step header */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: meta.color }}>{meta.label}</span>
                    {isLatest && <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: meta.color }} />}
                  </div>

                  {/* Step body */}
                  <p className="text-[11px] leading-relaxed" style={{ color: theme.text }}>{step.content}</p>

                  {/* ─── Rich content per step type ─── */}

                  {/* RAG Results */}
                  {step.type === 'rag_result' && step.ragDocs && (
                    <div className="mt-2 space-y-1">
                      {step.ragDocs.map((doc, j) => (
                        <div key={j} className="flex items-center gap-2 px-2 py-1 rounded" style={{ background: isLight ? 'rgba(245,158,11,0.05)' : 'rgba(245,158,11,0.08)' }}>
                          <FileText size={10} style={{ color: '#F59E0B' }} />
                          <span className="text-[10px] flex-1 truncate" style={{ color: theme.text }}>{doc.title}</span>
                          <span className="text-[9px] font-bold shrink-0" style={{ color: '#F59E0B' }}>{doc.match}%</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Score with reasons */}
                  {step.type === 'score_update' && step.score !== undefined && step.scoreLabel && (
                    <div className="mt-2">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-[22px] font-bold">
                          <AnimatedScore target={step.score} theme={theme} />
                          <span className="text-[11px] font-normal" style={{ color: theme.textMuted }}>/100</span>
                        </div>
                        <span
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                          style={{ background: `${scoreColors[step.scoreLabel]}20`, color: scoreColors[step.scoreLabel] }}
                        >
                          {step.scoreLabel === 'HOT' ? '🔥' : step.scoreLabel === 'WARM' ? '🌡️' : '❄️'} {step.scoreLabel}
                        </span>
                      </div>
                      {/* Score bar */}
                      <div className="h-1.5 rounded-full overflow-hidden mb-2" style={{ background: isLight ? '#E7E5E4' : 'rgba(255,255,255,0.06)' }}>
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${step.score}%`, background: `linear-gradient(90deg, ${scoreColors[step.scoreLabel]}80, ${scoreColors[step.scoreLabel]})` }}
                        />
                      </div>
                      {/* Score reasons */}
                      {step.scoreReasons && (
                        <div className="space-y-0.5">
                          {step.scoreReasons.map((reason, j) => {
                            const isPositive = reason.includes('+');
                            return (
                              <div key={j} className="flex items-center gap-1.5 text-[9px]" style={{ color: theme.textSecondary }}>
                                <span style={{ color: isPositive ? '#22C55E' : '#EF4444' }}>{isPositive ? '▲' : '▼'}</span>
                                {reason}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* CRM Update with lead card */}
                  {(step.type === 'crm_update' || step.type === 'crm_result') && step.leadData && (
                    <div className="mt-2 flex items-center gap-2 px-2.5 py-2 rounded-lg" style={{ background: isLight ? 'rgba(34,197,94,0.04)' : 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.12)' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E' }}>
                        {step.leadData.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold truncate" style={{ color: theme.text }}>{step.leadData.name}</p>
                        <p className="text-[9px] truncate" style={{ color: theme.textMuted }}>
                          {[step.leadData.role, step.leadData.company].filter(Boolean).join(' @ ')}
                          {step.leadData.employees && ` · ${step.leadData.employees} emp`}
                        </p>
                      </div>
                      <CheckCircle2 size={12} style={{ color: '#22C55E' }} />
                    </div>
                  )}

                  {/* Pipeline move */}
                  {step.type === 'pipeline_move' && step.pipelineStage && (
                    <div className="mt-2 flex items-center gap-2">
                      {['new', 'qualified', 'contacted'].map((stage, j) => {
                        const active = stage === step.pipelineStage;
                        const stageColor = stage === 'new' ? '#3B82F6' : stage === 'qualified' ? '#F59E0B' : '#22C55E';
                        const stageLabel = stage === 'new' ? (language === 'EN' ? 'New' : 'Neu') : stage === 'qualified' ? (language === 'EN' ? 'Qualified' : 'Qualifiziert') : (language === 'EN' ? 'Contacted' : 'Kontaktiert');
                        return (
                          <div key={stage} className="flex items-center gap-1.5">
                            {j > 0 && <ArrowRight size={8} style={{ color: theme.textMuted }} />}
                            <div
                              className="px-2 py-1 rounded text-[9px] font-bold transition-all"
                              style={{
                                background: active ? `${stageColor}20` : 'transparent',
                                color: active ? stageColor : theme.textMuted,
                                border: active ? `1px solid ${stageColor}40` : `1px solid ${theme.border}`,
                              }}
                            >
                              {active ? '● ' : ''}{stageLabel}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Notification with preview */}
                  {step.type === 'notification' && step.notifyPreview && (
                    <div className="mt-2 rounded-lg overflow-hidden" style={{ border: `1px solid ${step.notifyChannel === 'sms' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)'}` }}>
                      <div className="flex items-center gap-1.5 px-2.5 py-1" style={{ background: step.notifyChannel === 'sms' ? 'rgba(239,68,68,0.06)' : 'rgba(245,158,11,0.06)' }}>
                        <span className="text-[10px]">{step.notifyChannel === 'slack' ? '💬' : step.notifyChannel === 'sms' ? '📱' : '📧'}</span>
                        <span className="text-[9px] font-bold uppercase" style={{ color: step.notifyChannel === 'sms' ? '#EF4444' : '#F59E0B' }}>
                          {step.notifyChannel === 'slack' ? 'Slack' : step.notifyChannel === 'sms' ? 'SMS Alert' : 'Email'}
                        </span>
                      </div>
                      <div className="px-2.5 py-2 text-[10px] leading-relaxed whitespace-pre-line font-mono" style={{ color: theme.text, background: isLight ? 'rgba(0,0,0,0.01)' : 'rgba(255,255,255,0.02)' }}>
                        {step.notifyPreview}
                      </div>
                    </div>
                  )}

                  {/* Auto-reply preview */}
                  {step.type === 'auto_reply' && (
                    <div className="mt-2 rounded-lg px-2.5 py-2 text-[10px] leading-relaxed whitespace-pre-line" style={{ background: isLight ? 'rgba(59,130,246,0.04)' : 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.12)', color: theme.text, maxHeight: 100, overflow: 'hidden' }}>
                      {step.content.length > 180 ? step.content.slice(0, 180) + '...' : step.content}
                    </div>
                  )}

                  {/* Filter action */}
                  {step.type === 'filter_action' && (
                    <div className="mt-1 flex items-center gap-1.5">
                      <ShieldAlert size={10} style={{ color: '#6B7280' }} />
                      <span className="text-[9px] font-medium" style={{ color: '#6B7280' }}>{language === 'EN' ? 'Automated action' : 'Automatische Aktion'}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
