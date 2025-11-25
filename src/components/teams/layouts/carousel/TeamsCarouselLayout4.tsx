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
// import type { ListingBlockData, ListingItem, type HeadingTag } from "@/lib/mappers/mapListingBlock";
import SafeHeading, { HeadingPosition, type HeadingTag } from "@/components/safeHtml/SafeHeading";
import { TestimonialBlockData, TestimonialItem } from "@/lib/mappers/mapTestimonialBlock";
import SafeRichText from "@/components/safeHtml/SafeRichText";
import VideoDialog from "@/components/VideoDialog";
import { TeamsBlockData, TeamItem } from "@/lib/mappers/mapTeamsBlock";
import ContentDialog from "@/components/ContentDialog";

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

export default function TeamsCarouselLayout4({ block }: { block: TeamsBlockData }) {
  const {
    items,
    displayPerRow = 3,
    sliderPerScroll = 1,
    autoplay,
    sliderSpeed = 4000,
    loopForSlider,
    showArrow,
    showBullets,
    showPost
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

  const rawLimit = showPost ?? -1;

  const limit =
    typeof rawLimit === "number"
      ? rawLimit
      : parseInt(rawLimit as string, 10);

  // Final list of items to show
  const visibleItems =
    !Array.isArray(items)
      ? []
      : limit === -1
        ? items
        : items.slice(0, limit);





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

      <BaseCarousel<TeamItem>
        items={visibleItems}
        className="teams-layout-carousel-four"
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
          <div
            className="grid w-full h-full sm:grid-cols-[2fr_3fr] items-center bg-gray-100 gap-4 rounded-lg overflow-hidden hover:scale-[1.02] transition-all">
            <div className="bg-gray-50 w-full sm:min-h-60 h-full relative">

              {item?.photo && (
                <Image
                  width={224}
                  height={240}
                  className="w-full h-full object-cover object-top"
                  src={item?.photo}
                  alt={item?.photoAlt || ""}
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

            <div className="p-4">
              {
                item?.name && <SafeHeading
                  position="Left"
                  className="text-slate-900 text-base font-semibold"
                  as="h3"
                  html={item?.name}

                />
              }
              {
                item?.designation && <SafeHeading
                  position="Left"
                  className="text-slate-600 text-xs mt-1"
                  as="h4"
                  html={item?.designation}
                />
              }
              <div className="mt-4">

                {
                  item?.shortBio && <SafeRichText
                    className="text-slate-600 text-sm leading-relaxed"
                    html={item?.shortBio}


                  />
                }
                {
                  item?.detailBio && <ContentDialog
                    content={item?.detailBio}
                    buttonLabel="Read more"
                    title="More Details"
                    className="mt-4 cursor-pointer"
                  />
                }
              </div>
              <div className="space-x-3 mt-4">
                <button type="button"
                  className="w-6 h-6 inline-flex items-center max-sm:flex-col justify-center rounded-full border-0 outline-0 cursor-pointer bg-blue-600 hover:bg-blue-700 active:bg-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 155.139 155.139">
                    <path
                      d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
                      data-original="#010002" />
                  </svg>
                </button>
                <button type="button"
                  className="w-6 h-6 inline-flex items-center max-sm:flex-col justify-center rounded-full border-0 outline-0 cursor-pointer bg-[#03a9f4] hover:bg-[#03a1f4] active:bg-[#03a9f4]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 512 512">
                    <path
                      d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
                      data-original="#03a9f4" />
                  </svg>
                </button>
                <button type="button"
                  className="w-6 h-6 inline-flex items-center max-sm:flex-col justify-center rounded-full border-0 outline-0 cursor-pointer bg-[#0077b5] hover:bg-[#0055b5] active:bg-[#0077b5]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 24 24">
                    <path
                      d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z"
                      data-original="#0077b5" />
                  </svg>
                </button>
              </div>
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
