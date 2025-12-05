

import Script from "next/script";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ;

interface BreadcrumbSchemaProps {
  title: string;           // real page title (from WP)
  slugSegments: string[];  // params.slug
}

export function BreadcrumbSchema({ title, slugSegments }: BreadcrumbSchemaProps) {
  const itemListElement: any[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
  ];

  // Home page → only 1 breadcrumb
  if (!slugSegments || slugSegments.length === 0) {
    return (
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement,
          }),
        }}
      />
    );
  }

  let currentPath = "";

  slugSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === slugSegments.length - 1;

    const prettyName = decodeURIComponent(segment)
      .replace(/-/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const name = isLast ? title || prettyName : prettyName;

    itemListElement.push({
      "@type": "ListItem",
      position: index + 2,
      name,
      item: `${BASE_URL}${currentPath}`,
    });
  });

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement,
        }),
      }}
    />
  );
}
