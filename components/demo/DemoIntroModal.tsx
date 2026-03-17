'use client';

import { useTranslation } from '@/hooks/useTranslation';
import GlossyModal from '@/components/ui/GlossyModal';

interface DemoIntroModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DemoIntroModal({ isOpen, onClose }: DemoIntroModalProps) {
    const { language } = useTranslation();
    const isEN = language === 'EN';

    return (
        <GlossyModal
            isOpen={isOpen}
            onClose={onClose}
            title={isEN ? 'Welcome to the Live Demo' : 'Willkommen zur Live Demo'}
        >
            <div className="space-y-4">
                <p className="text-sm text-[#1d1d1f]/80 leading-relaxed">
                    {isEN
                        ? 'Experience our AI employee system in action. Six specialized agents work together autonomously — managing emails, scheduling, CRM, tasks, and company knowledge. Choose from five pre-scripted scenarios or type freely to explore.'
                        : 'Erleben Sie unser KI-Mitarbeiter-System in Aktion. Sechs spezialisierte Agenten arbeiten autonom zusammen — E-Mails, Termine, CRM, Aufgaben und Firmenwissen. Wählen Sie aus fünf Szenarien oder tippen Sie frei.'}
                </p>

                <p className="text-xs text-[#1d1d1f]/50 leading-relaxed">
                    {isEN
                        ? 'This is a simulated demo environment. The real agent system runs 24/7 on a hardened server, controlled via Telegram. Pre-scripted scenarios use zero API tokens.'
                        : 'Dies ist eine simulierte Demo-Umgebung. Das echte Agent-System läuft 24/7 auf einem gehärteten Server und wird über Telegram gesteuert. Szenarien verbrauchen keine API-Tokens.'}
                </p>

                <button
                    onClick={onClose}
                    className="w-full py-3 rounded-2xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                        background: 'linear-gradient(135deg, #D39858 0%, #85431E 100%)',
                        color: '#FFFFFF',
                    }}
                >
                    {isEN ? 'Start Demo' : 'Demo starten'}
                </button>
            </div>
        </GlossyModal>
    );
}
