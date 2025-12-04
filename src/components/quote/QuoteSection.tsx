import { PricingBlockData } from "@/lib/mappers/mapPricingBlock";
import { QuoteBlockData } from "@/lib/mappers/mapQuoteBlock";
import dynamic from "next/dynamic";


// All dynamic, all SSR = true (good LCP even if unknown which one shows first)
const GRID = {
    "Layout 1": dynamic(() => import("./layouts/QuoteLayout1"), { ssr: true }),
    "Layout 2": dynamic(() => import("./layouts/QuoteLayout2"), { ssr: true }),
    // "Layout 3": dynamic(() => import("./layouts/FaqLayout3"), { ssr: true }),

} as const;


type GridKeys = keyof typeof GRID;

export default function QuoteSection({ block }: { block: QuoteBlockData }) {
    const { layout } = block;


    const key = (layout as string) || "Layout 1";

    const Comp = (GRID as Record<string, any>)[key as GridKeys] ?? GRID["Layout 1"];
    return <Comp block={block} />;
}
