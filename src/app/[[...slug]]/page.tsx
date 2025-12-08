import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { print } from "graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { NodeByUriQuery } from "@/queries/PageQuery";
import PageTemplate from "@/components/Templates/Page/PageTemplate";
import RevalidateButton from "@/components/RevalidateButton";
import { nextSlugToWpSlug } from "@/utils/nextSlugToWpSlug";
import { SeoQuery } from "@/queries/general/SeoQuery";
import { setSeoData } from "@/utils/seoData";
import Hero from "@/components/layout/Hero";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { BlogDetailSchema } from "@/components/schema/BlogDetailSchema";
import { ServiceDetailSchema } from "@/components/schema/ServiceDetailSchema";
import { ProductDetailSchema } from "@/components/schema/ProductDetailSchema";




type Props = {
  params: { slug: string };
};
type PageProps = {
  params: {
    slug?: string[]; // Next gives array for [[...slug]]
  };
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

type PageType = "blogs" | "services" | "products" | "generic";

function getPageType(parts: string[]): PageType {
  const first = parts[0];

  if (first === "blogs") return "blogs";
  if (first === "services") return "services";
  if (first === "products") return "products";

  return "generic";
}

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const parts = await params.slug ?? [];
  const uri = parts.length ? `/${parts.join("/")}/` : "/";

  const pageType = getPageType(parts);

  const isBlogDetailPage = pageType === "blogs" && parts.length >= 2;
   const isServiceDetailPage = pageType === "services" && parts.length >= 2;
   const isProductsDetailPage = pageType === "products" && parts.length >= 2;

   



  const { nodeByUri } = await fetchGraphQL<{ nodeByUri: any }>(
    print(NodeByUriQuery),
    { uri }
  );

  // console.log(nodeByUri);

  if (!nodeByUri || nodeByUri.__typename !== "Page") return notFound();
  const title = nodeByUri?.title || "";
  return (
    <>
      {/* Breadcrumb Schema for every page */}
      <BreadcrumbSchema title={title} slugSegments={parts} />
      {isBlogDetailPage && <BlogDetailSchema page={nodeByUri} />}
       {isServiceDetailPage && <ServiceDetailSchema page={nodeByUri} />}
        {isProductsDetailPage && <ProductDetailSchema page={nodeByUri} />}
      <Hero data={nodeByUri} />
      <main>
        <PageTemplate page={nodeByUri} pageType={pageType} />
      </main>



      <RevalidateButton />
    </>
  );
}


