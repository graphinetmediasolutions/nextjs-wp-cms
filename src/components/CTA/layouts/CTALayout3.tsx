import SafeHeading from '@/components/safeHtml/SafeHeading'
import SafeRichText from '@/components/safeHtml/SafeRichText'
import { CTABlockData } from '@/lib/mappers/mapCTABlock'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const CTALayout3 = ({ block }: { block: CTABlockData }) => {
    const bgColor = block?.backgroundColor || "#fff";
    const textColor = block?.textColor || "#000";

    const POS_CLASSES = {
        Left: "text-left",
        Center: "text-center",
        Right: "text-right",

    };

    const align =
        Array.isArray(block?.imageAlign) &&
            block?.imageAlign.length > 0 &&
            block?.imageAlign[0] === "Right"
            ? "lg:flex-row-reverse"
            : "lg:flex-row";

    console.log("alignItem", block?.imageAlign);



    return (
        <div
            className={`relative py-10 md:py-16 md:w-full my-16   z-10 gap-8 items-center lg:flex ${align}  rounded-2xl `}
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

            {
                block?.image && (
                    <div className='flex-1 mt-5 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto'>
                        <Image
                            src={block.image}
                            alt={block.imageAlt || ""}
                            width={600}
                            height={400}
                            className="w-full h-auto rounded-lg object-cover"
                        />
                    </div>
                )
            }






            <div className="flex-1 max-w-lg py-5 sm:mx-auto  lg:max-w-max ">
                {/* Subheading */}
                {block?.subheading && (
                    <SafeHeading
                        className={`font-medium relative`}
                        as="p"
                        position={block?.alignItem || "Left"}
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
                            className="mt-4 text-lg max-w-2xl  inherit-text relative"
                            style={{ color: "inherit" }}
                            html={block.description}
                        />
                    )
                }
                <div className='flex flex-col gap-3 mt-8 relative items-start  '>
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







        </div>
    );
};

export default CTALayout3;
