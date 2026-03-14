'use client';

import { useTranslation } from '@/hooks/useTranslation';
import GlossyModal from '@/components/ui/GlossyModal';

interface LeadIntroModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LeadIntroModal({ isOpen, onClose }: LeadIntroModalProps) {
    const { t } = useTranslation();

    return (
        <GlossyModal
            isOpen={isOpen}
            onClose={onClose}
            title={t.leadDemo.introTitle}
        >
            <div className="space-y-4">
                <p className="text-sm text-[#1d1d1f]/80 leading-relaxed">
                    {t.leadDemo.introText}
                </p>

                <p className="text-xs text-[#1d1d1f]/50 leading-relaxed">
                    {t.leadDemo.introDisclaimer}
                </p>

                <button
                    onClick={onClose}
                    className="w-full py-3 rounded-2xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                        background: 'linear-gradient(135deg, #D39858 0%, #85431E 100%)',
                        color: '#FFFFFF',
                    }}
                >
                    {t.leadDemo.introCta}
                </button>
            </div>
        </GlossyModal>
    );
}
