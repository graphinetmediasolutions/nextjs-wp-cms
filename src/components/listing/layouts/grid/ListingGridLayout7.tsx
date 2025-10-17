// components/blog/layouts/BlogGridLayout1.tsx
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { perViewToGridCols } from "@/hooks/useCollectionLayout";
import { type ListingBlockData, type HeadingTag } from "@/lib/mappers/mapListingBlock";
import SafeHeading, { HeadingPosition } from "@/components/safeHtml/SafeHeading";





export default function ListingGridLayout7({ block }: { block: ListingBlockData }) {


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
      <div className={`grid  mt-16 ${gridCols}`}>
        {items.map((item, i) => (

          <div key={i} className="relative  p-6 
    bg-gradient-to-r from-primary to-primary 
    bg-[length:0%_100%] bg-left bg-no-repeat
    transition-[background-size] duration-500 ease-out
    hover:bg-[length:100%_100%] hover:text-white group outline-1 outline-gray-200">

            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            {item?.title && (


              <h3 className="">
                <Link
                  className="no-underline   line-clamp-  text-lg text-gray-900 group-hover:text-white font-medium title-font mb-2"
                  href={item?.uri ?? "#"}
                >
                  {item.title}
                </Link>
              </h3>
            )}

            {item?.excerpt && (
              <div
                className=" ">
                <div
                  className="text-sm text-black mt-2 group-hover:text-white  overflow-hidden transition-all line-clamp-3  [&_*]:text-inherit"
                  dangerouslySetInnerHTML={{ __html: item.excerpt }}
                />
                {item?.date && block?.showDate && (
                  <p className="text-xs text-black mt-3 group-hover:text-white">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                )}

                {item?.authorName && block?.showAuthor && (
                  <p className="text-xs text-black group-hover:text-white">{item?.authorName}</p>
                )}
              </div>
            )}

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
