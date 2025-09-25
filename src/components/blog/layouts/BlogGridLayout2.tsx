import Image from "next/image";
import Link from "next/link";

export type BlogItem = {
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
  image?: string;
  uri?: string;
};

export default function BlogGridLayout2({ items }: { items: BlogItem[] }) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
     {items?.map((item, i) => (
  <div
    key={item?.slug ?? i}
    className="rounded-lg bg-white shadow hover:shadow-lg transition overflow-hidden"
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
          className="object-cover"
        />
      </Link>
    )}

    <div className="p-4 space-y-2">
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
        <p className="text-sm text-gray-600 line-clamp-3">{item?.excerpt}</p>
      )}
    </div>
  </div>
))}

    </div>
  );
}
