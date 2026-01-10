import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - Full-Service Webentwicklung',
  description: 'Von der Beratung bis zum Support: Konzeption, Design & Entwicklung, Performance & SEO, Security & DSGVO, Hosting & Deployment. Alles aus einer Hand.',
  keywords: ['Webentwicklung Services', 'Web Design', 'SEO Optimierung', 'DSGVO', 'React Development', 'Next.js', 'TypeScript', 'Hosting', 'Web Performance'],
  openGraph: {
    title: 'Services - Full-Service Webentwicklung | SwiftGate AI',
    description: 'Von der Beratung bis zum Support: Konzeption, Design & Entwicklung, Performance & SEO, Security & DSGVO, Hosting & Deployment.',
    url: 'https://swiftgateai.de/services',
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
