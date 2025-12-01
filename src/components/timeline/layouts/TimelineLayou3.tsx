import React from 'react'
import { TimelineBlockData } from '@/lib/mappers/mapTimelineBlock'
import SafeHeading, { HeadingPosition, HeadingTag } from '@/components/safeHtml/SafeHeading'
import Image from 'next/image'
import SafeRichText from '@/components/safeHtml/SafeRichText'
import { formatDate } from '@/utils/date'

const TimelineLayou3 = ({ block }: { block: TimelineBlockData }) => {
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

            <div className=" py-16 max-w-6xl mx-auto  md:px-4">

                <div className="relative ">
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-blue-100"></div>
                    {
                        Array.isArray(timelineItems) && timelineItems.length > 0 && timelineItems?.map((item, index) => {

                            const { formatted } = formatDate(item?.date);

                            const cardOrderClass = (index+1) % 2 === 0 ? "md:order-3" : "md:order-1"
                            const lastOrderClass = (index+1) % 2 === 0 ? "md:order-1" : "md:order-3"
                            const align = (index+1) % 2 === 0 ? "md:text-left" : "md:text-right"

                            const alignItems = (index+1) % 2 === 0 ? "md:items-start " : "md:items-end";
                            return (
                                <div key={index} className="flex flex-col md:flex-row items-start md:items-center mb-10">

                                    <div className={`md:w-1/2  order-1 ${cardOrderClass} `}>
                                        <div className={`bg-gray-50 p-5 rounded-lg shadow-sm flex flex-col ${alignItems} items-center`}>

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
                                                    className={`leading-relaxed text-base ${align} `}

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


                                    <div
                                        className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-semibold mx-auto md:mx-0 md:translate-x-0 md:order-2 md:mx-6">
                                        {index + 1}
                                    </div>


                                    <div className={`md:w-1/2 md:pl-8 order-3 ${lastOrderClass}`}></div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </>


    )
}

export default TimelineLayou3
