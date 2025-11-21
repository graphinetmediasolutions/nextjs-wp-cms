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
import VideoPlayer from "@/components/VideoPlayer";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import VideoDialog from "@/components/VideoDialog";
import Link from "next/link";

const TestimonialsGridLayout1 = ({ block }: { block: TestimonialBlockData }) => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { items, displayPerRow } = block;
  const gridCols = perViewToGridCols(displayPerRow);

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
            <div key={item?.name?.replace(/\s+/g, "") ?? index} className="lg:-mx-6 lg:flex lg:items-center">
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

export default TestimonialsGridLayout1;
