'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GlossyModal from './ui/GlossyModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

interface PortfolioModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialProjectId?: number | null;
}

export default function PortfolioModal({ isOpen, onClose, initialProjectId }: PortfolioModalProps) {
    const { t } = useTranslation();
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        if (isOpen && initialProjectId !== undefined) {
            setSelectedId(initialProjectId);
        }
        if (!isOpen) {
            setSelectedId(null);
        }
    }, [isOpen, initialProjectId]);

    const projects = t.portfolio.projects;

    const selectedProject = useMemo(() =>
        projects.find(p => p.id === selectedId),
        [projects, selectedId]);

    return (
        <GlossyModal
            isOpen={isOpen}
            onClose={onClose}
            title={selectedProject ? selectedProject.title : t.portfolio.modal.title}
            className="w-[95vw] h-[90vh] max-w-none mx-auto"
        >
            <div className="flex flex-col h-full overflow-hidden relative">

                <AnimatePresence mode="wait">
                    {!selectedProject ? (
                        /* ======================== GRID VIEW ======================== */
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col h-full"
                        >
                            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar pb-6 -mx-2 px-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    <AnimatePresence mode='popLayout'>
                                        {projects.map((project) => (
                                            <motion.div
                                                key={project.id}
                                                layoutId={`card-${project.id}`}
                                                onClick={() => setSelectedId(project.id)}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="group relative p-6 rounded-[2rem] bg-white border border-black/5 hover:border-[#D39858]/30 hover:shadow-2xl hover:shadow-[#D39858]/10 transition-all cursor-pointer flex flex-col justify-between min-h-[280px] overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#D39858]/0 to-[#D39858]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                <div className="relative z-10">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <span className="text-[10px] font-bold tracking-wider text-[#D39858] uppercase bg-[#D39858]/10 px-3 py-1 rounded-full">
                                                            {project.category}
                                                        </span>
                                                        <span className="text-xs font-mono text-gray-400">
                                                            {project.year}
                                                        </span>
                                                    </div>

                                                    <h4 className="text-[#1d1d1f] font-bold text-2xl mb-3 leading-tight group-hover:text-[#D39858] transition-colors">
                                                        {project.title}
                                                    </h4>

                                                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                                                        {project.description}
                                                    </p>
                                                </div>

                                                <div className="relative z-10 mt-6">
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {project.tech.slice(0, 3).map(tech => (
                                                            <span key={tech} className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                        {project.tech.length > 3 && (
                                                            <span className="text-[10px] font-bold text-gray-400 px-1 py-1">
                                                                +{project.tech.length - 3}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {project.demoUrl && (
                                                        <div className="flex items-center gap-1.5">
                                                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80' }} />
                                                            <span className="text-[11px] font-bold text-[#4ade80] tracking-wide">
                                                                {t.portfolio.modal.liveDemo}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D39858" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                        <polyline points="12 5 19 12 12 19"></polyline>
                                                    </svg>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {projects.length === 0 && (
                                        <div className="col-span-full py-24 text-center text-gray-400 text-lg flex flex-col items-center">
                                            <span className="text-4xl mb-6 opacity-50">&#128269;</span>
                                            {t.portfolio.modal.noResults}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* ======================== DETAIL VIEW ======================== */
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="h-full flex flex-col"
                        >
                            {/* Back Button */}
                            <div className="flex items-center mb-6 flex-shrink-0">
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-black/5 transition-colors group"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 group-hover:-translate-x-0.5 transition-transform">
                                        <line x1="19" y1="12" x2="5" y2="12"></line>
                                        <polyline points="12 19 5 12 12 5"></polyline>
                                    </svg>
                                    <span className="text-sm font-semibold text-gray-600">
                                        {t.portfolio.modal.backToOverview}
                                    </span>
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-grow overflow-y-auto custom-scrollbar pr-4">
                                <div className="max-w-3xl mx-auto pb-12">

                                    {/* Demo CTA */}
                                    {selectedProject.demoUrl && (
                                        <button
                                            onClick={() => router.push(selectedProject.demoUrl!)}
                                            className="w-full mb-10 px-8 py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3 hover:shadow-xl"
                                            style={{
                                                background: '#1d1d1f',
                                                color: '#fff',
                                            }}
                                        >
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74, 222, 128, 0.5)' }} />
                                            {t.portfolio.modal.startDemo}
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        </button>
                                    )}

                                    {/* Header */}
                                    <div className="mb-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-[10px] font-bold tracking-wider text-[#B07830] uppercase bg-[#D39858]/15 px-3 py-1.5 rounded-full">
                                                {selectedProject.category}
                                            </span>
                                            <span className="text-sm font-mono text-gray-500">
                                                {selectedProject.year}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
                                            {selectedProject.title}
                                        </h2>
                                        <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                                            {selectedProject.description}
                                        </p>
                                    </div>

                                    <div className="w-full h-px bg-black/5 mb-8" />

                                    {/* Tech Stack */}
                                    <div className="mb-8">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                                            Tech Stack
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech.map(tech => (
                                                <span key={tech} className="px-3.5 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-[#1d1d1f]">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full h-px bg-black/5 mb-8" />

                                    {/* Architecture */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-[#1d1d1f] mb-5" style={{ letterSpacing: '-0.01em' }}>
                                            {t.portfolio.modal.challenge}
                                        </h3>
                                        <div className="space-y-4">
                                            {selectedProject.details.map((paragraph, idx) => (
                                                <p key={idx} className="text-[15px] text-gray-600 leading-relaxed">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full h-px bg-black/5 mb-8" />

                                    {/* Results */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-[#1d1d1f] mb-5" style={{ letterSpacing: '-0.01em' }}>
                                            {t.portfolio.modal.results}
                                        </h3>
                                        <ul className="space-y-3">
                                            {selectedProject.results.map((result, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#16a34a]/15 flex items-center justify-center mt-0.5">
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </span>
                                                    <span className="text-[15px] text-gray-700 leading-relaxed">
                                                        {result}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Bottom Demo CTA */}
                                    {selectedProject.demoUrl && (
                                        <div className="pt-4">
                                            <button
                                                onClick={() => router.push(selectedProject.demoUrl!)}
                                                className="px-8 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-3 hover:shadow-lg"
                                                style={{
                                                    background: 'linear-gradient(135deg, #D39858 0%, #B07830 100%)',
                                                    color: '#fff',
                                                }}
                                            >
                                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px rgba(74, 222, 128, 0.5)' }} />
                                                {t.portfolio.modal.startDemo}
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </GlossyModal>
    );
}
