'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Mail, Calendar, CheckSquare, Users, Brain, Send } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { getScenarios, getKeywordPatterns, getCrossoverPatterns, type DemoStep, type SharedContext } from './scenarios';
import type { DemoTheme } from './theme';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface DemoChatProps {
  onActivity: (steps: DemoStep[]) => void;
  onScenarioStart: () => void;
  onScenarioComplete: (scenarioId: string, context: SharedContext) => void;
  theme: DemoTheme;
  sharedContext: SharedContext;
}

// ─── Inline Markdown Parser ───
function parseMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Split by **bold** and *italic* patterns
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      // **bold**
      parts.push(<strong key={`b-${match.index}`}>{match[2]}</strong>);
    } else if (match[3]) {
      // *italic*
      parts.push(<em key={`i-${match.index}`}>{match[3]}</em>);
    }
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

function ThinkingDots({ theme }: { theme: DemoTheme }) {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 0.2, 0.4].map((d, i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: theme.textMuted, animation: `bounce 1.4s ease-in-out ${d}s infinite` }} />
      ))}
    </span>
  );
}

export default function DemoChat({ onActivity, onScenarioStart, onScenarioComplete, theme, sharedContext }: DemoChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scenarioCompleted, setScenarioCompleted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t, language } = useTranslation();

  const currentLang = useMemo(() => language === 'EN' ? 'EN' : 'DE', [language]);
  const scenarios = useMemo(() => getScenarios(currentLang), [currentLang]);
  const keywordPatterns = useMemo(() => getKeywordPatterns(currentLang), [currentLang]);
  const crossoverPatterns = useMemo(() => getCrossoverPatterns(currentLang), [currentLang]);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  // Check if crossover patterns are available for the last scenario
  const availableCrossovers = sharedContext.lastScenario
    ? crossoverPatterns.filter(p => p.after === sharedContext.lastScenario)
    : [];

  const playSteps = useCallback(async (steps: DemoStep[], isScenario: boolean, scenarioId?: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    if (isScenario) {
      onScenarioStart();
      setScenarioCompleted(false);
    }

    const activitySteps: DemoStep[] = [];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, step.delay));

      if (step.type === 'user_message') {
        setMessages(prev => [...prev, { role: 'user', content: step.content }]);
      } else if (step.type === 'ai_response') {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 800));
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'assistant', content: step.content }]);
      } else {
        activitySteps.push(step);
        onActivity([...activitySteps]);
      }
    }

    setIsPlaying(false);
    if (scenarioId) {
      setScenarioCompleted(true);
      onScenarioComplete(scenarioId, {
        ...sharedContext,
        lastScenario: scenarioId,
      });
    }
  }, [isPlaying, onActivity, onScenarioStart, onScenarioComplete, sharedContext]);

  const playScenario = useCallback(async (scenarioId: string) => {
    const scenario = scenarios[scenarioId];
    if (!scenario) return;
    await playSteps(scenario.steps, true, scenarioId);
  }, [playSteps, scenarios]);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isPlaying) return;

    setMessages(prev => [...prev, { role: 'user', content: trimmed }]);
    setInput('');

    // 1. Check crossover patterns first (0 tokens)
    if (sharedContext.lastScenario) {
      const matchedPattern = crossoverPatterns.find(
        p => p.after === sharedContext.lastScenario && p.trigger.test(trimmed)
      );
      if (matchedPattern) {
        onScenarioStart();
        await playSteps(matchedPattern.steps, false);
        onScenarioComplete(sharedContext.lastScenario, {
          ...sharedContext,
          ...matchedPattern.contextUpdate,
        });
        return;
      }
    }

    // 2. No crossover match → send to API
    setIsTyping(true);
    onScenarioStart();

    const genericSteps: DemoStep[] = [
      { type: 'thinking', content: language === 'EN' ? 'Analyzing request...' : 'Anfrage wird analysiert...', agent: 'ceo', delay: 0 },
    ];
    onActivity(genericSteps);

    try {
      const history = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' as const : 'user' as const,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history, language: language === 'EN' ? 'EN' : 'DE' }),
      });

      const data = await res.json();
      const reply = data.reply || data.error || t.ai.fallback;

      for (const [app, pattern] of Object.entries(keywordPatterns)) {
        if (pattern.test(trimmed + ' ' + reply)) {
          const agentMap: Record<string, DemoStep['agent']> = { inbox: 'communications', calendar: 'calendar', crm: 'communications', tasks: 'tasks', knowledge: 'knowledge' };
          genericSteps.push({ type: 'delegation', content: `→ ${app}`, agent: agentMap[app] || 'ceo', delay: 0 });
          onActivity([...genericSteps]);
          break;
        }
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'assistant', content: t.ai.fallback }]);
    }
  }, [input, isPlaying, messages, language, t, onActivity, onScenarioStart, onScenarioComplete, sharedContext, playSteps, crossoverPatterns, keywordPatterns]);

  const scenarioButtons = [
    { id: 'inbox', icon: Mail, label: t.demo.scenarioEmail },
    { id: 'calendar', icon: Calendar, label: t.demo.scenarioCalendar },
    { id: 'tasks', icon: CheckSquare, label: t.demo.scenarioTask },
    { id: 'crm', icon: Users, label: t.demo.scenarioCrm },
    { id: 'knowledge', icon: Brain, label: t.demo.scenarioKnowledge },
  ];

  const showButtons = (messages.length === 0 || scenarioCompleted) && !isPlaying;

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {messages.length === 0 && !isTyping && (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              {language === 'EN' ? 'Choose a scenario or type freely' : 'Szenario wählen oder frei tippen'}
            </p>
            <p className="text-xs" style={{ color: theme.textMuted }}>
              {language === 'EN' ? 'Pre-scripted demos use zero API tokens' : 'Szenarien verbrauchen keine API-Tokens'}
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${msg.role === 'user' ? 'rounded-2xl rounded-br-md' : 'rounded-2xl rounded-bl-md'
                }`}
              style={{
                background: msg.role === 'user' ? theme.userBubble : theme.aiBubble,
                color: msg.role === 'user' ? theme.userBubbleText : theme.aiBubbleText,
              }}
            >
              {parseMarkdown(msg.content)}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl rounded-bl-md" style={{ background: theme.aiBubble }}>
              <ThinkingDots theme={theme} />
            </div>
          </div>
        )}
      </div>

      {/* Scenario Buttons */}
      {showButtons && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-1.5">
            {scenarioButtons.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => playScenario(id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: theme.scenarioBtn,
                  color: theme.scenarioBtnText,
                  border: `1px solid ${theme.scenarioBtnBorder}`,
                }}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
          {/* Crossover Hint */}
          {scenarioCompleted && availableCrossovers.length > 0 && (
            <p className="text-[10px] mt-2 px-1" style={{ color: theme.accent }}>
              {language === 'EN'
                ? '💡 Tip: Try asking about a meeting with Dr. Hoffmann or a follow-up task...'
                : '💡 Tipp: Fragen Sie nach einem Termin mit Dr. Hoffmann oder einer Follow-up Aufgabe...'}
            </p>
          )}
        </div>
      )}

      {/* Input */}
      <div className="p-3" style={{ borderTop: `1px solid ${theme.border}` }}>
        <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.demo.inputPlaceholder}
            disabled={isPlaying}
            className="flex-1 text-sm rounded-xl px-4 py-2.5 outline-none transition-colors disabled:opacity-40"
            style={{
              background: theme.inputBg,
              color: theme.text,
              border: `1px solid ${theme.border}`,
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isPlaying}
            className="p-2.5 rounded-xl transition-colors disabled:opacity-30"
            style={{ background: theme.scenarioBtn, color: theme.accent }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
