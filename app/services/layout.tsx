import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - Full-Service Webentwicklung',
  description: 'Von der Beratung bis zum Support: Konzeption, Design & Entwicklung, Performance & SEO, Security & DSGVO, Hosting & Deployment. Alles aus einer Hand.',
  keywords: ['Webentwicklung Services', 'Web Design', 'SEO Optimierung', 'DSGVO', 'React Development', 'Next.js', 'TypeScript', 'Hosting', 'Web Performance'],
  openGraph: {
    title: 'Services - Full-Service Webentwicklung | SwiftGate AI',
    description: 'Von der Beratung bis zum Support: Konzeption, Design & Entwicklung, Performance & SEO, Security & DSGVO, Hosting & Deployment.',
    url: 'https://swiftgateai.de/services',
    type: 'website',
    locale: 'de_DE',
    siteName: 'SwiftGate AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SwiftGate AI Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services - Full-Service Webentwicklung | SwiftGate AI',
    description: 'Von der Beratung bis zum Support: Konzeption, Design & Entwicklung, Performance & SEO, Security & DSGVO, Hosting & Deployment.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://swiftgateai.de/services',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
