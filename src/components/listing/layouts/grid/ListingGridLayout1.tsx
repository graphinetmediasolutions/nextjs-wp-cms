// components/blog/layouts/BlogGridLayout1.tsx
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { perViewToGridCols } from "@/hooks/useCollectionLayout";
import {  type ListingBlockData, type HeadingTag } from "@/lib/mappers/mapListingBlock";
import SafeHeading, { HeadingPosition } from "@/components/safeHtml/SafeHeading";





export default function ListingGridLayout1({ block }: { block: ListingBlockData }) {


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
      <div className={`grid gap-6 ${gridCols}`}>
        {items.map((item, i) => (
          <div
            key={item?.slug ?? i}
            className="group bg-white rounded-lg p-6 shadow relative z-10 overflow-hidden h-full
    after:content-[''] after:absolute after:-z-10
    after:top-[calc(0%-clamp(50px,3.68vw,70px))]
    after:left-[calc(0%-clamp(47px,3.52vw,67px))]
    after:w-[clamp(202px,13.77vw,262px)]
    after:aspect-[1/1] after:rounded-full after:bg-[#D9D9D9]
    after:transition-colors after:duration-400 after:ease-in-out
    hover:after:bg-primary flex flex-col gap-5"
          >
            <div className="grid gap-5">
              {item?.image && (
                <Link
                  href={item?.uri ?? "#"}
                  className="block relative w-full aspect-[16/9] no-underline"
                >
                  <Image
                    src={item.image}
                    alt={item.title ?? "Blog image"}
                    fill
                    className="object-cover rounded-lg"
                  />
                </Link>
              )}

              <div className="content grid gap-2">
                {item?.date && block?.showDate && (
                  <p className="text-xs text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                )}

                {item?.authorName && block?.showAuthor && (
                  <p className="text-xs text-gray-500">{item?.authorName}</p>
                )}

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

                {item?.excerpt && (
                  <div
                    className="text-sm text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: item.excerpt }}
                  />
                )}
              </div>
            </div>

            {/* 👇 Stick to bottom */}
            <Link
              href={item?.uri ?? "#"}
              className="view-more-link flex gap-2 no-underline items-center capitalize text-md text-primary mt-auto"
            >
              <MoveUpRight size={20} /> read more
            </Link>
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
