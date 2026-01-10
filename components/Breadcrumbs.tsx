'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on home page
  if (pathname === '/') return null;

  const paths = pathname.split('/').filter(Boolean);

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    ...paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      const name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      return { name, href };
    }),
  ];

  // Generate JSON-LD structured data for breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://swiftgateai.de${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="breadcrumb-nav">
        <ol className="breadcrumb-list">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <li key={item.href} className="breadcrumb-item">
                {!isLast ? (
                  <>
                    <Link href={item.href} className="breadcrumb-link">
                      {item.name}
                    </Link>
                    <span className="breadcrumb-separator">/</span>
                  </>
                ) : (
                  <span className="breadcrumb-current" aria-current="page">
                    {item.name}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        <style jsx>{`
          .breadcrumb-nav {
            padding: 20px 40px;
            position: relative;
            z-index: 20;
          }

          .breadcrumb-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            list-style: none;
            margin: 0;
            padding: 0;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 14px;
          }

          .breadcrumb-item {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .breadcrumb-link {
            color: rgba(245, 243, 237, 0.6);
            text-decoration: none;
            transition: color 0.2s ease;
          }

          .breadcrumb-link:hover {
            color: rgba(245, 243, 237, 0.9);
          }

          .breadcrumb-separator {
            color: rgba(245, 243, 237, 0.3);
          }

          .breadcrumb-current {
            color: rgba(245, 243, 237, 0.9);
            font-weight: 500;
          }

          @media (max-width: 768px) {
            .breadcrumb-nav {
              padding: 16px 24px;
            }

            .breadcrumb-list {
              font-size: 12px;
            }
          }
        `}</style>
      </nav>
    </>
  );
}
