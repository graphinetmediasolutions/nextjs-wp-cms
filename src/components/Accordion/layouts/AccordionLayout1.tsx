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

const AccordionLayout1 = ({ block }: { block: AccordionBlockData }) => {


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
                        return (


                            item?.title && item?.content && (
                                <AccordionItem className='bg-primary px-4 rounded-lg' value={`accordion-item-${index}`} key={index} >
                                    <AccordionTrigger className='cursor-pointer text-white group text-xl !no-underline [&>svg]:text-white'><SafeHeading
                                        html={item?.title}
                                        as='p'
                                        className='text-lg font-medium text-white'
                                    />


                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-base">
                                        <SafeRichText
                                            html={item?.content || ""}
                                            className='text-white'
                                        />
                                    </AccordionContent>
                                </AccordionItem>

                            )
                        )



                    })
                }
            </Accordion>
        </>



    )
}

export default AccordionLayout1
