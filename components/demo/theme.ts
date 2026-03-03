export interface DemoTheme {
  mode: 'light' | 'dark';
  bg: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  inputBg: string;
  userBubble: string;
  userBubbleText: string;
  aiBubble: string;
  aiBubbleText: string;
  accent: string;
  scenarioBtn: string;
  scenarioBtnBorder: string;
  scenarioBtnText: string;
}

export const lightTheme: DemoTheme = {
  mode: 'light',
  bg: '#F8F6F1',
  surface: '#FFFFFF',
  surfaceAlt: '#F5F3EE',
  text: '#1C1917',
  textSecondary: '#57534E',
  textMuted: '#A8A29E',
  border: '#E7E5E4',
  inputBg: '#F5F5F4',
  userBubble: '#D39858',
  userBubbleText: '#FFFFFF',
  aiBubble: '#F0EDE8',
  aiBubbleText: '#1C1917',
  accent: '#D39858',
  scenarioBtn: 'rgba(211, 152, 88, 0.08)',
  scenarioBtnBorder: 'rgba(211, 152, 88, 0.2)',
  scenarioBtnText: '#92600A',
};

export const darkTheme: DemoTheme = {
  mode: 'dark',
  bg: '#0A0A0A',
  surface: 'rgba(255,255,255,0.03)',
  surfaceAlt: 'rgba(255,255,255,0.06)',
  text: '#EACEAA',
  textSecondary: 'rgba(234,206,170,0.7)',
  textMuted: 'rgba(234,206,170,0.3)',
  border: 'rgba(255,255,255,0.08)',
  inputBg: 'rgba(255,255,255,0.05)',
  userBubble: 'rgba(234,206,170,0.15)',
  userBubbleText: '#EACEAA',
  aiBubble: 'rgba(255,255,255,0.05)',
  aiBubbleText: 'rgba(234,206,170,0.9)',
  accent: '#EACEAA',
  scenarioBtn: 'rgba(234,206,170,0.1)',
  scenarioBtnBorder: 'rgba(234,206,170,0.15)',
  scenarioBtnText: 'rgba(234,206,170,0.8)',
};
