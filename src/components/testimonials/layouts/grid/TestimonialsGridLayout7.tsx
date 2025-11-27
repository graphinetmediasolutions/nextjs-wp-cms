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

const TestimonialsGridLayout7 = ({ block }: { block: TestimonialBlockData }) => {
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

      <div className="flex justify-center items-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 max-w-sm sm:max-w-2xl lg:max-w-full mx-auto">

        <div className="w-full lg:w-2/5">
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

        </div>
        <div className="w-full lg:w-3/5">
          {/* Grid of testimonials */}
          <div className={`grid gap-6 ${gridCols}`}>
            {Array.isArray(items) &&
              items.length > 0 &&
               items?.slice(0, limit === -1 ? items.length : limit)?.map((item, index) => (

                <div key={`${item?.name?.replace(/\s+/g, "") || "item"}-${index}`} className="group bg-white border border-solid border-gray-300 rounded-2xl h-full  p-6 transition-all duration-500 hover:border-primary">
                  <div className="flex justify-end">

                  </div>
                  <div className="flex gap-3 items-center px-5 py-4 relative ">
                    <div className=" h-14 w-14 shrink-0 relative">
                      {item?.image && (
                        <Image
                          fill
                          className="object-cover rounded-full ring-4 ring-gray-300 dark:ring-gray-700"
                          src={item?.image}
                          alt={item?.imageAlt || ""}
                        />
                      )}
                    </div>
                    <div className="">

                      {item?.name && (
                        <SafeHeading
                          html={item.name}
                          as="h3"
                          position="Left"
                          className="text-lg font-medium text-gray-800"
                        />
                      )}

                      {
                        item?.role && (
                          <span className="text-gray-800/80">
                            {item.role}
                          </span>
                        )
                      }
                    </div>
                  </div>
                  <div className="px-5 py-4 pt-4">
                    <div className="flex gap-2 items-center mb-4">

                      <div className="flex gap-0.5 ">
                        <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                        </svg>
                        <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                        </svg>
                        <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                        </svg>
                        <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                        </svg>
                        <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                        </svg>
                      </div>

                      {item?.videoUrl && (
                        <button
                          type="button"
                          onClick={() => handleOpenVideo(item.videoUrl)}
                          className=" flex items-center justify-center cursor-pointer"
                        >
                          <div className="bg-white/70 backdrop-blur rounded-full">
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
                    <SafeRichText
                      html={item?.quote}
                      className="text-gray-500"
                    />
                  </div>




                </div>


              ))}
          </div>
        </div>

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

export default TestimonialsGridLayout7;
