import type React from "react";

export function bgStyle(opts: {
  color?: string | null;
  imageUrl?: string | null;
}): React.CSSProperties {
  const { color, imageUrl } = opts;
  return {
    backgroundColor: color || undefined,
    backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
    backgroundSize: imageUrl ? "cover" : undefined,
    backgroundPosition: imageUrl ? "center" : undefined,
  };
}
