// components/SafeHeading.tsx
import React from "react";
import DOMPurify from "isomorphic-dompurify";

type SafeHeadingProps = {
  html: string;
  as?: keyof JSX.IntrinsicElements; // e.g. 'h1', 'h2', etc.
  className?: string; // Tailwind classes you want to apply from outside
};

export default function SafeHeading({
  html,
  as: Tag = "h2",
  className = "",
}: SafeHeadingProps) {
  if (!html) return null;

  // ✅ Allow `class` and `style` from CMS safely
  const safeHtml = DOMPurify.sanitize(html, {
    ALLOWED_ATTR: [
      "class", // allow Tailwind or custom classes
      "style", // allow inline styles
      "href", "target", "rel", "title", "id", "aria-label",
    ],
  });

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
