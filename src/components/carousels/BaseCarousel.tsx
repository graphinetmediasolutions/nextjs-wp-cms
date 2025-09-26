"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import WheelGestures from "embla-carousel-wheel-gestures";
import { useEffect, useRef, useState } from "react";

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

type BaseCarouselProps<TItem> = {
  items: TItem[];
  renderItem: (item: TItem, index: number) => React.ReactNode;

  itemBasis: string;
  slidesToScroll: SlidesToScroll;
  autoplayDelay?: number | false;
  loop?: boolean;

  showArrow?: boolean;
  showBullets?: boolean;

  renderArrows?: (args: BaseCarouselRenderArrowsArgs) => React.ReactNode;
  renderDots?: (args: BaseCarouselRenderDotsArgs) => React.ReactNode;

  wheelGestures?: boolean;
  duration?: number;
};

export default function BaseCarousel<TItem>({
  items,
  renderItem,
  itemBasis,
  slidesToScroll,
  autoplayDelay = 4000,
  loop = true,
  showArrow = true,
  showBullets = true,
  renderArrows,
  renderDots,
  wheelGestures = true,
  duration = 50,
}: BaseCarouselProps<TItem>) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  // Keep autoplay under our control so it always restarts after clicks
  const autoplayRef = useRef(
    typeof autoplayDelay === "number"
      ? Autoplay({
          delay: autoplayDelay,
          stopOnInteraction: false, // we will manage the timer manually
          stopOnMouseEnter: false,
          jump: false,
        })
      : null
  );

  // Sync state with Embla
  useEffect(() => {
    if (!api) return;

    const update = () => {
      setScrollSnaps(api.scrollSnapList());
      setSelectedIndex(api.selectedScrollSnap());
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
      setIsScrollable(api.scrollSnapList().length > 1);
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  // Restart the autoplay timer BEFORE navigating to avoid a double tick
  const bumpAutoplay = () => autoplayRef.current?.reset();

  const goPrev = () => {
    bumpAutoplay();
    if (canPrev) api?.scrollPrev();
  };

  const goNext = () => {
    bumpAutoplay();
    if (canNext) api?.scrollNext();
  };

  const goTo = (i: number) => {
    bumpAutoplay();
    api?.scrollTo(i);
  };

  const arrowsArgs = { goPrev, goNext, selectedIndex, scrollSnaps, canPrev, canNext, isScrollable };
  const dotsArgs = { goTo, selectedIndex, scrollSnaps };

  return (
    <div className="relative not-prose">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop,
          duration,
          slidesToScroll: slidesToScroll.lg,
          breakpoints: {
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
        plugins={[
          ...(autoplayRef.current ? [autoplayRef.current] : []),
          ...(wheelGestures ? [WheelGestures({ forceWheelAxis: "x" })] : []),
        ]}
      >
        <CarouselContent>
          {items.map((item, i) => (
            <CarouselItem key={i} className={itemBasis}>
              {renderItem(item, i)}
            </CarouselItem>
          ))}
        </CarouselContent>

       
      </Carousel>

      {/* Custom controls */}
      {renderArrows?.(arrowsArgs)}
      {renderDots && showBullets
        && renderDots(dotsArgs)}
       
    </div>
  );
}
