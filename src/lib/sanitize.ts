import DOMPurify from "isomorphic-dompurify";

export function sanitize(html: string): string {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ALLOWED_ATTR: [
      "class", "id", "style", // ✅ allow classes + inline style
      "href", "target", "rel", "title", "alt", "src"
    ],
    // Optional: allow ARIA and data-* if your CMS adds them
    ALLOW_ARIA_ATTR: true,
    ALLOW_DATA_ATTR: true,
  });
}