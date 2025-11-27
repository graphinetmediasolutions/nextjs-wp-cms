
import { FeaturesBlockData } from "@/lib/mappers/mapFeaturesBlock";
import dynamic from "next/dynamic";


// All dynamic, all SSR = true (good LCP even if unknown which one shows first)
const GRID = {
    "Layout 1": dynamic(() => import("./layouts/FeaturesLayout1"), { ssr: true }), 
    "Layout 2": dynamic(() => import("./layouts/FeaturesLayout2"), { ssr: true }),
     "Layout 3": dynamic(() => import("./layouts/FeaturesLayout3"), { ssr: true }),
   
} as const;


type GridKeys = keyof typeof GRID;

export default function FeaturesSection({ block }: { block: FeaturesBlockData }) {
    const {  layout } = block;
  

    const key = (layout as string) || "Layout 1";

    const Comp = (GRID as Record<string, any>)[key as GridKeys] ?? GRID["Layout 1"];
    return <Comp block={block} />;
}
