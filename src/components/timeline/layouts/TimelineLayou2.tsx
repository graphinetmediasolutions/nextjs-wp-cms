import React from 'react'
import { TimelineBlockData } from '@/lib/mappers/mapTimelineBlock'
import SafeHeading, { HeadingPosition, HeadingTag } from '@/components/safeHtml/SafeHeading'
import Image from 'next/image'
import SafeRichText from '@/components/safeHtml/SafeRichText'
import { formatDate } from '@/utils/date'

const TimelineLayou2 = ({ block }: { block: TimelineBlockData }) => {
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


                {
                    Array.isArray(timelineItems) && timelineItems.length > 0 && timelineItems?.map((item, index) => {

                        const { formatted } = formatDate(item?.date);
                        return (
                            <div className="relative grid grid-cols-[80px_1fr] md:grid-cols-[160px_1fr] gap-8 mb-8 timeline-item">
                                <div className="absolute left-[3%] top-8 bottom-0 w-[2px] bg-[#145386] last:hidden"></div>
                                {
                                    item?.year && <div className="year">

                                        <SafeRichText
                                            html={item?.year}
                                            className='text-3xl font-bold sticky top-[100px] bg-white py-5 z-10'
                                        />
                                    </div>
                                }


                                <div className="grid grid-cols-1 gap-4">
                                    <article className="relative flex flex-col mb-4 py-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            <div className="overflow-hidden">
                                                {/* <img src="images/timeline-1.webp" alt="Medical Devices"
                                                    className="w-full h-full object-cover rounded-xl max-h-[250px]" /> */}

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

                                                            className="w-full mb-4 h-full object-cover rounded-xl max-h-[250px]"
                                                        />


                                                    ) : null
                                                }
                                            </div>

                                            <div className="p-6 pl-0 md:pl-6 md:pt-0 flex flex-col justify-center bg-white">
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
                                    </article>

                                </div>
                            </div>
                        )
                    })
                }



            </div>
        </>


    )
}

export default TimelineLayou2
