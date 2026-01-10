import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Lösungen - Professionelle Web-Apps',
  description: 'Maßgeschneiderte Business-Lösungen und Web-Applikationen für Unternehmen. Skalierbar, sicher und performant.',
  keywords: ['Business Web Apps', 'Enterprise Lösungen', 'B2B Software', 'Geschäftsanwendungen'],
  openGraph: {
    title: 'Business Lösungen - Professionelle Web-Apps | SwiftGate AI',
    description: 'Maßgeschneiderte Business-Lösungen und Web-Applikationen für Unternehmen.',
    url: 'https://swiftgateai.de/business',
  },
  alternates: {
    canonical: 'https://swiftgateai.de/business',
  },
}

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
