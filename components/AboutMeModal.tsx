'use client';

import GlossyModal from './ui/GlossyModal';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

interface AboutMeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AboutMeModal({ isOpen, onClose }: AboutMeModalProps) {
    const { t } = useTranslation();

    return (
        <GlossyModal isOpen={isOpen} onClose={onClose} title={t.aboutMe.title}>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    {/* Portrait in Modal */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                        <Image
                            src="/pictures/portrait.jpg"
                            alt="Luis - Founder"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Intro Text */}
                    <div className="text-[#1d1d1f]">
                        <h4 className="text-xl font-bold mb-2">{t.aboutMe.greeting}</h4>
                        <p className="text-sm/relaxed text-[#424245] font-medium">
                            {t.aboutMe.role}
                        </p>
                    </div>
                </div>

                <div className="space-y-4 text-sm/relaxed text-[#424245]">
                    <p>
                        {t.aboutMe.p1}
                    </p>
                    <p>
                        {t.aboutMe.p2} <span className="font-bold text-[#1d1d1f]">{t.aboutMe.p3_bold}</span> {t.aboutMe.p3}
                    </p>
                    <p>
                        {t.aboutMe.p4}
                    </p>
                    <p className="italic font-medium text-[#86868b]">
                        {t.aboutMe.quote}
                    </p>
                </div>

                {/* Signature or closing */}
                <div className="pt-4 border-t border-black/5 flex justify-end">
                    <span className="font-handwriting text-2xl text-[#1d1d1f] opacity-80" style={{ fontFamily: '"Courier New", monospace' }}>
                        {t.aboutMe.signature}
                    </span>
                </div>
            </div>
        </GlossyModal>
    );
}
