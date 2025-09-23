// // import ContentBlock from "./sections/ContentBlock";
// // import ContentWithImage from "./sections/ContentWithImage";

// // import Hero from "./sections/Hero";


// export const loaders: Record<
//   string,
//   () => Promise<{ default: React.ComponentType<any> }>
// > = {
//   PageBuliderPageLayoutContentBlockLayout: () => import("./sections/ContentBlock"),
//   PageBuliderPageLayoutContentWithImageLayout: () => import("./sections/ContentWithImage"),
//   PageBuilderPageLayoutHeroSectionLayout: () => import("./sections/Hero"),
//   // ...one entry per section
// };



import ContentBlock from "./sections/ContentBlock";
import ContentWithImage from "./sections/ContentWithImage";
import Hero from "./sections/Hero";
import TextBlock from "./sections/TextBlock";

export const registry: Record<string, React.ComponentType<any>> = {
  PageBuliderPageLayoutContentBlockLayout: ContentBlock,
  PageBuliderPageLayoutContentWithImageLayout: ContentWithImage,
  PageBuilderPageLayoutHeroSectionLayout: Hero,
  PageBuilderPageLayoutTextBlockLayout : TextBlock,
  // ...one entry per section
};

