"use client";
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import SafeHeading, { HeadingPosition, HeadingTag } from '@/components/safeHtml/SafeHeading';
import SafeRichText from '@/components/safeHtml/SafeRichText';
import { perViewToGridCols } from '@/hooks/useCollectionLayout';
import { AccordionBlockData } from '@/lib/mappers/mapAccordionBlock';

const AccordionLayout2 = ({ block }: { block: AccordionBlockData }) => {


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
            <Accordion
                type="single"
                collapsible
                className={`grid grid-cols-1 gap-6 w-full my-6 ${gridCols}`}
                defaultValue={`accordion-item-0`}

            >
                {
                    Array.isArray(block?.items) && block?.items?.length > 0 &&
                    block?.items?.slice(0, limit === -1 ? block?.items.length : limit)?.map((item, index) => {

                        const lengthOfArray = Array.isArray(block?.items) ? block?.items?.length -1  : 1 
                         const isLast = index ===  lengthOfArray
                        return (

                        
                            item?.title && item?.content && (
                                <div className="flex items-stretch gap-4 relative" key={index}>
                                    {!isLast &&
                                        <div className='absolute h-full left-[14px] top-9 w-[2px] bg-[#0f4c81]'

                                        > </div>
                                    }


                                       
                                    {/* Number column OUTSIDE AccordionItem */}
                                    <div className="relative z-10 flex items-start pt-3">
                                        <span
                                            className="
        h-8 w-8 flex items-center justify-center rounded-full
        bg-primary text-white font-semibold text-sm
      "
                                        >
                                            {index + 1}
                                        </span>
                                    </div>

                                    {/* Accordion item */}
                                    <AccordionItem
                                        className="bg-primary px-4 rounded-lg flex-1"
                                        value={`accordion-item-${index}`}
                                    >
                                        <AccordionTrigger className="cursor-pointer text-white group text-xl !no-underline [&>svg]:text-white">
                                            <SafeHeading
                                                html={item?.title}
                                                as="p"
                                                className="text-lg font-medium text-white text-left"
                                            />
                                        </AccordionTrigger>

                                        <AccordionContent className="flex flex-col gap-4 text-base">
                                            <SafeRichText
                                                html={item?.content || ""}
                                                className="text-white"
                                            />
                                        </AccordionContent>
                                    </AccordionItem>
                                </div>

                            )
                        )



                    })
                }
            </Accordion>
        </>



    )
}

export default AccordionLayout2
