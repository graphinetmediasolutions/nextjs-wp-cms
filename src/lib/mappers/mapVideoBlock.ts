export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';


type WPVideoPosterImageNode = {
    sourceUrl?: string | null;
   
}
type WPVideoPosterImage = {
    node?: WPVideoPosterImageNode | null;
}

export type WPVideoBlockCMS = {
    heading?: string | null;
    headingTag?: string;
    headingPosition?: string[];
    sectionWidth?: string | string[] | null;
    cssClass?: string | null;
    videoTitle?: string | null;
    videoUrl: string;
    videoPosterImage: WPVideoPosterImage;
}


export type VideoBlockData = {
    heading?: string | null;
    headingTag?: string;
    headingPosition?: string[];
    sectionWidth?: string | string[] | null;
    cssClass?: string | null;
    title?: string | null;
    url: string;
    posterImage: string | null;
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


export function mapVideoBlock(cmsBlock: WPVideoBlockCMS): VideoBlockData {
    const block: VideoBlockData = {
        heading: cmsBlock?.heading ?? "",
        headingTag: cmsBlock?.headingTag ?? "h2",
        headingPosition: cmsBlock?.headingPosition ?? [],
        cssClass: cmsBlock?.cssClass ?? "",
        url: cmsBlock?.videoUrl,
        posterImage: cmsBlock?.videoPosterImage?.node?.sourceUrl ?? "",

        title: cmsBlock?.videoTitle,
         sectionWidth: cmsBlock?.sectionWidth ?? "Box Width",

    }

    return block;
}