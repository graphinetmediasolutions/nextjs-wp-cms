// src/components/schema/BlogListingSchema.tsx
import Script from "next/script";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL;

type ChildPage = {
 
  title?: string | null;
  slug?: string | null;
  uri?: string | null;
  date?: string | null;
  excerpt?: string | null;
  image?: string| null;
  authorName?: string | null;
};

type ListingBlock = {
  heading?: string | null;
  items?: ChildPage[] | null;
};

interface BlogListingSchemaProps {
  block: ListingBlock;
  scriptId?: string; // optional custom id
}

/**
 * Blog listing JSON-LD (ItemList of BlogPosting)
 */
export function BlogListingSchema({
  block,
  scriptId = "ld-json-blog-listing",
}: BlogListingSchemaProps) {

    console.log("blog listig schema", block)
  const posts = block.items ?? [];
  if (!posts.length) return null;

  const itemListElement = posts.map((post, index) => {
    const url = post.uri && SITE_URL
      ? SITE_URL.replace(/\/$/, "") + post.uri
      : SITE_URL;

    return {
      "@type": "ListItem",
      position: index + 1,
      url,
      name: post.title ?? "",
      // Optional extra info for search engines:
      ...(post.date && { datePublished: post.date }),
      ...(post.authorName && {
        author: {
          "@type": "Person",
          name: post.authorName,
        },
      }),
      ...(post?.image && {
        image: post?.image,
      }),
    };
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: block.heading ?? "Blog Listing",
    itemListElement,
  };

  return (
    <Script
    strategy="beforeInteractive"
      id={scriptId}
      type="application/ld+json"
      // server component is fine, no need for next/script here
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
