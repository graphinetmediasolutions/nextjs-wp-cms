"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveUpRight, Circle, CircleDot, ChevronLeft, ChevronRight } from "lucide-react";

import BaseCarousel from "@/components/carousels/BaseCarousel";
import { useCollectionLayout } from "@/hooks/useCollectionLayout";
import { type BlogItem } from "@/lib/mappers/mapBlogBlock";

type Props = {
  items: BlogItem[];
  perView?: number;
  perScroll?: number;
  autoplay?: boolean | number | string;
  loop?: boolean;
  showArrow?: boolean;
  showBullets?: boolean;
  sliderSpeed?: number | string;
};

export default function BlogCarouselLayout1({
  items,
  perView = 3,
  perScroll = 1,
  autoplay = 4000,
  loop = true,
  showArrow,
  showBullets,
  sliderSpeed,
}: Props) {
  const {
    itemBasis,
    slidesToScroll,
    autoplayDelay,
    loop: shouldLoop,
    showArrows,
    IsShowBullets,
  } = useCollectionLayout({ perView, perScroll, autoplay, loop, showArrow, showBullets, sliderSpeed });

  return (
    <BaseCarousel<BlogItem>
      items={items}
      itemBasis={itemBasis}
      slidesToScroll={slidesToScroll}
      autoplayDelay={autoplayDelay === false ? false : autoplayDelay}
      loop={shouldLoop}
      // These are used only if you don't pass custom renderers:
      showArrow={showArrows}
      showBullets={IsShowBullets}
      // --- Slide UI (unique per layout) ---
      renderItem={(item) => (
        <div className="rounded-lg bg-white shadow hover:shadow-lg transition overflow-hidden h-full">
          {item?.image && (
            <Link
              href={item?.uri ?? "#"}
              className="block relative w-full aspect-[16/9]"
            >
              <Image
                src={item?.image}
                alt={item?.title ?? "Blog image"}
                fill
                className="object-cover"
              />
            </Link>
          )}

          <div className="p-4 space-y-2">
            {item?.date && (
              <time className="text-xs text-gray-500">
                {new Date(item?.date).toLocaleDateString()}
              </time>
            )}

            {item?.title && (
              <h3 className="text-lg font-semibold hover:underline">
                <Link href={item?.uri ?? "#"}>{item?.title}</Link>
              </h3>
            )}

            {item?.excerpt && (
              <p className="text-sm text-gray-600 line-clamp-3">
                {item?.excerpt}
              </p>
            )}

            <Link
              href={item?.uri ?? "#"}
              className="inline-flex items-center gap-2 text-primary"
            >
              <MoveUpRight size={20} /> read more
            </Link>
          </div>
        </div>
      )}
      // --- Custom arrows (per-layout icons/placement) ---
      renderArrows={({ goPrev, goNext }) => (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={goNext}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow"
          >
            <ChevronRight />
          </button>
        </>
      )}
      // --- Custom dots (per-layout style/placement) ---
      renderDots={({ goTo, selectedIndex, scrollSnaps }) => (
        <div className="mt-6 flex justify-center gap-3">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to ${i + 1}`}
              type="button"
            >
              {selectedIndex === i ? <CircleDot /> : <Circle />}
            </button>
          ))}
        </div>
      )}
    />
  );
}
