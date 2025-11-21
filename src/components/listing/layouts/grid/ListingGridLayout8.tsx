// components/blog/layouts/BlogGridLayout1.tsx
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { perViewToGridCols } from "@/hooks/useCollectionLayout";
import { type ListingBlockData, type HeadingTag } from "@/lib/mappers/mapListingBlock";
import SafeHeading, { HeadingPosition } from "@/components/safeHtml/SafeHeading";





export default function ListingGridLayout8({ block }: { block: ListingBlockData }) {


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
      <div className={`grid  mt-16 gap-8 ${gridCols}`}>
        {items.map((item, i) => (

          <div key={i} className="relative  overflow-hidden ">



            <div className="relative  p-4 rounded-[8px] overflow-hidden shadow-md">
              {item?.image && (

                <Image
                  src={item.image}
                  alt={item.title ?? "image"}
                  fill
                  className="object-cover"
                />

              )}
              <div className="rounded-lg mt-[150px] bg-white/20 px-[5px] py-[10px] backdrop-blur-[9.3px]  before:content-[''] before:absolute before:-top-[6px] before:-left-[6px] before:-right-[6px] before:-bottom-[6px] before:border-2 before:border-primary before:rounded-lg before:pointer-events-none ">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full text-primary  absolute -top-[25px] right-0">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                {item?.title && (
                  <h3 className="">
                    <Link
                      className="no-underline min-h-[56px]  line-clamp-2  text-lg text-gray-900 group-hover:text-white font-medium title-font mb-2"
                      href={item?.uri ?? "#"}
                    >
                      {item.title}
                    </Link>
                  </h3>
                )}
              </div>




            </div>

            {item?.excerpt && (
              <div
                className=" mt-4">
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

        {block.actionButtonText && block?.actionButtonUrl && (
        <div className="mt-8 text-center">
          <Link
            href={block?.actionButtonUrl ?? "#"}
            className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition"
          >
            {block.actionButtonText}
          </Link>
        </div>
      )}
    </>
  );
}
