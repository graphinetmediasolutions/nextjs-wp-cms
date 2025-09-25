"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import WheelGestures from "embla-carousel-wheel-gestures";
import Image from "next/image";
import { type BlogItem } from "./BlogGridLayout1";

export default function BlogCarouselLayout2({ items }: { items: BlogItem[] }) {
  return (
    <div className="relative">
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 4000 }), WheelGestures({ forceWheelAxis: "x" })]}
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.slug} className="md:basis-1/3">
              <div className="rounded-lg bg-white shadow hover:shadow-lg transition overflow-hidden">
                {item.image && (
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4 space-y-2">
                  {item.date && <time className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</time>}
                  <h3 className="text-lg font-semibold hover:underline">
                    <a href={`/blog/${item.slug}`}>{item.title}</a>
                  </h3>
                  {item.excerpt && <p className="text-sm text-gray-600 line-clamp-3">{item.excerpt}</p>}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
