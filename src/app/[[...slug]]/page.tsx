import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { print } from "graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
// import { NodeByUriQuery } from "@/components/Templates/Page/PageQuery";
// import PageTemplate from "@/components/Templates/Page/PageTemplate";
import { NodeByUriQuery } from "@/components/Templates/Page/PageQuery";
import PageTemplate from "@/components/Templates/Page/PageTemplate";
import RevalidateButton from "@/components/RevalidateButton";
import { nextSlugToWpSlug } from "@/utils/nextSlugToWpSlug";
import { SeoQuery } from "@/queries/general/SeoQuery";
import { setSeoData } from "@/utils/seoData";
import { BlogSwiper } from "@/cms/sections/blogs/BlogSlider";

const dummyBlogs = [
  {
    blogDate: "Sep 24, 2025",
    blogExcerpt: "This is a short excerpt from the first blog post. It gives a teaser of the content.",
    blogSlug: "first-post",
    blogTitle: "Getting Started with Next.js and Tailwind",
    blogAuthor: "John Doe",
    blogImage: {
      node: {
        sourceUrl: "https://picsum.photos/600/400?random=1",
      },
    },
  },
  {
    blogDate: "Sep 20, 2025",
    blogExcerpt: "Learn how to use GraphQL with Apollo Client in a Next.js app.",
    blogSlug: "graphql-apollo-next",
    blogTitle: "GraphQL + Apollo in Next.js",
    blogAuthor: "Jane Smith",
    blogImage: {
      node: {
        sourceUrl: "https://picsum.photos/600/400?random=2",
      },
    },
  },
  {
    blogDate: "Sep 15, 2025",
    blogExcerpt: "A deep dive into Tailwind CSS v4 and how to customize it with CSS variables.",
    blogSlug: "tailwind-v4",
    blogTitle: "Mastering Tailwind v4",
    blogAuthor: "Alex Carter",
    blogImage: {
      node: {
        sourceUrl: "https://picsum.photos/600/400?random=3",
      },
    },
  },
  {
    blogDate: "Sep 10, 2025",
    blogExcerpt: "Explore the power of shadcn/ui and how it integrates with your design system.",
    blogSlug: "shadcn-ui-guide",
    blogTitle: "shadcn/ui Complete Guide",
    blogAuthor: "Maria Lopez",
    blogImage: {
      node: {
        sourceUrl: "https://picsum.photos/600/400?random=4",
      },
    },
  },
];

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = nextSlugToWpSlug(params.slug);
  const isPreview = slug.includes("preview");

  const { contentNode } = await fetchGraphQL<{ contentNode: any }>(
    print(SeoQuery),
    {
      slug: isPreview ? slug.split("preview/")[1] : slug,
      idType: isPreview ? "DATABASE_ID" : "URI",
    },
  );

  if (!contentNode) {
    return notFound();
  }

  const metadata = setSeoData({ seo: contentNode.seo });

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${slug}`,
    },
  } as Metadata;
}


export function generateStaticParams(): { slug?: string[] }[] {
  // optional, but nice to pre-render "/"
  return [{ slug: [] }];
}

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const parts = await params.slug ?? [];
  const uri = parts.length ? `/${parts.join("/")}/` : "/";

  const { nodeByUri } = await fetchGraphQL<{ nodeByUri: any }>(
    print(NodeByUriQuery),
    { uri }
  );

  if (!nodeByUri || nodeByUri.__typename !== "Page") return notFound();
  return (
    <>
      <PageTemplate page={nodeByUri} />
       <BlogSwiper
        items={dummyBlogs}
        perView={3}       // 3 per row on desktop
        perScroll={1}     // scroll 1 per swipe
        loop={false}
        autoplay={false}   // 4s autoplay
      />
      <RevalidateButton />
    </>
  );
}


