import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt - Projekt anfragen',
  description: 'Lassen Sie uns Ihr nächstes Projekt besprechen. Kontaktieren Sie SwiftGate AI für professionelle Webentwicklung und maßgeschneiderte Lösungen.',
  keywords: ['Kontakt', 'Projekt anfragen', 'Webentwicklung Anfrage', 'Beratung'],
  openGraph: {
    title: 'Kontakt - Projekt anfragen | SwiftGate AI',
    description: 'Lassen Sie uns Ihr nächstes Projekt besprechen. Kontaktieren Sie SwiftGate AI für professionelle Webentwicklung.',
    url: 'https://swiftgateai.de/kontakt',
  },
  alternates: {
    canonical: 'https://swiftgateai.de/kontakt',
  },
}

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
