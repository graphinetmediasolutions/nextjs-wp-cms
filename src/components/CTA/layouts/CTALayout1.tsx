import SafeHeading from '@/components/safeHtml/SafeHeading'
import SafeRichText from '@/components/safeHtml/SafeRichText'
import { CTABlockData } from '@/lib/mappers/mapCTABlock'
import Link from 'next/link';
import React from 'react'

const CTALayout1 = ({ block }: { block: CTABlockData }) => {
    const bgColor = block?.backgroundColor || "#fff";
    const textColor = block?.textColor || "#000";

    const POS_CLASSES = {
        Left: "items-start text-left",
        Center: "items-center text-center",
        Right: "items-end text-right",

    };

    const align = POS_CLASSES[block?.alignItem] ?? POS_CLASSES.Left;



    return (
        <div
            className={`relative py-10 md:py-16 md:w-full my-16   flex flex-col ${align} justify-center text-center rounded-2xl px-6 md:px-14`}
            style={{
                backgroundColor: block?.sectionWidth && block?.sectionWidth[0] === "Box Width" ? bgColor : "transparent",
                color: textColor,
                backgroundImage: block?.sectionWidth && block?.sectionWidth[0] === "Box Width" && block?.backgroundImage ? `url(${block.backgroundImage})` : "none",
                backgroundSize: 'cover',
                backgroundPosition: 'Top',
            }}
        >
            {block?.sectionWidth?.[0] === "Box Width" && block?.backgroundImage && (
                <div className="absolute inset-0 z-0  bg-black/40 rounded-2xl"></div>
            )}
            {/* Subheading */}
            {block?.subheading && (
                <SafeHeading
                    className={`font-medium relative`}
                    as="p"
                    style={{ color: "inherit" }}
                    html={block.subheading}

                />
            )}



            {
                block?.heading && (
                    <SafeHeading
                        className={`text-4xl md:text-5xl md:leading-[60px] font-semibold max-w-xl mt-5 relative`}
                        as="h2"
                        position={block?.alignItem || "Left"}

                        style={{ color: "inherit" }}
                        html={block.heading}

                    />
                )
            }

            {
                block?.description && (
                    <SafeRichText
                        className="mt-4 text-lg max-w-2xl text-center inherit-text relative"
                        style={{ color: "inherit" }}
                        html={block.description}
                    />
                )
            }

            <div className='flex flex-wrap gap-3 mt-8 relative items-center justify-center'>
                {
                    block?.ctaItems && block?.ctaItems?.length > 0 && block?.ctaItems.map((ctaItem, index) => (
                        <Link key={index}
                            href={ctaItem?.ctaOptions?.actionButtonUrl || "#"}
                            className={`px-8 py-3 inline-block rounded-full btn-primary uppercase text-sm  transition-all ${ctaItem.ctaOptions?.actionButtonClass || ""}`}

                        >
                            {ctaItem?.ctaOptions?.actionButtonLabel}
                        </Link>
                    ))
                }
            </div>




        </div>
    );
};

export default CTALayout1;
