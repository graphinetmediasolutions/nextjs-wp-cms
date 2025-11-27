

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';


type WPFaqItem = {
    faqQuestion?: string | null;
    faqAnswer?: string | null;
}


export type WPFaqBlockCMS = {
    heading?: string | null;
    subheading?: string | null;
    headingTag?: string;
    headingPosition?: string[];
    layout?: string[] | string | null;
    sectionWidth?: string | string[] | null;
    cssClass?: string | null;
    faqItems?: WPFaqItem[] | null;
    displayPerRow?: string | null;
    showPost?: number | undefined;

}





export type FaqBlockData = {
    heading?: string | null;
    subheading?: string | null;
    headingTag?: string;
    headingPosition?: string[];
    layout?: string[] | string | null;
    sectionWidth?: string | string[] | null;
    cssClass?: string | null;
    faqItems?: WPFaqItem[] | null;
    showPost?: number | undefined;
    displayPerRow?: number | null;
}

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

export function mapFaqBlock(cmsBlock: WPFaqBlockCMS): FaqBlockData {


    // 2) Normalize layout: support string or string[]
    const rawLayout = cmsBlock.layout;
    const layout =
        Array.isArray(rawLayout) ? (rawLayout[0] ?? "") : (rawLayout ?? "");


    // 4) Build final block
    const block: FaqBlockData = {
        heading: cmsBlock?.heading ?? "",
        headingTag: cmsBlock?.headingTag ?? "h2",
        headingPosition: cmsBlock?.headingPosition ?? [],
        subheading: cmsBlock?.subheading ?? "",
        cssClass: cmsBlock?.cssClass ?? "",
        layout,
        displayPerRow: toNumber(cmsBlock.displayPerRow, 1),
        sectionWidth: cmsBlock?.sectionWidth ?? "Box Width",
        faqItems: cmsBlock?.faqItems ?? [],
        showPost: cmsBlock?.showPost ?? -1,

    };

    return block
}
