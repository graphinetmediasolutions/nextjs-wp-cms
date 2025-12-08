// components/blog/BlogBlock.tsx
import Section from "@/components/primitives/Section";

import BlogSection from "@/components/blog/BlogSection";
import { mapBlogBlock, type BlogBlockData } from "@/lib/mappers/mapBlogBlock";

export default function BlogBlock({ data }: { data: BlogBlockData }) {
  const block = mapBlogBlock(data);
  

  return (
    <Section className={`${block.cssClass || ""} overflow-x-hidden`} sectionWidth={block.sectionWidth} backgroundColor={block.backgroundColor || 'transparent'}>
      {/* {block.heading && <h2 className="text-3xl font-bold mb-4">{block.heading}</h2>}
      {block.subheading && <p className="text-gray-600 mb-8">{block.subheading}</p>} */}

      {/* 👇 single stable prop */}
      <BlogSection block={block} />

   
    </Section>
  );
}
