// ---- Shared types ----

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface PriceFeature {
  features: string; // or string[] if you later change it
}

// ---- Raw CMS / WPGraphQL types ----

export type WPPriceItem = {
  title?: string | null;
  planPrice?: string | null;
  discountedPrice?: string | null;
  planPeriod?: string | null;
  planCtaText?: string | null;
  planCtaUrl?: string | null;
  planFeature?: PriceFeature | null;
};

export type WPPricingBlockCMS = {
  heading?: string | null;
  subheading?: string | null;
  headingTag?: string | null;         // will cast to HeadingTag in mapper
  headingPosition?: string[] | null;
  layout?: string[] | string | null;
  displayPerRow?: number | string | null;
  sectionWidth?: string | string[] | null;
  cssClass?: string | null;
  priceItems?: (WPPriceItem | null)[] | null;
};

// ---- Public render types (used by React component) ----

export type PriceItem = {
  title: string | null;
  price: string | null;
  discountedPrice: string | null;
  period: string | null;
  ctaText: string | null;
  ctaUrl: string | null;
  feature: PriceFeature | null; // ✅ lower-case, matches actual meaning
};

export type PricingBlockData = {
  heading: string | null;
  subheading: string | null;
  headingTag: HeadingTag;
  headingPosition: string[];
  layout: string[] | string | null;
  displayPerRow?: number;
  sectionWidth: string | string[] | null;
  cssClass: string | null;
  items: PriceItem[]; // ✅ array, not `PriceItem | []`
};

// ---- Helpers ----

function toNumber(n: unknown, fallback: number): number {
  const num =
    typeof n === 'string'
      ? Number(n)
      : typeof n === 'number'
      ? n
      : NaN;

  return Number.isFinite(num) ? num : fallback;
}





// ---- Mapper ----

export function mapPricingBlock(cmsBlock: WPPricingBlockCMS): PricingBlockData {
  const {
    heading,
    subheading,
    headingTag,
    headingPosition,
    layout,
    sectionWidth,
    cssClass,
    priceItems,
  } = cmsBlock;

  const items: PriceItem[] = (priceItems ?? [])
    .filter((item): item is WPPriceItem => !!item)
    .map((item) => ({
      title: item.title ?? null,
      price: item.planPrice ?? null,
      discountedPrice: item.discountedPrice ?? null,
      period: item.planPeriod ?? null,
      ctaText: item.planCtaText ?? null,
      ctaUrl: item.planCtaUrl ?? null,
      feature: item.planFeature ?? null,
    }));

  // ensure a safe default headingTag
  const safeHeadingTag: HeadingTag =
    (headingTag as HeadingTag | null) ?? 'h2';

  return {
    heading: heading ?? null,
    subheading: subheading ?? null,
    headingTag: safeHeadingTag,
    headingPosition: headingPosition ?? [],
    layout: layout ?? null,
    displayPerRow: toNumber(cmsBlock.displayPerRow, 3),
    sectionWidth: sectionWidth ?? null,
    cssClass: cssClass ?? null,
    items,
  };
}
