import React from "react";
import DOMPurify from "isomorphic-dompurify";

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span";
export type HeadingPosition = "Left" | "Right" | "Center";

type SafeHeadingProps = {
  html?: string | null;                 // tolerate null/undefined from CMS
  as?: HeadingTag;                      // 'h1' | ... | 'span'
  className?: string;                   // external Tailwind classes
  position?: HeadingPosition;           // Left | Right | Center
};

// Runtime guard (safety if CMS sends weird tag values)
const HEADING_TAGS: HeadingTag[] = ["h1","h2","h3","h4","h5","h6","p","div","span"];
const isHeadingTag = (v: unknown): v is HeadingTag => typeof v === "string" && HEADING_TAGS.includes(v as HeadingTag);

// Map CMS alignment → Tailwind
const POS_CLASSES: Record<HeadingPosition, string> = {
  Left: "text-left",
  Center: "text-center",
  Right: "text-right",
};

export default function SafeHeading({
  html,
  as = "h2",
  className = "",
  position = "Left",
}: SafeHeadingProps) {
  if (!html) return null;

  // Sanitize CMS HTML (allow some useful attributes)
  const safeHtml = DOMPurify.sanitize(html, {
    ALLOWED_ATTR: [
      "class",
      "style",
      "href", "target", "rel", "title", "id", "aria-label",
    ],
    // Optionally restrict tags further, e.g.:
    // ALLOWED_TAGS: ["strong","em","span","a","br","small","sup","sub"],
    // KEEP_CONTENT: true, // keeps text if a disallowed tag is stripped
  });

  const Tag = isHeadingTag(as) ? as : "h2";
  const align = POS_CLASSES[position] ?? POS_CLASSES.Left;

  return (
    <Tag
      className={`${align} ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}