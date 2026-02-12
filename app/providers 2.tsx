'use client';

import { SettingsProvider } from '@/context/SettingsContext';
import { BackgroundProvider } from '@/context/BackgroundContext';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SettingsProvider>
            <BackgroundProvider>
                <AnimatedBackground />
                {children}
            </BackgroundProvider>
        </SettingsProvider>
    );
}
