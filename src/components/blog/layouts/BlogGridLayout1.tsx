import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BlogItem } from "@/lib/mappers/mapBlogBlock";
import { perViewToGridCols } from "@/hooks/useCollectionLayout";


export default function BlogGridLayout1({
  items,
  perView = 3, // default is 3 if not passed
}: {
  items: BlogItem[];
  perView?: number;
}) {
 

    const gridCols = perViewToGridCols(perView);

  return (
    <div className={`grid gap-6 ${gridCols}`}>
      {items?.map((item, i) => (
        <div
          key={item?.slug ?? i}
          className="group bg-white rounded-lg p-6 shadow relative z-10 overflow-hidden h-full
            after:content-['']
            after:absolute
            after:-z-10
            after:top-[calc(0%-clamp(50px,3.68vw,70px))]
            after:left-[calc(0%-clamp(47px,3.52vw,67px))]
            after:w-[clamp(202px,13.77vw,262px)]
            after:aspect-[1/1]
            after:rounded-full
            after:bg-[#D9D9D9]
            after:transition-colors
            after:duration-400
            after:ease-in-out
            hover:after:bg-primary"
        >
          {item?.image && (
            <Link
              href={item?.uri ?? "#"}
              className="block relative w-full aspect-[16/9]"
            >
              <Image
                src={item?.image}
                alt={item?.title ?? "Blog image"}
                fill
                className="object-cover rounded-lg"
              />
            </Link>
          )}

          <div className="py-4 space-y-2">
            {item?.date && (
              <time className="text-xs text-gray-500">
                {new Date(item?.date).toLocaleDateString()}
              </time>
            )}

            {item?.title && (
              <h3 className="text-lg font-semibold hover:underline">
                <Link href={item?.uri ?? "#"}>{item?.title}</Link>
              </h3>
            )}

            {item?.excerpt && (
              <div
              dangerouslySetInnerHTML={{ __html: item?.excerpt }}
              className="text-sm text-gray-600 line-clamp-3" />
               
            
            )}

            <Link
              href={item?.uri ?? "#"}
              className="view-more-link flex gap-2 items-center capitalize text-md text-primary"
            >
              <MoveUpRight size={20} /> read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
