// components/blog/BlogSection.tsx
import type { BlogBlockData } from "@/lib/mappers/mapBlogBlock";
import BlogGridLayout1 from "./layouts/BlogGridLayout1";
import BlogGridLayout2 from "./layouts/BlogGridLayout2";
import BlogGridLayout3 from "./layouts/BlogGridLayout3";
import BlogCarouselLayout1 from "./layouts/BlogCarouselLayout1";
import BlogCarouselLayout2 from "./layouts/BlogCarouselLayout2";
import BlogCarouselLayout3 from "./layouts/BlogCarouselLayout3";

export default function BlogSection({ block }: { block: BlogBlockData }) {
  const { items, isSlider, layout } = block;
  if (!items?.length) return null;

  if (isSlider) {
    switch (layout) {
      case "Layout 2": return <BlogCarouselLayout2 block={block} />;
      case "Layout 3": return <BlogCarouselLayout3 block={block} />;
      default:         return <BlogCarouselLayout1 block={block} />;
    }
  }

  switch (layout) {
    case "Layout 2": return <BlogGridLayout2 block={block} />;
    case "Layout 3": return <BlogGridLayout3 block={block} />;
    default:         return <BlogGridLayout1 block={block} />;
  }
}
