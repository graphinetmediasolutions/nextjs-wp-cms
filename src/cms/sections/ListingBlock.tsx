// components/blog/BlogBlock.tsx
import ListingSection from "@/components/listing/ListingSection";
import Section from "@/components/primitives/Section";


// import { mapBlogBlock, type BlogBlockData } from "@/lib/mappers/mapBlogBlock";
import { mapListingBlock, type ListingBlockData } from "@/lib/mappers/mapListingBlock";

export default function ListingBlock({ data }: { data: ListingBlockData }) {
  const block = mapListingBlock(data);

  return (
    <Section className={`${block.cssClass || ""} overflow-x-hidden`} sectionWidth={block.sectionWidth} backgroundColor={block.backgroundColor || 'transparent'}>
      <ListingSection  block={block} />
    </Section>
  );
}
