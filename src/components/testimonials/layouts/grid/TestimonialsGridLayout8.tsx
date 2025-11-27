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

const TestimonialsGridLayout8 = ({ block }: { block: TestimonialBlockData }) => {
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

      <div className="">


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
           items?.slice(0, limit === -1 ? items.length : limit)?.map((item, index) => (


              <div className="mb-5" key={`${item?.name?.replace(/\s+/g, "") || "item"}-${index}`}>
                <div className="flex flex-col md:flex-row items-start gap-4">

                  <div className="h-60 w-60 shrink-0 relative">
                    {item?.image && (
                      <Image
                        fill
                        className="object-cover  rounded-lg "
                        src={item?.image}
                        alt={item?.imageAlt || ""}
                      />
                    )}
                    {item?.videoUrl && (
                      <button
                        type="button"
                        onClick={() => handleOpenVideo(item.videoUrl)}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
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

                  <div className="flex flex-col justify-between ">
                    <div className="">
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



                    </div>
                    <SafeRichText
                      html={item?.quote}
                      className=" text-gray-500 mt-3"
                    />
                    {/* <p className="text-lg font-medium">Donald Jackman</p> */}
                    <div className="mt-4">

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
                </div>
              </div>




            ))}
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

export default TestimonialsGridLayout8;
