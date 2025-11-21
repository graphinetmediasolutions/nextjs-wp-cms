import dynamic from "next/dynamic";
import { TestimonialBlockData } from "@/lib/mappers/mapTestimonialBlock";

// All dynamic, all SSR = true (good LCP even if unknown which one shows first)
const GRID = {
    "Layout 1": dynamic(() => import("./layouts/grid/TestimonialsGridLayout1"), { ssr: true }), // Ensure the file exists at this path
    "Layout 2": dynamic(() => import("./layouts/grid/TestimonialsGridLayout2"), { ssr: true }),
    "Layout 3": dynamic(() => import("./layouts/grid/TestimonialsGridLayout3"), { ssr: true }),
    "Layout 4": dynamic(() => import("./layouts/grid/TestimonialsGridLayout4"), { ssr: true }),
    "Layout 5": dynamic(() => import("./layouts/grid/TestimonialsGridLayout5"), { ssr: true }),
    "Layout 6": dynamic(() => import("./layouts/grid/TestimonialsGridLayout6"), { ssr: true }),
    "Layout 7": dynamic(() => import("./layouts/grid/TestimonialsGridLayout7"), { ssr: true }),
    "Layout 8": dynamic(() => import("./layouts/grid/TestimonialsGridLayout8"), { ssr: true }),
} as const;

const SLIDER = {
    "Layout 1": dynamic(() => import("./layouts/carousel/TestimonialsCarouselLayout1"), { ssr: true }),
    "Layout 2": dynamic(() => import("./layouts/carousel/TestimonialsCarouselLayout2"), { ssr: true }),
    "Layout 3": dynamic(() => import("./layouts/carousel/TestimonialsCarouselLayout3"), { ssr: true }),
    "Layout 4": dynamic(() => import("./layouts/carousel/TestimonialsCarouselLayout4"), { ssr: true }),
    "Layout 5": dynamic(() => import("./layouts/carousel/TestimonialsCarouselLayout5"), { ssr: true }),
    "Layout 6": dynamic(() => import("./layouts/carousel/TestimonialsCarouselLayout6"), { ssr: true }),
    "Layout 7": dynamic(() => import("./layouts/carousel/TestimonialsCarouselLayout7"), { ssr: true }),
    "Layout 8": dynamic(() => import("./layouts/carousel/TestimonialsCarouselLayout8"), { ssr: true }),
} as const;

type GridKeys = keyof typeof GRID;
type SliderKeys = keyof typeof SLIDER;

export default function TestimonialsSection({ block }: { block: TestimonialBlockData }) {
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
