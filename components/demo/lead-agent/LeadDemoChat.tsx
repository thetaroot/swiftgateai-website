'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Mail, Instagram, MessageCircle, ShieldAlert, MoreHorizontal, Phone, Video, Check, CheckCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { getLeadScenarios, type LeadStep } from './leadScenarios';
import type { DemoTheme } from '../theme';

interface ChatMessage {
  role: 'incoming' | 'reply';
  content: string;
  channel?: 'email' | 'instagram' | 'whatsapp' | 'web';
  emailMeta?: { from: string; to: string; subject: string };
  igMeta?: { handle: string; avatar: string; followers?: string };
  waMeta?: { phone: string; name: string };
}

interface LeadDemoChatProps {
  onStep: (step: LeadStep) => void;
  onScenarioStart: () => void;
  onScenarioComplete: (scenarioId: string) => void;
  theme: DemoTheme;
  completedScenarios: string[];
}

function ThinkingDots({ color }: { color: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 0.2, 0.4].map((d, i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: color, animation: `bounce 1.4s ease-in-out ${d}s infinite` }} />
      ))}
    </span>
  );
}

// ─── Channel-Authentic Message Renderers ───

function EmailMessage({ msg, theme }: { msg: ChatMessage; theme: DemoTheme }) {
  const isLight = theme.mode === 'light';
  const meta = msg.emailMeta;
  return (
    <div className="animate-fadeIn rounded-xl overflow-hidden" style={{ border: `1px solid ${isLight ? '#D1D5DB' : 'rgba(255,255,255,0.1)'}`, background: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.03)' }}>
      <div className="flex items-center justify-between px-3 py-1.5" style={{ borderBottom: `1px solid ${isLight ? '#E5E7EB' : 'rgba(255,255,255,0.06)'}`, background: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)' }}>
        <div className="flex items-center gap-2">
          <Mail size={12} style={{ color: '#3B82F6' }} />
          <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#3B82F6' }}>Email</span>
        </div>
        <MoreHorizontal size={12} style={{ color: theme.textMuted }} />
      </div>
      {meta && (
        <div className="px-3 py-2 space-y-0.5" style={{ borderBottom: `1px solid ${isLight ? '#F3F4F6' : 'rgba(255,255,255,0.04)'}` }}>
          <div className="flex gap-2 text-[10px]">
            <span style={{ color: theme.textMuted, minWidth: 36 }}>From:</span>
            <span className="font-medium" style={{ color: theme.text }}>{meta.from}</span>
          </div>
          <div className="flex gap-2 text-[10px]">
            <span style={{ color: theme.textMuted, minWidth: 36 }}>To:</span>
            <span style={{ color: theme.textSecondary }}>{meta.to}</span>
          </div>
          <div className="flex gap-2 text-[10px]">
            <span style={{ color: theme.textMuted, minWidth: 36 }}>Subj:</span>
            <span className="font-semibold" style={{ color: theme.text }}>{meta.subject}</span>
          </div>
        </div>
      )}
      <div className="px-3 py-3 text-[11px] leading-relaxed whitespace-pre-line" style={{ color: theme.text }}>
        {msg.content}
      </div>
    </div>
  );
}

function EmailReply({ msg, theme }: { msg: ChatMessage; theme: DemoTheme }) {
  const isLight = theme.mode === 'light';
  return (
    <div className="animate-fadeIn rounded-xl overflow-hidden" style={{ border: `1px solid ${isLight ? 'rgba(34,197,94,0.3)' : 'rgba(34,197,94,0.2)'}`, background: isLight ? 'rgba(34,197,94,0.03)' : 'rgba(34,197,94,0.05)' }}>
      <div className="flex items-center gap-2 px-3 py-1.5" style={{ borderBottom: `1px solid ${isLight ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.1)'}` }}>
        <Check size={11} style={{ color: '#22C55E' }} />
        <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#22C55E' }}>Auto-Reply Sent</span>
      </div>
      <div className="px-3 py-3 text-[11px] leading-relaxed whitespace-pre-line" style={{ color: theme.text }}>
        {msg.content}
      </div>
    </div>
  );
}

function InstagramMessage({ msg, theme }: { msg: ChatMessage; theme: DemoTheme }) {
  const isLight = theme.mode === 'light';
  const meta = msg.igMeta;
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)', color: '#fff' }}>
          {meta?.avatar || 'U'}
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-semibold" style={{ color: theme.text }}>{meta?.handle || '@user'}</p>
          {meta?.followers && <p className="text-[9px]" style={{ color: theme.textMuted }}>{meta.followers} followers</p>}
        </div>
        <Phone size={14} style={{ color: theme.textMuted }} />
        <Video size={14} style={{ color: theme.textMuted }} />
      </div>
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-[11px] leading-relaxed" style={{ background: isLight ? '#EFEFEF' : 'rgba(255,255,255,0.1)', color: theme.text }}>
          {msg.content}
        </div>
      </div>
    </div>
  );
}

