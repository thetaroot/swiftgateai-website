'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useTranslation } from '@/hooks/useTranslation';

interface MobileMenuProps {
    isInDarkSection: boolean;
    onScrollTo: (id: string) => void;
}

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: { duration: 0.2 }
    }
};

function MobileMenu({ isInDarkSection, onScrollTo }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { t } = useTranslation();

    // Client-side mount check for portal
    useEffect(() => {
        setMounted(true);
    }, []);

    const navItems = [
        { key: 'ai-employee', label: t.common.aiEmployee },
        { key: 'architecture', label: t.common.architecture },
        { key: 'services', label: t.common.services },
        { key: 'portfolio', label: t.common.portfolio },
        { key: 'kontakt', label: t.common.contact },
    ];

    const handleNavClick = useCallback((item: typeof navItems[0]) => {
        setIsOpen(false);
        setTimeout(() => onScrollTo(item.key), 300);
    }, [onScrollTo]);

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const iconColor = isInDarkSection ? '#EACEAA' : '#34150F';

    return (
        <>
            {/* Menu Button — "Navigation" glass pill */}
            <motion.button
                onClick={toggleMenu}
                className="relative z-[200] flex items-center justify-center rounded-full overflow-hidden"
                whileTap={{ scale: 0.95 }}
                style={{
                    padding: '8px 16px',
                    height: '42px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    color: iconColor,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                }}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                <span
                    style={{
                        fontFamily: '"Courier New", monospace',
                        fontSize: '12px',
                        letterSpacing: '0.1em',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                    }}
                >
                    NAVIGATION
                </span>
            </motion.button>

            {/* Modal — Apple Glass style, matching GlossyModal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                className="fixed inset-0 z-[9999]"
                                style={{
                                    background: 'rgba(0,0,0,0.4)',
                                    backdropFilter: 'blur(4px)',
                                    WebkitBackdropFilter: 'blur(4px)',
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setIsOpen(false)}
                            />

                            {/* Modal Container */}
                            <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none p-6">
                                <motion.div
                                    className="pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-[32px] border border-white/20"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.65)',
                                        backdropFilter: 'blur(24px) saturate(180%)',
                                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                    }}
                                    variants={modalVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/10">
                                        <span
                                            style={{
                                                fontFamily: '"Courier New", monospace',
                                                fontSize: '13px',
                                                color: '#1d1d1f',
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Navigation
                                        </span>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="p-2 rounded-full hover:bg-black/5 transition-colors text-[#1d1d1f]/60 hover:text-[#1d1d1f]"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Nav Items */}
                                    <div className="p-6">
                                        <nav className="flex flex-col gap-1">
                                            {navItems.map((item, index) => (
                                                <motion.button
                                                    key={item.key}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{
                                                        duration: 0.3,
                                                        delay: 0.05 + index * 0.06,
                                                        ease: [0.22, 1, 0.36, 1],
                                                    }}
                                                    onClick={() => handleNavClick(item)}
                                                    className="text-left rounded-2xl px-4 py-4 active:bg-black/5 transition-colors"
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        WebkitTapHighlightColor: 'transparent',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontFamily: '"Space Grotesk", -apple-system, sans-serif',
                                                            fontSize: '22px',
                                                            fontWeight: 600,
                                                            color: '#1d1d1f',
                                                            letterSpacing: '-0.02em',
                                                        }}
                                                    >
                                                        {item.label}
                                                    </span>
                                                </motion.button>
                                            ))}
                                        </nav>

                                        {/* Bottom — location */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.35, duration: 0.4 }}
                                            className="mt-8 pt-4 border-t border-black/5"
                                        >
                                            <span
                                                style={{
                                                    fontFamily: '"Courier New", monospace',
                                                    fontSize: '10px',
                                                    color: 'rgba(0, 0, 0, 0.3)',
                                                    letterSpacing: '0.15em',
                                                    textTransform: 'uppercase',
                                                }}
                                            >
                                                [ ESSEN, DEUTSCHLAND ]
                                            </span>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}

export default memo(MobileMenu);
