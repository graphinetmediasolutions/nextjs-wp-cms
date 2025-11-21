"use client";

import React, { useState } from "react";
import {
  type TestimonialBlockData,
  type HeadingTag,
} from "@/lib/mappers/mapTestimonialBlock";
import SafeHeading, {
  HeadingPosition,
} from "@/components/safeHtml/SafeHeading";
import Image from "next/image";
import { perViewToGridCols } from "@/hooks/useCollectionLayout";
import SafeRichText from "@/components/safeHtml/SafeRichText";
import VideoDialog from "@/components/VideoDialog";
import Link from "next/link";

const TestimonialsGridLayout5 = ({ block }: { block: TestimonialBlockData }) => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { items, displayPerRow } = block;
  const gridCols = perViewToGridCols(displayPerRow);

  console.log(items)

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
      {/* 🔹 Single shadcn Dialog for all testimonials */}


      <VideoDialog open={open} url={activeVideoUrl} onClose={handleCloseDialog} />

      {/* Headings */}
      {block?.subheading && (
        <SafeHeading
          position={
            (block?.subheadingPosition?.[0] as HeadingPosition) ?? "Left"
          }
          className="text-sm font-semibold mb-3"
          as="p"
          html={block.subheading}
        />
      )}

      {block?.heading && (
        <SafeHeading
          position={(block?.headingPosition?.[0] as HeadingPosition) ?? "Left"}
          html={block.heading}
          as={(block?.headingTag?.[0] as HeadingTag) ?? "h2"}
          className="mb-4 text-4xl md:text-5xl font-bold leading-snug"
        />
      )}



      {/* Grid of testimonials */}
      <div className={`grid gap-6 ${gridCols}`}>
        {Array.isArray(items) &&
          items.length > 0 &&
          items.map((item, index) => (




            <div key={item?.name?.replace(/\s+/g, "") ?? index} className=" bg-black text-white rounded-2xl">

              <div className="relative -mt-px overflow-hidden rounded-2xl">



                {item?.image && (
                  <Image
                    width={300}
                    height={270}
                    className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"
                    src={item?.image}
                    alt={item?.imageAlt || ""}
                  />
                )}


                <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
              </div>

              <div className="px-4 pb-4">
                <SafeRichText
                  html={item?.quote}
                  className="font-medium border-b border-gray-600 pb-5 text-white"
                />

                <div className="flex gap-2 justify-between">

                  <div className="">

                    {item?.name && (
                      <SafeHeading
                        html={item.name}
                        as="h3"
                        className="mt-4 text-white"
                      />
                    )}
                    {
                      item?.role && (
                        <span className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">
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
                      <div className=" ">
                        <svg
                          width="40"
                          height="40"
                          fill="white"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  )}
                </div>

              </div>




            </div>


          ))}
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
};

export default TestimonialsGridLayout5;