function InstagramReply({ msg, theme }: { msg: ChatMessage; theme: DemoTheme }) {
  return (
    <div className="animate-fadeIn flex justify-end">
      <div className="max-w-[85%]">
        <div className="rounded-2xl rounded-br-sm px-3.5 py-2.5 text-[11px] leading-relaxed" style={{ background: '#3B82F6', color: '#fff' }}>
          {msg.content}
        </div>
        <p className="text-[9px] text-right mt-0.5" style={{ color: '#22C55E' }}>Sent</p>
      </div>
    </div>
  );
}

function WhatsAppMessage({ msg, theme }: { msg: ChatMessage; theme: DemoTheme }) {
  const isLight = theme.mode === 'light';
  const meta = msg.waMeta;
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-2 mb-2 px-2 py-1.5 rounded-lg" style={{ background: isLight ? 'rgba(37,211,102,0.06)' : 'rgba(37,211,102,0.08)' }}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: '#25D366', color: '#fff' }}>
          {meta?.name?.charAt(0) || 'U'}
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-semibold" style={{ color: theme.text }}>{meta?.name || 'Contact'}</p>
          <p className="text-[9px]" style={{ color: theme.textMuted }}>{meta?.phone || ''}</p>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-lg rounded-tl-none px-3 py-2 text-[11px] leading-relaxed shadow-sm" style={{ background: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.08)', color: theme.text, border: `1px solid ${isLight ? '#E5E7EB' : 'rgba(255,255,255,0.06)'}` }}>
          {msg.content}
          <p className="text-[8px] text-right mt-1" style={{ color: theme.textMuted }}>
            {new Date().getHours().toString().padStart(2, '0')}:{new Date().getMinutes().toString().padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  );
}

