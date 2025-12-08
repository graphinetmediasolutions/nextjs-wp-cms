import { stripHtml } from "@/lib/stripHtml";
import Script from "next/script";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL;

type WPAuthor = {
  node?: {
    name?: string | null;
  } | null;
};

type WPFeaturedImage = {
  node?: {
    sourceUrl?: string | null;
    altText?: string | null;
  } | null;
};

type BlogDetailPage = {
  uri: string;
  title?: string | null;
  date?: string | null;
  modified?: string | null;
  excerpt?: string | null;
  content?: string | null;
  author?: WPAuthor | null;
  featuredImage?: WPFeaturedImage | null;
};

interface BlogDetailSchemaProps {
  page: BlogDetailPage;
  scriptId?: string;
}


/**
 * JSON-LD for a single blog post (BlogPosting)
 */
export function BlogDetailSchema({
  page,
  scriptId = "ld-json-blog-detail",
}: BlogDetailSchemaProps) {
  if (!page?.uri) return null;

  const url =  SITE_URL && SITE_URL.replace(/\/$/, "") + page.uri;

    const description = stripHtml(page.excerpt);

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: page.title ?? "",
    description:description || undefined,
    url,
    datePublished: page.date || undefined,
    dateModified: page.modified || page.date || undefined,
  };

  // author
  const authorName = page.author?.node?.name;
  if (authorName) {
    schema.author = {
      "@type": "Person",
      name: authorName,
    };
  }

  // image
  const img = page.featuredImage?.node?.sourceUrl;
  if (img) {
    schema.image = [img];
  }

  // optional articleBody
  const body = stripHtml(page.content);
  if (body) {
    schema.articleBody = body;
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
