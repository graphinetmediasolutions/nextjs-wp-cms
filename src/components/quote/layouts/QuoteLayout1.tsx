import SafeHeading, { HeadingPosition, HeadingTag } from '@/components/safeHtml/SafeHeading'
import SafeRichText from '@/components/safeHtml/SafeRichText'
import { QuoteBlockData } from '@/lib/mappers/mapQuoteBlock'
import React from 'react'

const QuoteLayout1 = ({ block }: { block: QuoteBlockData }) => {

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
            <figure className="max-w-screen-md mx-auto text-center">

                {/* Quote Icon */}
                <svg
                    className="w-11 h-11 text-heading mb-4 mx-auto"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 11V8a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1Zm0 0v2a4 4 0 0 1-4 4H5m14-6V8a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1Zm0 0v2a4 4 0 0 1-4 4h-1"
                    />
                </svg>

                {/* Quote Text */}
                <blockquote>
                    {
                        block?.quoteText && <SafeHeading
                        as="p"
                        position='Center'
                        className="text-2xl italic font-semibold tracking-tight text-heading"
                            html={block?.quoteText}

                        />
                    }

                    {/* <p className="text-2xl italic font-semibold tracking-tight text-heading">
                        “{block.quoteText || ""}
                    </p> */}
                </blockquote>

                {/* Author section */}
                {(block.quoteAuthorName || block.quoteAuthorRole) && (
                    <figcaption className="flex items-center justify-center mt-6 space-x-3">
                        {/* Avatar (optional) */}
                        {block.quoteAuthorName && (
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 text-sm">
                                {block.quoteAuthorName.charAt(0)}
                            </div>
                        )}

                        <div className="flex items-center divide-x divide-default">
                            {/* Author name */}
                            {block.quoteAuthorName && (
                                <cite className="pe-3 font-medium text-heading">
                                    {block.quoteAuthorName}
                                </cite>
                            )}

                            {/* Role */}
                            {block.quoteAuthorRole && (
                                <cite className="ps-3 text-sm text-body">
                                    {block.quoteAuthorRole}
                                </cite>
                            )}
                        </div>
                    </figcaption>
                )}
            </figure>

        </>
    )
}

export default QuoteLayout1
