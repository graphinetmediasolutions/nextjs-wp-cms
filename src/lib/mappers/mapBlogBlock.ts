// lib/mappers/mapBlogBlock.ts

// ---- CMS response shapes (narrow: only what we use) ----
type WPUserNode = { name?: string | null };
type WPAuthor = { node?: WPUserNode | null };

type WPChildPage = {
  slug?: string | null;
  title?: string | null;
  uri?: string | null;
  date?: string | null;
  excerpt?: string | null;
  author?: WPAuthor | null;
  featuredImage?: { node?: { sourceUrl?: string | null; altText?: string | null } | null } | null;
};

type WPParentPageNode = {
  id?: string | null;
  uri?: string | null;
};

type WPEdge<T> = { node?: T | null } | null;

type WPBlogBlockCMS = {
  heading?: string | null;
  subheading?: string | null;
  cssClass?: string | null;
  backgroundColor?: string | null;

  isSlider?: boolean | null;
  loopForSlider?: boolean | null;
  layout?: string[] | string | null;

  displayPerRow?: number | string | null;
  showPost?: number | string | null;

  sliderPerScroll?: number | string | null;
  sliderSpeed?: number | string | null;
  autoplay?: boolean | null;

  showAuthor?: boolean | null;
  showDate?: boolean | null;
  showArrow?: boolean | null;
  showBullets?: boolean | null;

  pagination?: boolean | null;
  actionButtonLabel?: string | null;
  sectionWidth?: string | string[] | null;

  childPages?: WPChildPage[] | null;
  parentPage?: { edges?: WPEdge<WPParentPageNode>[] | null } | null;
};

// ---- Public render types ----
export type BlogItem = {
  slug: string;
  title: string;
  uri?: string;
  date?: string;
  authorName?: string;
  image?: string;
  alt?: string;
  link?: string;
  excerpt?: string;
};

export type ParentPage = {
  id: string;
  uri: string;
};

export type BlogBlockData = {
  heading?: string;
  subheading?: string;
  cssClass?: string;
  backgroundColor?: string;

  // layout + mode
  isSlider: boolean;
  layout: "Layout 1" | "Layout 2" | "Layout 3";
  loopForSlider: boolean;

  // grid/slider config
  displayPerRow: number;
  displayPerPage: number;
  sliderPerScroll: number;
  sliderSpeed: number;
  autoplay: boolean;

  showAuthor: boolean;
  showDate: boolean;
  showArrow: boolean;
  showBullets: boolean;

  pagination: boolean;

  sectionWidth?: string | string[] | null;

  items: BlogItem[];
  actionButtonText?: string;

  parentPages?: ParentPage[];
};

// ---- Helpers ----
function toNumber(n: unknown, fallback: number): number {
  const num =
    typeof n === "string" ? Number(n) :
      typeof n === "number" ? n : NaN;
  return Number.isFinite(num) ? num : fallback;
}

// EXACT layout value from string or first element of array
export function normalizeLayout(
  layout?: string[] | string | null
): "Layout 1" | "Layout 2" | "Layout 3" {
  let v = "";
  if (Array.isArray(layout) && layout.length > 0) v = layout[0] ?? "";
  else if (typeof layout === "string") v = layout;

  switch (v) {
    case "Layout 2": return "Layout 2";
    case "Layout 3": return "Layout 3";
    case "Layout 1":
    default: return "Layout 1";
  }
}

// ---- Mapper ----
export function mapBlogBlock(cmsBlock: WPBlogBlockCMS): BlogBlockData {
  // Map child pages into BlogItem[]
  const blogItems: BlogItem[] = (cmsBlock.childPages ?? [])
    .filter((maybeChildPage): maybeChildPage is WPChildPage => Boolean(maybeChildPage))
    .map((childPage) => ({
      slug: childPage.slug ?? "",
      title: childPage.title ?? "",
      uri: childPage.uri ?? "",
      date: childPage.date ?? "",
      excerpt: childPage.excerpt ?? "",
      authorName: childPage.author?.node?.name ?? "",
      image: childPage.featuredImage?.node?.sourceUrl ?? undefined, // ✅ Added featured image URL
      alt: childPage.featuredImage?.node?.altText ?? "",             // ✅ Added alt text
      link: undefined,
    }))
    .filter((item) => item.title || item.slug);

  // Map parent pages into ParentPage[]
  const selectedParentPages: ParentPage[] | undefined = (cmsBlock.parentPage?.edges ?? [])
    .filter((maybeParentEdge): maybeParentEdge is WPEdge<WPParentPageNode> => Boolean(maybeParentEdge))
    .map((parentEdge) => {
      const parentNode = parentEdge?.node;
      return {
        id: parentNode?.id ?? "",
        uri: parentNode?.uri ?? "",
      };
    })
    .filter((parentPage): parentPage is ParentPage => Boolean(parentPage.id && parentPage.uri));

  const normalizedLayout = normalizeLayout(cmsBlock.layout);

  // Return the mapped block data
  const block: BlogBlockData = {
    heading: cmsBlock.heading ?? "",
    subheading: cmsBlock.subheading ?? "",
    cssClass: cmsBlock.cssClass ?? "",
    backgroundColor: cmsBlock.backgroundColor ?? 'transparent',

    isSlider: Boolean(cmsBlock.isSlider),
    loopForSlider: Boolean(cmsBlock.loopForSlider),
    layout: normalizedLayout,

    displayPerRow: toNumber(cmsBlock.displayPerRow, 3),
    displayPerPage: toNumber(cmsBlock.showPost, 6),

    sliderPerScroll: toNumber(cmsBlock.sliderPerScroll, 1),
    sliderSpeed: toNumber(cmsBlock.sliderSpeed, 4000),
    autoplay: Boolean(cmsBlock.autoplay),

    showAuthor: Boolean(cmsBlock.showAuthor),
    showDate: Boolean(cmsBlock.showDate),
    showArrow: Boolean(cmsBlock.showArrow),
    showBullets: Boolean(cmsBlock.showBullets),

    pagination: Boolean(cmsBlock.pagination),
    actionButtonText: cmsBlock.actionButtonLabel ?? "",
    sectionWidth: cmsBlock.sectionWidth ?? "Box Width",

    items: blogItems,
    parentPages: selectedParentPages?.length ? selectedParentPages : undefined,
  };

  return block;
}

