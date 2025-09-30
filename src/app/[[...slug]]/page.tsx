import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { print } from "graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
// import { NodeByUriQuery } from "@/components/Templates/Page/PageQuery";
// import PageTemplate from "@/components/Templates/Page/PageTemplate";
import { NodeByUriQuery } from "@/queries/PageQuery";
import PageTemplate from "@/components/Templates/Page/PageTemplate";
import RevalidateButton from "@/components/RevalidateButton";
import { nextSlugToWpSlug } from "@/utils/nextSlugToWpSlug";
import { SeoQuery } from "@/queries/general/SeoQuery";
import { setSeoData } from "@/utils/seoData";



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

    
      {/* <RevalidateButton /> */}
    </>
  );
}


