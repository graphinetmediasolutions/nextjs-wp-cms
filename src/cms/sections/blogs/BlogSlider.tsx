"use client";
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";

import Image from "next/image";

import { useSwiperNavigation } from "@/hooks/useSwiperNavigation";
import { MoveLeft, MoveRight } from "lucide-react";

type BlogItem = {
    blogDate?: string | null;
    blogExcerpt?: string | null;
    blogSlug?: string | null;
    blogTitle?: string | null;
    blogAuthor?: string | null;
    blogImage?: { node?: { sourceUrl?: string | null } | null } | null;
};

export function BlogSwiper({
    items,
    perView = 3,
    perScroll = 1,
    loop = true,
    autoplay = false,
}: {
    items: BlogItem[];
    perView?: number;
    perScroll?: number;
    loop?: boolean;
    autoplay?: boolean | number;
}) {
    const {
        swiperRef,
        prevRef,
        nextRef,
        isBeginning,
        isEnd,
        navigation,
        handleBeforeInit,
        handleSlideChange,
        handleSwiper,
    } = useSwiperNavigation();

    const breakpoints = {
        0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 16 },
        640: { slidesPerView: 2, slidesPerGroup: Math.min(perScroll, 1), spaceBetween: 16 },
        768: { slidesPerView: 3, slidesPerGroup: Math.min(perScroll, 2), spaceBetween: 20 },
        1024: { slidesPerView: perView, slidesPerGroup: perScroll, spaceBetween: 24 },
    };

    const autoplayConfig =
        typeof autoplay === "number"
            ? { delay: autoplay, pauseOnMouseEnter: true, disableOnInteraction: false }
            : autoplay
                ? { delay: 4000, pauseOnMouseEnter: true, disableOnInteraction: false }
                : false;

    return (
        <div className="relative overflow-hidden py-16">
            <Image
                src="https://picsum.photos/1000/1000?random=5"
                fill={true}
                alt="" className=""
                style={{ objectFit: "cover", pointerEvents: "none", userSelect: "none" }}
            />
            <div className="container ">

                <div className="flex mb-10 flex-wrap relative z-10">
                    <div className="w-full flex-col md:w-1/2 flex  lg:w-[40%] xl:w-1/2">
                        <div className="text-white text-sm font-semibold flex items-center gap-1 mb-3">
                            <span>♥</span> Together, We Can Change Lives Forever.
                        </div>
                        <h2 className="text-white bg-brand sec-main-title mb-4 md:mb-0 text-4xl md:text-5xl font-bold leading-snug">
                            Blogs
                        </h2>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-end items-center gap-3 lg:w-[40%] xl:1/2">
                        {/* Custom Prev Button */}
                        <button
                            ref={prevRef}
                            className="relative z-10 rounded-full bg-white shadow-md p-3 text-gray-700 hover:bg-primary hover:text-white transition disabled:opacity-40"
                            aria-label="Previous slide"
                        >
                            <MoveLeft />
                        </button>

                        {/* Custom Next Button */}
                        <button
                            ref={nextRef}
                            className="relative z-10 rounded-full bg-white shadow-md p-3 text-gray-700 hover:bg-primary hover:text-white transition disabled:opacity-40"
                            aria-label="Next slide"
                        >
                            <MoveRight />
                        </button>
                    </div>
                </div>


                <Swiper
                    ref={swiperRef}
                    modules={[Mousewheel, FreeMode, Navigation]}
                    // freeMode={{
                    //     enabled: true,
                    //     momentum: true,
                    //     momentumRatio: 1,
                    //     momentumBounce: false,
                    // }}
                    mousewheel={{
                        enabled: true,
                        forceToAxis: true,
                        releaseOnEdges: true,
                    }}
                    navigation={navigation}
                    onBeforeInit={handleBeforeInit}
                    onSlideChange={handleSlideChange}
                    onSwiper={handleSwiper}
                    spaceBetween={20}
                    slidesPerView={3}
                    loop={loop} 
                    speed={550}
                    autoplay={autoplayConfig || undefined}
                    breakpoints={breakpoints}
                    // 👇 Hook up refs for navigation
                    onInit={(swiper) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (swiper.params.navigation as any).prevEl = prevRef.current;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (swiper.params.navigation as any).nextEl = nextRef.current;
                    }}

                    className="!px-1"
                >
                    {items.map((it, i) => (
                        <SwiperSlide className="flex !h-auto" key={it.blogSlug ?? i}>
                            <article className="group bg-white rounded-lg p-6 shadow relative z-10 overflow-hidden h-full
                            after:content-['']
                            after:absolute
                            after:-z-10
                            after:top-[calc(0%-clamp(50px,3.68vw,70px))]
                            after:left-[calc(0%-clamp(47px,3.52vw,67px))]
                            after:w-[clamp(202px,13.77vw,262px)]
                            after:aspect-[1/1]
                            after:rounded-full
                            after:bg-[#D9D9D9]
                            after:transition-colors
                            after:duration-400
                            after:ease-in-out
                            hover:after:bg-primary
                            
                            ">
                                {it.blogImage?.node?.sourceUrl && (
                                    <div className="relative w-full aspect-[16/9]  ">
                                        <Image
                                            src={it.blogImage.node.sourceUrl}
                                            alt={it.blogTitle ?? ""}
                                            fill
                                            className="object-cover rounded-xl"
                                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                        />
                                    </div>
                                )}
                                <div className="p-5 grid gap-3">
                                    {it.blogDate && <time className="text-xs text-gray-500">{it.blogDate}</time>}
                                    {it.blogTitle && (
                                        <h3 className="text-lg font-semibold leading-snug group-hover:underline">
                                            <a href={`/blog/${it.blogSlug}`}>{it.blogTitle}</a>
                                        </h3>
                                    )}
                                    {it.blogExcerpt && <p className="text-sm text-gray-600 line-clamp-3">{it.blogExcerpt}</p>}
                                    {it.blogAuthor && <p className="text-xs text-gray-500">By {it.blogAuthor}</p>}
                                </div>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>



        </div>
    );
}
