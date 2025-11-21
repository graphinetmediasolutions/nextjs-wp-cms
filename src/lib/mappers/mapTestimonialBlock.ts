

type WPTestimonialImageNode = {
  sourceUrl?: string | null;
};
export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type WPTestimonialImage = {
  node?: WPTestimonialImageNode | null;
  
};

type WPBackgroundImageNode = {
  sourceUrl?: string | null;
};

type WPBackgroundImage = {
  node?: WPBackgroundImageNode | null;
};

type WPTestimonial = {
  testimonialName?: string | null;
  testimonialRole?: string | null;
  testimonialQuote?: string | null;
  testimonialImage?: WPTestimonialImage | null;
  imageAlt?: string | null;
  testimonialVideoUrl?: string | null;
};

export type WPTestimonialBlockCMS = {
  heading?: string | null;
  headingTag?: string | null;
  headingPosition?: string[] | null;

  subheading?: string | null;
  subheadingPosition?: string[] | null;

  description?: string | null;

  layout?: string[] | string | null;
  displayPerRow?: number | string | null;
  showPost?: number | string | null;

  isSlider?: boolean | null;
  autoplay?: boolean | null;
  showArrow?: boolean | null;
  showBullets?: boolean | null;
  sliderPerScroll?: number | string | null;
  sliderSpeed?: number | string | null;
  loopForSlider?: boolean | null;

  actionButtonLabel?: string | null;
  actionButtonUrl?: string | null;
  sectionWidth?: string | string[] | null;
  cssClass?: string | null;
  backgroundColor?: string | null;
  backgroundImage?: WPBackgroundImage | null;

  testimonials?: WPTestimonial[] | null;
};

// ---- Public render types ----

export type TestimonialItem = {
  name: string;
  role?: string;
  quote: string;
  image?: string;
  imageAlt?: string | "";
  videoUrl?: string;
};

export type TestimonialBlockData = {
  heading?: string;
  headingTag?: string;
  headingPosition?: string[];

  subheading?: string;
  subheadingPosition?: string[];

  description?: string;

  cssClass?: string;
  backgroundColor?: string;
  backgroundImage?: string;

  isSlider: boolean;
  layout: string;
  loopForSlider: boolean;

  displayPerRow: number;
  displayPerPage: number;
  sliderPerScroll: number;
  sliderSpeed: number;
  autoplay: boolean;

  showBullets: boolean;
  showArrow: boolean;

  sectionWidth?: string | string[] | null;
  actionButtonText?: string;
  actionButtonUrl?:string;

  items: TestimonialItem[];
};

// ---- Helpers ----

function toNumber(n: unknown, fallback: number): number {
  const num =
    typeof n === "string"
      ? Number(n)
      : typeof n === "number"
      ? n
      : NaN;

  return Number.isFinite(num) ? num : fallback;
}

// ---- Mapper ----

export function mapTestimonialBlock(
  cmsBlock: WPTestimonialBlockCMS
): TestimonialBlockData {
  // 1) Map testimonials into TestimonialItem[]
  const items: TestimonialItem[] = (cmsBlock.testimonials ?? [])
    .filter((t): t is WPTestimonial => Boolean(t))
    .map((t) => ({
      name: t.testimonialName ?? "",
      role: t.testimonialRole ?? "",
      quote: t.testimonialQuote ?? "",
      image: t.testimonialImage?.node?.sourceUrl ?? undefined,
      videoUrl: t.testimonialVideoUrl ?? undefined,
     imageAlt: t.imageAlt ?? ""
    }))
    // keep only items that at least have a name or quote
    .filter((item) => item.name || item.quote);

  // 2) Normalize layout: support string or string[]
  const rawLayout = cmsBlock.layout;
  const layout =
    Array.isArray(rawLayout) ? (rawLayout[0] ?? "") : (rawLayout ?? "");

  // 3) Background image URL
  const backgroundImage =
    cmsBlock.backgroundImage?.node?.sourceUrl ?? undefined;

  // 4) Build final block
  const block: TestimonialBlockData = {
    heading: cmsBlock.heading ?? "",
    headingTag: cmsBlock.headingTag ?? "",
    headingPosition: cmsBlock.headingPosition ?? [],

    subheading: cmsBlock.subheading ?? "",
    subheadingPosition: cmsBlock.subheadingPosition ?? [],

    description: cmsBlock.description ?? "",

    cssClass: cmsBlock.cssClass ?? "",
    backgroundColor: cmsBlock.backgroundColor ?? "transparent",
    backgroundImage,

    isSlider: Boolean(cmsBlock.isSlider),
    loopForSlider: Boolean(cmsBlock.loopForSlider),
    layout,

    displayPerRow: toNumber(cmsBlock.displayPerRow, 3),
    displayPerPage: toNumber(cmsBlock.showPost, 6),

    sliderPerScroll: toNumber(cmsBlock.sliderPerScroll, 1),
    sliderSpeed: toNumber(cmsBlock.sliderSpeed, 4000),
    autoplay: Boolean(cmsBlock.autoplay),

    showBullets: Boolean(cmsBlock.showBullets),
    showArrow: Boolean(cmsBlock.showArrow),

    sectionWidth: cmsBlock.sectionWidth ?? "Box Width",
    actionButtonText: cmsBlock.actionButtonLabel ?? "",
    actionButtonUrl : cmsBlock?.actionButtonUrl ?? "",

    items,
  };

  return block;
}
