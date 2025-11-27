import { FaqBlockData } from "@/lib/mappers/mapFaqBlock";
import dynamic from "next/dynamic";


// All dynamic, all SSR = true (good LCP even if unknown which one shows first)
const GRID = {
    "Layout 1": dynamic(() => import("./layouts/FaqLayout1"), { ssr: true }), 
    "Layout 2": dynamic(() => import("./layouts/FaqLayout2"), { ssr: true }),
     "Layout 3": dynamic(() => import("./layouts/FaqLayout3"), { ssr: true }),
   
} as const;


type GridKeys = keyof typeof GRID;

export default function FaqSection({ block }: { block: FaqBlockData }) {
    const {  layout } = block;
  

    const key = (layout as string) || "Layout 1";

    const Comp = (GRID as Record<string, any>)[key as GridKeys] ?? GRID["Layout 1"];
    return <Comp block={block} />;
}
