"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import WheelGestures from "embla-carousel-wheel-gestures";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Generic, reusable slider
export type SliderProps<T> = {
  items: T[];
  perView?: number;                 // cards visible on desktop
  perScroll?: number;               // how many to advance per step
  autoplay?: boolean | number;      // false | true | ms (e.g. 4000)
  loop?: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
};

function Slider<T>({
  items,
  perView = 3,
  perScroll = 1,
  autoplay = false,
  loop = true,
  renderItem,
  className = "w-full",
}: SliderProps<T>) {
  if (!items?.length) return null;

  // Autoplay plugin
  const autoplayPlugin =
    typeof autoplay === "number"
      ? Autoplay({ delay: autoplay, stopOnInteraction: true })
      : autoplay
      ? Autoplay({ delay: 4000, stopOnInteraction: true })
      : undefined;

  // Responsive basis class from perView
  const basisClass =
    perView <= 1
      ? "md:basis-full"
      : perView === 2
      ? "md:basis-1/2"
      : perView === 4
      ? "md:basis-1/4"
      : perView >= 5
      ? "md:basis-1/5"
      : "md:basis-1/3"; // default for 3

  return (
    <div className={`relative not-prose ${className}`}>
      <Carousel
        opts={{
          align: "start",
          loop,
          slidesToScroll: perScroll,
          breakpoints: {
            "(min-width: 640px)": { slidesToScroll: Math.min(perScroll, 1) },
            "(min-width: 768px)": { slidesToScroll: Math.min(perScroll, 2) },
            "(min-width: 1024px)": { slidesToScroll: perScroll },
          },
        }}
        plugins={[
          ...(autoplayPlugin ? [autoplayPlugin] : []),
          WheelGestures({ forceWheelAxis: "x" }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {items.map((it, i) => (
            <CarouselItem key={i} className={basisClass}>
              {renderItem(it, i)}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 -translate-y-1/2 rounded-full bg-white p-3 shadow hover:bg-primary hover:text-primary-foreground transition" />
        <CarouselNext className="right-0 -translate-y-1/2 rounded-full bg-white p-3 shadow hover:bg-primary hover:text-primary-foreground transition" />
      </Carousel>
    </div>
  );
}

export default Slider;
