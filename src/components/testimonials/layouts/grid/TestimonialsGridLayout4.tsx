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

const TestimonialsGridLayout4 = ({ block }: { block: TestimonialBlockData }) => {
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




            <div key={index} className="flex flex-col  mx-4 my-6 shadow-lg">
              <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-gray-50">
                <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 dark:text-violet-600">
                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                  </svg><SafeRichText
                    html={item?.quote}
                    className="leading-loose text-gray-500 dark:text-gray-400"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 dark:text-violet-600">
                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                  </svg>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-violet-600 dark:text-gray-50">

                {item?.image && (
                  <Image
                    width={56}
                    height={56}
                    className="object-cover rounded-full w-14 h-14"
                    src={item?.image}
                    alt={item?.imageAlt || ""}
                  />
                )}
                {item?.name && (
                  <SafeHeading
                    html={item.name}
                    as="h3"
                    className="font-semibold text-gray-800 dark:text-white"
                  />
                )}
                {
                  item?.role && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.role}
                    </span>
                  )
                }
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


          ))}
      </div>
    </>
  );
};

export default TestimonialsGridLayout4;
