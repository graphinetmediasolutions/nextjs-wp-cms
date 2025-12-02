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

const AccordionLayout3 = ({ block }: { block: AccordionBlockData }) => {


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

                        const lengthOfArray = Array.isArray(block?.items) ? block?.items?.length - 1 : 1
                        const isLast = index === lengthOfArray
                        return (


                            item?.title && item?.content && (
                                <div className="flex items-stretch gap-4 relative" key={index}>
                                    {!isLast &&
                                        <div className='absolute h-full left-[7px] top-9 w-[2px] bg-[#0f4c81]'

                                        > </div>
                                    }



                                    {/* Number column OUTSIDE AccordionItem */}
                                    {/* <div className="relative z-10 flex items-start pt-3">

                                    </div> */}

                                    {/* Accordion item */}
                                    <AccordionItem
                                        className="pl-8 relative rounded-lg flex-1 group"
                                        value={`accordion-item-${index}`}
                                    >
                                        <span
                                            className="absolute -left-2 top-2
        h-8 w-8 flex items-center justify-center rounded-full
         text-white font-semibold text-sm bg-amber-100 
      "
                                        >
                                            <span className='h-4 w-4 rounded-full group-data-[state=open]:bg-primary'>

                                            </span>
                                        </span>
                                        <AccordionTrigger className="cursor-pointer bg-primary px-4 text-white group text-xl !no-underline [&>svg]:text-white">
                                            <SafeHeading
                                                html={item?.title}
                                                as="p"
                                                className="text-lg  font-medium text-white text-left"
                                            />
                                        </AccordionTrigger>
                                        <div className="relative ml-4 -mt-2 z-20 bg-amber-600 px-4 rounded-lg">
                                            <AccordionContent className="  py-3 flex flex-col gap-4 text-base bg-amber-600 ">
                                                <SafeRichText
                                                    html={item?.content || ""}
                                                    className="text-white"
                                                />
                                            </AccordionContent>
                                        </div>


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

export default AccordionLayout3
