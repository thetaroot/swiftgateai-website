import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Demo — KI-Mitarbeiter in Aktion',
  description: 'Erleben Sie unseren autonomen KI-Mitarbeiter live: E-Mails beantworten, Termine planen, Tasks erstellen — alles in einer interaktiven Demo.',
  openGraph: {
    title: 'SwiftGate AI — Live Demo',
    description: 'Interaktive Demo: Sehen Sie, wie ein KI-Mitarbeiter E-Mails, Kalender, CRM und Tasks autonom verwaltet.',
    url: 'https://swiftgateai.de/demo',
    siteName: 'SwiftGate AI',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'SwiftGate AI Live Demo',
      },
    ],
    type: 'website',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwiftGate AI — Live Demo',
    description: 'Interaktive Demo: KI-Mitarbeiter in Aktion',
    images: ['/og-image.svg'],
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
