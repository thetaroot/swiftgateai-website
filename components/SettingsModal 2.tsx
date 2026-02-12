'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '@/hooks/useTranslation';

const SettingsModal = () => {
    const { language, setLanguage, highContrast, setHighContrast, largeText, setLargeText } = useSettings();
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Trigger Button - subtle gear icon, adaptive color */}
            <motion.button
                className="relative group p-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                onClick={toggleModal}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    background: 'transparent',
                    color: 'inherit',
                }}
                aria-label={t.settings.title}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            </motion.button>

            {/* Glossy Backdrop Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-[1000]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleModal}
                        />
                        {/* Modal Content - Apple Glass Style */}
                        <motion.div
                            className="fixed z-[1001] rounded-[24px] overflow-hidden top-20 right-4 left-4 md:top-24 md:right-6 md:left-auto md:w-80"
                            initial={{ opacity: 0, scale: 0.9, y: -20, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.9, y: -20, filter: 'blur(10px)' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.5) inset',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                            }}
                        >
                            {/* Header */}
                            <div className="px-6 py-4 flex justify-between items-center border-b border-black/5">
                                <h3 className="text-[#1d1d1f] font-semibold tracking-tight text-sm">{t.settings.title}</h3>
                                <button
                                    onClick={toggleModal}
                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors text-[#1d1d1f]"
                                >
                                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 1l10 10M11 1l-10 10" />
                                    </svg>
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-5 space-y-6">

                                {/* Language Toggle */}
                                <div>
                                    <label className="block text-[10px] font-bold text-[#86868b] mb-2 tracking-widest uppercase">{t.settings.language}</label>
                                    <div className="flex bg-[#e5e5ea]/50 p-1 rounded-xl shadow-inner-sm">
                                        {(['DE', 'EN'] as const).map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => setLanguage(lang)}
                                                className={`
                          flex-1 py-1.5 text-xs font-bold rounded-lg transition-all duration-300
                          ${language === lang
                                                        ? 'bg-white text-black shadow-sm'
                                                        : 'text-[#86868b] hover:text-black hover:bg-black/5'}
                        `}
                                            >
                                                {lang}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Accessibility Options */}
                                <div>
                                    <label className="block text-[10px] font-bold text-[#86868b] mb-2 tracking-widest uppercase">{t.settings.accessibility}</label>
                                    <div className="space-y-3 bg-white/40 rounded-xl p-3 border border-white/40">
                                        {/* High Contrast */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-[#1d1d1f] font-medium">{t.settings.highContrast}</span>
                                            <button
                                                onClick={() => setHighContrast(!highContrast)}
                                                className={`
                          relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none 
                          ${highContrast ? 'bg-[#0071e3]' : 'bg-[#e5e5ea]'}
                        `}
                                            >
                                                <span
                                                    className={`
                            absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-sm
                            ${highContrast ? 'translate-x-5' : 'translate-x-0'}
                          `}
                                                />
                                            </button>
                                        </div>

                                        {/* Large Text */}
                                        <div className="flex items-center justify-between border-t border-black/5 pt-3">
                                            <span className="text-sm text-[#1d1d1f] font-medium">{t.settings.largeText}</span>
                                            <button
                                                onClick={() => setLargeText(!largeText)}
                                                className={`
                          relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none 
                          ${largeText ? 'bg-[#0071e3]' : 'bg-[#e5e5ea]'}
                        `}
                                            >
                                                <span
                                                    className={`
                            absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-sm
                            ${largeText ? 'translate-x-5' : 'translate-x-0'}
                          `}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default SettingsModal;
