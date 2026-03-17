'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

interface LegalLayoutProps {
    children: ReactNode;
    title: string;
}

export default function LegalLayout({ children, title }: LegalLayoutProps) {
    const router = useRouter();
    const { t } = useTranslation();

    const handleBack = () => {
        // Navigate back to the homepage but specifically to the footer section
        router.push('/#footer');
    };

    return (
        <div className="absolute inset-0 overflow-y-auto bg-[#EACEAA] text-[#34150F] font-sans selection:bg-[#34150F] selection:text-[#EACEAA] z-50">
            <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 min-h-full">
                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 sticky top-0 bg-[#EACEAA]/80 backdrop-blur-sm py-4 z-10 -mx-6 px-6"
                >
                    <button
                        onClick={handleBack}
                        className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors hover:text-[#8b6b45] cursor-pointer"
                        style={{ fontFamily: '"Courier New", monospace' }}
                    >
                        <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
                        {t.portfolio.modal.backToOverview || 'BACK'}
                    </button>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                        {title}
                    </h1>

                    <div className="prose prose-lg prose-stone max-w-none text-[#34150F] leading-relaxed opacity-90 pb-20">
                        {/* Styling utility for children */}
                        <div className="space-y-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2 [&_a]:underline [&_a]:text-[#34150F] [&_a:hover]:text-[#8b6b45]">
                            {children}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
