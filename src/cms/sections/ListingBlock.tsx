// components/blog/BlogBlock.tsx
import ListingSection from "@/components/listing/ListingSection";
import Section from "@/components/primitives/Section";


// import { mapBlogBlock, type BlogBlockData } from "@/lib/mappers/mapBlogBlock";
import { mapListingBlock, WPListingBlockCMS, type ListingBlockData } from "@/lib/mappers/mapListingBlock";

export default function ListingBlock({ data }: { data: WPListingBlockCMS }) {
  const block = mapListingBlock(data);

  // console.log("blog data", block)

  return (
    <Section className={`${block.cssClass || ""} overflow-x-hidden`} sectionWidth={block.sectionWidth} backgroundColor={block.backgroundColor || 'transparent'} backgroundImageUrl={block?.backgroundImage} backgroundImageAlt={block?.backgroundImageAlt}>
      <ListingSection  block={block} />
    </Section>
  );
}
