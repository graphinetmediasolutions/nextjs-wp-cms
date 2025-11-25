import dynamic from "next/dynamic";
// import { TestimonialBlockData } from "@/lib/mappers/mapTestimonialBlock";
import { TeamsBlockData } from "@/lib/mappers/mapTeamsBlock";

// All dynamic, all SSR = true (good LCP even if unknown which one shows first)
const GRID = {
    "Layout 1": dynamic(() => import("./layouts/grid/TeamsGridLayout1"), { ssr: true }), // Ensure the file exists at this path
    "Layout 2": dynamic(() => import("./layouts/grid/TeamsGridLayout2"), { ssr: true }),
    "Layout 3": dynamic(() => import("./layouts/grid/TeamsGridLayout3"), { ssr: true }),
    "Layout 4": dynamic(() => import("./layouts/grid/TeamsGridLayout4"), { ssr: true }),
    "Layout 5": dynamic(() => import("./layouts/grid/TeamsGridLayout5"), { ssr: true }),
//     "Layout 6": dynamic(() => import("./layouts/grid/TeamsGridLayout6"), { ssr: true }),
} as const;

const SLIDER = {
    "Layout 1": dynamic(() => import("./layouts/carousel/TeamsCarouselLayout1"), { ssr: true }),
    "Layout 2": dynamic(() => import("./layouts/carousel/TeamsCarouselLayout2"), { ssr: true }),
    "Layout 3": dynamic(() => import("./layouts/carousel/TeamsCarouselLayout3"), { ssr: true }),
    "Layout 4": dynamic(() => import("./layouts/carousel/TeamsCarouselLayout4"), { ssr: true }),
    "Layout 5": dynamic(() => import("./layouts/carousel/TeamsCarouselLayout5"), { ssr: true }),
    // "Layout 6": dynamic(() => import("./layouts/carousel/TeamsCarouselLayout6"), { ssr: true }),
} as const;

type GridKeys = keyof typeof GRID;
type SliderKeys = keyof typeof SLIDER;

export default function TeamsSection({ block }: { block: TeamsBlockData }) {
    const { items, isSlider, layout } = block;
    if (!items?.length) return null;

    const key = (layout as string) || "Layout 1";

    if (isSlider) {
        const Comp = (SLIDER as Record<string, any>)[key as SliderKeys] ?? SLIDER["Layout 1"];
        return <Comp block={block} />;
    }

    const Comp = (GRID as Record<string, any>)[key as GridKeys] ?? GRID["Layout 1"];
    return <Comp block={block} />;
}
