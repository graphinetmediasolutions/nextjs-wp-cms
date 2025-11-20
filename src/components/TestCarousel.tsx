// components/TestCarousel.tsx
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type TestCarouselProps = {
  pause: boolean;
};

export function TestCarousel({ pause }: TestCarouselProps) {
  // Same pattern as shadcn docs
  const autoplay = React.useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  React.useEffect(() => {
    // Debug
    // console.log("pause =", pause, "plugin =", autoplay.current);

    if (!autoplay.current) return;

    if (pause) {
      autoplay.current.stop();
    } else {
      // restart timer
      autoplay.current.reset();
    }
  }, [pause]);

  return (
    <div className="max-w-xl mx-auto">
      <Carousel plugins={[autoplay.current]}>
        <CarouselContent>
          <CarouselItem className="basis-full">
            <div className="h-40 flex items-center justify-center bg-red-200">
              Slide 1
            </div>
          </CarouselItem>
          <CarouselItem className="basis-full">
            <div className="h-40 flex items-center justify-center bg-green-200">
              Slide 2
            </div>
          </CarouselItem>
          <CarouselItem className="basis-full">
            <div className="h-40 flex items-center justify-center bg-blue-200">
              Slide 3
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
