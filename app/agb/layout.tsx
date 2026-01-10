import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AGB - Allgemeine Geschäftsbedingungen',
  description: 'Allgemeine Geschäftsbedingungen von SwiftGate AI.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'AGB - Allgemeine Geschäftsbedingungen | SwiftGate AI',
    description: 'Allgemeine Geschäftsbedingungen von SwiftGate AI.',
    url: 'https://swiftgateai.de/agb',
  },
  alternates: {
    canonical: 'https://swiftgateai.de/agb',
  },
}

export default function AGBLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
