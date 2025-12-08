// components/blog/BlogBlock.tsx
import ListingSection from "@/components/listing/ListingSection";
import Section from "@/components/primitives/Section";

import { BlogListingSchema } from "@/components/schema/BlogListingSchema";
import { ProductListingSchema } from "@/components/schema/ProductListingSchema";
import { ServiceListingSchema } from "@/components/schema/ServiceListingSchema";


// import { mapBlogBlock, type BlogBlockData } from "@/lib/mappers/mapBlogBlock";
import { mapListingBlock, WPListingBlockCMS, type ListingBlockData } from "@/lib/mappers/mapListingBlock";

export default function ListingBlock({ data, pageType }: { data: WPListingBlockCMS, pageType: string }) {
  const block = mapListingBlock(data);

  console.log("listing bllcok", pageType)
  const isBlogListing = pageType === "blogs";
  const isServiceListing = pageType === "services";
  const isPrdouctsListing = pageType === "products";


  return (
    <>
      {isBlogListing && <BlogListingSchema block={block} />}
      {isServiceListing && <ServiceListingSchema block={block} />}
      {isPrdouctsListing && <ProductListingSchema  block={block} />}

      <Section className={`${block.cssClass || ""} overflow-x-hidden`} sectionWidth={block.sectionWidth} backgroundColor={block.backgroundColor || 'transparent'} backgroundImageUrl={block?.backgroundImage} backgroundImageAlt={block?.backgroundImageAlt}>
        <ListingSection block={block} />
      </Section>
    </>
  );
}
