'use client';

import { SettingsProvider } from '@/context/SettingsContext';
import { BackgroundProvider } from '@/context/BackgroundContext';
import AnimatedBackground from '@/components/AnimatedBackground';
import ThemeManager from '@/components/ThemeManager';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SettingsProvider>
            <ThemeManager />
            <BackgroundProvider>
                <AnimatedBackground />
                {children}
            </BackgroundProvider>
        </SettingsProvider>
    );
}
