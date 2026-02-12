import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Bebas_Neue, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: 'swap',
});



export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#E5E1D8',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://swiftgateai.de'),
  title: {
    default: "SwiftGate AI - Webentwicklung & KI-Lösungen | Essen, NRW",
    template: "%s | SwiftGate AI"
  },
  description: "Professionelle Webentwicklung und KI-Integration aus Essen (NRW). Spezialisiert auf React, Next.js und maßgeschneiderte Softwarelösungen für Unternehmen.",
  keywords: [
    "Webentwicklung Essen",
    "Webdesign NRW",
    "Next.js Agentur",
    "React Entwickler",
    "KI Lösungen",
    "Softwareentwicklung",
    "Frontend Development",
    "Fullstack Developer",
    "SwiftGate AI",
    "Luis Guenther"
  ],
  authors: [{ name: "Luis Guenther" }],
  creator: "Luis Guenther",
  publisher: "SwiftGate AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://swiftgateai.de',
    siteName: 'SwiftGate AI',
    title: 'SwiftGate AI - Webentwicklung der nächsten Generation',
    description: 'Wir entwickeln hochperformante Webanwendungen und integrieren KI-Lösungen, die Ihr Business voranbringen.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'SwiftGate AI - Future-Ready Web Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwiftGate AI - Webentwicklung & KI',
    description: 'Maßgeschneiderte Web-Lösungen und KI-Integrationen für moderne Unternehmen.',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: 'https://swiftgateai.de',
  },
  verification: {
    // google: 'verification_token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SwiftGate AI',
    description: 'Full-Service Webentwicklung und KI-Integration.',
    url: 'https://swiftgateai.de',
    logo: 'https://swiftgateai.de/icon.svg',
    image: 'https://swiftgateai.de/og-image.svg',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Essen',
      addressRegion: 'NRW',
      addressCountry: 'DE',
    },
    founder: {
      '@type': 'Person',
      name: 'Luis Guenther',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    sameAs: [
      // 'https://www.linkedin.com/in/luisguenther',
      // 'https://github.com/swiftgateai'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Webentwicklung',
            description: 'Entwicklung moderner Webanwendungen mit Next.js und React.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'KI-Integration',
            description: 'Integration von künstlicher Intelligenz in Geschäftsprozesse.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO & Performance',
            description: 'Suchmaschinenoptimierung und Performance-Tuning.',
          },
        },
      ],
    },
  };

  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${spaceGrotesk.className} ${bebasNeue.variable} ${playfairDisplay.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

