"use client";

import React, { useState } from "react";
// import {
//   type TestimonialBlockData,
//   type HeadingTag,
// } from "@/lib/mappers/mapTestimonialBlock";
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
import { TeamsBlockData, type HeadingTag } from "@/lib/mappers/mapTeamsBlock";
import ContentModal from "@/components/ContentModal";
import ContentDialog from "@/components/ContentDialog";

const TeamsGridLayout2 = ({ block }: { block: TeamsBlockData }) => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);


  const { items, displayPerRow, showPost } = block;
  const gridCols = perViewToGridCols(displayPerRow);
  // const showPostNumber = Number(showPost) || items.length;

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

      {/* Grid of testimonials */}
      <div className={`grid gap-6 ${gridCols}`}>
        {Array.isArray(items) &&
          items.length > 0 &&
          items?.slice(0, limit === -1 ? items.length : limit)?.map((item, index) => (
            <div key={`${item?.name?.replace(/\s+/g, "") || "item"}-${index}`} className=" lg:flex lg:items-center">
              <div className="border w-full border-gray-300 rounded-md overflow-hidden">
                <div className="w-full aspect-square bg-gray-50 relative">
                  {item?.photo && (
                    <Image
                      width={500}
                      height={700}
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
                  {
                    item?.socialLinks &&
                    <div className="space-x-4 mt-4">
                      {
                        item?.socialLinks?.facebookLinks && <button type="button"
                          className="w-7 h-7 inline-flex items-center justify-center rounded-full border-0 outline-0 cursor-pointer bg-blue-600 hover:bg-blue-700 active:bg-blue-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 155.139 155.139">
                            <path
                              d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
                              data-original="#010002" />
                          </svg>
                        </button>
                      }
                      {
                        item?.socialLinks?.twitterLinks && <button type="button"
                          className="w-7 h-7 inline-flex items-center justify-center rounded-full border-0 outline-0 cursor-pointer bg-[#03a9f4] hover:bg-[#03a1f4] active:bg-[#03a9f4]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 512 512">
                            <path
                              d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
                              data-original="#03a9f4" />
                          </svg>
                        </button>
                      }


                      {
                        item?.socialLinks?.linkedinLinks &&
                        <button type="button"
                          className="w-7 h-7 inline-flex items-center justify-center rounded-full border-0 outline-0 cursor-pointer bg-[#0077b5] hover:bg-[#0055b5] active:bg-[#0077b5]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 24 24">
                            <path
                              d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z"
                              data-original="#0077b5" />
                          </svg>
                        </button>
                      }
                      {
                        item?.socialLinks?.instagarmLinks &&
                        <button type="button"
                          className="w-7 h-7 inline-flex items-center justify-center rounded-full border-0 outline-0 cursor-pointer bg-[#E1306C] hover:bg-[#ef286a] active:bg-[#e01458]">

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14px"
                            height="14px"
                            fill="#fff"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zm0 1.5A4.26 4.26 0 0 0 3.5 7.75v8.5A4.26 4.26 0 0 0 7.75 20.5h8.5a4.26 4.26 0 0 0 4.25-4.25v-8.5A4.26 4.26 0 0 0 16.25 3.5h-8.5zM12 7.25A4.75 4.75 0 1 1 7.25 12 4.75 4.75 0 0 1 12 7.25zm0 1.5A3.25 3.25 0 1 0 15.25 12 3.25 3.25 0 0 0 12 8.75zm4.88-3.38a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13z" />
                          </svg>
                        </button>

                      }


                    </div>
                  }
                </div>
              </div>
            </div>
          ))}
      </div >

      {block?.actionButtonText && block?.actionButtonUrl && (
        <div className="mt-8 text-center">
          <Link
            href={block?.actionButtonUrl ?? "#"}
            className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition"
          >
            {block?.actionButtonText}
          </Link>
        </div>
      )
      }

    </>
  );
};

export default TeamsGridLayout2;
