"use client";
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FaqBlockData } from '@/lib/mappers/mapFaqBlock';
import SafeHeading, { HeadingPosition, HeadingTag } from '@/components/safeHtml/SafeHeading';
import SafeRichText from '@/components/safeHtml/SafeRichText';
import { Plus, Minus } from "lucide-react"
import { perViewToGridCols } from '@/hooks/useCollectionLayout';

const FaqLayout2 = ({ block }: { block: FaqBlockData }) => {

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

                defaultValue={`accordion-item-0`}
                className={`grid grid-cols-1 gap-6 w-full my-6 ${gridCols}`}

            >
                {
                    Array.isArray(block?.faqItems) && block?.faqItems?.length > 0 &&
                    block?.faqItems?.slice(0, limit === -1 ? block?.faqItems.length : limit)?.map((item, index) => {
                        return (


                            item?.faqQuestion && item?.faqAnswer && (

                                <AccordionItem className='border-0' value={`accordion-item-${index}`} key={index} >

                                    <div className='bg-white  p-6 [box-shadow:0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-lg'>
                                        <AccordionTrigger className='cursor-pointer text-xl [&>svg]:hidden
      [&[data-state=open]_.icon-plus]:hidden
      [&[data-state=open]_.icon-minus]:inline-flex p-0 '><SafeHeading
                                                  html={item?.faqQuestion}
                                                  as='p'
                                                  className='text-lg font-medium text-slate-900'
                                              />

                                            <span className="ml-4 mt-4 flex items-center">
                                                {/* Plus when closed */}
                                                <Plus
                                                    className="
          h-5 w-5 transition-all duration-200 icon-plus
          data-[state=open]:hidden
        "
                                                />
                                                {/* Minus when open */}
                                                <Minus
                                                    className="
          h-5 w-5 transition-all duration-200 hidden icon-minus
          data-[state=open]:block
        "
                                                />
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-4 text-base">
                                            <SafeRichText
                                                html={item?.faqAnswer || ""}
                                            />
                                        </AccordionContent>
                                    </div>
                                </AccordionItem>

                            )
                        )



                    })
                }
            </Accordion>
        </>



    )
}

export default FaqLayout2
