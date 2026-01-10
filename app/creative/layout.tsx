import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creative Projects - Innovative Web-Erlebnisse',
  description: 'Kreative und innovative Web-Projekte mit beeindruckenden Animationen und interaktiven Elementen.',
  keywords: ['Creative Web Design', 'Interaktive Websites', 'Web Animationen', 'Kreative Projekte'],
  openGraph: {
    title: 'Creative Projects - Innovative Web-Erlebnisse | SwiftGate AI',
    description: 'Kreative und innovative Web-Projekte mit beeindruckenden Animationen und interaktiven Elementen.',
    url: 'https://swiftgateai.de/creative',
  },
  alternates: {
    canonical: 'https://swiftgateai.de/creative',
  },
}

export default function CreativeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
