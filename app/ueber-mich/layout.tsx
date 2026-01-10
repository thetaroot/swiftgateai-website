import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über mich - Luis Guenther',
  description: 'Luis Guenther - Full-Stack Webentwickler mit Leidenschaft für moderne Technologien und persönlichen Service. Von der Idee bis zum Launch - alles aus einer Hand.',
  keywords: ['Luis Guenther', 'Webentwickler', 'Full-Stack Developer', 'Portfolio', 'Über mich'],
  openGraph: {
    title: 'Über mich - Luis Guenther | SwiftGate AI',
    description: 'Full-Stack Webentwickler mit Leidenschaft für moderne Technologien und persönlichen Service.',
    url: 'https://swiftgateai.de/ueber-mich',
    images: [
      {
        url: '/pictures/portrait.jpg',
        width: 800,
        height: 800,
        alt: 'Luis Guenther - Webentwickler',
      },
    ],
  },
  alternates: {
    canonical: 'https://swiftgateai.de/ueber-mich',
  },
}

export default function UeberMichLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
