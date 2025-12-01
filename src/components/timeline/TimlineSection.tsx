
// import { FeaturesBlockData } from "@/lib/mappers/mapFeaturesBlock";
import { TimelineBlockData } from "@/lib/mappers/mapTimelineBlock";
import dynamic from "next/dynamic";


// All dynamic, all SSR = true (good LCP even if unknown which one shows first)
const GRID = {
    "Layout 1": dynamic(() => import("./layouts/TimelineLayou1"), { ssr: true }), 
    "Layout 2": dynamic(() => import("./layouts/TimelineLayou2"), { ssr: true }),
     "Layout 3": dynamic(() => import("./layouts/TimelineLayou3"), { ssr: true }),
   
} as const;


type GridKeys = keyof typeof GRID;

export default function TimelineSection({ block }: { block: TimelineBlockData }) {
    const {  layout } = block;
  

    const key = (layout as string) || "Layout 1";

    const Comp = (GRID as Record<string, any>)[key as GridKeys] ?? GRID["Layout 1"];
    return <Comp block={block} />;
}
