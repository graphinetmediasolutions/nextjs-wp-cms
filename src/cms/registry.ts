
import Hero from "./sections/Hero";
import TextBlock from "./sections/TextBlock";

export const registry: Record<string, React.ComponentType<any>> = {
  PageBuilderPageLayoutHeroSectionLayout: Hero,
  PageBuilderPageLayoutTextBlockLayout : TextBlock,
  // ...one entry per section
};

