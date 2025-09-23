import React from "react";
import { bgStyle } from "@/lib/style";
import { containerClass } from "@/lib/cms-normalize";



type SectionProps = {
  className?: string;
  sectionWidth?: string[] | string | null;  // ["Full Width"] | ["Box Width"]
  backgroundColor?: string | null;
  backgroundImageUrl?: string | null;
  padY?: string; // e.g., "py-16"
  overlay?: string; // e.g., "bg-black/40"
  children: React.ReactNode;
};

export default function Section({
  className = "",
  sectionWidth,
  backgroundColor,
  backgroundImageUrl,
  padY = "py-16",
  overlay,
  children,
}: SectionProps) {
  const container = containerClass(sectionWidth);

  return (
    <section className={`relative w-full ${className}`} style={bgStyle({
      color: backgroundColor,
      imageUrl: backgroundImageUrl,
    })}>
      {overlay ? <div className={`absolute inset-0 ${overlay}`} /> : null}
      <div className={`${container} relative z-10 ${padY}`}>
        {children}
      </div>
    </section>
  );
}
