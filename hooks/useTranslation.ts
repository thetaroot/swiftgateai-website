'use client';

import { useSettings } from '@/context/SettingsContext';
import { de } from '@/lib/i18n/de';
import { en } from '@/lib/i18n/en';
import { Dictionary } from '@/lib/i18n/types';

export function useTranslation() {
    const { language } = useSettings();

    const t: Dictionary = language === 'EN' ? en : de;

    return { t, language };
}
