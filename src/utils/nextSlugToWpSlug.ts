// export const nextSlugToWpSlug = (nextSlug: string) =>
//   nextSlug && Array.isArray(nextSlug) ? nextSlug.join("/") : (nextSlug ?? "/");


export const nextSlugToWpSlug = (parts?: string[] | string): string => {
  if (!parts || (Array.isArray(parts) && parts.length === 0)) return "/"; // homepage

  if (Array.isArray(parts)) {
    return `/${parts.join("/")}/`;
  }

  // parts is a string
  const withLeading = parts.startsWith("/") ? parts : `/${parts}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
};