'use client';

import { useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { de } from '@/lib/i18n/de';
import { en } from '@/lib/i18n/en';
import { Dictionary } from '@/lib/i18n/types';

export function useTranslation() {
    const { language } = useSettings();

    const t: Dictionary = language === 'EN' ? en : de;

    useEffect(() => {
        document.title = language === 'EN'
            ? 'SwiftGate AI - Agentic AI & Autonomous Systems | Essen, NRW'
            : 'SwiftGate AI - Agentic AI & Autonome Systeme | Essen, NRW';
    }, [language]);

    return { t, language };
}
