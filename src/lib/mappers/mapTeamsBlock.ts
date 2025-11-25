type WPTeamsImageNode = {
    sourceUrl?: string | null;
    altText?:string | null;
}

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type WPTeamsImage = {
    node?: WPTeamsImageNode | null;
}

type WPBackgroundImageNode = {
  sourceUrl?: string | null;
  altText?: string | null;
};
type WPBackgroundImage = {
    node?: WPBackgroundImageNode | null;
};




type WPSocialLinks = {
    facebookLinks?: string | null;
    instagarmLinks?: string | null;
    twitterLinks?: string | null;
    linkedinLinks?: string | null
}


type WPTeam = {
    name: string;
    designation: string;
    shortBio?: string | null;
    detailBio?: string | null;
    videoUrl?: string | null;
    photo?: WPTeamsImage | null;
    socialLinks?: WPSocialLinks;
}



export type WPTeamsBlockCMS = {
    heading?: string | null;
    headingTag?: string | null;
    headingPosition?: string[] | null;

    subheading?: string | null;
    subheadingPosition?: string[] | null;

    description?: string | null;

    layout?: string[] | string | null;
    displayPerRow?: number | string | null;
    showPost?: number  | null;

    isSlider?: boolean | null;
    autoplay?: boolean | null;
    showArrow?: boolean | null;
    showBullets?: boolean | null;
    sliderPerScroll?: number | string | null;
    sliderSpeed?: number | string | null;
    loopForSlider?: boolean | null;

    actionButtonLabel?: string | null;
    actionButtonUrl?: string | null;
    sectionWidth?: string | string[] | null;
    cssClass?: string | null;
    backgroundColor?: string | null;
    backgroundImage?: WPBackgroundImage | null;


    teamMembers?: WPTeam[] | null;
};


// ---- Public render types ----

export type TeamItem = {
    name: string;
    designation: string;
    videoUrl?: string | null;
    shortBio?: string | null;
    detailBio?: string | null;
    photo?: string | null;
    photoAlt?: string | null;
    socialLinks?: WPSocialLinks;
};


export type TeamsBlockData = {
    heading?: string;
    headingTag?: string;
    headingPosition?: string[];
    showPost?: number | undefined;

    subheading?: string;
    subheadingPosition?: string[];

    description?: string;

    cssClass?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundImageAlt?:string;

    isSlider: boolean;
    layout: string;
    loopForSlider: boolean;

    displayPerRow: number;
    displayPerPage: number;
    sliderPerScroll: number;
    sliderSpeed: number;
    autoplay: boolean;

    showBullets: boolean;
    showArrow: boolean;

    sectionWidth?: string | string[] | null;
    actionButtonText?: string;
    actionButtonUrl?: string;

    items: TeamItem[];
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


// mapper 

export function mapTeamsBlock(cmsBlock: WPTeamsBlockCMS): TeamsBlockData {
    // 1) Map teams into TeamItem[]
    const items: TeamItem[] = (cmsBlock.teamMembers ?? [])
        .filter((t): t is WPTeam => Boolean(t))
        .map((t) => ({
            name: t?.name ?? "",
            designation: t?.designation ?? "",
            shortBio: t?.shortBio ?? "",
            detailBio: t?.detailBio ?? "",
            videoUrl: t?.videoUrl ?? null,
            photo: t?.photo?.node?.sourceUrl ?? null,
            photoAlt : t?.photo?.node?.altText ?? null,
            socialLinks: t?.socialLinks ?? {}
        }))
        // keep only items that at least have a name or quote
        .filter((item) => item.name || item.designation);


    // 2) Normalize layout: support string or string[]
    const rawLayout = cmsBlock.layout;
    const layout =
        Array.isArray(rawLayout) ? (rawLayout[0] ?? "") : (rawLayout ?? "");

    // 3) Background image URL
    const backgroundImage =
        cmsBlock.backgroundImage?.node?.sourceUrl ?? undefined;



    // 4) Build final block
    const block: TeamsBlockData = {
        heading: cmsBlock.heading ?? "",
        headingTag: cmsBlock.headingTag ?? "",
        headingPosition: cmsBlock.headingPosition ?? [],
        showPost: cmsBlock?.showPost ?? -1,

        subheading: cmsBlock.subheading ?? "",
        subheadingPosition: cmsBlock.subheadingPosition ?? [],

        description: cmsBlock.description ?? "",

        cssClass: cmsBlock.cssClass ?? "",
        backgroundColor: cmsBlock.backgroundColor ?? "transparent",
        backgroundImage: cmsBlock?.backgroundImage?.node?.sourceUrl ?? "",
        backgroundImageAlt: cmsBlock?.backgroundImage?.node?.altText ?? "",
        isSlider: Boolean(cmsBlock.isSlider),
        loopForSlider: Boolean(cmsBlock.loopForSlider),
        layout,

        displayPerRow: toNumber(cmsBlock.displayPerRow, 3),
        displayPerPage: toNumber(cmsBlock.showPost, 6),

        sliderPerScroll: toNumber(cmsBlock.sliderPerScroll, 1),
        sliderSpeed: toNumber(cmsBlock.sliderSpeed, 4000),
        autoplay: Boolean(cmsBlock.autoplay),

        showBullets: Boolean(cmsBlock.showBullets),
        showArrow: Boolean(cmsBlock.showArrow),

        sectionWidth: cmsBlock.sectionWidth ?? "Box Width",
        actionButtonText: cmsBlock.actionButtonLabel ?? "",
        actionButtonUrl: cmsBlock?.actionButtonUrl ?? "",

        items,
    };

    return  block
}
