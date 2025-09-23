import Image from "next/image";

type MediaNode = { sourceUrl: string; altText?: string | null } | null | undefined;

export default function ContentBlock(props: {
  __typename?: string; // passed through from GraphQL, ignored here
  fieldGroupName?: string | null;
  heading?: string | null;
  bannerImage?: { node?: MediaNode } | null;
}) {
  const img = props.bannerImage?.node;
  return (
    <section className="relative overflow-hidden">
      {/* Banner image (optional) */}
      {img?.sourceUrl && (
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={img.sourceUrl}
            alt={img.altText ?? props.heading ?? ""}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-10">
        {props.heading && (
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
            {props.heading}
          </h2>
        )}
      </div>
    </section>
  );
}
