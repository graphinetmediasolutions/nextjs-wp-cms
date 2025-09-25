import Image from "next/image";

export type BlogItem = {
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
  image?: string;
};

export default function BlogCard({ item }: { item: BlogItem }) {
  return (
    <div className="rounded-lg bg-white shadow hover:shadow-lg transition overflow-hidden h-full">
      {item.image && (
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(min-width:1024px)33vw,(min-width:768px)50vw,100vw"
          />
        </div>
      )}
      <div className="p-4 grid gap-2">
        {item.date && (
          <time className="text-xs text-gray-500">
            {new Date(item.date).toLocaleDateString()}
          </time>
        )}
        <h3 className="text-lg font-semibold leading-snug">
          <a href={`/blog/${item.slug}`} className="hover:underline">
            {item.title}
          </a>
        </h3>
        {item.excerpt && (
          <p className="text-sm text-gray-600 line-clamp-3">{item.excerpt}</p>
        )}
      </div>
    </div>
  );
}
