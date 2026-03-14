'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sun, Moon, Languages } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useSettings } from '@/context/SettingsContext';
import { useMobile } from '@/hooks/useMobile';
import LeadDemoChat from '@/components/demo/lead-agent/LeadDemoChat';
import LeadDashboard from '@/components/demo/lead-agent/LeadDashboard';
import LeadIntroModal from '@/components/demo/lead-agent/LeadIntroModal';
import { lightTheme, darkTheme } from '@/components/demo/theme';
import type { LeadStep } from '@/components/demo/lead-agent/leadScenarios';

export default function LeadAgentDemoPage() {
  const [steps, setSteps] = useState<LeadStep[]>([]);
  const [activeTab, setActiveTab] = useState<'messages' | 'dashboard'>('messages');
  const [isDark, setIsDark] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const { t } = useTranslation();
  const { language, setLanguage } = useSettings();
  const isMobile = useMobile();

  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    if (!sessionStorage.getItem('lead-demo-intro-seen')) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroClose = useCallback(() => {
    sessionStorage.setItem('lead-demo-intro-seen', 'true');
    setShowIntro(false);
  }, []);

  const handleStep = useCallback((step: LeadStep) => {
    setSteps(prev => [...prev, step]);
    if (isMobile) setActiveTab('dashboard');
  }, [isMobile]);

  const handleScenarioStart = useCallback(() => {
    // Don't clear steps — accumulate across scenarios
  }, []);

  const handleScenarioComplete = useCallback((id: string) => {
    setCompletedScenarios(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col transition-colors duration-300" style={{ background: theme.bg, zIndex: 50 }}>
      <LeadIntroModal isOpen={showIntro} onClose={handleIntroClose} />

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 shrink-0" style={{ borderBottom: `1px solid ${theme.border}`, background: theme.mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)' }}>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
          style={{ color: theme.textSecondary }}
        >
          <ArrowLeft size={16} />
          <span>{t.leadDemo.back}</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-sm font-semibold tracking-tight" style={{ color: theme.text, fontFamily: 'var(--font-sans)' }}>
            SwiftGate AI
          </span>
          <span className="text-xs font-medium" style={{ color: theme.textMuted }}>
            {t.leadDemo.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'DE' ? 'EN' : 'DE')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95"
            style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, color: theme.accent }}
          >
            <Languages size={13} />
            <span>{language}</span>
          </button>
          <button
            onClick={() => setIsDark(prev => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all hover:scale-105 active:scale-95"
            style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, color: theme.textSecondary }}
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
            <span className="hidden sm:inline">{isDark ? 'Hell' : 'Dunkel'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Tabs */}
      {isMobile && (
        <div className="flex shrink-0" style={{ borderBottom: `1px solid ${theme.border}` }}>
          {(['messages', 'dashboard'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2.5 text-xs font-medium text-center transition-colors relative"
              style={{ color: activeTab === tab ? theme.accent : theme.textMuted }}
            >
              {tab === 'messages' ? t.leadDemo.tabMessages : t.leadDemo.tabDashboard}
              {tab === 'dashboard' && steps.length > 0 && (
                <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              )}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-[10%] right-[10%] h-0.5 rounded-full" style={{ background: theme.accent }} />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Main Content — 50/50 split */}
      <div className="flex-1 min-h-0 flex">
        <div
          className={isMobile
            ? (activeTab === 'messages' ? 'flex flex-col w-full' : 'hidden')
            : 'flex flex-col w-1/2'
          }
          style={!isMobile ? { borderRight: `1px solid ${theme.border}` } : undefined}
        >
          <LeadDemoChat
            onStep={handleStep}
            onScenarioStart={handleScenarioStart}
            onScenarioComplete={handleScenarioComplete}
            theme={theme}
            completedScenarios={completedScenarios}
          />
        </div>

        <div
          className={isMobile
            ? (activeTab === 'dashboard' ? 'flex flex-col w-full' : 'hidden')
            : 'flex flex-col w-1/2'
          }
        >
          <LeadDashboard steps={steps} theme={theme} />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-2 shrink-0" style={{ borderTop: `1px solid ${theme.border}` }}>
        <p className="text-[10px]" style={{ color: theme.textMuted }}>{t.leadDemo.subtitle}</p>
      </div>
    </div>
  );
}
