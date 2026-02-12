'use client';

import { useRef, useState, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { useMobile } from '@/hooks/useMobile';

const smoothSpring = {
    type: "spring" as const,
    stiffness: 150,
    damping: 25,
    mass: 1,
};

function ContactSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });
    const { t } = useTranslation();
    const isMobile = useMobile();

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Obfuscated email parts
    const user = 'hello';
    const domain = 'swiftgateai.de';
    const email = `${user}@${domain}`;

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        window.location.href = `mailto:${email}`;
    };

    const handleAISummary = () => {
        // === DISABLED FOR BASIS LAUNCH ===
        return;
    };

    return (
        <section
            id="kontakt"
            className="relative w-full flex items-center justify-center overflow-hidden"
            style={{
                minHeight: isMobile ? 'auto' : '90vh',
                background: '#0A0A0A',
                padding: isMobile ? '60px 16px' : '100px 24px',
            }}
        >
            {/* Background Ambience */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 100%, #1a1008 0%, #0A0A0A 60%)',
                }}
            />

            {/* Animated Mesh/Grid Overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.05,
                    background: 'linear-gradient(to right, #34150F 1px, transparent 1px), linear-gradient(to bottom, #34150F 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center">

                {/* Label */}
                {/* Label Removed */}

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    style={{
                        fontFamily: '"Space Grotesk", -apple-system, sans-serif',
                        fontSize: 'clamp(40px, 8vw, 96px)',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        lineHeight: 1.1,
                        marginBottom: isMobile ? '16px' : '24px',
                        letterSpacing: '-0.03em',
                    }}
                >
                    {t.contact.headline}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className={`max-w-xl mx-auto ${isMobile ? 'mb-10' : 'mb-16'}`}
                    style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                        fontSize: 'clamp(16px, 2vw, 20px)',
                        color: 'rgba(255, 255, 255, 0.6)',
                        lineHeight: 1.6,
                    }}
                >
                    {t.contact.subheadline}
                </motion.p>

                {/* Action Buttons Container */}
                <div className={`flex flex-col md:flex-row gap-${isMobile ? '4' : '6'} w-full justify-center ${isMobile ? 'px-0' : 'px-4'}`}>

                    {/* Standard Mail Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        onClick={handleCopy}
                        onMouseEnter={() => setHoveredButton('mail')}
                        onMouseLeave={() => setHoveredButton(null)}
                        className={`group relative flex-1 ${isMobile ? 'w-full' : 'min-w-[280px] max-w-[400px]'} h-auto p-1 rounded-3xl`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative h-full bg-[#0F0F0F] border border-white/10 rounded-[20px] p-6 md:p-8 flex flex-col items-start gap-4 overflow-hidden group-hover:border-[#D39858]/50 transition-colors duration-500">

                            {/* Icon */}
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#D39858] group-hover:bg-[#D39858] group-hover:text-[#1d1d1f] transition-all duration-300">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M22,6L12,13L2,6" />
                                </svg>
                            </div>

                            <div className="text-left w-full">
                                <h3 className="text-white font-bold text-xl mb-1">{t.contact.mailBtn.title}</h3>
                                <p className="text-white/50 text-sm mb-4">{t.contact.mailBtn.desc}</p>
                                <div className="text-[#EACEAA] font-mono text-sm tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                                    {email}
                                </div>
                            </div>

                            {/* Hover Indicator */}
                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 text-[#D39858]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7" />
                                    <polyline points="7 7 17 7 17 17" />
                                </svg>
                            </div>
                        </div>
                    </motion.button>

                    {/* AI Summary Button — DISABLED FOR BASIS LAUNCH */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ ...smoothSpring, delay: 0.5 }}
                        className={`relative flex-1 ${isMobile ? 'w-full' : 'min-w-[280px] max-w-[400px]'}`}
                        style={{
                            opacity: 0.3,
                            filter: 'grayscale(70%)',
                            pointerEvents: 'none',
                        }}
                    >
                        <div
                            className="group relative h-auto p-1 rounded-3xl"
                        >
                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D39858]/20 to-purple-500/20 blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative h-full bg-[#0F0F0F] border border-white/10 rounded-[20px] p-6 md:p-8 flex flex-col items-start gap-4 overflow-hidden group-hover:border-[#D39858] transition-colors duration-500">

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D39858]/20 to-purple-500/20 flex items-center justify-center text-[#EACEAA] group-hover:scale-110 transition-transform duration-300 border border-[#D39858]/20">
                                    {/* Simply using the Wand/Spark icon */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2v4" />
                                        <path d="M12 18v4" />
                                        <path d="M4.93 4.93l2.83 2.83" />
                                        <path d="M16.24 16.24l2.83 2.83" />
                                        <path d="M2 12h4" />
                                        <path d="M18 12h4" />
                                        <path d="M4.93 19.07l2.83-2.83" />
                                        <path d="M16.24 7.76l2.83-2.83" />
                                    </svg>
                                </div>

                                <div className="text-left w-full">
                                    <h3 className="text-white font-bold text-xl mb-1 flex items-center gap-2">
                                        {t.contact.aiBtn.title}
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D39858] text-[#0A0A0A] uppercase tracking-wider">AI</span>
                                    </h3>
                                    <p className="text-white/50 text-sm mb-4">
                                        {t.contact.aiBtn.desc}
                                    </p>
                                    <div className="text-[#EACEAA] font-mono text-sm tracking-wide opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                        {t.contact.aiBtn.cta} <span className="animate-pulse">✨</span>
                                    </div>
                                </div>

                                {/* Hover Indicator */}
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 text-[#EACEAA]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Coming Soon Badge */}
                        <div className="flex justify-center mt-3">
                            <span
                                style={{
                                    fontSize: '10px',
                                    color: 'rgba(234, 206, 170, 0.5)',
                                    fontFamily: '"Courier New", monospace',
                                    fontWeight: 600,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    padding: '4px 12px',
                                    border: '1px solid rgba(234, 206, 170, 0.15)',
                                    borderRadius: '6px',
                                    background: 'rgba(234, 206, 170, 0.03)',
                                }}
                            >
                                [ COMING SOON ]
                            </span>
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}

export default memo(ContactSection);
