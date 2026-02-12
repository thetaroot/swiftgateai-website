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
  isChatExpanded: boolean;
  setIsChatExpanded: (expanded: boolean) => void;
  chatVisible: boolean;
  setChatVisible: (visible: boolean) => void;
  chatMessages: ChatMessage[];
  setChatMessages: Dispatch<SetStateAction<ChatMessage[]>>;
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
  const [isChatExpanded, setIsChatExpandedState] = useState(false);
  const [chatVisible, setChatVisibleState] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

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

  const setIsChatExpanded = useCallback((expanded: boolean) => {
    setIsChatExpandedState(expanded);
  }, []);

  const setChatVisible = useCallback((visible: boolean) => {
    setChatVisibleState(visible);
  }, []);

  // Memoize context value to prevent re-renders
  const contextValue = useMemo(() => ({
    colors,
    setColors,
    isChatExpanded,
    setIsChatExpanded,
    chatVisible,
    setChatVisible,
    chatMessages,
    setChatMessages,
  }), [colors, setColors, isChatExpanded, setIsChatExpanded, chatVisible, setChatVisible, chatMessages]);

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
