'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';
import DemoChat from '@/components/demo/DemoChat';
import ActivityPanel from '@/components/demo/ActivityPanel';
import DemoIntroModal from '@/components/demo/DemoIntroModal';
import { lightTheme, darkTheme } from '@/components/demo/theme';
import type { DemoStep, SharedContext } from '@/components/demo/scenarios';

export default function DemoPage() {
  const [activitySteps, setActivitySteps] = useState<DemoStep[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'chat' | 'activity'>('chat');
  const [isDark, setIsDark] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [sharedContext, setSharedContext] = useState<SharedContext>({
    contacts: [],
    lastScenario: null,
    mentionedDates: [],
    mentionedTopics: [],
  });
  const { t } = useTranslation();
  const isMobile = useMobile();

  const theme = isDark ? darkTheme : lightTheme;

  // Intro modal — show only once per session
  useEffect(() => {
    if (!sessionStorage.getItem('demo-intro-seen')) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroClose = useCallback(() => {
    sessionStorage.setItem('demo-intro-seen', 'true');
    setShowIntro(false);
  }, []);

  const handleActivity = useCallback((steps: DemoStep[]) => {
    setActivitySteps(steps);
    if (isMobile && steps.length > 0) setActiveTab('activity');
  }, [isMobile]);

  const handleScenarioStart = useCallback(() => {
    setActivitySteps([]);
    setResetKey(prev => prev + 1);
  }, []);

  const handleScenarioComplete = useCallback((id: string, ctx: SharedContext) => {
    setSharedContext(prev => ({
      contacts: [...prev.contacts, ...ctx.contacts.filter(c => !prev.contacts.some(pc => pc.email === c.email))],
      lastScenario: id,
      mentionedDates: [...new Set([...prev.mentionedDates, ...ctx.mentionedDates])],
      mentionedTopics: [...new Set([...prev.mentionedTopics, ...ctx.mentionedTopics])],
    }));
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col transition-colors duration-300" style={{ background: theme.bg, zIndex: 50 }}>
      {/* Intro Modal */}
      <DemoIntroModal isOpen={showIntro} onClose={handleIntroClose} />

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 shrink-0" style={{ borderBottom: `1px solid ${theme.border}`, background: theme.mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)' }}>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
          style={{ color: theme.textSecondary }}
        >
          <ArrowLeft size={16} />
          <span>{t.demo.back}</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-sm font-semibold tracking-tight" style={{ color: theme.text, fontFamily: 'var(--font-sans)' }}>
            SwiftGate AI
          </span>
          <span className="text-xs font-medium" style={{ color: theme.textMuted }}>
            {t.demo.title}
          </span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(prev => !prev)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all hover:scale-105 active:scale-95"
          style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, color: theme.textSecondary }}
        >
          {isDark ? <Sun size={13} /> : <Moon size={13} />}
          <span className="hidden sm:inline">{isDark ? 'Hell' : 'Dunkel'}</span>
        </button>
      </header>

      {/* Mobile Tabs */}
      {isMobile && (
        <div className="flex shrink-0" style={{ borderBottom: `1px solid ${theme.border}` }}>
          {(['chat', 'activity'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2.5 text-xs font-medium text-center transition-colors relative"
              style={{ color: activeTab === tab ? theme.accent : theme.textMuted }}
            >
              {tab === 'chat' ? t.demo.tabChat : t.demo.tabActivity}
              {tab === 'activity' && activitySteps.length > 0 && (
                <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              )}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-[10%] right-[10%] h-0.5 rounded-full" style={{ background: theme.accent }} />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-0 flex">
        <div
          className={isMobile
            ? (activeTab === 'chat' ? 'flex flex-col w-full' : 'hidden')
            : 'flex flex-col w-[40%]'
          }
          style={!isMobile ? { borderRight: `1px solid ${theme.border}` } : undefined}
        >
          <DemoChat
            onActivity={handleActivity}
            onScenarioStart={handleScenarioStart}
            onScenarioComplete={handleScenarioComplete}
            theme={theme}
            sharedContext={sharedContext}
          />
        </div>

        <div
          className={isMobile
            ? (activeTab === 'activity' ? 'flex flex-col w-full' : 'hidden')
            : 'flex flex-col w-[60%]'
          }
        >
          <ActivityPanel steps={activitySteps} resetKey={resetKey} theme={theme} />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-2 shrink-0" style={{ borderTop: `1px solid ${theme.border}` }}>
        <p className="text-[10px]" style={{ color: theme.textMuted }}>{t.demo.subtitle}</p>
      </div>
    </div>
  );
}
