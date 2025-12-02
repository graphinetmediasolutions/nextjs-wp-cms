"use client";
import SafeHeading, { HeadingPosition, HeadingTag } from "@/components/safeHtml/SafeHeading";
import { TabsBlockData, TabsPosition } from "@/lib/mappers/mapTabsBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import SafeRichText from "@/components/safeHtml/SafeRichText";

const TabsLayout1 = ({ block }: { block: TabsBlockData }) => {
    const { items } = block;


    if (!Array.isArray(items) || items.length === 0) {
        return null;
    }

    const position: TabsPosition =
        Array.isArray(block?.position) && block.position.length > 0
            ? block.position[0]
            : "Top";

    const POSITION_CLASSES: Record<TabsPosition, string> = {
        Top: "md:flex-col ",
        Left: "md:flex-row",
        Right: "md:flex-row-reverse",
    };

    const TABS_LIST_CLASSES : Record<TabsPosition, string> = {
        Top: "md:flex-row flex-wrap",
        Left: "md:flex-col items-stretch",
        Right: "md:flex-col items-stretch ",
    };
     const TABS_TRIGGER_CLASSES : Record<TabsPosition, string> = {
        Top: "flex-none w-auto",
        Left: "",
        Right: "",
    };

    const classes = POSITION_CLASSES[position];
    const tabsClasses = TABS_LIST_CLASSES[position]
    const tabsTriggerClasses = TABS_TRIGGER_CLASSES[position]



    return (
        <>
            <div className="headings mb-8 md:mb-10">
                {block?.heading && (
                    <SafeHeading
                        className="text-4xl md:text-5xl md:leading-[60px] font-semibold max-w-xxl mt-5 mb-5 relative"
                        as={(block?.headingTag?.[0] as HeadingTag) ?? "h2"}
                        position={(block?.headingPosition?.[0] as HeadingPosition) ?? "Left"}
                        style={{ color: "inherit" }}
                        html={block.heading}
                    />
                )}

                {block?.subheading && (
                    <SafeHeading
                        className="font-medium relative"
                        position={(block?.headingPosition?.[0] as HeadingPosition) ?? "Left"}
                        as="p"
                        style={{ color: "inherit" }}
                        html={block.subheading}
                    />
                )}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="tab-0"  className={`flex flex-col ${classes} gap-6 `}>
                {/* All tab labels in ONE TabsList */}
                <TabsList className={`flex flex-wrap ${tabsClasses} gap-4 bg-transparent h-auto justify-start`}>
                    {items.map((item, index) => (
                        <TabsTrigger key={`tab-trigger-${index}`}  value={`tab-${index}`} className={`p-3 text-center border border-gray-300  w-auto max-w-[300px] hover:bg-primary hover:text-white group data-[state=active]:bg-primary data-[state=active]:text-white ${tabsTriggerClasses}`}>
                            <SafeHeading as="p" position="Center" style={{color: "inherit"}} className="whitespace-normal group-hover:text-white " html={item?.title} />
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Contents mapped separately */}
                {items.map((item, index) => (
                    item.content &&
                    <TabsContent className="border  border-gray-300 rounded-lg p-4" key={`tab-content-${index}`} value={`tab-${index}`}>
                        {item?.content && <SafeRichText html={item.content} />}
                    </TabsContent>
                ))}
            </Tabs>
        </>
    );
};

export default TabsLayout1;
