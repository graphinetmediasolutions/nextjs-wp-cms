// import BlogSection from "@/components/blog/BlogSection.server";
import BlogSection from "@/components/blog/BlogSection";
import Section from "@/components/primitives/Section";
import { mapBlogBlock } from "@/lib/mappers/mapBlogBlock";

export default function BlogBlock({ data }: { data: any }) {
  const block = mapBlogBlock(data);

  console.log("BlogBlock data:", block);

  return (
    <Section

      className={block?.cssClass || ""}
      sectionWidth={block?.sectionWidth}


    >
      {block.heading && (
        <h2 className="text-3xl font-bold mb-4">{block.heading}</h2>
      )}
      {block.subheading && (
        <p className="text-gray-600 mb-8">{block.subheading}</p>
      )}

      <BlogSection
        items={block.items}
        isSlider={block.isSlider}
        layout={block.layout}
        perView={block.displayPerRow ?? 3}
        perScroll={block.sliderPerScroll ?? 1}
        autoplay={Number(block.sliderSpeed) || 4000}
      />

      {block.actionButtonText && (
        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition"
          >
            {block.actionButtonText}
          </a>
        </div>
      )}
    </Section>

  );
}
