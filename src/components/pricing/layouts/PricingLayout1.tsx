import SafeHeading, { HeadingPosition, HeadingTag } from '@/components/safeHtml/SafeHeading';
import { perViewToGridCols } from '@/hooks/useCollectionLayout';
import { PricingBlockData } from '@/lib/mappers/mapPricingBlock';
import React from 'react'

const PricingLayout1 = ({ block }: { block: PricingBlockData }) => {

    const { items, displayPerRow } = block;
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

            <div className="p-4">
                <div className="max-w-6xl max-lg:max-w-3xl mx-auto">



                    {/* Plans Grid */}
                    <div className={`grid gap-6 ${gridCols}`}>
                        {items.map((plan, index) => {
                            // const features = plan?.feature?.features
                            //     ? plan.feature.features.split(",").map(f => f.trim())
                            //     : [];

                            const isBestDeal = index === 1;




                            return (
                                <div
                                    key={index}
                                    className={`border hover:border-primary shadow-sm rounded-md p-6 flex flex-col 
    ${isBestDeal ? "border-primary" : "border-gray-300"}`}
                                >

                                    {/* CONTENT AREA (pushes up automatically) */}
                                    <div className="flex-grow">

                                        {/* Plan Title */}
                                        <h3 className="text-slate-900 text-xl font-semibold mb-3 flex items-center">
                                            {plan.title}
                                            {isBestDeal && (
                                                <span className="px-2 py-1 text-xs font-semibold text-white bg-indigo-500 rounded-md ml-3">
                                                    Best Deal
                                                </span>
                                            )}
                                        </h3>

                                        <p className="text-[15px] text-slate-600">For Individuals and Teams</p>

                                        {/* Price */}
                                        <div className="mt-8">
                                            <h3 className="text-slate-900 text-3xl font-semibold">
                                                {plan.discountedPrice ? (
                                                    <>
                                                        <span className="line-through text-slate-500 mr-2 text-[20px]">
                                                            {plan.price}
                                                        </span>
                                                        <span>{plan.discountedPrice}</span>
                                                    </>
                                                ) : (
                                                    <span>${plan.price}</span>
                                                )}

                                                <sub className="text-slate-600 text-[15px] font-normal">
                                                    {plan.period && ` / ${plan.period}`}
                                                </sub>
                                            </h3>
                                        </div>

                                        {/* Features */}
                                        <div className="mt-6">
                                            <h4 className="text-slate-900 text-lg font-semibold mb-3">Include</h4>
                                            <p className="text-[15px] text-slate-600">Everything you get in this plan</p>

                                            <ul className="mt-8 space-y-4">
                                                {Array.isArray(plan?.feature) &&
                                                    plan?.feature.map((f, i) => (
                                                        <li key={i} className="flex items-center text-[15px] text-slate-600 font-medium">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" className="mr-3 fill-green-500" viewBox="0 0 24 24">
                                                                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                                                            </svg>
                                                            {f.features}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* CTA BUTTON (always at bottom) */}
                                    <a href={plan.ctaUrl ?? "#"} className="mt-8">
                                        <button
                                            type="button"
                                            className="w-full px-4 py-2.5 text-[15px] font-medium text-white bg-primary hover:bg-indigo-700 rounded-md cursor-pointer"
                                        >
                                            {plan.ctaText ?? "Buy Plan"}
                                        </button>
                                    </a>
                                </div>

                            );
                        })}
                    </div>

                </div>
            </div>
        </>
    )
}

export default PricingLayout1
