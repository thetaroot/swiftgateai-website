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

export interface LeadContext {
  project_need: string | null;
  company: string | null;
  urgency: 'low' | 'medium' | 'high' | null;
}

interface BackgroundContextType {
  colors: BackgroundColors;
  setColors: (colors: BackgroundColors) => void;
  chatMessages: ChatMessage[];
  setChatMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  isChatOpen: boolean;
  setIsChatOpen: Dispatch<SetStateAction<boolean>>;
  leadContext: LeadContext;
  setLeadContext: Dispatch<SetStateAction<LeadContext>>;
  leadScore: number;
  setLeadScore: Dispatch<SetStateAction<number>>;
  showTicketForm: boolean;
  setShowTicketForm: Dispatch<SetStateAction<boolean>>;
  ticketSubmitted: boolean;
  setTicketSubmitted: Dispatch<SetStateAction<boolean>>;
  lastAISummary: string;
  setLastAISummary: Dispatch<SetStateAction<string>>;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

// Default colors - memoized outside component
const DEFAULT_COLORS: BackgroundColors = {
  primary: '#D39858',
  secondary: '#85431E',
  background: '#EACEAA',
};

const DEFAULT_LEAD: LeadContext = {
  project_need: null,
  company: null,
  urgency: null,
};

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [colors, setColorsState] = useState<BackgroundColors>(DEFAULT_COLORS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [leadContext, setLeadContext] = useState<LeadContext>(DEFAULT_LEAD);
  const [leadScore, setLeadScore] = useState(0);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [lastAISummary, setLastAISummary] = useState('');

  // Memoized setters to prevent unnecessary re-renders
  const setColors = useCallback((newColors: BackgroundColors) => {
    setColorsState(prev => {
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
    leadContext,
    setLeadContext,
    leadScore,
    setLeadScore,
    showTicketForm,
    setShowTicketForm,
    ticketSubmitted,
    setTicketSubmitted,
    lastAISummary,
    setLastAISummary,
  }), [colors, setColors, chatMessages, isChatOpen, leadContext, leadScore, showTicketForm, ticketSubmitted, lastAISummary]);

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
