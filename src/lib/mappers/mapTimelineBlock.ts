

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';


type WPTTimelineImageNode = {
    sourceUrl?: string | null;
    altText?: string | null;
};
type WPTTimelineImage = {
    node?: WPTTimelineImageNode | null;

};




type WPTimelineItem = {
    imageOrIcon?: string | null;
    imageIcon?: WPTTimelineImage | null;
    title?: string | null;
    description?: string | null;
    date?: string | null;
    year?: string | null;

}


export type WPTimelineBlockCMS = {
    heading?: string | null;
    subheading?: string | null;
    headingTag?: string;
    headingPosition?: string[];
    layout?: string[] | string | null;
    sectionWidth?: string | string[] | null;
    cssClass?: string | null;
    timelineItems?: WPTimelineItem[] | null;
}





export type TimelineBlockData = {
    heading?: string | null;
    subheading?: string | null;
    headingTag?: string;
    headingPosition?: string[];
    layout?: string[] | string | null;
    sectionWidth?: string | string[] | null;
    cssClass?: string | null;
    timelineItems?: WPTimelineItem[] | null;
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

export function mapTimelineBlock(cmsBlock: WPTimelineBlockCMS): TimelineBlockData {


    // 2) Normalize layout: support string or string[]
    const rawLayout = cmsBlock.layout;
    const layout =
        Array.isArray(rawLayout) ? (rawLayout[0] ?? "") : (rawLayout ?? "");


    // 4) Build final block
    const block: TimelineBlockData = {
        heading: cmsBlock?.heading ?? "",
        headingTag: cmsBlock?.headingTag ?? "h2",
        headingPosition: cmsBlock?.headingPosition ?? [],
        subheading: cmsBlock?.subheading ?? "",
        cssClass: cmsBlock?.cssClass ?? "",
        layout,
        sectionWidth: cmsBlock?.sectionWidth ?? "Box Width",
        timelineItems: cmsBlock?.timelineItems ?? [],

    };

    return block
}
