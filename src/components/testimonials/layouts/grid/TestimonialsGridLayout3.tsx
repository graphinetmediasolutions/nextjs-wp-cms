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

const TestimonialsGridLayout3 = ({ block }: { block: TestimonialBlockData }) => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { items, displayPerRow, showPost } = block;
  const gridCols = perViewToGridCols(displayPerRow);

  const limit = Number(showPost);


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
      <div className="flex justify-center mx-auto mt-6 mb-20 ">
        <span className="inline-block w-40 h-1 bg-primary rounded-full" />
        <span className="inline-block w-3 h-1 mx-1 bg-primary rounded-full" />
        <span className="inline-block w-1 h-1 bg-primary rounded-full" />
      </div>


      {/* Grid of testimonials */}
      <div className={`grid gap-6 ${gridCols} `}>
        {Array.isArray(items) &&
          items.length > 0 &&
         items?.slice(0, limit === -1 ? items.length : limit)?.map((item, index) => (



            <div className="" key={`${item?.name?.replace(/\s+/g, "") || "item"}-${index}`}>

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

export default TestimonialsGridLayout3;
