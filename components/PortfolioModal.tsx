'use client';

import { useState, useMemo } from 'react';
import GlossyModal from './ui/GlossyModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

interface PortfolioModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PortfolioModal({ isOpen, onClose }: PortfolioModalProps) {
    const { t, language } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // Initial Active Category when opening? Default is 'All' (translated potentially, but let's use key or English default)
    // We compare with translated string, so default should be translated 'All'.
    // useEffect to set it? Or just derive.
    // Better: use english keys for logic if possible, but our dict uses translated values for categories.
    // Let's rely on the fact that t.portfolio.categories.all IS the value we use.

    // Reset state when closing
    // useEffect(() => { if (!isOpen) setSelectedId(null); }, [isOpen]);

    const CATEGORIES = useMemo(() => [
        t.portfolio.categories.all,
        t.portfolio.categories.automation,
        t.portfolio.categories.chatbot,
        t.portfolio.categories.integration,
        t.portfolio.categories.content,
        t.portfolio.categories.analytics
    ], [t]);

    const projects = t.portfolio.projects;

    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));

            const isAll = activeCategory === t.portfolio.categories.all;
            const matchesCategory = isAll || project.category === activeCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory, projects, t]);

    const selectedProject = useMemo(() =>
        projects.find(p => p.id === selectedId),
        [projects, selectedId]);

    const handleClose = () => {
        setIsExiting(true);
        // Delay callback handled by GlossyModal usually, but here we just pass onClose.
        // If we want internal animation, we handle it.
        onClose();
        setTimeout(() => setSelectedId(null), 500); // Reset after close
    };
    const [isExiting, setIsExiting] = useState(false);

    // Tech filter derivation (optional enhancement)
    // const allTech = useMemo(() => Array.from(new Set(projects.flatMap(p => p.tech))), [projects]);

    return (
        <GlossyModal
            isOpen={isOpen}
            onClose={onClose}
            title={selectedProject ? t.portfolio.modal.visitProject : t.portfolio.modal.title} // Change title? Or "Project Details"
            className="w-[95vw] h-[90vh] max-w-none mx-auto"
        >
            <div className="flex flex-col h-full overflow-hidden relative">

                <AnimatePresence mode="wait">
                    {!selectedProject ? (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col h-full space-y-6"
                        >
                            {/* Controls Header */}
                            <div className="space-y-4 flex-shrink-0">
                                {/* Search */}
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder={t.portfolio.modal.searchPlaceholder}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-5 py-4 rounded-2xl bg-black/5 border border-black/5 focus:outline-none focus:bg-white focus:border-[#D39858]/50 transition-all text-lg text-[#1d1d1f] placeholder:text-gray-400 font-medium"
                                    />
                                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D39858] transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8" />
                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        </svg>
                                    </span>
                                </div>

                                {/* Filter Chips */}
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`
                                              px-5 py-2.5 text-sm font-bold rounded-xl transition-all border
                                              ${activeCategory === cat
                                                    ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-lg shadow-black/10'
                                                    : 'bg-white/50 text-[#1d1d1f] border-transparent hover:bg-white hover:border-black/5'}
                                            `}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Results Grid - Scrollable Area */}
                            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar pb-6 -mx-2 px-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    <AnimatePresence mode='popLayout'>
                                        {filteredProjects.map((project) => (
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
                                                {/* Gradient Overlay on Hover */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#D39858]/0 to-[#D39858]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                <div className="relative z-10">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <span className="text-xs font-bold tracking-wider text-[#D39858] uppercase bg-[#D39858]/10 px-3 py-1 rounded-full">
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

                                                <div className="relative z-10 flex flex-wrap gap-2 mt-6">
                                                    {project.tech.slice(0, 3).map(t => (
                                                        <span key={t} className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                                                            {t}
                                                        </span>
                                                    ))}
                                                    {project.tech.length > 3 && (
                                                        <span className="text-[10px] font-bold text-gray-400 px-1 py-1">
                                                            +{project.tech.length - 3}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Arrow Icon */}
                                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D39858" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                        <polyline points="12 5 19 12 12 19"></polyline>
                                                    </svg>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {filteredProjects.length === 0 && (
                                        <div className="col-span-full py-24 text-center text-gray-400 text-lg flex flex-col items-center">
                                            <span className="text-4xl mb-6 opacity-50">🔍</span>
                                            {t.portfolio.modal.noResults}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="h-full flex flex-col"
                        >
                            {/* Detail View Header */}
                            <div className="flex items-center gap-4 mb-8 flex-shrink-0">
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="p-2 rounded-full hover:bg-black/5 transition-colors group"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1d1d1f] group-hover:-translate-x-1 transition-transform">
                                        <line x1="19" y1="12" x2="5" y2="12"></line>
                                        <polyline points="12 19 5 12 12 5"></polyline>
                                    </svg>
                                </button>
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                    {t.portfolio.modal.backToOverview}
                                </span>
                            </div>

                            {/* Detail Content Scrollable */}
                            <div className="flex-grow overflow-y-auto custom-scrollbar pr-4">
                                <div className="max-w-4xl mx-auto space-y-12 pb-12">

                                    {/* Header Section */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[#D39858] font-bold text-sm uppercase tracking-wider bg-[#D39858]/10 px-4 py-1.5 rounded-full">
                                                {selectedProject.category}
                                            </span>
                                            <span className="text-gray-400 font-mono text-sm">
                                                {selectedProject.year}
                                            </span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1d1d1f] leading-tight">
                                            {selectedProject.title}
                                        </h2>
                                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                                            {selectedProject.description}
                                        </p>
                                    </div>

                                    <div className="w-full h-px bg-black/5" />

                                    {/* Tech Stack */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                            Tech Stack
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {selectedProject.tech.map(tech => (
                                                <span key={tech} className="px-4 py-2 bg-white border border-black/10 rounded-xl text-sm font-bold text-[#1d1d1f] shadow-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-bold text-[#1d1d1f]">
                                                {t.portfolio.modal.challenge}
                                            </h3>
                                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                                {selectedProject.details.map((paragraph, idx) => (
                                                    <p key={idx}>{paragraph}</p>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-bold text-[#1d1d1f]">
                                                {t.portfolio.modal.results}
                                            </h3>
                                            <ul className="space-y-4">
                                                {selectedProject.results.map((result, idx) => (
                                                    <li key={idx} className="flex items-start gap-4">
                                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D39858]/20 flex items-center justify-center mt-0.5">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D39858" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="20 6 9 17 4 12"></polyline>
                                                            </svg>
                                                        </span>
                                                        <span className="text-gray-700 font-medium">
                                                            {result}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="pt-12">
                                        <button className="bg-[#1d1d1f] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#D39858] transition-colors shadow-xl shadow-black/10 flex items-center gap-3">
                                            {t.portfolio.modal.visitProject}
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </GlossyModal>
    );
}
