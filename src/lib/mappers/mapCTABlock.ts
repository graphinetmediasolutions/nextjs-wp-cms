type WPCTAImageNode = {
    sourceUrl?: string | null;
    altText?: string | null;
}

type WPAlignItem = 'Left' | 'Center' | 'Right';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type WPCTAImage = {
    node?: WPCTAImageNode | null;
}

type WPBackgroundImageNode = {
    sourceUrl?: string | null;
    altText?: string | null;
};
type WPBackgroundImage = {
    node?: WPBackgroundImageNode | null;
};


type WPCTAItem = {
    actionButtonLabel?: string | null;
    actionButtonUrl?: string | null;
    actionButtonClass?: string | null;
}

type WPCTAOptions = {
    ctaOptions?: WPCTAItem;
}

export type WPCTABlockCMS = {
    heading?: string | null;
    subheading?: string | null;
    layout?: string[] | string | null;
    description?: string | null;
    sectionWidth?: string | string[] | null;
    backgroundColor?: string | null;
    textColor?: string | null;
    cssClass?: string | null;
    backgroundImage?: WPBackgroundImage | null;
    alignItem: WPAlignItem;
    ctaItems?: WPCTAOptions[] | null;
    image?: WPCTAImage | null;
    imageAlign?: string | null;
}





export type CTABlockData = {
    heading?: string;
   subheading?: string;
   boxWidth?: string;
    layout: string;
    sectionWidth?: string | string[] | null;
    cssClass?: string;
    backgroundColor?: string;
    textColor?: string | null;
    backgroundImage?: string;
    backgroundImageAlt?: string;
    description?: string;
    alignItem: WPAlignItem;
    ctaItems?: WPCTAOptions[] | null;
     image?: string;
    imageAlign?: string | null;
    imageAlt?: string;
}



export function mapCTABlock(cmsBlock: WPCTABlockCMS): CTABlockData {
  

    // 2) Normalize layout: support string or string[]
    const rawLayout = cmsBlock.layout;
    const layout =
        Array.isArray(rawLayout) ? (rawLayout[0] ?? "") : (rawLayout ?? "");

    // 3) Background image URL
    const backgroundImage =
        cmsBlock.backgroundImage?.node?.sourceUrl ?? undefined;



    // 4) Build final block
    const block: CTABlockData = {
        heading: cmsBlock.heading ?? "",
        subheading: cmsBlock.subheading ?? "",
        description: cmsBlock.description ?? "",

        cssClass: cmsBlock.cssClass ?? "",
        backgroundColor: cmsBlock.backgroundColor ?? "transparent",
        textColor: cmsBlock.textColor ?? "",
        backgroundImage: cmsBlock?.backgroundImage?.node?.sourceUrl ?? "",
        backgroundImageAlt: cmsBlock?.backgroundImage?.node?.altText ?? "",
 
        layout,
        image: cmsBlock.image?.node?.sourceUrl ?? "",
        imageAlt: cmsBlock.image?.node?.altText ?? "",
        imageAlign: cmsBlock.imageAlign,

        sectionWidth: cmsBlock.sectionWidth ?? "Box Width",
         alignItem: cmsBlock.alignItem,
        ctaItems: cmsBlock.ctaItems ?? [],
    
    };

    return  block
}
