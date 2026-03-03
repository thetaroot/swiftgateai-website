'use client';

import { useState, useEffect, useRef } from 'react';
import { Brain, Mail, Calendar, CheckSquare, Users, Search, ChevronRight, Check, Globe, MessageCircle, X } from 'lucide-react';
import type { DemoStep } from './scenarios';
import type { DemoTheme } from './theme';
import AgentDashboard from './AgentDashboard';

interface ActivityPanelProps {
  steps: DemoStep[];
  resetKey: number;
  theme: DemoTheme;
}

const agentConfig: Record<string, { icon: typeof Brain; color: string; label: string }> = {
  ceo: { icon: Brain, color: '#8B5CF6', label: 'CEO Agent' },
  communications: { icon: Mail, color: '#007AFF', label: 'Communications' },
  calendar: { icon: Calendar, color: '#FF3B30', label: 'Calendar' },
  tasks: { icon: CheckSquare, color: '#22C55E', label: 'Tasks' },
  knowledge: { icon: Search, color: '#F59E0B', label: 'Knowledge' },
};

const appLabels: Record<string, { icon: typeof Mail; color: string; label: string }> = {
  inbox: { icon: Mail, color: '#007AFF', label: 'Posteingang' },
  calendar: { icon: Calendar, color: '#FF3B30', label: 'Kalender' },
  crm: { icon: Users, color: '#F59E0B', label: 'CRM Pipeline' },
  tasks: { icon: CheckSquare, color: '#22C55E', label: 'Aufgaben' },
  knowledge: { icon: Search, color: '#8B5CF6', label: 'Firmenwissen' },
};

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

