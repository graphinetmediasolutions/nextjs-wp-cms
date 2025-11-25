// components/blog/layouts/BlogGridLayout1.tsx
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { perViewToGridCols } from "@/hooks/useCollectionLayout";
import { type ListingBlockData, type HeadingTag } from "@/lib/mappers/mapListingBlock";
import SafeHeading, { HeadingPosition } from "@/components/safeHtml/SafeHeading";

export default function ListingGridLayout3({ block }: { block: ListingBlockData }) {


  const { items, displayPerRow = 3 } = block;
  const gridCols = perViewToGridCols(displayPerRow);

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
      <div className={`grid gap-6 ${gridCols}`}>
        {items.map((item, i) => (
          <div
            key={item?.slug ?? i}
            className="group relative blog-b-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-in-out flex flex-col"
          >


            {item?.image && (
              <Link
                href={item?.uri ?? "#"}
                className="block relative w-full aspect-[16/9] no-underline"
              >
                <Image
                  src={item.image}
                  alt={item?.alt ?? ""}
                  fill
                  className="object-cover rounded-lg"
                />
              </Link>
            )}

            <div className="content  flex-1 items-start blog-d-content-box pt-[40px] md:pt-[50px] md:px-[20px] pb-[40px] px-[20px] bg-white flex flex-wrap gap-5 flex-col">
              <div className="top-date-with-name flex gap-4">
                <span className="tracking-[2px] uppercase text-[10px] leading-[16px] text-[var(--primary-color)]">Nature</span>
                {item?.date && block?.showDate && (
                  <span className="tracking-[2px] uppercase text-[10px] leading-[16px]">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                )}

                {item?.authorName && block?.showAuthor && (
                  <span className="text-name tracking-[2px] uppercase text-[10px] leading-[16px] font-[600]">{item?.authorName}</span>
                )}
              </div>
              {/* <div>
                {item?.date && block?.showDate && (
                  <span className="tracking-[2px] uppercase text-[10px] leading-[16px]">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                )}

                {item?.authorName && block?.showAuthor && (
                  <span className="text-name tracking-[2px] uppercase text-[10px] leading-[16px] font-[600]">{item?.authorName}</span>
                )}
              </div> */}


              {item?.title && (
                <h3>
                  <Link
                    className="no-underline leading-[130%] text-2xl font-semibold line-clamp-2"
                    href={item?.uri ?? "#"}
                  >
                    {item.title}
                  </Link>
                </h3>
              )}

              {/* {item?.excerpt && (
                <div
                  className="text-sm text-gray-600 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: item.excerpt }}
                />
              )} */}
              {/* <Link
                href={item?.uri ?? "#"}
                className="view-more-link w-auto btn btn-primary inline-flex gap-2 no-underline items-center capitalize tpx-5 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors duration-300 mt-auto"
              >
                read more
              </Link> */}
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
