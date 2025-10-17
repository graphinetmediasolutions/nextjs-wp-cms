import dynamic from "next/dynamic";
import type { ListingBlockData } from "@/lib/mappers/mapListingBlock";

// All dynamic, all SSR = true (good LCP even if unknown which one shows first)
const GRID = {
  "Layout 1": dynamic(() => import("./layouts/grid/ListingGridLayout1"), { ssr: true }),
  "Layout 2": dynamic(() => import("./layouts/grid/ListingGridLayout2"), { ssr: true }),
  "Layout 3": dynamic(() => import("./layouts/grid/ListingGridLayout3"), { ssr: true }),
  "Layout 4": dynamic(() => import("./layouts/grid/ListingGridLayout4"), { ssr: true }),
  "Layout 5": dynamic(() => import("./layouts/grid/ListingGridLayout5"), { ssr: true }),
  "Layout 6": dynamic(() => import("./layouts/grid/ListingGridLayout6"), { ssr: true }),
  "Layout 7": dynamic(() => import("./layouts/grid/ListingGridLayout7"), { ssr: true }),
  "Layout 8": dynamic(() => import("./layouts/grid/ListingGridLayout8"), { ssr: true }),
} as const;

const SLIDER = {
  "Layout 1": dynamic(() => import("./layouts/carousel/ListingCarouselLayout1"), { ssr: true }),
  "Layout 2": dynamic(() => import("./layouts/carousel/ListingCarouselLayout2"), { ssr: true }),
  "Layout 3": dynamic(() => import("./layouts/carousel/ListingCarouselLayout3"), { ssr: true }),
  "Layout 4": dynamic(() => import("./layouts/carousel/ListingCarouselLayout4"), { ssr: true }),
  "Layout 5": dynamic(() => import("./layouts/carousel/ListingCarouselLayout5"), { ssr: true }),
  "Layout 6": dynamic(() => import("./layouts/carousel/ListingCarouselLayout6"), { ssr: true }),
  "Layout 7": dynamic(() => import("./layouts/carousel/ListingCarouselLayout7"), { ssr: true }),
  "Layout 8": dynamic(() => import("./layouts/carousel/ListingCarouselLayout8"), { ssr: true }),
} as const;

type GridKeys = keyof typeof GRID;
type SliderKeys = keyof typeof SLIDER;

export default function ListingSection({ block }: { block: ListingBlockData }) {
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
