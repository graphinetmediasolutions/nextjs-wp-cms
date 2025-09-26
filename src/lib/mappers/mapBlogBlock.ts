// types you use in rendering
export type BlogItem = {
  slug: string;
  title: string;
  uri?: string;
  date?: string;
  authorName?: string;
  // image fields are not in the new query; keep for future if needed
  image?: string;
  alt?: string;
  link?: string;
  excerpt?: string;
};

export type BlogBlockData = {
  heading?: string;
  subheading?: string;
  cssClass?: string;

  // layout + mode
  isSlider: boolean;
  layout: "Layout 1" | "Layout 2" | "Layout 3";
loopForSlider: boolean;
  // grid/slider config
  displayPerRow: number;          // columns on desktop
  displayPerPage: number;         // how many to show (from showPost)
  sliderPerScroll: number;        // slides to scroll per step
  sliderSpeed: number;            // autoplay delay in ms
  autoplay: boolean;              // enable/disable autoplay
  showArrow: boolean;
  showBullets: boolean;

  pagination: boolean;

  sectionWidth?: string | string[] | null;

  items: BlogItem[];
  actionButtonText?: string;

  // optional: which parent(s) were selected
  parentPageIds?: string[];
};

// EXACT layout value from string or first element of array
export function normalizeLayout(
  layout?: string[] | string | null
): "Layout 1" | "Layout 2" | "Layout 3" {
  let v = "";
  if (Array.isArray(layout) && layout.length > 0) v = layout[0];
  else if (typeof layout === "string") v = layout;

  switch (v) {
    case "Layout 2":
      return "Layout 2";
    case "Layout 3":
      return "Layout 3";
    case "Layout 1":
    default:
      return "Layout 1";
  }
}

export function mapBlogBlock(data: any): BlogBlockData {
  const items: BlogItem[] = (data?.childPages ?? []).map((n: any) => ({
    slug: n?.slug ?? "",
    title: n?.title ?? "",
    uri: n?.uri ?? "",
    date: n?.date ?? "",
    excerpt: n?.excerpt ?? "",
    authorName: n?.author?.node?.name ?? "",
    // image/link not in this query; keep undefined for now
    image: undefined,
    alt: undefined,
    link: undefined,
  }));

  return {
    heading: data?.heading ?? "",
    subheading: data?.subheading ?? "",
    cssClass: data?.cssClass ?? "",

    isSlider: Boolean(data?.isSlider),
    loopForSlider: Boolean(data?.loopForSlider),
    layout: normalizeLayout(data?.layout),

    displayPerRow: Number(data?.displayPerRow) || 3,
    // WP field name changed: use showPost as per-page count
    displayPerPage: Number(data?.showPost) || 6,

    sliderPerScroll: Number(data?.sliderPerScroll) || 1,
    sliderSpeed: Number(data?.sliderSpeed) || 4000, // ms
    autoplay: Boolean(data?.autoplay),
    showArrow: Boolean(data?.showArrow),
    showBullets: Boolean(data?.showBullets),

    pagination: Boolean(data?.pagination),

    actionButtonText: data?.actionButtonLabel ?? "",
    sectionWidth: data?.sectionWidth ?? "Box Width",

    items,

    parentPageIds: (data?.parentPage?.edges ?? [])
      .map((e: any) => e?.node?.id)
      .filter(Boolean),
  };
}
