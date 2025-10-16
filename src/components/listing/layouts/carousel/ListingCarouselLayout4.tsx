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

export default function ListingCarouselLayout3({ block }: { block: ListingBlockData }) {
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
          <div key={i} className="group transition-transform duration-300 ease-out hover:-translate-y-2 relative mt-10 md:mt-20">
            <span className="absolute -top-6 lg:-top-12 left-2 z-20 text-5xl lg:text-[88px] font-extrabold leading-none group-hover:text-primary  transition-colors duration-300 ease-in-out text-white/95 drop-shadow">{String(i + 1).padStart(2, "0")}</span>
            <div
              key={item?.slug ?? i}
              className="relative block bg-black overflow-hidden "
            >
              {item?.image && (

                <Image
                  src={item.image}
                  alt={item.title ?? "Blog image"}
                  fill
                  className="object-cover block w-full aspect-[16/9] no-underline absolute inset-0 h-full   opacity-75 transition-opacity duration-300 group-hover:opacity-50"
                />

              )}
              <div className="relative p-4 sm:p-6 lg:p-8 ">


                <div className="mt-[400px]">
                  <div className="absolute bottom-0 left-0 right-0 bg-[#18252E] group-hover:bg-primary text-white transition-all duration-500 -translate-y-10 group-hover:translate-y-0">
                    <div className="px-6 py-5">



                      {item?.title && (


                        <h3 className="">
                          <Link
                            className="no-underline leading-[130%] text-2xl font-semibold  flex items-center justify-between"
                            href={item?.uri ?? "#"}
                          >
                            <span className="line-clamp-2 text-white">{item.title}</span> <svg className="w-5 flex-shrink-0 h-auto -rotate-90 text-white" stroke="#fff" fill="#fff" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16">
                              <path
                                d="M14.374,15.999 L5.562,15.999 L5.562,14.374 L13.238,14.374 L0.0,1.135 L1.137,0.1 L14.374,13.236 L14.374,5.562 L15.999,5.562 L15.999,14.374 L15.999,15.999 L14.374,15.999 Z">
                              </path>
                            </svg>
                          </Link>
                        </h3>
                      )}

                      {item?.excerpt && (
                        <div
                          className=" ">
                          <div
                            className="text-sm text-white  mt-2  max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-80 line-clamp-3 group-hover:mt-2 [&_*]:text-inherit"
                            dangerouslySetInnerHTML={{ __html: item.excerpt }}
                          />
                          {item?.date && block?.showDate && (
                            <p className="text-xs text-white mt-3">
                              {new Date(item.date).toLocaleDateString()}
                            </p>
                          )}

                          {item?.authorName && block?.showAuthor && (
                            <p className="text-xs text-white">{item?.authorName}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>


              {/* <Link
              href={item?.uri ?? "#"}
              className="view-more-link flex gap-2 no-underline items-center capitalize text-md text-primary mt-auto"
            >
              <MoveUpRight size={20} /> read more
            </Link> */}
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
