'use client';

import { useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';

export default function ThemeManager() {
    const { highContrast, largeText } = useSettings();

    useEffect(() => {
        const root = document.documentElement;

        if (highContrast) {
            root.classList.add('high-contrast');
        } else {
            root.classList.remove('high-contrast');
        }

        if (largeText) {
            root.classList.add('large-text');
        } else {
            root.classList.remove('large-text');
        }
    }, [highContrast, largeText]);

    return null;
}
