// components/blog/layouts/BlogGridLayout1.tsx
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { perViewToGridCols } from "@/hooks/useCollectionLayout";
import { type ListingBlockData, type HeadingTag } from "@/lib/mappers/mapListingBlock";
import SafeHeading, { HeadingPosition } from "@/components/safeHtml/SafeHeading";





export default function ListingGridLayout4({ block }: { block: ListingBlockData }) {


  const { items, displayPerRow = 3 } = block;
  const gridCols = perViewToGridCols(displayPerRow);

  // console.log("block", block)

  return (
    <>



      <div className="headings-wrapper mb-10">
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
      <div className={`grid gap-6 gap-y-16 mt-16 ${gridCols}`}>
        {items.map((item, i) => (

          <div key={i} className="group transition-transform duration-300 ease-out hover:-translate-y-2 relative">
            <span className="absolute -top-6 lg:-top-12 left-2 z-20 text-5xl lg:text-[88px] font-extrabold leading-none group-hover:text-[#EC1D23]  transition-colors duration-300 ease-in-out text-white/95 drop-shadow">{String(i + 1).padStart(2, "0")}</span>
            <div
              key={item?.slug ?? i}
              className="relative block bg-black overflow-hidden "
            >
              {item?.image && (

                <Image
                  src={item.image}
                  alt={item.title ?? "Blog image"}
                  fill
                  className="object-cover block w-full aspect-[16/9] no-underline absolute inset-0 h-full   opacity-75 transition-opacity duration-300 group-hover:opacity-50"
                />

              )}
              <div className="relative p-4 sm:p-6 lg:p-8 ">


                <div className="mt-[400px]">
                  <div className="absolute bottom-0 left-0 right-0 bg-[#18252E] group-hover:bg-[#e11d48] text-white transition-all duration-500 -translate-y-10 group-hover:translate-y-0">
                    <div className="px-6 py-5">



                      {item?.title && (


                        <h3 className="">
                          <Link
                            className="no-underline leading-[130%] text-2xl font-semibold  flex items-center justify-between"
                            href={item?.uri ?? "#"}
                          >
                            <span className="line-clamp-2 text-white">{item.title}</span> <svg className="w-5 flex-shrink-0 h-auto -rotate-90 text-white" stroke="#fff" fill="#fff" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16">
                              <path
                                d="M14.374,15.999 L5.562,15.999 L5.562,14.374 L13.238,14.374 L0.0,1.135 L1.137,0.1 L14.374,13.236 L14.374,5.562 L15.999,5.562 L15.999,14.374 L15.999,15.999 L14.374,15.999 Z">
                              </path>
                            </svg>
                          </Link>
                        </h3>
                      )}

                      {item?.excerpt && (
                        <div
                          className=" ">
                          <div
                            className="text-sm text-white  mt-2  max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-80 line-clamp-3 group-hover:mt-2 [&_*]:text-inherit"
                            dangerouslySetInnerHTML={{ __html: item.excerpt }}
                          />
                          {item?.date && block?.showDate && (
                            <p className="text-xs text-white mt-3">
                              {new Date(item.date).toLocaleDateString()}
                            </p>
                          )}

                          {item?.authorName && block?.showAuthor && (
                            <p className="text-xs text-white">{item?.authorName}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>


              {/* <Link
              href={item?.uri ?? "#"}
              className="view-more-link flex gap-2 no-underline items-center capitalize text-md text-primary mt-auto"
            >
              <MoveUpRight size={20} /> read more
            </Link> */}
            </div>
          </div>


        ))}
      </div>

      {block.actionButtonText && (
        <div className="mt-8 text-center">
          <Link
            href={block.parentPages?.[0]?.uri ?? "#"}
            className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition"
          >
            {block.actionButtonText}
          </Link>
        </div>
      )}
    </>
  );
}
