import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech & KI - Innovative Technologie-Lösungen',
  description: 'Modernste Technologie und KI-gestützte Lösungen. Von Machine Learning bis zu APIs und Cloud-Integration.',
  keywords: ['KI Lösungen', 'Tech Stack', 'Machine Learning', 'API Integration', 'Cloud Solutions'],
  openGraph: {
    title: 'Tech & KI - Innovative Technologie-Lösungen | SwiftGate AI',
    description: 'Modernste Technologie und KI-gestützte Lösungen. Von Machine Learning bis zu APIs.',
    url: 'https://swiftgateai.de/tech',
  },
  alternates: {
    canonical: 'https://swiftgateai.de/tech',
  },
}

export default function TechLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