// ─── Inbox Preview ───
function InboxPreview({ step, theme }: { step: number; theme: DemoTheme }) {
  const messages = [
    { channel: 'email', icon: Mail, color: '#007AFF', from: 'Dr. Stefan Hoffmann', company: 'Technik GmbH', subject: 'Anfrage: KI-gestützte Qualitätskontrolle', time: '09:14' },
    { channel: 'web', icon: Globe, color: '#22C55E', from: 'Sarah Klein', company: 'Nova Digital', subject: 'Beratungstermin gewünscht', time: '10:02' },
    { channel: 'whatsapp', icon: MessageCircle, color: '#25D366', from: 'Martin Weber', company: 'Weber Consulting', subject: 'Rückfrage zu Angebot #247', time: '11:38' },
  ];
  const isLight = theme.mode === 'light';

  return (
    <div className="space-y-2">
      {step < 1 && (
        <div className="flex items-center justify-center h-20">
          <p style={{ color: theme.textMuted, fontSize: '11px' }}>Posteingang wird geprüft...</p>
        </div>
      )}
      {messages.map((msg, i) => {
        const visible = step >= i + 2;
        const drafted = step >= 5;
        if (!visible) return null;
        const Icon = msg.icon;
        const rgb = hexToRgb(msg.color);
        return (
          <div
            key={i}
            className="animate-fadeIn rounded-lg px-3 py-2.5 transition-all duration-300"
            style={{
              background: drafted ? `rgba(${rgb}, ${isLight ? '0.06' : '0.08'})` : isLight ? '#F9F9F7' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${drafted ? `rgba(${rgb}, 0.2)` : theme.border}`,
            }}
          >
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `rgba(${rgb}, 0.15)` }}>
                <Icon size={13} style={{ color: msg.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-semibold truncate" style={{ color: theme.text }}>{msg.from}</p>
                  <span className="text-[9px] shrink-0" style={{ color: theme.textMuted }}>{msg.time}</span>
                </div>
                <p className="text-[9px]" style={{ color: theme.textSecondary }}>{msg.company}</p>
                <p className="text-[10px] mt-0.5 truncate" style={{ color: theme.textMuted }}>{msg.subject}</p>
                {drafted && (
                  <div className="mt-1.5 flex items-center gap-1">
                    <Check size={10} style={{ color: msg.color }} />
                    <span className="text-[9px] font-medium" style={{ color: msg.color }}>Antwort-Entwurf bereit</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {step >= 1 && step < 2 && (
        <div className="text-center py-2">
          <span className="text-[10px] font-medium" style={{ color: '#007AFF' }}>3 neue Anfragen gefunden</span>
        </div>
      )}
    </div>
  );
}

// ─── Calendar Preview ───
function CalendarPreview({ step, theme }: { step: number; theme: DemoTheme }) {
  const isLight = theme.mode === 'light';
  const days = [
    { day: 'Mo', events: [{ time: '09:00', title: 'Team Standup', color: '#8B5CF6' }, { time: '14:00', title: 'Client Call Müller', color: '#007AFF' }] },
    { day: 'Di', events: [{ time: '10:00', title: 'Deep Work', color: '#6B7280' }, { time: '15:00', title: 'Partnergespräch', color: '#22C55E' }] },
    { day: 'Mi', events: [{ time: '09:30', title: 'Sprint Review', color: '#F59E0B' }, ...(step >= 3 ? [{ time: '14:00', title: 'Angebot TG', color: '#FF3B30' }] : [])] },
    { day: 'Do', events: [{ time: '11:00', title: 'Investoren-Update', color: '#EC4899' }, { time: '15:00', title: 'Tech Review', color: '#8B5CF6' }] },
    { day: 'Fr', events: [{ time: '10:00', title: 'Weekly Retro', color: '#6B7280' }, { time: '14:00', title: 'Offsite Planning', color: '#007AFF' }] },
  ];

  return (
    <div className="grid grid-cols-5 gap-1.5">
      {days.map((d, di) => (
        <div key={d.day}>
          <p className="text-center text-[9px] font-bold mb-1.5" style={{ color: theme.textSecondary }}>{d.day}</p>
          <div className="space-y-1">
            {d.events.map((ev, ei) => {
              const rgb = hexToRgb(ev.color);
              return (
                <div
                  key={ei}
                  className="rounded px-1 py-1 transition-all duration-500"
                  style={{
                    background: `rgba(${rgb}, ${isLight ? '0.08' : '0.12'})`,
                    borderLeft: `2px solid ${ev.color}`,
                  }}
                >
                  <p className="text-[7px] font-medium" style={{ color: ev.color }}>{ev.time}</p>
                  <p className="text-[8px] truncate" style={{ color: theme.text }}>{ev.title}</p>
                </div>
              );
            })}
            {/* Free block on Wednesday */}
            {di === 2 && step >= 2 && step < 3 && (
              <div
                className="rounded px-1 py-1.5 border-2 border-dashed animate-fadeIn"
                style={{ borderColor: '#22C55E', background: `rgba(34,197,94,${isLight ? '0.05' : '0.08'})` }}
              >
                <p className="text-[7px] font-medium" style={{ color: '#22C55E' }}>14:00–17:00</p>
                <p className="text-[8px]" style={{ color: '#22C55E' }}>Frei</p>
              </div>
            )}
          </div>
        </div>
      ))}
      {step >= 1 && (
        <div className="col-span-5 mt-2 rounded-lg px-2 py-1.5 animate-fadeIn" style={{ background: isLight ? '#F5F3EE' : 'rgba(255,255,255,0.03)' }}>
          <p className="text-[9px]" style={{ color: theme.textSecondary }}>
            Auslastung: <span className="font-bold" style={{ color: '#F59E0B' }}>78%</span> · 8 Termine · 1 freier Block
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Tasks Preview ───
function TasksPreview({ step, theme }: { step: number; theme: DemoTheme }) {
  const isLight = theme.mode === 'light';
  const overdue = step >= 2;
  const prioritized = step >= 3;

  return (
    <div className="space-y-2">
      {/* Project 1 */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: '#007AFF' }}>KI-Integration Müller GmbH</p>
        <div className="space-y-1">
          <TaskRow icon={<Check size={10} />} title="Anforderungsanalyse" status="done" theme={theme} />
          <TaskRow icon={<div className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: '#F59E0B' }} />} title="Systemarchitektur" status="progress" theme={theme} />
          <TaskRow
            icon={<div className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: overdue ? '#EF4444' : theme.textMuted }} />}
            title="Angebotsentwurf"
            status={overdue ? 'overdue' : 'todo'}
            badge={overdue ? '2 Tage' : undefined}
            highlight={prioritized}
            theme={theme}
          />
        </div>
      </div>
      {/* Project 2 */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: '#22C55E' }}>Website Relaunch</p>
        <div className="space-y-1">
          <TaskRow icon={<div className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: '#F59E0B' }} />} title="Design Mockups" status="progress" theme={theme} />
          <TaskRow icon={<div className="w-2.5 h-2.5 rounded" style={{ border: `1.5px solid ${theme.textMuted}` }} />} title="Content Migration" status="todo" theme={theme} />
        </div>
      </div>
      {/* Backlog */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: theme.textMuted }}>Backlog</p>
        <div className="space-y-1">
          <TaskRow
            icon={<div className="w-2.5 h-2.5 rounded" style={{ border: `1.5px solid ${overdue ? '#EF4444' : theme.textMuted}` }} />}
            title="CRM-Daten Bereinigung"
            status={overdue ? 'overdue' : 'todo'}
            badge={overdue ? '1 Tag' : undefined}
            theme={theme}
          />
          <TaskRow icon={<div className="w-2.5 h-2.5 rounded" style={{ border: `1.5px solid ${theme.textMuted}` }} />} title="Investoren-Deck aktualisieren" status="todo" theme={theme} />
        </div>
      </div>
      {prioritized && (
        <div className="rounded-lg px-2 py-1.5 animate-fadeIn" style={{ background: `rgba(34,197,94,${isLight ? '0.06' : '0.08'})`, border: '1px solid rgba(34,197,94,0.2)' }}>
          <p className="text-[9px] font-medium" style={{ color: '#22C55E' }}>Priorisierung: 1) Angebot TG → 2) Sprint Review → 3) CRM auto</p>
        </div>
      )}
    </div>
  );
}

function TaskRow({ icon, title, status, badge, highlight, theme }: { icon: React.ReactNode; title: string; status: string; badge?: string; highlight?: boolean; theme: DemoTheme }) {
  const isLight = theme.mode === 'light';
  return (
    <div
      className="flex items-center gap-2 px-2 py-1 rounded transition-all duration-300"
      style={{
        background: highlight ? `rgba(34,197,94,${isLight ? '0.06' : '0.08'})` : 'transparent',
        border: highlight ? '1px solid rgba(34,197,94,0.2)' : '1px solid transparent',
      }}
    >
      <div className="shrink-0">{icon}</div>
      <span className={`text-[10px] flex-1 ${status === 'done' ? 'line-through' : ''}`} style={{ color: status === 'done' ? theme.textMuted : theme.text }}>{title}</span>
      {status === 'progress' && <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>In Arbeit</span>}
      {status === 'overdue' && badge && <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444' }}>{badge}</span>}
    </div>
  );
}

// ─── CRM Preview ───
function CrmPreview({ step, theme }: { step: number; theme: DemoTheme }) {
  const isLight = theme.mode === 'light';
  const stages = [
    { label: 'Neu', count: step >= 2 ? 3 : 2, color: '#007AFF' },
    { label: 'Kontaktiert', count: 4, color: '#F59E0B' },
    { label: 'Angebot', count: 2, color: '#8B5CF6' },
    { label: 'Gewonnen', count: 3, color: '#22C55E' },
  ];
  const enriched = step >= 3;
  const followUp = step >= 4;

  return (
    <div className="space-y-3">
      {/* Pipeline Bar */}
      <div className="flex gap-1">
        {stages.map((s) => {
          const rgb = hexToRgb(s.color);
          return (
            <div key={s.label} className="flex-1 text-center rounded-lg py-1.5" style={{ background: `rgba(${rgb}, ${isLight ? '0.08' : '0.12'})` }}>
              <p className="text-[14px] font-bold" style={{ color: s.color }}>{s.count}</p>
              <p className="text-[8px]" style={{ color: theme.textMuted }}>{s.label}</p>
            </div>
          );
        })}
      </div>
      {/* Lead Card */}
      {step >= 2 && (
        <div className="animate-fadeIn rounded-lg px-3 py-2.5" style={{ background: isLight ? '#F9F9F7' : 'rgba(255,255,255,0.03)', border: `1px solid ${theme.border}` }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E' }}>SK</div>
            <div>
              <p className="text-[11px] font-semibold" style={{ color: theme.text }}>Sarah Klein</p>
              <p className="text-[9px]" style={{ color: theme.textSecondary }}>Nova Digital</p>
            </div>
            <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,122,255,0.12)', color: '#007AFF' }}>Neuer Lead</span>
          </div>
          {enriched && (
            <div className="space-y-1 animate-fadeIn">
              <div className="flex justify-between text-[9px]">
                <span style={{ color: theme.textMuted }}>Branche</span>
                <span style={{ color: theme.text }}>E-Commerce Agentur</span>
              </div>
              <div className="flex justify-between text-[9px]">
                <span style={{ color: theme.textMuted }}>Mitarbeiter</span>
                <span style={{ color: theme.text }}>45</span>
              </div>
              <div className="flex justify-between text-[9px]">
                <span style={{ color: theme.textMuted }}>Interesse</span>
                <span style={{ color: theme.text }}>KI-Automatisierung</span>
              </div>
              <div className="flex justify-between text-[9px]">
                <span style={{ color: theme.textMuted }}>Quelle</span>
                <span style={{ color: '#22C55E' }}>Website-Formular</span>
              </div>
            </div>
          )}
          {followUp && (
            <div className="mt-2 pt-2 animate-fadeIn" style={{ borderTop: `1px solid ${theme.border}` }}>
              <div className="flex items-center gap-1.5">
                <Calendar size={10} style={{ color: '#FF3B30' }} />
                <span className="text-[9px]" style={{ color: '#FF3B30' }}>Follow-up: Donnerstag 10:00</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Knowledge Preview ───
function KnowledgePreview({ step, theme }: { step: number; theme: DemoTheme }) {
  const isLight = theme.mode === 'light';
  const results = [
    { title: 'Onboarding_Enterprise.pdf', match: 95, pages: 'Kapitel 2–4', type: 'PDF' },
    { title: 'Prozesshandbuch_v3.md', match: 91, pages: '', type: 'MD' },
    { title: 'Checkliste_Kickoff.pdf', match: 87, pages: 'Seite 1–3', type: 'PDF' },
    { title: 'FAQ_Onboarding.md', match: 82, pages: '', type: 'MD' },
  ];

  return (
    <div className="space-y-2">
      {step >= 1 && (
        <div className="animate-fadeIn rounded-lg px-3 py-2" style={{ background: isLight ? '#F9F9F7' : 'rgba(255,255,255,0.03)', border: `1px solid ${theme.border}` }}>
          <div className="flex items-center gap-2">
            <Search size={12} style={{ color: '#8B5CF6' }} />
            <span className="text-[10px]" style={{ color: theme.text }}>{'"Enterprise Onboarding Prozess"'}</span>
          </div>
        </div>
      )}
      {results.map((r, i) => {
        if (step < i + 2) return null;
        const barWidth = `${r.match}%`;
        return (
          <div key={i} className="animate-fadeIn rounded-lg px-3 py-2" style={{ background: isLight ? '#F9F9F7' : 'rgba(255,255,255,0.03)', border: `1px solid ${theme.border}` }}>
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] px-1 py-0.5 rounded font-bold" style={{ background: 'rgba(139,92,246,0.12)', color: '#8B5CF6' }}>{r.type}</span>
                <span className="text-[10px] font-medium" style={{ color: theme.text }}>{r.title}</span>
              </div>
              <span className="text-[10px] font-bold shrink-0" style={{ color: r.match > 90 ? '#22C55E' : '#F59E0B' }}>{r.match}%</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: isLight ? '#E7E5E4' : 'rgba(255,255,255,0.05)' }}>
              <div className="h-full rounded-full transition-all duration-700" style={{ width: barWidth, background: r.match > 90 ? '#22C55E' : '#F59E0B' }} />
            </div>
            {r.pages && <p className="text-[8px] mt-1" style={{ color: theme.textMuted }}>{r.pages}</p>}
          </div>
        );
      })}
      {step >= 6 && (
        <div className="animate-fadeIn rounded-lg px-3 py-2" style={{ background: `rgba(139,92,246,${isLight ? '0.06' : '0.08'})`, border: '1px solid rgba(139,92,246,0.2)' }}>
          <p className="text-[9px] font-medium" style={{ color: '#8B5CF6' }}>4 Quellen synthetisiert — Konfidenz: 93%</p>
        </div>
      )}
    </div>
  );
}

// ─── Main Panel ───
export default function ActivityPanel({ steps, resetKey, theme }: ActivityPanelProps) {
  const [visibleSteps, setVisibleSteps] = useState<DemoStep[]>([]);
  const [activeAgents, setActiveAgents] = useState<Set<string>>(new Set());
  const [completedAgents, setCompletedAgents] = useState<Set<string>>(new Set());
  const [currentApp, setCurrentApp] = useState<string | null>(null);
  const [appStep, setAppStep] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleSteps([]);
    setActiveAgents(new Set());
    setCompletedAgents(new Set());
    setCurrentApp(null);
    setAppStep(0);
    setShowPreview(true);
    if (steps.length === 0) {
      setIsActive(false);
    }
  }, [resetKey, steps.length]);

  useEffect(() => {
    if (steps.length === 0) return;
    setIsActive(true);
    const latest = steps[steps.length - 1];
    setVisibleSteps([...steps]);

    if (latest.agent) {
      setActiveAgents(prev => new Set(prev).add(latest.agent!));
      if (latest.type === 'delegation' && latest.agent !== 'ceo') {
        setCompletedAgents(prev => new Set(prev).add('ceo'));
      }
    }
    if (latest.app) {
      setCurrentApp(latest.app);
      setAppStep(prev => prev + 1);
    }
    if (latest.type === 'app_update' && latest.app) {
      const finalAgent = steps.filter(s => s.agent).pop()?.agent;
      if (finalAgent) {
        setTimeout(() => setCompletedAgents(prev => new Set(prev).add(finalAgent)), 500);
      }
    }
  }, [steps]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [visibleSteps]);

  // Idle state: show AgentDashboard
  if (!isActive && visibleSteps.length === 0) {
    return <AgentDashboard theme={theme} />;
  }

  const pipelineAgents = ['ceo', ...Array.from(activeAgents).filter(a => a !== 'ceo')];

  const renderPreview = () => {
    if (!currentApp) return <div className="flex items-center justify-center h-full"><p className="text-xs" style={{ color: theme.textMuted }}>Vorschau</p></div>;
    switch (currentApp) {
      case 'inbox': return <InboxPreview step={appStep} theme={theme} />;
      case 'calendar': return <CalendarPreview step={appStep} theme={theme} />;
      case 'tasks': return <TasksPreview step={appStep} theme={theme} />;
      case 'crm': return <CrmPreview step={appStep} theme={theme} />;
      case 'knowledge': return <KnowledgePreview step={appStep} theme={theme} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full p-4 gap-3 relative">
      {/* Agent Pipeline */}
      <div>
        <p className="text-[9px] uppercase tracking-[0.15em] mb-2.5 font-semibold" style={{ color: theme.textMuted }}>Agent Pipeline</p>
        <div className="flex items-center gap-1.5 flex-wrap">
          {pipelineAgents.length === 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px]" style={{ border: `1px solid ${theme.border}`, background: theme.surface, color: theme.textMuted }}>
              <Brain size={12} />
              <span>CEO Agent</span>
            </div>
          )}
          {pipelineAgents.map((agentId, i) => {
            const config = agentConfig[agentId];
            if (!config) return null;
            const Icon = config.icon;
            const isActiveAgent = activeAgents.has(agentId) && !completedAgents.has(agentId);
            const isCompleted = completedAgents.has(agentId);
            const rgb = hexToRgb(config.color);
            return (
              <div key={agentId} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={11} style={{ color: theme.textMuted }} />}
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-500 ${isActiveAgent ? 'animate-pulse' : ''}`}
                  style={{
                    background: (isCompleted || isActiveAgent) ? `rgba(${rgb}, ${theme.mode === 'light' ? '0.08' : '0.12'})` : theme.surface,
                    border: `1px solid ${(isCompleted || isActiveAgent) ? `rgba(${rgb}, 0.3)` : theme.border}`,
                    color: (isCompleted || isActiveAgent) ? config.color : theme.textMuted,
                    ...(isActiveAgent ? { boxShadow: `0 0 10px rgba(${rgb}, 0.15)` } : {}),
                  }}
                >
                  {isCompleted ? <Check size={11} /> : <Icon size={11} />}
                  <span>{config.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* App Preview (overlay with X-close) */}
      {showPreview && (
        <div className="flex-1 min-h-0">
          <div className="flex items-center gap-2 mb-2">
            {currentApp && appLabels[currentApp] && (() => {
              const cfg = appLabels[currentApp];
              const AppIcon = cfg.icon;
              return (
                <>
                  <AppIcon size={11} style={{ color: cfg.color }} />
                  <p className="text-[9px] uppercase tracking-[0.15em] font-semibold" style={{ color: cfg.color }}>{cfg.label}</p>
                </>
              );
            })()}
            {!currentApp && <p className="text-[9px] uppercase tracking-[0.15em] font-semibold" style={{ color: theme.textMuted }}>Vorschau</p>}
            {/* X-close button */}
            {currentApp && (
              <button
                onClick={() => setShowPreview(false)}
                className="ml-auto p-1 rounded-lg transition-all hover:scale-110 active:scale-95"
                style={{
                  background: theme.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)',
                  color: theme.textMuted,
                }}
                title="Vorschau schließen"
              >
                <X size={12} />
              </button>
            )}
          </div>
          <div className="rounded-xl p-3 h-[calc(100%-24px)] overflow-y-auto scrollbar-thin" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
            {renderPreview()}
          </div>
        </div>
      )}

      {/* Activity Log */}
      <div className={showPreview ? 'max-h-[30%] min-h-[60px]' : 'flex-1 min-h-0'}>
        <p className="text-[9px] uppercase tracking-[0.15em] mb-1.5 font-semibold" style={{ color: theme.textMuted }}>Activity Log</p>
        <div ref={logRef} className="space-y-0.5 overflow-y-auto max-h-[calc(100%-20px)] scrollbar-thin">
          {visibleSteps.length === 0 && (
            <p className="text-[10px] italic" style={{ color: theme.textMuted }}>Warte auf Aktivität...</p>
          )}
          {visibleSteps.map((step, i) => {
            const config = step.agent ? agentConfig[step.agent] : null;
            const icon = step.type === 'delegation' ? '→' : step.type === 'app_update' ? '✓' : step.type === 'thinking' ? '◉' : '⟐';
            return (
              <div key={i} className="flex items-start gap-2 text-[10px] leading-relaxed animate-fadeIn" style={{ color: config?.color || theme.textSecondary }}>
                <span className="opacity-50 shrink-0 mt-0.5">{icon}</span>
                <span className="opacity-75">{step.content}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
