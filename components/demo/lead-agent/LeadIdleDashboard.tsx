'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Users, Bell, MessageSquare } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import type { DemoTheme } from '../theme';

interface LeadIdleDashboardProps {
  theme: DemoTheme;
}

const statusMessages = {
  EN: [
    { icon: '🤖', text: 'AI model loaded and ready' },
    { icon: '📡', text: 'Monitoring Email, Instagram, WhatsApp channels' },
    { icon: '🔒', text: 'CRM connection secure' },
    { icon: '📊', text: '0 leads in queue' },
    { icon: '⚡', text: 'Auto-reply templates loaded' },
    { icon: '🛡️', text: 'Spam filter active — 98.5% accuracy' },
  ],
  DE: [
    { icon: '🤖', text: 'KI-Modell geladen und bereit' },
    { icon: '📡', text: 'Überwache E-Mail, Instagram, WhatsApp' },
    { icon: '🔒', text: 'CRM-Verbindung gesichert' },
    { icon: '📊', text: '0 Leads in der Warteschlange' },
    { icon: '⚡', text: 'Auto-Reply-Vorlagen geladen' },
    { icon: '🛡️', text: 'Spam-Filter aktiv — 98.5% Genauigkeit' },
  ],
};

export default function LeadIdleDashboard({ theme }: LeadIdleDashboardProps) {
  const { t, language } = useTranslation();
  const isLight = theme.mode === 'light';
  const [statusIndex, setStatusIndex] = useState(0);
  const messages = language === 'EN' ? statusMessages.EN : statusMessages.DE;

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex(prev => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages.length]);

  const sections = [
    { title: t.leadDemo.sectionScoring, icon: <BarChart3 size={14} />, color: '#8B5CF6' },
    { title: t.leadDemo.sectionPipeline, icon: <Users size={14} />, color: '#22C55E' },
    { title: t.leadDemo.sectionNotifications, icon: <Bell size={14} />, color: '#F59E0B' },
    { title: t.leadDemo.sectionAutoReply, icon: <MessageSquare size={14} />, color: '#3B82F6' },
  ];

  return (
    <div className="flex flex-col h-full p-4 gap-3">
      {/* Header */}
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3" style={{ background: isLight ? 'rgba(34,197,94,0.06)' : 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.15)' }}>
          <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-[11px] font-semibold" style={{ color: '#22C55E' }}>
            {t.leadDemo.idleSubtitle}
          </span>
        </div>
        <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>
          {t.leadDemo.idleTitle}
        </p>
      </div>

      {/* Empty Dashboard Skeleton */}
      {sections.map(({ title, icon, color }) => (
        <div
          key={title}
          className="rounded-xl overflow-hidden"
          style={{
            background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${theme.border}`,
          }}
        >
          <div className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: `1px solid ${theme.border}` }}>
            <span style={{ color, opacity: 0.5 }}>{icon}</span>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color, opacity: 0.5 }}>{title}</p>
          </div>
          <div className="px-3 py-3">
            <div className="flex gap-2">
              <div className="h-2 rounded-full flex-1" style={{ background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)' }} />
              <div className="h-2 rounded-full w-1/3" style={{ background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)' }} />
            </div>
          </div>
        </div>
      ))}

      {/* Rotating Status */}
      <div className="mt-auto">
        <div
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-500"
          style={{ background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.04)', border: `1px solid ${theme.border}` }}
        >
          <span className="text-[12px]">{messages[statusIndex].icon}</span>
          <span className="text-[11px]" style={{ color: theme.textMuted }}>{messages[statusIndex].text}</span>
        </div>
      </div>
    </div>
  );
}
