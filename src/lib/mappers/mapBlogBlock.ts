export type BlogItem = {
  slug: string;
  title: string;
  image?: string;
  alt?: string;
  link?: string;
};

export type BlogBlockData = {
  heading?: string;
  subheading?: string;
  cssClass?: string;
  isSlider: boolean;
  layout: "Layout 1" | "Layout 2" | "Layout 3";
  displayPerRow: number;
  displayPerPage: number;
  sliderPerScroll: number;
  sliderSpeed: number;
  pagination: boolean;
  items: BlogItem[];
  actionButtonText?: string;
  sectionWidth?: string | string[] | null;
};

export function mapBlogBlock(data: any): BlogBlockData {
  return {
    heading: data?.heading ?? "",
    subheading: data?.subheading ?? "",
    cssClass: data?.cssClass ?? "",
    isSlider: Boolean(data?.isSlider),
    layout: normalizeLayout(data?.layout),
    displayPerRow: Number(data?.displayPerRow) || 3,
    displayPerPage: Number(data?.displayPerPage) || 6,
    sliderPerScroll: Number(data?.sliderPerScroll) || 1,
    sliderSpeed: Number(data?.sliderSpeed) || 4000,
    pagination: Boolean(data?.pagination),
    actionButtonText: data?.actionButtonText ?? "",
    sectionWidth: data?.sectionWidth ?? "Box Width",
    items: (data?.blogPage?.edges || []).map((edge: any) => {
      const node = edge?.node || {};
      return {
        slug: node?.slug ?? "",
        title: node?.title ?? "",
        link: node?.link ?? "",
        image: node?.featuredImage?.node?.sourceUrl ?? undefined,
        alt: node?.featuredImage?.node?.altText ?? "",
        uri: node?.uri ?? "",
      };
    }),
  };
}

export function normalizeLayout(
  layout?: string[] | string | null
): "Layout 1" | "Layout 2" | "Layout 3" {
  let value = "";

  if (Array.isArray(layout) && layout.length > 0) {
    value = layout[0];
  } else if (typeof layout === "string") {
    value = layout;
  }

  switch (value) {
    case "Layout 1":
      return "Layout 1";
    case "Layout 1":
      return "Layout 1";
    case "Layout 1":
      return "Layout 1";
    default:
      return "Layout 1"; // fallback
  }
}
