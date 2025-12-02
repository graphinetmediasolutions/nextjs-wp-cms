"use client";

import React from "react";
import SafeHeading, { HeadingPosition, HeadingTag } from "@/components/safeHtml/SafeHeading";
import { TabsBlockData } from "@/lib/mappers/mapTabsBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SafeRichText from "@/components/safeHtml/SafeRichText";

const TabsLayout3 = ({ block }: { block: TabsBlockData }) => {
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

      {/* Tabs with vertical layout on desktop */}
      <Tabs defaultValue="tab-0" className="w-full">
        <div className="md:flex md:gap-8 items-start">
          {/* Sidebar tabs */}
          <TabsList
            className="
              flex flex-wrap md:flex-col md:w-1/3 w-full
              gap-2 rounded-2xl  p-2 bg-transparent h-auto
            "
          >
            {items.map((item, index) => (
              <TabsTrigger
                key={`tab-trigger-${index}`}
                value={`tab-${index}`}
                className="
                  w-full justify-between items-center
                  rounded-xl px-4 py-3 text-left text-sm md:text-base
                  border border-transparent
                  data-[state=active]:bg-white
                  data-[state=active]:border-primary
                  data-[state=active]:shadow
                  group
                  transition-all duration-200  h-auto
                "
              >
                <div className="flex items-start gap-3">
                  {/* Step indicator / bullet */}
                  <span
                    className="
                      mt-1 h-6 w-6 flex items-center justify-center rounded-full
                      bg-slate-200 text-xs font-semibold
                      group-data-[state=active]:bg-primary
                      group-data-[state=active]:text-white shrink-0
                    "
                  >
                    {index + 1}
                  </span>

                  <SafeHeading
                    as="p"
                    position="Left"
                    style={{ color: "inherit" }}
                    className="whitespace-normal text-sm md:text-base font-medium"
                    html={item?.title}
                  />
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Content area */}
          <div className="mt-4 md:mt-0 md:flex-1">
            {items.map((item, index) => (
              <TabsContent
                key={`tab-content-${index}`}
                value={`tab-${index}`}
                className="h-full"
              >
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 md:p-8 shadow-sm h-full">
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
          </div>
        </div>
      </Tabs>
    </section>
  );
};

export default TabsLayout3;
