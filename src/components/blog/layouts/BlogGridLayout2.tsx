// components/blog/layouts/BlogGridLayout1.tsx
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { perViewToGridCols } from "@/hooks/useCollectionLayout";
import type { BlogBlockData } from "@/lib/mappers/mapBlogBlock";
import SafeHeading from "@/components/safeHtml/SafeHeading";

export default function BlogGridLayout2({ block }: { block: BlogBlockData }) {


  const { items, displayPerRow = 3 } = block;
  const gridCols = perViewToGridCols(displayPerRow);

  return (
    <>



      <div className="headings-wrapper mb-10">
        {block?.subheading && (
          <SafeHeading
            className="text-sm font-semibold flex items-center gap-1 mb-3"
            as="p"
            html={block.subheading}
          />
        )}
        {block?.heading && (
          <SafeHeading
            html={block.heading}
            as="h2"
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
            <span className="absolute z-20 top-4 left-4 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">Admissions</span>

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

            <div className="content flex flex-col gap-4 p-5 flex-1 items-start">
              <div>
                {item?.date && block?.showDate && (
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                )}

                {item?.authorName && block?.showAuthor && (
                  <p className="text-xs text-gray-500">{item?.authorName}</p>
                )}
              </div>


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
              <Link
                href={item?.uri ?? "#"}
                className="view-more-link w-auto btn btn-primary inline-flex gap-2 no-underline items-center capitalize tpx-5 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors duration-300 mt-auto"
              >
                read more
              </Link>
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
