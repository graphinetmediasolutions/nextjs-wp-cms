import * as React from "react";

export function useFlyoutSide(minWidth = 220, gap = 8) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [openLeft, setOpenLeft] = React.useState(false);

  const recalc = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const spaceRight = window.innerWidth - r.right;
    const spaceLeft = r.left;
    setOpenLeft(spaceRight < minWidth + gap && spaceLeft >= minWidth + gap);
  }, [minWidth, gap]);

  React.useEffect(() => {
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recalc]);

  const bind = {
    ref,
    onMouseEnter: recalc,
    onFocus: recalc,
  } as const;

  return { bind, openLeft };
}
