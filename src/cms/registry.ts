import BlogBlock from "./sections/BlogBlock";
import Hero from "./sections/Hero";
import ListingBlock from "./sections/ListingBlock";
import TextBlock from "./sections/TextBlock";

export const registry: Record<string, React.ComponentType<any>> = {
  PageBuilderPageLayoutHeroSectionLayout: Hero,
  PageBuilderPageLayoutTextBlockLayout : TextBlock,
  PageBuilderPageLayoutBlogBlockLayout :BlogBlock,
  PageBuilderPageLayoutListingBlockLayout: ListingBlock
  // ...one entry per section
};

