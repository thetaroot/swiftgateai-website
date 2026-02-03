'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface BackgroundColors {
  primary: string; // Hauptfarbe für Schlaufen
  secondary: string; // Sekundärfarbe für Gradienten
  background: string; // Basis-Hintergrund
}

interface BackgroundContextType {
  colors: BackgroundColors;
  setColors: (colors: BackgroundColors) => void;
  animationTime: number;
  setAnimationTime: (time: number) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [animationTime, setAnimationTime] = useState(0);

  // Default: Cocktail Palette für Main Page
  const [colors, setColors] = useState<BackgroundColors>({
    primary: '#D39858', // Whiskey Sour
    secondary: '#85431E', // Honey Garlic
    background: '#EACEAA', // Champagne
  });

  return (
    <BackgroundContext.Provider value={{ colors, setColors, animationTime, setAnimationTime }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackgroundContext() {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackgroundContext must be used within BackgroundProvider');
  }
  return context;
}
