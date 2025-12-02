

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';


export type TabsPosition = "Top" | "Left" | "Right";

type WPTabItem = {
    title?: string | null;
    content?: string | null;
}


export type WPTabsBlockCMS = {
    heading?: string | null;
    subheading?: string | null;
    headingTag?: string;
    headingPosition?: string[];
    layout?: string[] | string | null;
    sectionWidth?: string | string[] | null;
    cssClass?: string | null;
  tabsPosition: TabsPosition[] | null;
    tabItems?: WPTabItem[] | null;
}





export type TabsBlockData = {
    heading?: string | null;
    subheading?: string | null;
    headingTag?: string;
    headingPosition?: string[];
    layout: string[] | string | null;
    sectionWidth: string | string[] | null;
    cssClass: string | null;
    position: TabsPosition[] | null;
    items: WPTabItem[] | null;
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

export function mapTabsBlock(cmsBlock: WPTabsBlockCMS): TabsBlockData {


    // 2) Normalize layout: support string or string[]
    const rawLayout = cmsBlock.layout;
    const layout =
        Array.isArray(rawLayout) ? (rawLayout[0] ?? "") : (rawLayout ?? "");


    // 4) Build final block
    const block: TabsBlockData = {
        heading: cmsBlock?.heading ?? "",
        headingTag: cmsBlock?.headingTag ?? "h2",
        headingPosition: cmsBlock?.headingPosition ?? [],
        subheading: cmsBlock?.subheading ?? "",
        cssClass: cmsBlock?.cssClass ?? "",
        layout,
        sectionWidth: cmsBlock?.sectionWidth ?? "Box Width",
        position : cmsBlock?.tabsPosition ?? [],
        items: cmsBlock?.tabItems ?? []

    };

    return block
}
