
import { stripHtml } from "@/lib/stripHtml";
import Script from "next/script";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL;

type ChildPage = {
 
  title?: string | null;
  uri?: string | null;
  excerpt?: string | null;
  image?: string | undefined;
};

type ListingBlock = {
  heading?: string | null;
  items?: ChildPage[] | null;
};

interface ServiceListingSchemaProps {
  block: ListingBlock;
  scriptId?: string;
}

/**
 * Services listing JSON-LD
 * ItemList of Service
 */
export function ServiceListingSchema({
  block,
  scriptId = "ld-json-service-listing",
}: ServiceListingSchemaProps) {
  const services = block?.items ?? [];
  if (!services.length) return null;

  const itemListElement = services.map((service, index) => {
    const url = service.uri && SITE_URL
      ? SITE_URL.replace(/\/$/, "") + service.uri
      : SITE_URL;

    const description = stripHtml(service?.excerpt);



    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title ?? "",
        url,
        ...(description && { description }),
        ...(service.image && {
          image: service.image,
        }),
      },
    };
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: block.heading ?? "Services",
    itemListElement,
  };

  return (
    <Script
    strategy="beforeInteractive"
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
