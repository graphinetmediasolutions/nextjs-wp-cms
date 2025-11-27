"use client";
import React from 'react'

import SafeHeading, { HeadingPosition, HeadingTag } from '@/components/safeHtml/SafeHeading';
import SafeRichText from '@/components/safeHtml/SafeRichText';
import { perViewToGridCols } from '@/hooks/useCollectionLayout';
import { FeaturesBlockData } from '@/lib/mappers/mapFeaturesBlock';
import Link from 'next/link';
import Image from 'next/image';

const FeaturesLayout3 = ({ block }: { block: FeaturesBlockData }) => {
    const textColor = block?.textColor || "#000";
    const { displayPerRow, featureItesm } = block;


    const gridCols = perViewToGridCols(displayPerRow);

    console.log('featureItesm', featureItesm);

    return (
        <>
            <div className='headings mb-6 md:mb-10'


                style={{

                    color: textColor,

                }}>
                {
                    block?.heading && (
                        <SafeHeading
                            className={`text-4xl md:text-5xl md:leading-[60px] font-semibold max-w-xxl mt-5 mb-5 relative`}
                            as={block?.headingTag?.[0] as HeadingTag ?? "h2"}
                            position={(block?.headingPosition?.[0] as HeadingPosition) ?? "Left"}

                            style={{ color: "inherit" }}
                            html={block.heading}

                        />
                    )
                }
                {block?.subheading && (
                    <SafeHeading
                        className={`font-medium relative`}
                        position={(block?.headingPosition?.[0] as HeadingPosition) ?? "Left"}
                        as="p"
                        style={{ color: "inherit" }}
                        html={block.subheading}

                    />
                )}

            </div>

            <div style={{

                color: textColor,

            }} className={`grid gap-6 w-full my-6 ${gridCols}`}>

                {
                    Array.isArray(featureItesm) && featureItesm.length > 0 && featureItesm?.map((item, index) => {
                        const direction =
                            index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse";
                        return (
                            <div key={index} className={`flex ${direction} items-center   border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col`}>
                                <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full  flex-shrink-0">
                                    {
                                        item?.imageIcon?.node?.sourceUrl && item?.imageOrIcon === "Icon" ? (

                                            <Image
                                                src={item?.imageIcon?.node?.sourceUrl}
                                                alt={item?.imageIcon?.node?.altText || 'Feature Image'}
                                                width={48}
                                                height={48}
                                                className=" flex-shrink-0 h-auto w-full"
                                            />


                                        ) : item?.imageIcon?.node?.sourceUrl && item?.imageOrIcon === "Image" ? (


                                            <Image
                                                src={item?.imageIcon?.node?.sourceUrl}
                                                alt={item?.imageIcon?.node?.altText || 'Feature Image'}
                                                width={100}
                                                height={100}

                                                className="w-full  flex-shrink-0  h-auto"
                                            />


                                        ) : null
                                    }
                                </div>

                                <div className="flex-grow sm:text-left  mt-6 sm:mt-0">
                           
                                    {
                                        item?.featureTitle && <SafeHeading
                                            html={item?.featureTitle}
                                            style={{ color: "inherit" }}
                                            as='h2'
                                            className=" text-lg title-font font-medium mb-2"
                                        />
                                    }
                                     {
                                        item?.featureDescription && <SafeRichText
                                            className='leading-relaxed text-base'
                                            style={{ color: "inherit" }}
                                            html={item?.featureDescription || ""}
                                        />
                                    }

                                    {
                                        item?.actionButtonUrl &&
                                        (<Link className="mt-3 text-primary inline-flex items-center" href={item?.actionButtonUrl} >

                                            Learn More <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </Link>)
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </>



    )
}

export default FeaturesLayout3
