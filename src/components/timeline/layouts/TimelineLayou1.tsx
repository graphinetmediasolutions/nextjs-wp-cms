import React from 'react'
import { TimelineBlockData } from '@/lib/mappers/mapTimelineBlock'
import SafeHeading, { HeadingPosition, HeadingTag } from '@/components/safeHtml/SafeHeading'
import Image from 'next/image'
import SafeRichText from '@/components/safeHtml/SafeRichText'
import { formatDate } from '@/utils/date'

const TimelineLayou1 = ({ block }: { block: TimelineBlockData }) => {
    const { timelineItems } = block;
    return (
        <>
            {
                block?.heading && (
                    <SafeHeading
                        className={`text-4xl md:text-5xl md:leading-[60px] font-semibold max-w-xxl mt-5 mb-5 relative`}
                        as={block?.headingTag?.[0] as HeadingTag ?? "h2"}
                        position={(block?.headingPosition?.[0] as HeadingPosition) ?? "Left"}

                        style={{ color: "inherit" }}
                        html={block?.heading}

                    />
                )
            }
            {block?.subheading && (
                <SafeHeading
                    className={`font-medium relative`}
                    position={(block?.headingPosition?.[0] as HeadingPosition) ?? "Left"}
                    as="p"
                    style={{ color: "inherit" }}
                    html={block?.subheading}

                />
            )}

            <div className=" py-16 max-w-6xl mx-auto px-7 md:px-4">

                <div className="relative border-l-2 border-gray-300">
                    {
                        Array.isArray(timelineItems) && timelineItems.length > 0 && timelineItems?.map((item, index) => {

                            const {formatted} = formatDate(item?.date);
                            return (
                                <div key={index} className="mb-10 ml-6">

                                    <span className="absolute -left-5 flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full">
                                        {index + 1}
                                    </span>
                                    <div className="ml-5">
                                       
                                        {
                                            item?.imageIcon?.node?.sourceUrl && item?.imageOrIcon === "Icon" ? (

                                                <Image
                                                    src={item?.imageIcon?.node?.sourceUrl}
                                                    alt={item?.imageIcon?.node?.altText || 'Feature Image'}
                                                    width={48}
                                                    height={48}
                                                    className="mb-4 flex-shrink-0 h-auto"
                                                />


                                            ) : item?.imageIcon?.node?.sourceUrl && item?.imageOrIcon === "Image" ? (


                                                <Image
                                                    src={item?.imageIcon?.node?.sourceUrl}
                                                    alt={item?.imageIcon?.node?.altText || 'Feature Image'}
                                                    width={100}
                                                    height={100}

                                                    className="w-50 mb-4 h-full object-cover rounded-xl max-h-[250px]"
                                                />


                                            ) : null
                                        }

                                        {
                                            item?.title && <SafeHeading
                                                html={item?.title}

                                                as={'h3'}
                                                className=" text-xl font-semibold"
                                            />
                                        }



                                        {
                                            item?.description && <SafeRichText
                                                className='leading-relaxed text-base'

                                                html={item?.description || ""}
                                            />
                                        }

                         
                                        
                                        {
                                            formatted && <SafeRichText
                                            className='text-sm text-gray-500 mb-2'
                                                html={formatted}
                                            />
                                        }


                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </>


    )
}

export default TimelineLayou1
