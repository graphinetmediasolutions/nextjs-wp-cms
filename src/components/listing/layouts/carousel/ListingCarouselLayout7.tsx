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

export default function ListingCarouselLayout7({ block }: { block: ListingBlockData }) {
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
        className="blog-layout-carousel-three "
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
          <div key={i} className="relative h-full p-6 
    bg-gradient-to-r from-primary to-primary 
    bg-[length:0%_100%] bg-left bg-no-repeat
    transition-[background-size] duration-500 ease-out
    hover:bg-[length:100%_100%] hover:text-white group  border border-gray-200 ">

            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            {item?.title && (


              <h3 className="">
                <Link
                  className="no-underline   line-clamp-  text-lg text-gray-900 group-hover:text-white font-medium title-font mb-2"
                  href={item?.uri ?? "#"}
                >
                  {item.title}
                </Link>
              </h3>
            )}

            {item?.excerpt && (
              <div
                className=" ">
                <div
                  className="text-sm text-black mt-2 group-hover:text-white  overflow-hidden transition-all line-clamp-3  [&_*]:text-inherit"
                  dangerouslySetInnerHTML={{ __html: item.excerpt }}
                />
                {item?.date && block?.showDate && (
                  <p className="text-xs text-black mt-3 group-hover:text-white">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                )}

                {item?.authorName && block?.showAuthor && (
                  <p className="text-xs text-black group-hover:text-white">{item?.authorName}</p>
                )}
              </div>
            )}

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
