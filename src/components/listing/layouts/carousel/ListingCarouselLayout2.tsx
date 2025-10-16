// components/blog/layouts/BlogCarouselLayout1.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MoveUpRight,
  Circle,
  CircleDot,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import BaseCarousel from "@/components/carousels/BaseCarousel";
import { itemBasisResponsive, useCollectionLayout } from "@/hooks/useCollectionLayout";
import type { ListingBlockData, ListingItem } from "@/lib/mappers/mapListingBlock";
import SafeHeading, { HeadingPosition, type HeadingTag } from "@/components/safeHtml/SafeHeading";

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

export default function ListingCarouselLayout2({ block }: { block: ListingBlockData }) {
  const {
    items,
    displayPerRow = 3,
    sliderPerScroll = 1,
    autoplay,
    sliderSpeed = 4000,
    loopForSlider,
    showArrow,
    showBullets,
  } = block;

  const {
    itemBasis,
    slidesToScroll,
    autoplayDelay,
    loop,
    showArrows,
    IsShowBullets,
  } = useCollectionLayout({
    perView: displayPerRow,
    perScroll: sliderPerScroll,
    autoplay,
    loop: loopForSlider,
    showArrow,
    showBullets,
    sliderSpeed,
  });

  // 👇 This holds the nav API/state exposed by BaseCarousel
  const [nav, setNav] = useState<ExposedNav | null>(null);

  return (
    <>
      {/* Header (arrows placed here) */}
      <div className="mb-10 flex flex-wrap items-end justify-between">
        <div className="headings-wrapper">
          {block?.subheading && (
            <SafeHeading
              position={(block?.subheadingPosition?.[0] as HeadingPosition) ?? "Left"}
              className="text-sm font-semibold   mb-3"
              as="p"
              html={block.subheading}
            />
          )}
          {block?.heading && (
            <SafeHeading
              position={(block?.headingPosition?.[0] as HeadingPosition) ?? "Left"}
              html={block.heading}
              as={block?.headingTag?.[0] as HeadingTag ?? "h2"}
              className="mb-4 md:mb-0 text-4xl md:text-5xl font-bold leading-snug"
            />
          )}
        </div>

        {/* 👇 External arrows, fully controlled at layout level */}
        {showArrows && nav?.isScrollable && (
          <div className="flex items-center justify-end ml-auto gap-3">
            <button
              onClick={() => nav.goPrev()}
              disabled={!nav.canPrev}
              aria-label="Previous"
              className="grid h-10 w-10 place-items-center rounded-full bg-white shadow disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => nav.goNext()}
              disabled={!nav.canNext}
              aria-label="Next"
              className="grid h-10 w-10 place-items-center rounded-full bg-white shadow disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>

      <BaseCarousel<ListingItem>
        items={items}
        className="blog-layout-carousel-two"
        itemBasis={itemBasisResponsive({ base: 1, sm: 2, md: 2, lg: displayPerRow })}
        // itemBasis="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
        slidesToScroll={slidesToScroll}
        autoplayDelay={autoplayDelay === false ? false : autoplayDelay}
        loop={loop}
        showArrow={false}
        showBullets={IsShowBullets}
        breakpoints={{
          "(max-width: 640px)": { slidesToScroll: 1 },
          "(min-width: 641px) and (max-width: 1023px)": { slidesToScroll: 1 },
          "(min-width: 1024px)": { slidesToScroll: sliderPerScroll }, // ✅ Your custom logic per layout
        }}
        exposeNav={setNav}
        renderItem={(item, i) => (
          <div
            key={item?.slug ?? i}
            className="group h-full relative blog-b-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-in-out flex flex-col"
          >
            <span className="absolute z-20 top-4 left-4 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">Admissions</span>

            {item?.image && (
              <Link
                href={item?.uri ?? "#"}
                className="block relative w-full aspect-[16/9] no-underline"
              >
                <Image
                  src={item.image}
                  alt={item.title ?? "Blog image"}
                  fill
                  className="object-cover rounded-lg"
                />
              </Link>
            )}

            <div className="content flex flex-col gap-4 p-5 flex-1 items-start">
              <div>
                {item?.date && block?.showDate && (
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                )}

                {item?.authorName && block?.showAuthor && (
                  <p className="text-xs text-gray-500">{item?.authorName}</p>
                )}
              </div>


              {item?.title && (
                <h3>
                  <Link
                    className="no-underline leading-[130%] text-2xl font-semibold line-clamp-2"
                    href={item?.uri ?? "#"}
                  >
                    {item.title}
                  </Link>
                </h3>
              )}

              {item?.excerpt && (
                <div
                  className="text-sm text-gray-600 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: item.excerpt }}
                />
              )}
              <Link
                href={item?.uri ?? "#"}
                className="view-more-link w-auto btn btn-primary inline-flex gap-2 no-underline items-center capitalize tpx-5 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors duration-300 mt-auto"
              >
                read more
              </Link>
            </div>



          </div>
        )}
        // keep dots inside (optional). If you want to move them out, set showBullets={false} and render below using `nav`.
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

      {/* OPTIONAL: external dots instead (uncomment if you turn off showBullets above) */}
      {/* {IsShowBullets && nav?.isScrollable && (
        <div className="mt-6 flex justify-center gap-3">
          {nav.scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => nav.goTo(i)}
              aria-label={`Go to ${i + 1}`}
              type="button"
            >
              {nav.selectedIndex === i ? <CircleDot /> : <Circle />}
            </button>
          ))}
        </div>
      )} */}
      {block.actionButtonText && (
        <div className="mt-8 text-center">
          <Link
            href={block.parentPages?.[0]?.uri ?? "#"}
            className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition"
          >
            {block.actionButtonText}
          </Link>
        </div>
      )}
    </>
  );
}
