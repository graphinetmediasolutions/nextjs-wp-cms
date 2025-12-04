import SafeHeading, { HeadingPosition, HeadingTag } from '@/components/safeHtml/SafeHeading'
import SafeRichText from '@/components/safeHtml/SafeRichText'
import { QuoteBlockData } from '@/lib/mappers/mapQuoteBlock'
import React from 'react'

const QuoteLayout2 = ({ block }: { block: QuoteBlockData }) => {

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
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="border-l-4 border-primary pl-6 relative">

                    {/* Decorative floating quote mark */}
                    <span className="absolute -top-4 -left-2 text-6xl text-primary opacity-20 font-serif">
                        “
                    </span>

                    {/* Quote text */}
                    <p className="text-2xl md:text-[28px] font-medium leading-relaxed text-heading italic">
                        {block.quoteText}
                    </p>

                    {/* Author info */}
                    {(block.quoteAuthorName || block.quoteAuthorRole) && (
                        <div className="mt-6">
                            {block.quoteAuthorName && (
                                <p className="text-lg font-semibold text-heading">
                                    — {block.quoteAuthorName}
                                </p>
                            )}
                            {block.quoteAuthorRole && (
                                <p className="text-sm text-body mt-1">
                                    {block.quoteAuthorRole}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default QuoteLayout2
