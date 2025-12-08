// components/schema/ProductDetailSchema.tsx
import { stripHtml } from "@/lib/stripHtml";
import Script from "next/script";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL;
const SITE_NAME =
  "headless";

type WPFeaturedImage = {
  node?: {
    sourceUrl?: string | null;
    altText?: string | null;
  } | null;
};

// adjust this type to match your actual GraphQL shape if needed
type ProductDetailPage = {
  uri: string;
  title?: string | null;
  excerpt?: string | null;
  content?: string | null;
  featuredImage?: WPFeaturedImage | null;

  // OPTIONAL: if you add custom fields for products in WP/ACF
  productFields?: {
    sku?: string | null;
    price?: string | null;
    currency?: string | null; // e.g. "INR"
    inStock?: boolean | null;
    brandName?: string | null;
  } | null;
};

interface ProductDetailSchemaProps {
  page: ProductDetailPage;
  scriptId?: string;
}

/**
 * JSON-LD for a single Product detail page
 */
export function ProductDetailSchema({
  page,
  scriptId = "ld-json-product-detail",
}: ProductDetailSchemaProps) {
  if (!page?.uri) return null;

  const url = SITE_URL && SITE_URL.replace(/\/$/, "") + page.uri;

  const name = page.title ?? "";
  const description =
    stripHtml(page.excerpt) || stripHtml(page.content) || undefined;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    brand: {
      "@type": "Brand",
      name: page.productFields?.brandName || SITE_NAME,
    },
  };

  const img = page.featuredImage?.node?.sourceUrl;
  if (img) {
    schema.image = img;
  }

  // Optional: SKU
  if (page.productFields?.sku) {
    schema.sku = page.productFields.sku;
  }

  // Optional: Offer (price, currency, availability)
  if (page.productFields?.price && page.productFields?.currency) {
    schema.offers = {
      "@type": "Offer",
      url,
      price: page.productFields.price,
      priceCurrency: page.productFields.currency, // "
    
    };
  }

  return (
    <Script
    strategy="beforeInteractive"
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
