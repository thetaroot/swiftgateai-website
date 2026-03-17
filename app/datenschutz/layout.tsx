import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung und Informationen zum Datenschutz bei SwiftGate AI.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Datenschutzerklärung | SwiftGate AI',
    description: 'Datenschutzerklärung und Informationen zum Datenschutz.',
    url: 'https://swiftgateai.de/datenschutz',
  },
  alternates: {
    canonical: 'https://swiftgateai.de/datenschutz',
  },
}

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
