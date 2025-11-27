"use client";
import React from 'react'

import { FaqBlockData } from '@/lib/mappers/mapFaqBlock';
import SafeHeading, { HeadingPosition, HeadingTag } from '@/components/safeHtml/SafeHeading';
import SafeRichText from '@/components/safeHtml/SafeRichText';
import { Plus, Minus } from "lucide-react"
import { perViewToGridCols } from '@/hooks/useCollectionLayout';

const FaqLayout3 = ({ block }: { block: FaqBlockData }) => {

    const { showPost, displayPerRow } = block;


    const limit = Number(showPost) || -1;
    const gridCols = perViewToGridCols(displayPerRow);
    return (
        <>
            <div className='headings mb-5 md:mb-10'>
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
            <div
                className={`grid grid-cols-1 gap-6 w-full my-6 ${gridCols}`}

            >
                {
                    Array.isArray(block?.faqItems) && block?.faqItems?.length > 0 &&
                    block?.faqItems?.slice(0, limit === -1 ? block?.faqItems.length : limit)?.map((item, index) => {
                        return (


                            item?.faqQuestion && item?.faqAnswer && (


                                <div className="flex items-start" key={index}>
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                  
                                        <SafeHeading
                                            html={item?.faqQuestion}
                                            className='text-lg font-medium text-slate-900'
                                        />

                                        <SafeRichText
                                            className='text-[15px] text-slate-600 mt-4 leading-relaxed'
                                            html={item?.faqAnswer || ""}
                                        />
                                    </div>
                                </div>


                            )
                        )



                    })
                }
            </div>
        </>



    )
}

export default FaqLayout3
