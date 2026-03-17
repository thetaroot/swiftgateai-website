'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Brain, Mail, Calendar, CheckSquare, Search, Settings } from 'lucide-react';
import { getLogEntryPool } from './scenarios';
import { useTranslation } from '@/hooks/useTranslation';
import type { DemoTheme } from './theme';

interface AgentDashboardProps {
    theme: DemoTheme;
}

const agents = [
    { id: 'ceo', label: 'CEO Agent', icon: Brain, color: '#8B5CF6' },
    { id: 'communications', label: 'Communications', icon: Mail, color: '#007AFF' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, color: '#FF3B30' },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, color: '#22C55E' },
    { id: 'knowledge', label: 'Knowledge', icon: Search, color: '#F59E0B' },
    { id: 'system', label: 'System', icon: Settings, color: '#6B7280' },
];

function hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

interface LogEntry {
    id: number;
    time: string;
    icon: string;
    action: string;
    agent: string;
    fading?: boolean;
}

export default function AgentDashboard({ theme }: AgentDashboardProps) {
    const { language } = useTranslation();
    const logEntryPool = getLogEntryPool(language === 'EN' ? 'EN' : 'DE');
    const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
    const entryCounter = useRef(0);
    const poolIndex = useRef(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const getTimeString = useCallback(() => {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }, []);

    const addLogEntry = useCallback(() => {
        const entry = logEntryPool[poolIndex.current % logEntryPool.length];
        poolIndex.current += 1;
        entryCounter.current += 1;

        const newEntry: LogEntry = {
            id: entryCounter.current,
            time: getTimeString(),
            icon: entry.icon,
            action: entry.action,
            agent: entry.agent,
            fading: false,
        };

        setLogEntries(prev => {
            const updated = [newEntry, ...prev];
            // Mark entries beyond 8 as fading
            if (updated.length > 8) {
                updated[8] = { ...updated[8], fading: true };
            }
            // Keep max 10
            return updated.slice(0, 10);
        });
    }, [getTimeString]);

    useEffect(() => {
        // Add initial entries
        const initialEntries: LogEntry[] = [];
        for (let i = 0; i < 4; i++) {
            const entry = logEntryPool[i % logEntryPool.length];
            entryCounter.current += 1;
            poolIndex.current += 1;
            initialEntries.push({
                id: entryCounter.current,
                time: getTimeString(),
                icon: entry.icon,
                action: entry.action,
                agent: entry.agent,
            });
        }
        setLogEntries(initialEntries);

        // Rotate every 4-6 seconds
        const startRotation = () => {
            const delay = 4000 + Math.random() * 2000;
            intervalRef.current = setTimeout(() => {
                addLogEntry();
                startRotation();
            }, delay);
        };
        startRotation();

        return () => {
            if (intervalRef.current) clearTimeout(intervalRef.current);
        };
    }, [addLogEntry, getTimeString]);

    const isLight = theme.mode === 'light';

    return (
        <div className="flex flex-col h-full p-4 gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Brain size={14} style={{ color: theme.accent }} />
                    <p className="text-[11px] uppercase tracking-[0.15em] font-semibold" style={{ color: theme.text }}>
                        Agent-Übersicht
                    </p>
                </div>
                <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                        background: 'rgba(34,197,94,0.12)',
                        color: '#22C55E',
                    }}
                >
                    6 Aktiv
                </span>
            </div>

            {/* Agent Grid */}
            <div className="grid grid-cols-3 gap-2">
                {agents.map(agent => {
                    const Icon = agent.icon;
                    const rgb = hexToRgb(agent.color);
                    return (
                        <div
                            key={agent.id}
                            className="rounded-xl px-3 py-2.5 flex flex-col items-center gap-1.5 transition-all"
                            style={{
                                background: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.03)',
                                border: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
                            }}
                        >
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ background: `rgba(${rgb}, 0.12)` }}
                            >
                                <Icon size={14} style={{ color: agent.color }} />
                            </div>
                            <p className="text-[9px] font-medium text-center" style={{ color: theme.text }}>
                                {agent.label}
                            </p>
                            <div className="flex items-center gap-1">
                                <div
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                        background: '#22C55E',
                                        animation: 'pulse 2s ease-in-out infinite',
                                    }}
                                />
                                <span className="text-[8px]" style={{ color: theme.textMuted }}>Bereit</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Live Activity Log */}
            <div className="flex-1 min-h-0">
                <p className="text-[9px] uppercase tracking-[0.15em] mb-2 font-semibold" style={{ color: theme.textMuted }}>
                    Live Activity
                </p>
                <div className="space-y-1 overflow-y-auto max-h-full scrollbar-thin">
                    {logEntries.map(entry => (
                        <div
                            key={entry.id}
                            className="flex items-start gap-2 px-2 py-1.5 rounded-lg transition-all duration-500 animate-fadeIn"
                            style={{
                                background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
                                opacity: entry.fading ? 0.3 : 1,
                            }}
                        >
                            <span className="text-[9px] shrink-0 mt-0.5 tabular-nums" style={{ color: theme.textMuted }}>
                                {entry.time}
                            </span>
                            <span className="text-[10px] shrink-0">{entry.icon}</span>
                            <span className="text-[10px] leading-relaxed" style={{ color: theme.textSecondary }}>
                                {entry.action}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
