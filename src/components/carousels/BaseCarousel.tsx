// components/carousels/BaseCarousel.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import WheelGestures from "embla-carousel-wheel-gestures";

type SlidesToScroll = { base: number; sm: number; md: number; lg: number };

type BaseCarouselRenderArrowsArgs = {
  goPrev: () => void;
  goNext: () => void;
  selectedIndex: number;
  scrollSnaps: number[];
  canPrev: boolean;
  canNext: boolean;
  isScrollable: boolean;
};

type BaseCarouselRenderDotsArgs = {
  goTo: (i: number) => void;
  selectedIndex: number;
  scrollSnaps: number[];
};

type ExposedNav = {
  goPrev: () => void;
  goNext: () => void;
  goTo: (i: number) => void;
  selectedIndex: number;
  scrollSnaps: number[];
  canPrev: boolean;
  canNext: boolean;
  isScrollable: boolean;
};

type BaseCarouselProps<TItem> = {
  items: TItem[];
  renderItem: (item: TItem, index: number) => React.ReactNode;
  className?: string;

  /** ✅ now supports string OR (index) => string */
  itemBasis?: string | ((index: number) => string);

  slidesToScroll: SlidesToScroll;
  autoplayDelay?: number | false;
  loop?: boolean;

  showArrow?: boolean;
  showBullets?: boolean;

  renderArrows?: (args: BaseCarouselRenderArrowsArgs) => React.ReactNode;
  renderDots?: (args: BaseCarouselRenderDotsArgs) => React.ReactNode;

  wheelGestures?: boolean;
  duration?: number;
  pauseAutoplay?:boolean;
  

  /** Expose nav/state to parent so arrows can be rendered anywhere */
  exposeNav?: (nav: ExposedNav) => void;
  breakpoints?: Record<string, { slidesToScroll?: number }>;
};

export default function BaseCarousel<TItem>({
  items,
  renderItem,
  itemBasis = "basis-full", // ✅ default
  className,
  slidesToScroll,
  autoplayDelay = 4000,
  loop = true,
  showArrow = true,
  showBullets = true,
  renderArrows,
  renderDots,
  wheelGestures = true,
  duration = 50,
  breakpoints,
  exposeNav,
   pauseAutoplay=false
}: BaseCarouselProps<TItem>) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  const autoplayRef = useRef(
    typeof autoplayDelay === "number"
      ? Autoplay({
          delay: autoplayDelay,
          stopOnInteraction: false,
          stopOnMouseEnter: false,
          jump: false,
        })
      : null
  );

  const bumpAutoplay = useCallback(() => {
    autoplayRef.current?.reset?.();
  }, []);

  const goPrev = useCallback(() => {
    bumpAutoplay();
    if (api?.canScrollPrev()) api.scrollPrev();
  }, [api, bumpAutoplay]);

  const goNext = useCallback(() => {
    bumpAutoplay();
    if (api?.canScrollNext()) api.scrollNext();
  }, [api, bumpAutoplay]);

  const goTo = useCallback(
    (i: number) => {
      bumpAutoplay();
      api?.scrollTo(i);
    },
    [api, bumpAutoplay]
  );

  useEffect(() => {
    if (!api) return;

    const update = () => {
      const snaps = api.scrollSnapList();
      const sel = api.selectedScrollSnap();
      const prev = api.canScrollPrev();
      const next = api.canScrollNext();
      const scrollable = snaps.length > 1;

      setScrollSnaps(snaps);
      setSelectedIndex(sel);
      setCanPrev(prev);
      setCanNext(next);
      setIsScrollable(scrollable);

      exposeNav?.({
        goPrev,
        goNext,
        goTo,
        selectedIndex: sel,
        scrollSnaps: snaps,
        canPrev: prev,
        canNext: next,
        isScrollable: scrollable,
      });
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      try {
        api.off("select", update);
        api.off("reInit", update);
      } catch {}
    };
  }, [api, exposeNav, goPrev, goNext, goTo]);

  const plugins = useMemo(() => {
    const list: any[] = [];
    if (autoplayRef.current) list.push(autoplayRef.current);
    if (wheelGestures) list.push(WheelGestures({ forceWheelAxis: "x" }));
    return list;
  }, [wheelGestures]);

  const arrowsArgs = {
    goPrev,
    goNext,
    selectedIndex,
    scrollSnaps,
    canPrev,
    canNext,
    isScrollable,
  };
  const dotsArgs = { goTo, selectedIndex, scrollSnaps };


   useEffect(() => {
      // Debug
      console.log("get into");

      console.log(autoplayRef)
  
      if (!autoplayRef.current) return;
  
      if (pauseAutoplay) {
        autoplayRef.current.stop();
      } 
    }, []);

  return (
    <div className="relative not-prose">
      <Carousel
        setApi={setApi}
        className={className}
        opts={{
          align: "start",
          loop,
          duration,
          slidesToScroll: slidesToScroll.lg,
          breakpoints:
            breakpoints || {
              "(max-width: 639px)": { slidesToScroll: slidesToScroll.base },
              "(min-width: 640px) and (max-width: 767px)": {
                slidesToScroll: slidesToScroll.sm,
              },
              "(min-width: 768px) and (max-width: 1023px)": {
                slidesToScroll: slidesToScroll.md,
              },
              "(min-width: 1024px)": { slidesToScroll: slidesToScroll.lg },
            },
        }}
        
        plugins={plugins}
      >
        <CarouselContent>
          {items.map((item: any, i) => {
            const basis =
              typeof itemBasis === "function" ? itemBasis(i) : itemBasis; // ✅ resolve per slide
            return (
              <CarouselItem
                key={item?.id ?? item?.slug ?? i}
                className={basis}
              >
                {renderItem(item, i)}
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {showArrow && renderArrows?.(arrowsArgs)}
      {renderDots && showBullets && renderDots(dotsArgs)}
    </div>
  );
}
