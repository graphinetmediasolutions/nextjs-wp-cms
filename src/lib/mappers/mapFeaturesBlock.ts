

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';


type WPTFeatuesImageNode = {
    sourceUrl?: string | null;
    altText?: string | null;
};
type WPTFeatuesImage = {
    node?: WPTFeatuesImageNode | null;

};




type WPFeatureItem = {
    imageOrIcon?: string | null;
    imageIcon?: WPTFeatuesImage | null;
    featureTitle?: string | null;
    featureDescription?: string | null;
    actionButtonUrl?: string | null;

}


export type WPFeaturesBlockCMS = {
    heading?: string | null;
    subheading?: string | null;
    headingTag?: string;
    headingPosition?: string[];
    layout?: string[] | string | null;
    sectionWidth?: string | string[] | null;
    cssClass?: string | null;
    backgroundColor?: string;
    textColor?: string | null;
    featureItesm?: WPFeatureItem[] | null;
    displayPerRow?: number | null;


}





export type FeaturesBlockData = {
    heading?: string | null;
    subheading?: string | null;
    headingTag?: string;
    headingPosition?: string[];
    layout?: string[] | string | null;
    sectionWidth?: string | string[] | null;
    cssClass?: string | null;
    backgroundColor?: string;
    textColor?: string | null;
    featureItesm?: WPFeatureItem[] | null;
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

export function mapFeaturesBlock(cmsBlock: WPFeaturesBlockCMS): FeaturesBlockData {


    // 2) Normalize layout: support string or string[]
    const rawLayout = cmsBlock.layout;
    const layout =
        Array.isArray(rawLayout) ? (rawLayout[0] ?? "") : (rawLayout ?? "");


    // 4) Build final block
    const block: FeaturesBlockData = {
        heading: cmsBlock?.heading ?? "",
        headingTag: cmsBlock?.headingTag ?? "h2",
        headingPosition: cmsBlock?.headingPosition ?? [],
        subheading: cmsBlock?.subheading ?? "",
        cssClass: cmsBlock?.cssClass ?? "",
        layout,
        displayPerRow: toNumber(cmsBlock.displayPerRow, 1),
        sectionWidth: cmsBlock?.sectionWidth ?? "Box Width",
        backgroundColor: cmsBlock.backgroundColor ?? "transparent",
        textColor: cmsBlock.textColor ?? "",
        featureItesm: cmsBlock?.featureItesm ?? [],

    };

    return block
}
