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

export default function TestimonialsCarouselLayout3({ block }: { block: TestimonialBlockData }) {
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
      <div className="flex items-start max-w-6xl mx-auto mt-16">
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

          </div>
        )}


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

          getKey={(item, index) =>

            `${(item.name || "anon")
              .toLowerCase()
              .replace(/\s+/g, "")}-${index}`
          }
          pauseAutoplay={open}

          breakpoints={{
            "(max-width: 640px)": { slidesToScroll: 1 },
            "(min-width: 641px) and (max-width: 1023px)": { slidesToScroll: 1 },
            "(min-width: 1024px)": { slidesToScroll: sliderPerScroll }, // ✅ Your custom logic per layout
          }}
          exposeNav={setNav}
          renderItem={(item, index) => (
            <div className="" key={index}>

              <SafeRichText
                html={item?.quote}
                className="flex items-center text-center text-gray-500 lg:mx-8"
              />

              <div className="flex flex-col items-center justify-center mt-8">

                {item?.image && (
                  <Image
                    width={56}
                    height={56}
                    className="object-cover rounded-full w-14 h-14"
                    src={item?.image}
                    alt={item?.imageAlt || ""}
                  />
                )}

                <div className="mt-4 text-center">

                  {item?.name && (
                    <SafeHeading
                      html={item.name}
                      as="h3"
                      position="Center"
                      className="font-semibold text-gray-800 dark:text-white text-center"
                    />
                  )}
                  {/* <span className="text-sm text-gray-500 dark:text-gray-400">Marketer</span> */}
                  {
                    item?.role && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {item.role}
                      </span>
                    )
                  }
                </div>
                {item?.videoUrl && (
                  <button
                    type="button"
                    onClick={() => handleOpenVideo(item.videoUrl)}
                    className=" flex items-center justify-center cursor-pointer"
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

        {showArrows && nav?.isScrollable && (
          <div className="flex items-center   gap-3 mt-6">

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



      {block?.actionButtonText && block?.actionButtonUrl && (
        <div className="mt-8 text-center">
          <Link
            href={block?.actionButtonUrl ?? "#"}
            className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition"
          >
            {block?.actionButtonText}
          </Link>
        </div>
      )}


    </>
  );
}
