'use client';

import { useState, useEffect, useRef } from 'react';
import { Brain, Mail, Calendar, CheckSquare, Users, Search, ChevronRight, Check, Globe, MessageCircle, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import type { DemoStep } from './scenarios';
import type { DemoTheme } from './theme';
import AgentDashboard from './AgentDashboard';

interface ActivityPanelProps {
  steps: DemoStep[];
  resetKey: number;
  theme: DemoTheme;
}

const agentConfig: Record<string, { icon: typeof Brain; color: string; key: string }> = {
  ceo: { icon: Brain, color: '#8B5CF6', key: 'agentCeo' },
  communications: { icon: Mail, color: '#007AFF', key: 'agentComms' },
  calendar: { icon: Calendar, color: '#FF3B30', key: 'agentCalendar' },
  tasks: { icon: CheckSquare, color: '#22C55E', key: 'agentTasks' },
  knowledge: { icon: Search, color: '#F59E0B', key: 'agentKnowledge' },
};

const appLabels: Record<string, { icon: typeof Mail; color: string; key: string }> = {
  inbox: { icon: Mail, color: '#007AFF', key: 'appInbox' },
  calendar: { icon: Calendar, color: '#FF3B30', key: 'appCalendar' },
  crm: { icon: Users, color: '#F59E0B', key: 'appCrm' },
  tasks: { icon: CheckSquare, color: '#22C55E', key: 'appTasks' },
  knowledge: { icon: Search, color: '#8B5CF6', key: 'appKnowledge' },
};

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

// ─── Inbox Preview ───
function InboxPreview({ step, theme }: { step: number; theme: DemoTheme }) {
  const { t, language } = useTranslation();
  const messages = [
    { channel: 'email', icon: Mail, color: '#007AFF', from: 'Dr. Stefan Hoffmann', company: 'Technik GmbH', subject: language === 'EN' ? 'Inquiry: AI-powered quality control' : 'Anfrage: KI-gestützte Qualitätskontrolle', time: '09:14' },
    { channel: 'web', icon: Globe, color: '#22C55E', from: 'Sarah Klein', company: 'Nova Digital', subject: language === 'EN' ? 'Consultation requested' : 'Beratungstermin gewünscht', time: '10:02' },
    { channel: 'whatsapp', icon: MessageCircle, color: '#25D366', from: 'Martin Weber', company: 'Weber Consulting', subject: language === 'EN' ? 'Inquiry regarding proposal #247' : 'Rückfrage zu Angebot #247', time: '11:38' },
  ];
  const isLight = theme.mode === 'light';

  return (
    <div className="space-y-2">
      {step < 1 && (
        <div className="flex items-center justify-center h-20">
          <p style={{ color: theme.textMuted, fontSize: '11px' }}>{language === 'EN' ? 'Checking inbox...' : 'Posteingang wird geprüft...'}</p>
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
                    <span className="text-[9px] font-medium" style={{ color: msg.color }}>{language === 'EN' ? 'Response draft ready' : 'Antwort-Entwurf bereit'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {step >= 1 && step < 2 && (
        <div className="text-center py-2">
          <span className="text-[10px] font-medium" style={{ color: '#007AFF' }}>{language === 'EN' ? '3 new inquiries found' : '3 neue Anfragen gefunden'}</span>
        </div>
      )}
    </div>
  );
}

// ─── Calendar Preview ───
function CalendarPreview({ step, theme }: { step: number; theme: DemoTheme }) {
  const { t, language } = useTranslation();
  const isLight = theme.mode === 'light';
  const days = [
    { day: language === 'EN' ? 'Mon' : 'Mo', events: [{ time: '09:00', title: 'Team Standup', color: '#8B5CF6' }, { time: '14:00', title: 'Client Call Müller', color: '#007AFF' }] },
    { day: language === 'EN' ? 'Tue' : 'Di', events: [{ time: '10:00', title: 'Deep Work', color: '#6B7280' }, { time: '15:00', title: language === 'EN' ? 'Partner Call' : 'Partnergespräch', color: '#22C55E' }] },
    { day: language === 'EN' ? 'Wed' : 'Mi', events: [{ time: '09:30', title: 'Sprint Review', color: '#F59E0B' }, ...(step >= 3 ? [{ time: '14:00', title: language === 'EN' ? 'Proposal TG' : 'Angebot TG', color: '#FF3B30' }] : [])] },
    { day: language === 'EN' ? 'Thu' : 'Do', events: [{ time: '11:00', title: 'Investoren-Update', color: '#EC4899' }, { time: '15:00', title: 'Tech Review', color: '#8B5CF6' }] },
    { day: language === 'EN' ? 'Fri' : 'Fr', events: [{ time: '10:00', title: 'Weekly Retro', color: '#6B7280' }, { time: '14:00', title: 'Offsite Planning', color: '#007AFF' }] },
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
                <p className="text-[8px]" style={{ color: '#22C55E' }}>{language === 'EN' ? 'Free' : 'Frei'}</p>
              </div>
            )}
          </div>
        </div>
      ))}
      {step >= 1 && (
        <div className="col-span-5 mt-2 rounded-lg px-2 py-1.5 animate-fadeIn" style={{ background: isLight ? '#F5F3EE' : 'rgba(255,255,255,0.03)' }}>
          <p className="text-[9px]" style={{ color: theme.textSecondary }}>
            {language === 'EN' ? 'Capacity' : 'Auslastung'}: <span className="font-bold" style={{ color: '#F59E0B' }}>78%</span> · 8 {language === 'EN' ? 'appointments' : 'Termine'} · 1 {language === 'EN' ? 'free block' : 'freier Block'}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Tasks Preview ───
function TasksPreview({ step, theme }: { step: number; theme: DemoTheme }) {
  const { language } = useTranslation();
  const isLight = theme.mode === 'light';
  const overdue = step >= 2;
  const prioritized = step >= 3;

  return (
    <div className="space-y-2">
      {/* Project 1 */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: '#007AFF' }}>{language === 'EN' ? 'AI Integration Müller GmbH' : 'KI-Integration Müller GmbH'}</p>
        <div className="space-y-1">
          <TaskRow icon={<Check size={10} />} title={language === 'EN' ? 'Requirement analysis' : 'Anforderungsanalyse'} status="done" theme={theme} />
          <TaskRow icon={<div className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: '#F59E0B' }} />} title={language === 'EN' ? 'System architecture' : 'Systemarchitektur'} status="progress" theme={theme} />
          <TaskRow
            icon={<div className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: overdue ? '#EF4444' : theme.textMuted }} />}
            title={language === 'EN' ? 'Proposal draft' : 'Angebotsentwurf'}
            status={overdue ? 'overdue' : 'todo'}
            badge={overdue ? (language === 'EN' ? '2 days' : '2 Tage') : undefined}
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
            title={language === 'EN' ? 'CRM data cleanup' : 'CRM-Daten Bereinigung'}
            status={overdue ? 'overdue' : 'todo'}
            badge={overdue ? (language === 'EN' ? '1 day' : '1 Tag') : undefined}
            theme={theme}
          />
          <TaskRow icon={<div className="w-2.5 h-2.5 rounded" style={{ border: `1.5px solid ${theme.textMuted}` }} />} title={language === 'EN' ? 'Update investor deck' : 'Investoren-Deck aktualisieren'} status="todo" theme={theme} />
        </div>
      </div>
      {prioritized && (
        <div className="rounded-lg px-2 py-1.5 animate-fadeIn" style={{ background: `rgba(34,197,94,${isLight ? '0.06' : '0.08'})`, border: '1px solid rgba(34,197,94,0.2)' }}>
          <p className="text-[9px] font-medium" style={{ color: '#22C55E' }}>{language === 'EN' ? 'Prioritization: 1) Proposal TG → 2) Sprint Review → 3) CRM auto' : 'Priorisierung: 1) Angebot TG → 2) Sprint Review → 3) CRM auto'}</p>
        </div>
      )}
    </div>
  );
}

