
import { stripHtml } from "@/lib/stripHtml";
import Script from "next/script";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL;
const SITE_NAME = "Headless";

type WPFeaturedImage = {
  node?: {
    sourceUrl?: string | null;
    altText?: string | null;
  } | null;
};

type ServiceDetailPage = {
  uri: string;
  title?: string | null;
  excerpt?: string | null;
  content?: string | null;
  featuredImage?: WPFeaturedImage | null;
};

interface ServiceDetailSchemaProps {
  page: ServiceDetailPage;
  scriptId?: string;
}

/**
 * JSON-LD for a single Service detail page
 */
export function ServiceDetailSchema({
  page,
  scriptId = "ld-json-service-detail",
}: ServiceDetailSchemaProps) {
  if (!page?.uri) return null;

  const url = SITE_URL && SITE_URL.replace(/\/$/, "") + page.uri;

  const name = page.title ?? "";
  const description =
    stripHtml(page.excerpt) || stripHtml(page.content) || undefined;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const img = page.featuredImage?.node?.sourceUrl;
  if (img) {
    schema.image = img;
  }

  return (
    <Script
      id={scriptId}
      strategy="beforeInteractive"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
