import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und rechtliche Informationen zu SwiftGate AI.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Impressum | SwiftGate AI',
    description: 'Impressum und rechtliche Informationen zu SwiftGate AI.',
    url: 'https://swiftgateai.de/impressum',
  },
  alternates: {
    canonical: 'https://swiftgateai.de/impressum',
  },
}

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
