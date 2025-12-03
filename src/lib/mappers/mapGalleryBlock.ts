export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

// ---- CMS types ----

type WPMediaImageNode = {
  sourceUrl?: string | null;
  altText?: string | null;
  mediaDetails?: {
    width?: string | number | null;
    height?: string | number | null;
  } | null;
};

type WPMediaImage = {
  node?: WPMediaImageNode | null;
};

type WPMediaGalleryItemCMS = {
  imageOrVideo?: string | null; // "image" | "video"
  image?: WPMediaImage | null;
  videoUrl?: string | null;
  videoPosterImage?: WPMediaImage | null;
  caption?: string | null;
};

export type WPMediaGalleryBlockCMS = {
  heading?: string | null;
  headingTag?: string | null;
  headingPosition?: string[] | null;

  layout?: string[] | string | null; // "layout1" | "layout2"

  autoplay?: boolean | null;
  showArrow?: boolean | null;
  showBullets?: boolean | null;
  sliderPerScroll?: number | string | null;
  sliderSpeed?: number | string | null;
  loopForSlider?: boolean | null;

  sectionWidth?: string | string[] | null;
  cssClass?: string | null;

  galleryItems?: WPMediaGalleryItemCMS[] | null;
};

// ---- Public render types ----

export type MediaGalleryItem = {
  kind: "Image" | "Video";
  imageUrl?: string;
  imageAltText?: string;
  videoUrl?: string;
  posterUrl?: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type MediaGalleryBlockData = {
  heading?: string;
  headingTag?: string;
  headingPosition?: string[];

  layout: string;         // "layout1" | "layout2"
  isSlider: boolean;      // derived: layout2 = slider, layout1 = grid

  autoplay: boolean;
  showArrow: boolean;
  showBullets: boolean;
  sliderPerScroll: number;
  sliderSpeed: number;
  loopForSlider: boolean;

  sectionWidth?: string | string[] | null;
  cssClass?: string;

  items: MediaGalleryItem[];
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

function toOptionalNumber(n: unknown): number | undefined {
  if (typeof n === "number") return n;
  if (typeof n === "string") {
    const parsed = Number(n);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

// ---- Mapper ----

export function mapMediaGalleryBlock(
  cmsBlock: WPMediaGalleryBlockCMS
): MediaGalleryBlockData {
  // 1) Normalize layout: support string or string[]
  const rawLayout = cmsBlock.layout;
  const layout =
    Array.isArray(rawLayout) ? (rawLayout[0] ?? "") : (rawLayout ?? "");

  // derive slider info from layout (your layouts are "layout1" & "layout2")
  const isSlider = layout === "layout2";

  // 2) Map gallery items into MediaGalleryItem[]
  const items: MediaGalleryItem[] = (cmsBlock.galleryItems ?? [])
    .filter((t): t is WPMediaGalleryItemCMS => Boolean(t))
    .map((t) => {
      const kind: "Image" | "Video" =
        t.imageOrVideo === "Video" ? "Video" : "Image";

      const imageNode = t.image?.node ?? undefined;
      const posterNode = t.videoPosterImage?.node ?? undefined;

      const imageUrl = imageNode?.sourceUrl ?? undefined;
      const imageAltText = imageNode?.altText ?? "";
      const posterUrl = posterNode?.sourceUrl ?? undefined;
      const videoUrl = t.videoUrl ?? undefined;

      const width = toOptionalNumber(imageNode?.mediaDetails?.width);
      const height = toOptionalNumber(imageNode?.mediaDetails?.height);

      return {
        kind,
        imageUrl,
        imageAltText,
        videoUrl,
        posterUrl,
        caption: t.caption ?? "",
        width,
        height,
      };
    })
    // keep only valid items: image needs imageUrl, video needs videoUrl
    .filter((item) =>
      item.kind === "Image" ? Boolean(item.imageUrl) : Boolean(item.videoUrl)
    );

  // 3) Build final block
  const block: MediaGalleryBlockData = {
    heading: cmsBlock.heading ?? "",
    headingTag: cmsBlock.headingTag ?? "",
    headingPosition: cmsBlock.headingPosition ?? [],

    layout,
    isSlider,

    autoplay: Boolean(cmsBlock.autoplay),
    showArrow: Boolean(cmsBlock.showArrow),
    showBullets: Boolean(cmsBlock.showBullets),
    sliderPerScroll: toNumber(cmsBlock.sliderPerScroll, 1),
    sliderSpeed: toNumber(cmsBlock.sliderSpeed, 4000),
    loopForSlider: Boolean(cmsBlock.loopForSlider),

    sectionWidth: cmsBlock.sectionWidth ?? "Box Width",
    cssClass: cmsBlock.cssClass ?? "",

    items,
  };

  return block;
}
