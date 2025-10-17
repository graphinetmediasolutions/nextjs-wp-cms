"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Circle, CircleDot, ChevronLeft, ChevronRight } from "lucide-react";

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

export default function ListingCarouselLayout5({ block }: { block: ListingBlockData }) {
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

  const isTwo = displayPerRow === 2;
  const isWide = (i: number) => i % 6 === 0 || i % 6 === 3;

// widths
const itemBasisFn = (i: number) =>
  isTwo
    ? [
        "basis-full sm:basis-1/2 md:basis-1/2",
        isWide(i) ? "lg:basis-[66.6667%]" : "lg:basis-[33.3333%]",
      ].join(" ")
    : itemBasisResponsive({ base: 1, sm: 2, md: 2, lg: displayPerRow });

// aspect ratios
const aspectFor = (i: number) =>
  isTwo
    ? [
        "aspect-[16/13]",
        isWide(i) ? "lg:[aspect-ratio:930/480]" : "lg:[aspect-ratio:450/480]",
      ].join(" ")
    : "aspect-[16/13] lg:aspect-[16/13]";

  const [nav, setNav] = useState<ExposedNav | null>(null);

  return (
    <>
      {/* Header */}
      <div className="mb-10 flex flex-wrap items-end justify-between">
        <div className="headings-wrapper">
          {block?.subheading && (
            <SafeHeading
              position={(block?.subheadingPosition?.[0] as HeadingPosition) ?? "Left"}
              className="mb-3 text-sm font-semibold"
              as="p"
              html={block.subheading}
            />
          )}
          {block?.heading && (
            <SafeHeading
              position={(block?.headingPosition?.[0] as HeadingPosition) ?? "Left"}
              html={block.heading}
              as={(block?.headingTag?.[0] as HeadingTag) ?? "h2"}
              className="mb-4 text-4xl font-bold leading-snug md:mb-0 md:text-5xl"
            />
          )}
        </div>

        {showArrows && nav?.isScrollable && (
          <div className="ml-auto flex items-center justify-end gap-3">
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

      {/* Carousel */}
      <BaseCarousel<ListingItem>
        items={items}
        className="blog-layout-carousel-five"
        itemBasis={itemBasisFn}
        slidesToScroll={slidesToScroll}
        autoplayDelay={autoplayDelay === false ? false : autoplayDelay}
        loop={loop}
        showArrow={false}
        showBullets={IsShowBullets}
        breakpoints={{
          "(max-width: 640px)": { slidesToScroll: 1 },
          "(min-width: 641px) and (max-width: 1023px)": { slidesToScroll: 1 },
          "(min-width: 1024px)": { slidesToScroll: sliderPerScroll },
        }}
        exposeNav={setNav}
        renderItem={(item, i) => (
          <div
            key={item?.slug ?? i}
            className="service-a-card group relative overflow-hidden rounded-[20px] bg-neutral-100"
          >
            {/* Image */}
            <div
              className={`service-a-img-box relative overflow-hidden rounded-[20px] ${aspectFor(i)}`}
            >
              {item?.image && (
                <Image
                  src={item.image}
                  alt={item.title ?? "Blog image"}
                  fill
                  className="h-full w-full rounded-[20px] object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              )}
            </div>

            {/* Floating content */}
            <div className="service-a-content-box z-10 absolute bottom-[10px] left-[10px] right-[10px] rounded-[12px] p-6 transition-all duration-300 ease-in-out flex items-center justify-between gap-4 bg-primary md:translate-x-0">
              <div className="w-[92%]">
                {item?.title && (
                  <h3>
                    <Link
                      className="mb-2 text-[20px] font-bold leading-normal text-white hover:text-black md:text-[26px]"
                      href={item?.uri ?? "#"}
                    >
                      <span className="line-clamp-2 text-white">{item.title}</span>
                    </Link>
                  </h3>
                )}

                {item?.excerpt && (
                  <div>
                    <div
                      className="mt-0 max-h-0 overflow-hidden text-sm text-white transition-all line-clamp-3 duration-500 group-hover:mt-2 group-hover:max-h-80 [&_*]:text-inherit"
                      dangerouslySetInnerHTML={{ __html: item.excerpt }}
                    />
                    {item?.date && block?.showDate && (
                      <p className="mt-3 text-xs text-white">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    )}
                    {item?.authorName && block?.showAuthor && (
                      <p className="text-xs text-white">{item?.authorName}</p>
                    )}
                  </div>
                )}
              </div>

              <Link
                className="!min-w-[47px] w-[47px] h-[47px] rounded-full bg-gray-300 flex items-center justify-center"
                href={item?.uri ?? "#"}
                aria-label="Open"
              >
                <svg
                  className="h-auto w-3 -rotate-90 flex-shrink-0 text-black"
                  stroke="currentColor"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.374,15.999 L5.562,15.999 L5.562,14.374 L13.238,14.374 L0,1.135 L1.137,0.1 L14.374,13.236 L14.374,5.562 L15.999,5.562 L15.999,14.374 L15.999,15.999 L14.374,15.999 Z" />
                </svg>
              </Link>
            </div>
          </div>
        )}
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

      {block.actionButtonText && (
        <div className="mt-8 text-center">
          <Link
            href={block.parentPages?.[0]?.uri ?? "#"}
            className="inline-block rounded bg-primary px-6 py-3 text-white transition hover:bg-primary/90"
          >
            {block.actionButtonText}
          </Link>
        </div>
      )}
    </>
  );
}
