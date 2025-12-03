import { VideoBlockData } from "@/lib/mappers/mapVideoBlock";
import dynamic from "next/dynamic";


// All dynamic, all SSR = true (good LCP even if unknown which one shows first)
const GRID = {
    "Layout 1": dynamic(() => import("./layouts/VideoLayout1"), { ssr: true }), 
   
} as const;


type GridKeys = keyof typeof GRID;

export default function VideoSection({ block }: { block: VideoBlockData }) {
    // const {  layout } = block;
  

    const key =  "Layout 1";

    const Comp = (GRID as Record<string, any>)[key as GridKeys] ?? GRID["Layout 1"];
    return <Comp block={block} />;
}