function WhatsAppReply({ msg, theme }: { msg: ChatMessage; theme: DemoTheme }) {
  return (
    <div className="animate-fadeIn flex justify-end">
      <div className="max-w-[85%] rounded-lg rounded-tr-none px-3 py-2 text-[11px] leading-relaxed shadow-sm" style={{ background: '#DCF8C6', color: '#1C1917' }}>
        {msg.content}
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-[8px]" style={{ color: '#6B7280' }}>
            {new Date().getHours().toString().padStart(2, '0')}:{new Date().getMinutes().toString().padStart(2, '0')}
          </span>
          <CheckCheck size={10} style={{ color: '#3B82F6' }} />
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───

export default function LeadDemoChat({ onStep, onScenarioStart, onScenarioComplete, theme, completedScenarios }: LeadDemoChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { language } = useTranslation();

  const currentLang = useMemo(() => language === 'EN' ? 'EN' : 'DE', [language]) as 'EN' | 'DE';
  const scenarios = useMemo(() => getLeadScenarios(currentLang), [currentLang]);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  const playSteps = useCallback(async (steps: LeadStep[], scenarioId?: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    onScenarioStart();

    for (const step of steps) {
      await new Promise(r => setTimeout(r, step.delay));

      if (step.type === 'incoming_message') {
        setActiveChannel(step.channel || null);
        setMessages(prev => [...prev, {
          role: 'incoming',
          content: step.content,
          channel: step.channel,
          emailMeta: step.emailMeta,
          igMeta: step.igMeta,
          waMeta: step.waMeta,
        }]);
      } else if (step.type === 'auto_reply') {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 800));
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'reply', content: step.content, channel: step.channel }]);
      }

      onStep(step);
    }

    setIsPlaying(false);
    if (scenarioId) {
      onScenarioComplete(scenarioId);
    }
  }, [isPlaying, onStep, onScenarioStart, onScenarioComplete]);

  const playScenario = useCallback(async (scenarioId: string) => {
    const scenario = scenarios[scenarioId];
    if (!scenario) return;
    await playSteps(scenario.steps, scenarioId);
  }, [playSteps, scenarios]);

  const scenarioButtons = [
    { id: 'email', icon: Mail, label: language === 'EN' ? 'New Email' : 'Neue E-Mail', color: '#3B82F6' },
    { id: 'instagram', icon: Instagram, label: language === 'EN' ? 'Instagram DM' : 'Instagram DM', color: '#E1306C' },
    { id: 'whatsapp', icon: MessageCircle, label: language === 'EN' ? 'WhatsApp' : 'WhatsApp', color: '#25D366' },
    { id: 'spam', icon: ShieldAlert, label: language === 'EN' ? 'Spam Filter' : 'Spam-Filter', color: '#6B7280' },
  ];

  const showButtons = !isPlaying;
  const isLight = theme.mode === 'light';

  const renderMessage = (msg: ChatMessage, i: number) => {
    const ch = msg.channel || 'web';

    if (msg.role === 'incoming') {
      if (ch === 'email') return <EmailMessage key={i} msg={msg} theme={theme} />;
      if (ch === 'instagram') return <InstagramMessage key={i} msg={msg} theme={theme} />;
      if (ch === 'whatsapp') return <WhatsAppMessage key={i} msg={msg} theme={theme} />;
      return null;
    }

    if (msg.role === 'reply') {
      if (ch === 'email') return <EmailReply key={i} msg={msg} theme={theme} />;
      if (ch === 'instagram') return <InstagramReply key={i} msg={msg} theme={theme} />;
      if (ch === 'whatsapp') return <WhatsAppReply key={i} msg={msg} theme={theme} />;
      return null;
    }

    return null;
  };

  const channelBg = activeChannel === 'whatsapp'
    ? (isLight ? 'rgba(37,211,102,0.02)' : 'rgba(37,211,102,0.03)')
    : activeChannel === 'instagram'
      ? (isLight ? 'rgba(225,48,108,0.02)' : 'rgba(225,48,108,0.02)')
      : undefined;

  return (
    <div className="flex flex-col h-full">
      {/* Channel indicator bar */}
      {activeChannel && (
        <div className="flex items-center gap-2 px-4 py-1.5 shrink-0" style={{ borderBottom: `1px solid ${theme.border}`, background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)' }}>
          {activeChannel === 'email' && <><Mail size={11} style={{ color: '#3B82F6' }} /><span className="text-[10px] font-medium" style={{ color: '#3B82F6' }}>Inbox</span></>}
          {activeChannel === 'instagram' && <><Instagram size={11} style={{ color: '#E1306C' }} /><span className="text-[10px] font-medium" style={{ color: '#E1306C' }}>Direct Messages</span></>}
          {activeChannel === 'whatsapp' && <><MessageCircle size={11} style={{ color: '#25D366' }} /><span className="text-[10px] font-medium" style={{ color: '#25D366' }}>WhatsApp Business</span></>}
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin transition-colors duration-300" style={{ background: channelBg }}>
        {messages.length === 0 && !isTyping && (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <p className="text-sm font-medium text-center" style={{ color: theme.textSecondary }}>
              {language === 'EN' ? 'Select a channel to simulate an incoming lead' : 'Kanal wählen um einen eingehenden Lead zu simulieren'}
            </p>
            <p className="text-[11px] text-center" style={{ color: theme.textMuted }}>
              {language === 'EN' ? 'Watch the AI agent process it in real-time on the right' : 'Sieh dem KI-Agenten rechts in Echtzeit beim Verarbeiten zu'}
            </p>
          </div>
        )}

        {messages.map((msg, i) => renderMessage(msg, i))}

        {isTyping && (
          <div className="flex justify-end">
            <div className="px-4 py-3 rounded-2xl rounded-br-sm" style={{ background: activeChannel === 'whatsapp' ? '#DCF8C6' : (activeChannel === 'instagram' ? '#3B82F6' : theme.userBubble) }}>
              <ThinkingDots color={activeChannel === 'whatsapp' ? '#6B7280' : (activeChannel === 'instagram' ? '#fff' : theme.userBubbleText)} />
            </div>
          </div>
        )}
      </div>

      {/* Scenario Buttons — compact pills */}
      {showButtons && (
        <div className="px-3 py-2.5 shrink-0" style={{ borderTop: `1px solid ${theme.border}` }}>
          <div className="flex flex-wrap gap-1.5">
            {scenarioButtons.map(({ id, icon: Icon, label, color }) => {
              const played = completedScenarios.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => playScenario(id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: played
                      ? (isLight ? 'rgba(34,197,94,0.06)' : 'rgba(34,197,94,0.08)')
                      : theme.scenarioBtn,
                    border: `1px solid ${played ? 'rgba(34,197,94,0.2)' : theme.scenarioBtnBorder}`,
                  }}
                >
                  <Icon size={13} style={{ color: played ? '#22C55E' : color }} />
                  <span className="text-[11px] font-medium" style={{ color: theme.text }}>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
