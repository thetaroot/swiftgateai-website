import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://swiftgateai.de'),
  title: {
    default: "SwiftGate AI - Professionelle Webentwicklung & KI-Lösungen",
    template: "%s | SwiftGate AI"
  },
  description: "Full-Service Webentwicklung mit modernsten Technologien. React, Next.js, TypeScript - Von der Beratung bis zum Launch. SEO-optimiert, DSGVO-konform und Performance-first.",
  keywords: ["Webentwicklung", "Web Development", "React", "Next.js", "TypeScript", "SEO", "Performance", "DSGVO", "Full-Service", "Web Design", "Frontend", "Backend", "KI", "AI", "Machine Learning"],
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
    title: 'SwiftGate AI - Professionelle Webentwicklung & KI-Lösungen',
    description: 'Full-Service Webentwicklung mit modernsten Technologien. React, Next.js, TypeScript - Von der Beratung bis zum Launch.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'SwiftGate AI - Professionelle Webentwicklung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwiftGate AI - Professionelle Webentwicklung & KI-Lösungen',
    description: 'Full-Service Webentwicklung mit modernsten Technologien. React, Next.js, TypeScript.',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: 'https://swiftgateai.de',
  },
  verification: {
    // Google Search Console Verification (falls vorhanden)
    // google: 'your-google-verification-code',
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
    description: 'Full-Service Webentwicklung mit modernsten Technologien',
    url: 'https://swiftgateai.de',
    logo: 'https://swiftgateai.de/icon.svg',
    image: 'https://swiftgateai.de/og-image.svg',
    founder: {
      '@type': 'Person',
      name: 'Luis Guenther',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DE',
    },
    sameAs: [
      // Social Media Links können hier hinzugefügt werden
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Beratung & Konzept',
            description: 'Anforderungsanalyse, Technologie-Beratung und Projektplanung',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Design & Entwicklung',
            description: 'Modernes UI/UX Design mit React, Next.js & TypeScript',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Performance & SEO',
            description: 'Core Web Vitals Optimierung und SEO-Optimierung',
          },
        },
      ],
    },
  };

  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#E5E1D8" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={spaceGrotesk.className}>
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
