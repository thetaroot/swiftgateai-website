import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio - Referenzprojekte',
  description: 'Entdecken Sie ausgewählte Projekte aus den Bereichen Business, Creative und Tech. Von modernen Web-Apps bis zu innovativen KI-Lösungen.',
  keywords: ['Portfolio', 'Webentwicklung Projekte', 'Referenzen', 'Web Apps', 'React Projekte', 'Next.js Projekte'],
  openGraph: {
    title: 'Portfolio - Referenzprojekte | SwiftGate AI',
    description: 'Entdecken Sie ausgewählte Projekte aus den Bereichen Business, Creative und Tech.',
    url: 'https://swiftgateai.de/portfolio',
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
