"use client";

import React from "react";
import SafeHeading, { HeadingPosition, HeadingTag } from "@/components/safeHtml/SafeHeading";
import { TabsBlockData } from "@/lib/mappers/mapTabsBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SafeRichText from "@/components/safeHtml/SafeRichText";

const TabsLayout2 = ({ block }: { block: TabsBlockData }) => {
  const { items } = block;

  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <section>
      {/* Heading area */}
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
      <Tabs defaultValue="tab-0" className="w-full">
        {/* Pills row */}
        <div className="w-full overflow-x-auto">
          <TabsList className="flex w-max gap-2 rounded-full bg-slate-100 p-1">
            {items.map((item, index) => (
              <TabsTrigger
                key={`tab-trigger-${index}`}
                value={`tab-${index}`}
                className="
                  rounded-full px-4 py-2 text-sm font-medium
                  text-slate-600 whitespace-nowrap border border-transparent
                  hover:bg-primary/10
                  data-[state=active]:bg-primary
                  data-[state=active]:text-white
                  data-[state=active]:border-primary
                  transition-colors duration-200
                "
              >
                <SafeHeading
                  as="p"
                  position="Center"
                  style={{ color: "inherit" }}
                  className="whitespace-nowrap"
                  html={item?.title}
                />
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Card content */}
        {items.map((item, index) => (
          <TabsContent
            key={`tab-content-${index}`}
            value={`tab-${index}`}
            className="mt-6"
          >
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 md:p-8 shadow-sm">
              {item?.title && (
                <SafeHeading
                  as="h3"
                  position="Left"
                  className="text-xl md:text-2xl font-semibold mb-3"
                  style={{ color: "inherit" }}
                  html={item.title}
                />
              )}

              {item?.content && <SafeRichText html={item.content} />}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default TabsLayout2;
