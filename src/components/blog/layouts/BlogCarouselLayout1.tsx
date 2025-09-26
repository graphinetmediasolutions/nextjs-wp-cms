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
import NextLink from "next/link";            // ✅ use Next.js Link
import { MoveUpRight } from "lucide-react";  // ✅ keep the icon
import { type BlogItem } from "./BlogGridLayout1";
import Link from "next/link";

type Props = {
  items: BlogItem[];
  perView?: number;               // how many visible on desktop
  perScroll?: number;             // how many slide per step
  autoplay?: boolean | number;    // false | true | delay(ms)
  loop?: boolean;
};

export default function BlogCarouselLayout1({
  items,
  perView = 3,
  perScroll = 1,
  autoplay = 4000,
  loop = true,
}: Props) {
  // autoplay plugin (optional)
  const autoplayPlugin =
    typeof autoplay === "number"
      ? Autoplay({ delay: autoplay, stopOnInteraction: true })
      : autoplay
        ? Autoplay({ delay: 4000, stopOnInteraction: true })
        : undefined;

  // responsive width per item
  const basis =
    perView <= 1 ? "md:basis-full"
      : perView === 2 ? "md:basis-1/2"
        : perView === 4 ? "md:basis-1/4"
          : perView >= 5 ? "md:basis-1/5"
            : "md:basis-1/3"; // default: 3

  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop,
          slidesToScroll: perScroll,
          // Optional: tune scroll step on smaller screens
          breakpoints: {
            "(max-width: 639px)": { slidesToScroll: 1 },
            "(min-width: 640px) and (max-width: 1023px)": {
              slidesToScroll: Math.min(perScroll, 2),
            },
            "(min-width: 1024px)": { slidesToScroll: perScroll },
          },
        }}
        plugins={[
          ...(autoplayPlugin ? [autoplayPlugin] : []),
          WheelGestures({ forceWheelAxis: "x" }),
        ]}
      >
        <CarouselContent>
          {items.map((item, i) => (
            <CarouselItem key={item.slug ?? i} className={basis}>
              <div className="rounded-lg bg-white shadow hover:shadow-lg transition overflow-hidden h-full">
                {item.image && (
                  <Link
                    href={item?.uri ?? "#"}
                    className="block relative w-full aspect-[16/9]"
                  >
                    <Image
                      src={item?.image}
                      alt={item?.title ?? "Blog image"}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </Link>
                )}
                <div className="p-4 space-y-2">
                  {item.date && (
                    <time className="text-xs text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </time>
                  )}

                  {item.title && (
                    <h3 className="text-lg font-semibold hover:underline">
                      <Link href={item?.uri ?? "#"}>{item.title}</Link>
                    </h3>
                  )}

                  {item.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {item.excerpt}
                    </p>
                  )}

                  <Link
                    href={item?.uri ?? "#"}
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <MoveUpRight size={20} className="inline-block  mr-[6px] text-[17px]" />
                    read more
                  </Link>
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
