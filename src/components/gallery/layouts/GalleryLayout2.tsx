"use client";

import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Image from "next/image";

// adjust path
// import { itemBasisResponsive } from "@/lib/itemBasisResponsive"; // if you use that helper
import { MediaGalleryBlockData, MediaGalleryItem } from "@/lib/mappers/mapGalleryBlock";
import { ChevronLeft, ChevronRight, Circle, CircleDot } from "lucide-react"; // or whatever you used for dots
import BaseCarousel from "@/components/carousels/BaseCarousel";
import { useCollectionLayout } from "@/hooks/useCollectionLayout";
import SafeHeading, { HeadingPosition, HeadingTag } from "@/components/safeHtml/SafeHeading";

type GallerySlide = {
    kind: "Image" | "Video";
    src: string;
    alt?: string;
    caption?: string;
    videoUrl?: string;
    width?: number;
    height?: number;
};

function mapItemsToSlides(items: MediaGalleryItem[]): GallerySlide[] {
    return items
        .filter((item) =>
            item.kind === "Image"
                ? !!item.imageUrl
                : !!item.videoUrl && !!item.posterUrl
        )
        .map((item) => {
            if (item.kind === "Image") {
                return {
                    kind: "Image",
                    src: item.imageUrl!,
                    alt: item.imageAltText || "",
                    caption: item.caption ?? "",
                    width: item.width,
                    height: item.height,
                } satisfies GallerySlide;
            }

            return {
                kind: "Video",
                src: item.posterUrl!, // poster thumbnail
                alt: item.caption || "Video",
                caption: item.caption ?? "",
                videoUrl: item.videoUrl!,
                width: item.width,
                height: item.height,
            } satisfies GallerySlide;
        });
}

const PlayIconOverlay = () => (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
        <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center">
            <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M8 5v14l11-7z" />
            </svg>
        </div>
    </div>
);

const GalleryCarouselLayout = ({ block }: { block: MediaGalleryBlockData }) => {

    // console.log("carsousel gallery", block)


    const {
        items,
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

        perScroll: sliderPerScroll,
        autoplay,
        loop: loopForSlider,
        showArrow,
        showBullets,

        sliderSpeed,
    });



    const slides = mapItemsToSlides(block.items);
    const [index, setIndex] = useState(-1);
    const [nav, setNav] = useState<any>(null); // if you have Nav type, use that

    if (!slides.length) return null;






    return (
        <>
            <div className="mb-10 flex flex-wrap items-end justify-between">
                <div className="headings-wrapper">
                
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
            <BaseCarousel<GallerySlide>
                items={slides}
                className="gallery-carousel"
                // Either use your helper or static Tailwind
                // itemBasis={itemBasisResponsive({ base: 1, sm: 2, md: 3, lg: 4 })}
                itemBasis="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                slidesToScroll={slidesToScroll}
                autoplayDelay={autoplayDelay === false ? false : autoplayDelay}
                loop={block.loopForSlider}
                showArrow={false}
                showBullets={block.showBullets}
                getKey={(item, index) => `${item.kind}-${item.src}-${index}`}
                pauseAutoplay={index >= 0} // pause when lightbox open
                breakpoints={{
                    "(max-width: 640px)": { slidesToScroll: 1 },
                    "(min-width: 641px) and (max-width: 1023px)": { slidesToScroll: 1 },
                    "(min-width: 1024px)": { slidesToScroll: sliderPerScroll },
                }}
                exposeNav={setNav}
                renderItem={(item, idx) => (
                    <div key={idx} className="px-2">
                        <button
                            type="button"
                            onClick={() => setIndex(idx)}
                            className="relative block w-full overflow-hidden rounded-lg"
                        >
                            <Image
                            width={500}
                            height={500}
                                src={item.src}
                                alt={item.alt || ""}
                                className="w-full h-64 object-cover"
                            />
                            {item.kind === "Video" && <PlayIconOverlay />}
                        </button>
                    </div>
                )}
                renderDots={({ goTo, selectedIndex, scrollSnaps }) => (
                    <div className="mt-4 flex justify-center gap-3">
                        {scrollSnaps.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                type="button"
                            >
                                {selectedIndex === i ? <CircleDot /> : <Circle />}
                            </button>
                        ))}
                    </div>
                )}
            />

            {/* Lightbox: same behavior as before (images + autoplay video) */}
            <Lightbox
                open={index >= 0}
                close={() => setIndex(-1)}
                index={index}
                slides={slides.map((p) =>
                    p.kind === "Video"
                        ? {
                            type: "video",
                            width: p.width,
                            height: p.height,
                            description: p.caption,
                            sources: [{ src: p.videoUrl!, type: "video/mp4" }],
                            autoPlay: true,
                            muted: true,
                            controls: true,
                            playsInline: true,
                        }
                        : {
                            src: p.src,
                            alt: p.alt,
                            description: p.caption,
                            width: p.width,
                            height: p.height,
                        }
                )}
                plugins={[Captions, Video]}
                carousel={{ finite: true }}
                className="[--yarl__color_backdrop:rgba(0,0,0,0.6)]"
            />
        </>
    );
};

export default GalleryCarouselLayout;
