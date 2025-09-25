
import BlogBlock from "./sections/blogs/BlogBlock";
import Hero from "./sections/Hero";
import TextBlock from "./sections/TextBlock";

export const registry: Record<string, React.ComponentType<any>> = {
  PageBuilderPageLayoutHeroSectionLayout: Hero,
  PageBuilderPageLayoutTextBlockLayout : TextBlock,
  PageBuilderPageLayoutBlogBlockLayout :BlogBlock
  // ...one entry per section
};

