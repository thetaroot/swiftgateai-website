'use client';

import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

interface MobileMenuProps {
    isInDarkSection: boolean;
    onScrollTo: (id: string) => void;
}

function MobileMenu({ isInDarkSection, onScrollTo }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const navItems = [
        { key: 'services', label: t.common.services, disabled: false },
        { key: 'portfolio', label: t.common.portfolio, disabled: true },
        { key: 'kontakt', label: t.common.contact, disabled: false },
    ];

    const handleNavClick = useCallback((item: typeof navItems[0]) => {
        if (item.disabled) return;
        setIsOpen(false);
        setTimeout(() => onScrollTo(item.key), 350);
    }, [onScrollTo]);

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const lineColor = isInDarkSection ? '#EACEAA' : '#34150F';

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="relative z-[200] flex flex-col items-center justify-center"
                style={{
                    width: '44px',
                    height: '44px',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent',
                }}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                <motion.span
                    animate={{
                        rotate: isOpen ? 45 : 0,
                        y: isOpen ? 0 : -5,
                        backgroundColor: isOpen ? '#34150F' : lineColor,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        display: 'block',
                        width: '22px',
                        height: '2px',
                        borderRadius: '1px',
                        position: 'absolute',
                        transformOrigin: 'center',
                    }}
                />
                <motion.span
                    animate={{
                        opacity: isOpen ? 0 : 1,
                        scaleX: isOpen ? 0 : 1,
                        backgroundColor: lineColor,
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                        display: 'block',
                        width: '22px',
                        height: '2px',
                        borderRadius: '1px',
                        position: 'absolute',
                    }}
                />
                <motion.span
                    animate={{
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? 0 : 5,
                        backgroundColor: isOpen ? '#34150F' : lineColor,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        display: 'block',
                        width: '22px',
                        height: '2px',
                        borderRadius: '1px',
                        position: 'absolute',
                        transformOrigin: 'center',
                    }}
                />
            </button>

            {/* Fullscreen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0"
                        style={{ zIndex: 150 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        {/* Glassmorphism Backdrop */}
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(160deg, rgba(234, 206, 170, 0.92) 0%, rgba(220, 190, 155, 0.95) 40%, rgba(210, 178, 140, 0.97) 100%)',
                                backdropFilter: 'blur(30px) saturate(150%)',
                                WebkitBackdropFilter: 'blur(30px) saturate(150%)',
                            }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Content */}
                        <div className="relative h-full flex flex-col justify-between px-8 py-20">
                            {/* Nav Links — left-aligned, large type */}
                            <nav className="flex flex-col gap-1 mt-8">
                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item.key}
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.08 + index * 0.07,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        onClick={() => handleNavClick(item)}
                                        disabled={item.disabled}
                                        className="text-left group"
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            padding: '14px 0',
                                            cursor: item.disabled ? 'default' : 'pointer',
                                            WebkitTapHighlightColor: 'transparent',
                                        }}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Left accent line */}
                                            <motion.div
                                                initial={{ scaleY: 0 }}
                                                animate={{ scaleY: 1 }}
                                                transition={{ delay: 0.3 + index * 0.07, duration: 0.4 }}
                                                style={{
                                                    width: '2px',
                                                    height: '28px',
                                                    background: item.disabled
                                                        ? 'rgba(52, 21, 15, 0.08)'
                                                        : 'rgba(52, 21, 15, 0.3)',
                                                    borderRadius: '1px',
                                                    transformOrigin: 'top',
                                                }}
                                            />
                                            <div>
                                                <span
                                                    style={{
                                                        fontFamily: '"Courier New", monospace',
                                                        fontSize: '26px',
                                                        fontWeight: 400,
                                                        color: item.disabled ? 'rgba(52, 21, 15, 0.18)' : '#34150F',
                                                        letterSpacing: '0.04em',
                                                    }}
                                                >
                                                    {item.label}
                                                </span>
                                                {item.disabled && (
                                                    <motion.span
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.5 }}
                                                        style={{
                                                            display: 'block',
                                                            fontSize: '9px',
                                                            color: 'rgba(52, 21, 15, 0.25)',
                                                            fontFamily: '"Courier New", monospace',
                                                            fontWeight: 600,
                                                            letterSpacing: '0.2em',
                                                            marginTop: '4px',
                                                            textTransform: 'uppercase',
                                                        }}
                                                    >
                                                        COMING SOON
                                                    </motion.span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </nav>

                            {/* Bottom — location + decorative element */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="flex flex-col items-start gap-4"
                            >
                                <div
                                    style={{
                                        width: '32px',
                                        height: '1px',
                                        background: 'rgba(52, 21, 15, 0.15)',
                                    }}
                                />
                                <span
                                    style={{
                                        fontFamily: '"Courier New", monospace',
                                        fontSize: '10px',
                                        color: 'rgba(52, 21, 15, 0.35)',
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    [ ESSEN, DEUTSCHLAND ]
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default memo(MobileMenu);
