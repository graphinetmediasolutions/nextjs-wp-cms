import React from "react";
import Image from "next/image";
import Section from "@/components/primitives/Section";
import { imageAlign, alignItems } from "@/lib/cms-normalize";
import { sanitize } from "@/lib/sanitize";

type WpTextBlock = {
    cssClass?: string | null;
    heading?: string | null;
    subheading?: string | null;
    textblockBody?: string | null;
    textblockImage?: { node?: { sourceUrl?: string | null } | null } | null;
    isImage?: boolean | null;
    textblockImageAlign?: string[] | string | null; // ["Left"] | ["Right"] | string | null
    sectionWidth?: string[] | string | null; // ["Box Width"] | ["Full Width"] | null
    alignItem?: string[] | string | null;            // e.g. "left", "center", "right"
    backgroundColor?: string | null;       // e.g. "#f5f5f5" or "blue"
    backgroundImage?: { node?: { sourceUrl?: string | null } | null } | null;
};

type Props = { data?: WpTextBlock | null };

// function sanitize(html: string) {
//     return html;
// }



export default function TextBlock({ data }: Props) {
    const {
        cssClass = "",
        heading = "",
        subheading = "",
        textblockBody = "",
        textblockImage,
        isImage = false,
        textblockImageAlign,
        sectionWidth,
        alignItem,
        backgroundColor,
        backgroundImage
    } = data ?? {};

    const imageUrl = textblockImage?.node?.sourceUrl ?? "";
  const hasImage = Boolean(isImage && imageUrl);

  const alignClass = alignItems(alignItem);
  const imgSide = imageAlign(textblockImageAlign); // "left" | "right"

  console.log(imgSide);
  const flipOnDesktop = hasImage && imgSide === "left";




    return (
        <Section 
        
        className={cssClass || ""}
      sectionWidth={sectionWidth}
      backgroundColor={backgroundColor}
      backgroundImageUrl={backgroundImage?.node?.sourceUrl ?? null}
      // overlay="bg-black/30" // enable if you want readability on images
        >
           
                <div
                    className={`grid gap-8 ${hasImage ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                        } ${flipOnDesktop ? "md:[&>div:first-child]:order-1" : ""} ${alignClass}`}
                >
                    {/* Content */}
                    <div className="flex flex-col gap-4">

                        {heading && (
                            <h2 className="">{heading}</h2>
                        )}
                        {subheading && (
                            <p className="">{subheading}</p>
                        )}
                        {textblockBody && (
                            <div
                                className="richtext"
                                dangerouslySetInnerHTML={{ __html: sanitize(textblockBody) }}
                            />
                        )}
                    </div>
                    {/* Image — render only if present */}
                    {hasImage && (
                        <div className="w-full">
                            <div className="relative w-full aspect-[3/2]">
                                <Image
                                    src={imageUrl}
                                    alt={heading || subheading || "Image"}
                                    fill
                                    className="rounded-2xl shadow-lg object-cover"
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                />
                            </div>
                        </div>
                    )}


                </div>
           
        </Section>
    );
}
