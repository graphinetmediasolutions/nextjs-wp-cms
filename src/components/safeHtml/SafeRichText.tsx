import React from "react";
import DOMPurify from "isomorphic-dompurify";

type SafeRichTextProps = {
  html: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function SafeRichText({ html, className = "", style={} }: SafeRichTextProps) {
  if (!html) return null;

  // ✅ allow common content tags + class + style
  const cleanHtml = DOMPurify.sanitize(html, {
    ALLOWED_ATTR: [
      "class", "style", "href", "target", "rel", "title", "id", "aria-label",
    ],
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "s", "a", "ol", "ul", "li", "blockquote",
      "span", "div", "h1", "h2", "h3", "h4", "h5", "h6", "img", "figure", "figcaption",
    ],
  });

  return <div  style={style}  className={className} dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}