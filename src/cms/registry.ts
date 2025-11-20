import BlogBlock from "./sections/BlogBlock";
import Hero from "./sections/Hero";
import ListingBlock from "./sections/ListingBlock";
import TestimonialsBlock from "./sections/TestimonialsBlock";
import TextBlock from "./sections/TextBlock";

export const registry: Record<string, React.ComponentType<any>> = {
  PageBuilderPageLayoutHeroSectionLayout: Hero,
  PageBuilderPageLayoutTextBlockLayout : TextBlock,
  PageBuilderPageLayoutBlogBlockLayout :BlogBlock,
  PageBuilderPageLayoutListingBlockLayout: ListingBlock,
   PageBuilderPageLayoutTestimonialBlockLayout : TestimonialsBlock
  // ...one entry per section
};

