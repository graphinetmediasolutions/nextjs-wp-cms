import BlogBlock from "./sections/BlogBlock";
import CTABlock from "./sections/CTABlock";
import FaqBlock from "./sections/FaqBlock";
import FeaturesBlock from "./sections/FeaturesBlock";
import Hero from "./sections/Hero";
import ListingBlock from "./sections/ListingBlock";
import TeamsBlock from "./sections/TeamsBlock";
import TestimonialsBlock from "./sections/TestimonialsBlock";
import TextBlock from "./sections/TextBlock";
import TimelineBlock from "./sections/TimelineBlock";

export const registry: Record<string, React.ComponentType<any>> = {
  PageBuilderPageLayoutHeroSectionLayout: Hero,
  PageBuilderPageLayoutTextBlockLayout : TextBlock,
  PageBuilderPageLayoutBlogBlockLayout :BlogBlock,
  PageBuilderPageLayoutListingBlockLayout: ListingBlock,
   PageBuilderPageLayoutTestimonialBlockLayout : TestimonialsBlock,
  PageBuilderPageLayoutTeamBlockLayout :  TeamsBlock,
  PageBuilderPageLayoutCtaSectionLayout : CTABlock,
  PageBuilderPageLayoutFaqSectionLayout : FaqBlock,
  PageBuilderPageLayoutFeatureListLayout : FeaturesBlock,
  PageBuilderPageLayoutTimelineBlockLayout :TimelineBlock
  // ...one entry per section
};

