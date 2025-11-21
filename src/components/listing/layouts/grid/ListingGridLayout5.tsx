// components/blog/layouts/BlogGridLayout1.tsx
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { perViewToGridCols } from "@/hooks/useCollectionLayout";
import { type ListingBlockData, type HeadingTag } from "@/lib/mappers/mapListingBlock";
import SafeHeading, { HeadingPosition } from "@/components/safeHtml/SafeHeading";


function perViewToPatternedGrid(perView?: number | null) {
  const grid = perViewToGridCols(perView);
  const is2 = (perView ?? 3) === 2;

  // For 66/33 we need 3 cols at lg (2 parts + 1 part)
  const hasLg3 = /\blg:grid-cols-3\b/.test(grid);
  const forceLg3 = is2 && !hasLg3 ? "lg:grid-cols-3" : "";

  // Pattern over 4 cards: [2/3, 1/3, 1/3, 2/3]
  const isWide = (i: number) => (i % 4 === 0) || (i % 4 === 3);

  const spanFor = (i: number) => {
    if (!is2) return "";                // equal widths for perView != 2
    return isWide(i) ? "lg:col-span-2" : "lg:col-span-1";
  };

  // Aspect ratios:
  // - mobile/tablet: use common aspect (easier stacking)
  // - lg+: wide (2/3) cards get a wider ratio; narrow (1/3) get a taller ratio
  const aspectFor = (i: number) => {
    if (!is2) return "";
    return isWide(i)
      ? "lg:[aspect-ratio:930/480]"  // Wide card
      : "lg:[aspect-ratio:450/480]"; // Narrow card
  };

  return { grid, forceLg3, spanFor, aspectFor };
}

export default function ListingGridLayout5({ block }: { block: ListingBlockData }) {


  const { items, displayPerRow = 3 } = block;
  const { grid, forceLg3, spanFor, aspectFor } = perViewToPatternedGrid(displayPerRow);



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
      <div className={`grid gap-6  mt-16 ${grid} ${forceLg3}`}>
        {items.map((item, i) => (
          <div
            key={item?.slug ?? i}
            className={`${spanFor(i)} service-a-card group relative overflow-hidden rounded-[20px] bg-neutral-100`}
          >
            {/* Image box */}
            <div className={`service-a-img-box relative overflow-hidden rounded-[20px] aspect-[16/13] ${aspectFor(i)}`}>
              {item?.image && (
                <Image
                  src={item.image}
                  alt={item.title ?? "Blog image"}
                  fill
                  className="h-full w-full rounded-[20px] object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              )}
            </div>

            {/* Floating content */}
            <div className="service-a-content-box z-10 absolute bottom-[10px]    rounded-[12px] p-6 transition-all duration-300 ease-in-out flex items-center justify-between gap-4 bg-primary left-[10px] right-[10px] md:translate-x-0 ">
              <div className="w-[92%]">
                {item?.title && (
                  <h3>
                    <Link
                      className="mb-2 text-[20px] font-bold leading-normal text-white hover:text-black md:text-[26px]"
                      href={item?.uri ?? "#"}
                    >
                      <span className="line-clamp-2 text-white">{item.title}</span>
                    </Link>
                  </h3>
                )}

                {item?.excerpt && (
                  <div>
                    <div
                      className="mt-0 max-h-0 overflow-hidden text-sm text-white transition-all line-clamp-3 duration-500 group-hover:mt-2 group-hover:max-h-80 [&_*]:text-inherit"
                      dangerouslySetInnerHTML={{ __html: item.excerpt }}
                    />
                    {item?.date && block?.showDate && (
                      <p className="mt-3 text-xs text-white">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    )}
                    {item?.authorName && block?.showAuthor && (
                      <p className="text-xs text-white">{item?.authorName}</p>
                    )}
                  </div>
                )}
              </div>

              <Link className="!min-w-[47px] w-[47px] h-[47px] rounded-full bg-gray-300 flex items-center justify-center" href={item?.uri ?? "#"} aria-label="Open">
                <svg
                  className="h-auto w-3 -rotate-90 flex-shrink-0 text-black "
                  stroke="currentColor"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.374,15.999 L5.562,15.999 L5.562,14.374 L13.238,14.374 L0,1.135 L1.137,0.1 L14.374,13.236 L14.374,5.562 L15.999,5.562 L15.999,14.374 L15.999,15.999 L14.374,15.999 Z" />
                </svg>
              </Link>
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
