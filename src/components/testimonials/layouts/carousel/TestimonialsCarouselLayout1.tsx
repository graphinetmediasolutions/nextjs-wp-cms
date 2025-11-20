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
import { TestimonialBlockData, TestimonialItem } from "@/lib/mappers/mapTestimonialBlock";
import SafeRichText from "@/components/safeHtml/SafeRichText";
import VideoDialog from "@/components/VideoDialog";

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

export default function TestimonialsCarouselLayout1({ block }: { block: TestimonialBlockData }) {
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

  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

   const [pause, setPause] = useState(false);

   


  const handleOpenVideo = (url?: string | null) => {

    console.log(url)
    if (!url) return;
    setActiveVideoUrl(url);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    // optional: if you want fresh reload each time:
    // setActiveVideoUrl(null);
  };





  return (
    <>
    
      <VideoDialog open={open} url={activeVideoUrl} onClose={handleCloseDialog} />
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


      </div>

      <BaseCarousel<TestimonialItem>
        items={items}
        className="testimonial-layout-carousel-one"
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
        renderItem={(item, index) => (
          <div key={index} className="lg:-mx-6 lg:flex lg:items-center">
            {/* LEFT: image + play button overlay */}
            <div className="relative lg:w-1/2 lg:mx-6 w-full h-96 lg:h-[36rem]">
              {item?.image && (
                <Image
                  width={1000}
                  height={700}
                  className="object-cover object-top w-full h-full rounded-lg"
                  src={item.image}
                   alt={item?.imageAlt || ""}
                />
              )}

              {item?.videoUrl && (
                <button
                  type="button"
                  onClick={() => handleOpenVideo(item.videoUrl)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                >
                  <div className="bg-white/70 backdrop-blur rounded-full p-4">
                    <svg
                      width="40"
                      height="40"
                      fill="black"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>

            {/* RIGHT: text */}
            <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
              <p className="text-5xl font-semibold text-primary">
                <svg
                  fill="#000000"
                  width="80px"
                  height="80px"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>quote</title>
                  <path d="M9.563 8.469l-0.813-1.25c-5.625 3.781-8.75 8.375-8.75 12.156 0 3.656 2.688 5.375 4.969 5.375 2.875 0 4.906-2.438 4.906-5 0-2.156-1.375-4-3.219-4.688-0.531-0.188-1.031-0.344-1.031-1.25 0-1.156 0.844-2.875 3.938-5.344zM21.969 8.469l-0.813-1.25c-5.563 3.781-8.75 8.375-8.75 12.156 0 3.656 2.75 5.375 5.031 5.375 2.906 0 4.969-2.438 4.969-5 0-2.156-1.406-4-3.313-4.688-0.531-0.188-1-0.344-1-1.25 0-1.156 0.875-2.875 3.875-5.344z"></path>
                </svg>
              </p>

              <SafeRichText
                html={item?.quote}
                className="max-w-lg mt-4 text-gray-500 dark:text-gray-400"
              />

              {item?.name && (
                <SafeHeading
                  html={item.name}
                  as="h3"
                  className="mt-6 text-lg font-medium text-primary"
                />
              )}

              {item?.role && (
                <p className="text-gray-600 dark:text-gray-300">
                  {item.role}
                </p>
              )}
              {/* 👇 External arrows, fully controlled at layout level */}
              {showArrows && nav?.isScrollable && (
                <div className="flex items-center   gap-3 mt-6">
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


      {/* {block.actionButtonText && (
        <div className="mt-8 text-center">
          <Link
            href={block.parentPages?.[0]?.uri ?? "#"}
            className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition"
          >
            {block.actionButtonText}
          </Link>
        </div>
      )} */}
    </>
  );
}
