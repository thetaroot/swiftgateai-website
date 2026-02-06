import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cocktail Color Palette
        champagne: '#EACEAA',
        whiskey: '#D39858',
        honey: '#85431E',
        coffee: '#34150F',
        balsamico: '#150C0C',
        // Semantic aliases
        background: 'var(--color-champagne)',
        foreground: 'var(--color-coffee)',
        primary: 'var(--color-whiskey)',
        secondary: 'var(--color-honey)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glass': '0 0 0 1px rgba(255, 255, 255, 0.5) inset, 0 4px 16px rgba(52, 21, 15, 0.1)',
        'glass-lg': '0 0 0 1px rgba(255, 255, 255, 0.5) inset, 0 8px 32px rgba(52, 21, 15, 0.15)',
        'glow': '0 0 20px rgba(211, 152, 88, 0.3)',
        'glow-lg': '0 0 40px rgba(211, 152, 88, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
