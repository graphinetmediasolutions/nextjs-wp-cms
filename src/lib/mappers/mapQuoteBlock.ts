export type WPQuoteBlockCMS = {
  heading?: string | null;
  headingTag?: string | null;
  headingPosition?: string[] | null;
  subheading?: string | null;
  layout?: string[] | string | null;
  sectionWidth?: string[] | string | null;
  cssClass?: string | null;

  quoteText?: string | null;
  quoteAuthorName?: string | null;
  quoteAuthorRole?: string | null;
};



export type QuoteBlockData = {
  heading: string | null;
  headingTag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  headingPosition: string[];
  subheading: string | null;
  layout: string[] | string | null;
  sectionWidth: string[] | string | null;
  cssClass: string | null;

  quoteText: string | null;
  quoteAuthorName: string | null;
  quoteAuthorRole: string | null;
};


export function mapQuoteBlock(cms: WPQuoteBlockCMS): QuoteBlockData {
  // Safe heading tag fallback
  const safeTag =
    (cms.headingTag as QuoteBlockData["headingTag"]) ?? "h2";

  return {
    heading: cms.heading ?? null,
    headingTag: safeTag,
    headingPosition: cms.headingPosition ?? [],
    subheading: cms.subheading ?? null,
    layout: cms.layout ?? null,
    sectionWidth: cms.sectionWidth ?? null,
    cssClass: cms.cssClass ?? null,

    quoteText: cms.quoteText ?? null,
    quoteAuthorName: cms.quoteAuthorName ?? null,
    quoteAuthorRole: cms.quoteAuthorRole ?? null,
  };
}
