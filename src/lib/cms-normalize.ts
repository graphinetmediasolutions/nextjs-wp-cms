// Generic helpers
export const first = <T>(v?: T[] | T | null) =>
  Array.isArray(v) ? v[0] : v ?? undefined;

// Map "Full Width" | "Box Width" to container classes
export function containerClass(width?: string[] | string | null): "container" | "container-fluid" {
  const val = first(width);
  return val === "Full Width" ? "container-fluid" : "container";
}

// Map ["Left"|"Right"] to "left" | "right"
export function imageAlign(align?: string[] | string | null): "left" | "right" {
  const val = first(align);

  console.log({ align, val });
  return val === "Right" || val?.toLowerCase() === "right" ? "right" : "left";
}

// Map ["Top"|"Center"|"Bottom"] to Tailwind align classes
export function alignItems(align?: string[] | string | null): string {
  const val = first(align);
  switch (val) {
    case "Center": return "items-center";
    case "Bottom": return "items-end";
    case "Top":
    default: return "items-start";
  }
}




export function getLayout(v?: string | null): "grid" | "carousel" {
  if (v === "Carousel") return "carousel";
  return "grid"; // default
}
