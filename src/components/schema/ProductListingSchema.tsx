// components/schema/ProductListingSchema.tsx
import { stripHtml } from "@/lib/stripHtml";
import Script from "next/script";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL;

type ChildPage = {
 
  title?: string | null;
  uri?: string | null;
  excerpt?: string | null;
  image?: string | null;
};

type ListingBlock = {
  heading?: string | null;
  items?: ChildPage[] | null;
};

interface ProductListingSchemaProps {
  block: ListingBlock;
  scriptId?: string;
}

/**
 * Products listing JSON-LD
 * ItemList → ListItem → Product
 */
export function ProductListingSchema({
  block,
  scriptId = "ld-json-product-listing",
}: ProductListingSchemaProps) {
  const products = block?.items ?? [];
  if (!products.length) return null;

  const itemListElement = products.map((product, index) => {
    const url = product.uri &&  SITE_URL
      ? SITE_URL.replace(/\/$/, "") + product.uri
      : SITE_URL;

    const description = stripHtml(product.excerpt);

    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.title ?? "",
        url,
        ...(description && { description }),
        ...(product.image && {
          image: product.image,
        }),
        // 👉 If later you have price fields in WP, we can add "offers" here.
      },
    };
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: block.heading ?? "Products",
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
