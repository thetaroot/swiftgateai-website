import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über SwiftGate AI',
  description: 'Erfahren Sie mehr über SwiftGate AI - Ihr Partner für professionelle Webentwicklung und innovative KI-Lösungen.',
  keywords: ['Über uns', 'SwiftGate AI', 'Webentwicklung Team', 'KI Entwicklung'],
  openGraph: {
    title: 'Über SwiftGate AI | Professionelle Webentwicklung',
    description: 'Erfahren Sie mehr über SwiftGate AI - Ihr Partner für professionelle Webentwicklung und innovative KI-Lösungen.',
    url: 'https://swiftgateai.de/about',
  },
  alternates: {
    canonical: 'https://swiftgateai.de/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
