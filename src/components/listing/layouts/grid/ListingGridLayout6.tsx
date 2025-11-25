// components/blog/layouts/BlogGridLayout1.tsx
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { perViewToGridCols } from "@/hooks/useCollectionLayout";
import { type ListingBlockData, type HeadingTag } from "@/lib/mappers/mapListingBlock";
import SafeHeading, { HeadingPosition } from "@/components/safeHtml/SafeHeading";





export default function ListingGridLayout6({ block }: { block: ListingBlockData }) {


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
      <div className={`grid gap-6  mt-16 ${gridCols}`}>
        {items.map((item, i) => (

          <div key={i} className="relative overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
        
        
              {item?.image && (

                <Image
                  src={item.image}
                  alt={item?.alt ?? ""}
                  fill
                  className="object-cover"
                />

              )}
              <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64 h-full flex">


                    <div className="text-white bg-black/45 m-4 border border-[#fdc700] rounded-lg p-4 ">



                      {item?.title && (


                        <h3 className="">
                          <Link
                            className="no-underline leading-[130%] text-xl font-semibold line-clamp-2 text-white  "
                            href={item?.uri ?? "#"}
                          >
                          {item.title}
                          </Link>
                        </h3>
                      )}
                      <div className="w-full h-px my-3 bg-yellow-400"></div>

                      {item?.excerpt && (
                        <div
                          className=" ">
                          <div
                            className="text-sm text-white  mt-2  overflow-hidden transition-all line-clamp-3  [&_*]:text-inherit"
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
