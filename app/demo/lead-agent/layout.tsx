import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Demo — Lead AI Agent',
  description: 'Erleben Sie den Lead AI Agent live: Automatisches Lead-Scoring, Multi-Channel-Qualifizierung und personalisierte Auto-Replies in Echtzeit.',
  openGraph: {
    title: 'SwiftGate AI — Lead AI Agent Demo',
    description: 'Interaktive Demo: KI-gestütztes Lead-Scoring über E-Mail, Instagram, WhatsApp und Web-Formulare.',
    url: 'https://swiftgateai.de/demo/lead-agent',
    siteName: 'SwiftGate AI',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'SwiftGate AI — Lead AI Agent Demo',
      },
    ],
    type: 'website',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwiftGate AI — Lead AI Agent Demo',
    description: 'Interaktive Demo: KI-gestütztes Lead-Scoring in Aktion',
    images: ['/og-image.svg'],
  },
};

export default function LeadAgentDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