function TaskRow({ icon, title, status, badge, highlight, theme }: { icon: React.ReactNode; title: string; status: string; badge?: string; highlight?: boolean; theme: DemoTheme }) {
  const { language } = useTranslation();
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
      {status === 'progress' && <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>{language === 'EN' ? 'In progress' : 'In Arbeit'}</span>}
      {status === 'overdue' && badge && <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444' }}>{badge}</span>}
    </div>
  );
}

// ─── CRM Preview ───
function CrmPreview({ step, theme }: { step: number; theme: DemoTheme }) {
  const { language } = useTranslation();
  const isLight = theme.mode === 'light';
  const stages = [
    { label: language === 'EN' ? 'New' : 'Neu', count: step >= 2 ? 3 : 2, color: '#007AFF' },
    { label: language === 'EN' ? 'Contacted' : 'Kontaktiert', count: 4, color: '#F59E0B' },
    { label: language === 'EN' ? 'Proposal' : 'Angebot', count: 2, color: '#8B5CF6' },
    { label: language === 'EN' ? 'Won' : 'Gewonnen', count: 3, color: '#22C55E' },
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
            <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,122,255,0.12)', color: '#007AFF' }}>{language === 'EN' ? 'New Lead' : 'Neuer Lead'}</span>
          </div>
          {enriched && (
            <div className="space-y-1 animate-fadeIn">
              <div className="flex justify-between text-[9px]">
                <span style={{ color: theme.textMuted }}>{language === 'EN' ? 'Industry' : 'Branche'}</span>
                <span style={{ color: theme.text }}>{language === 'EN' ? 'E-commerce agency' : 'E-Commerce Agentur'}</span>
              </div>
              <div className="flex justify-between text-[9px]">
                <span style={{ color: theme.textMuted }}>{language === 'EN' ? 'Employees' : 'Mitarbeiter'}</span>
                <span style={{ color: theme.text }}>45</span>
              </div>
              <div className="flex justify-between text-[9px]">
                <span style={{ color: theme.textMuted }}>{language === 'EN' ? 'Interest' : 'Interesse'}</span>
                <span style={{ color: theme.text }}>{language === 'EN' ? 'AI Automation' : 'KI-Automatisierung'}</span>
              </div>
              <div className="flex justify-between text-[9px]">
                <span style={{ color: theme.textMuted }}>{language === 'EN' ? 'Source' : 'Quelle'}</span>
                <span style={{ color: '#22C55E' }}>{language === 'EN' ? 'Website form' : 'Website-Formular'}</span>
              </div>
            </div>
          )}
          {followUp && (
            <div className="mt-2 pt-2 animate-fadeIn" style={{ borderTop: `1px solid ${theme.border}` }}>
              <div className="flex items-center gap-1.5">
                <Calendar size={10} style={{ color: '#FF3B30' }} />
                <span className="text-[9px]" style={{ color: '#FF3B30' }}>Follow-up: {language === 'EN' ? 'Thursday 10:00' : 'Donnerstag 10:00'}</span>
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
  const { language } = useTranslation();
  const isLight = theme.mode === 'light';
  const results = [
    { title: language === 'EN' ? 'Onboarding_Enterprise.pdf' : 'Onboarding_Enterprise.pdf', match: 95, pages: language === 'EN' ? 'Chapter 2–4' : 'Kapitel 2–4', type: 'PDF' },
    { title: language === 'EN' ? 'Process_Manual_v3.md' : 'Prozesshandbuch_v3.md', match: 91, pages: '', type: 'MD' },
    { title: language === 'EN' ? 'Checklist_Kickoff.pdf' : 'Checkliste_Kickoff.pdf', match: 87, pages: language === 'EN' ? 'Page 1–3' : 'Seite 1–3', type: 'PDF' },
    { title: 'FAQ_Onboarding.md', match: 82, pages: '', type: 'MD' },
  ];

  return (
    <div className="space-y-2">
      {step >= 1 && (
        <div className="animate-fadeIn rounded-lg px-3 py-2" style={{ background: isLight ? '#F9F9F7' : 'rgba(255,255,255,0.03)', border: `1px solid ${theme.border}` }}>
          <div className="flex items-center gap-2">
            <Search size={12} style={{ color: '#8B5CF6' }} />
            <span className="text-[10px]" style={{ color: theme.text }}>{language === 'EN' ? '"Enterprise onboarding process"' : '"Enterprise Onboarding Prozess"'}</span>
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
          <p className="text-[9px] font-medium" style={{ color: '#8B5CF6' }}>{language === 'EN' ? '4 sources synthesized — Confidence: 93%' : '4 Quellen synthetisiert — Konfidenz: 93%'}</p>
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
  const { t, language } = useTranslation();

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
    if (!currentApp) return <div className="flex items-center justify-center h-full"><p className="text-xs" style={{ color: theme.textMuted }}>{language === 'EN' ? 'Preview' : 'Vorschau'}</p></div>;
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
        <p className="text-[9px] uppercase tracking-[0.15em] mb-2.5 font-semibold" style={{ color: theme.textMuted }}>{language === 'EN' ? 'Agent Pipeline' : 'Agent Pipeline'}</p>
        <div className="flex items-center gap-1.5 flex-wrap">
          {pipelineAgents.length === 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px]" style={{ border: `1px solid ${theme.border}`, background: theme.surface, color: theme.textMuted }}>
              <Brain size={12} />
              <span>{t.demo.agentCeo}</span>
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
                  <span>{t.demo[config.key as keyof typeof t.demo]}</span>
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
                  <p className="text-[9px] uppercase tracking-[0.15em] font-semibold" style={{ color: cfg.color }}>{t.demo[cfg.key as keyof typeof t.demo]}</p>
                </>
              );
            })()}
            {!currentApp && <p className="text-[9px] uppercase tracking-[0.15em] font-semibold" style={{ color: theme.textMuted }}>{language === 'EN' ? 'Preview' : 'Vorschau'}</p>}
            {/* X-close button */}
            {currentApp && (
              <button
                onClick={() => setShowPreview(false)}
                className="ml-auto p-1 rounded-lg transition-all hover:scale-110 active:scale-95"
                style={{
                  background: theme.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)',
                  color: theme.textMuted,
                }}
                title={language === 'EN' ? 'Close preview' : 'Vorschau schließen'}
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
        <p className="text-[9px] uppercase tracking-[0.15em] mb-1.5 font-semibold" style={{ color: theme.textMuted }}>{language === 'EN' ? 'Activity Log' : 'Aktivitätsprotokoll'}</p>
        <div ref={logRef} className="space-y-0.5 overflow-y-auto max-h-[calc(100%-20px)] scrollbar-thin">
          {visibleSteps.length === 0 && (
            <p className="text-[10px] italic" style={{ color: theme.textMuted }}>{language === 'EN' ? 'Waiting for activity...' : 'Warte auf Aktivität...'}</p>
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
