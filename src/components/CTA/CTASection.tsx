import { CTABlockData } from "@/lib/mappers/mapCTABlock";
import dynamic from "next/dynamic";


// All dynamic, all SSR = true (good LCP even if unknown which one shows first)
const GRID = {
    "Layout 1": dynamic(() => import("./layouts/CTALayout1"), { ssr: true }), // Ensure the file exists at this path
    "Layout 2": dynamic(() => import("./layouts/CTALayout2"), { ssr: true }),
    "Layout 3": dynamic(() => import("./layouts/CTALayout3"), { ssr: true }),
    // "Layout 3": dynamic(() => import("./layouts/grid/TeamsGridLayout3"), { ssr: true }),
   
} as const;


type GridKeys = keyof typeof GRID;

export default function CTASection({ block }: { block: CTABlockData }) {
    const {  layout } = block;
  

    const key = (layout as string) || "Layout 1";

    const Comp = (GRID as Record<string, any>)[key as GridKeys] ?? GRID["Layout 1"];
    return <Comp block={block} />;
}
