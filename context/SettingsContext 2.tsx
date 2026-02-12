'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'DE' | 'EN';

interface SettingsContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    highContrast: boolean;
    setHighContrast: (enabled: boolean) => void;
    largeText: boolean;
    setLargeText: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('DE');
    const [highContrast, setHighContrast] = useState(false);
    const [largeText, setLargeText] = useState(false);

    // Persist settings (optional, simple implementation)
    useEffect(() => {
        const storedLang = localStorage.getItem('settings-lang') as Language;
        if (storedLang) setLanguage(storedLang);

        // Check system preference for contrast
        const mediaQuery = window.matchMedia('(prefers-contrast: more)');
        if (mediaQuery.matches) setHighContrast(true);
    }, []);

    useEffect(() => {
        localStorage.setItem('settings-lang', language);
    }, [language]);

    // Apply accessibility classes to body
    useEffect(() => {
        if (highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }

        if (largeText) {
            document.body.classList.add('large-text');
        } else {
            document.body.classList.remove('large-text');
        }
    }, [highContrast, largeText]);

    return (
        <SettingsContext.Provider
            value={{
                language,
                setLanguage,
                highContrast,
                setHighContrast,
                largeText,
                setLargeText,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
