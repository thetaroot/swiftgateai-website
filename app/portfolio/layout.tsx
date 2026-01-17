import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio - Referenzprojekte',
  description: 'Entdecken Sie ausgewählte Projekte aus den Bereichen Business, Creative und Tech. Von modernen Web-Apps bis zu innovativen KI-Lösungen.',
  keywords: ['Portfolio', 'Webentwicklung Projekte', 'Referenzen', 'Web Apps', 'React Projekte', 'Next.js Projekte'],
  openGraph: {
    title: 'Portfolio - Referenzprojekte | SwiftGate AI',
    description: 'Entdecken Sie ausgewählte Projekte aus den Bereichen Business, Creative und Tech.',
    url: 'https://swiftgateai.de/portfolio',
    type: 'website',
    locale: 'de_DE',
    siteName: 'SwiftGate AI',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'SwiftGate AI Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Referenzprojekte | SwiftGate AI',
    description: 'Entdecken Sie ausgewählte Projekte aus den Bereichen Business, Creative und Tech.',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: 'https://swiftgateai.de/portfolio',
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
