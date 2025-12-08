export function stripHtml(html?: string | null): string | undefined {
  if (!html) return undefined;

  return html
    .replace(/<[^>]+>/g, " ")  // remove HTML tags
    .replace(/\s+/g, " ")      // collapse whitespace
    .trim();
}