'use client';

import { createContext, useContext, useState, useCallback, useMemo, ReactNode, Dispatch, SetStateAction } from 'react';

interface BackgroundColors {
  primary: string;
  secondary: string;
  background: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

interface BackgroundContextType {
  colors: BackgroundColors;
  setColors: (colors: BackgroundColors) => void;
  chatMessages: ChatMessage[];
  setChatMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  isChatOpen: boolean;
  setIsChatOpen: Dispatch<SetStateAction<boolean>>;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

// Default colors - memoized outside component
const DEFAULT_COLORS: BackgroundColors = {
  primary: '#D39858',
  secondary: '#85431E',
  background: '#EACEAA',
};

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [colors, setColorsState] = useState<BackgroundColors>(DEFAULT_COLORS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Memoized setters to prevent unnecessary re-renders
  const setColors = useCallback((newColors: BackgroundColors) => {
    setColorsState(prev => {
      // Only update if colors actually changed
      if (prev.primary === newColors.primary &&
        prev.secondary === newColors.secondary &&
        prev.background === newColors.background) {
        return prev;
      }
      return newColors;
    });
  }, []);

  // Memoize context value to prevent re-renders
  const contextValue = useMemo(() => ({
    colors,
    setColors,
    chatMessages,
    setChatMessages,
    isChatOpen,
    setIsChatOpen,
  }), [colors, setColors, chatMessages, isChatOpen]);

  return (
    <BackgroundContext.Provider value={contextValue}>
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
