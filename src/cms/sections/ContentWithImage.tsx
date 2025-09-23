import Image from "next/image";

type MediaNode = { sourceUrl: string; altText?: string | null } | null | undefined;

export default function ContentWithImage(props: {
  __typename?: string;
  fieldGroupName?: string | null;
  heading?: string | null;
  content?: string | null; // HTML from WP
  image?: { node?: MediaNode } | null;
}) {
  const img = props.image?.node;

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-14">
        {props.heading && (
          <h2 className="mb-6 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
            {props.heading}
          </h2>
        )}

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          {/* Content */}
          <div className="prose prose-zinc max-w-none">
            {props.content ? (
              <div dangerouslySetInnerHTML={{ __html: props.content }} />
            ) : (
              <p className="text-zinc-600">{" "}</p>
            )}
          </div>

          {/* Image (optional) */}
          {img?.sourceUrl && (
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={img.sourceUrl}
                alt={img.altText ?? props.heading ?? ""}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
