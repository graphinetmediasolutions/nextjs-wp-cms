// hooks/useCollectionLayout.ts
// Reusable across blogs/services/products, etc.

export type CollectionLayoutInputs = {
    perView?: number | null;                       // visible cards on desktop
    perScroll?: number | null;                     // slides to scroll per step
    autoplay?: boolean | number | string | null;   // false | true | ms (string/number)
    loop?: boolean | null;
    showArrow?: boolean | null;
    showBullets?: boolean | null; // reserved for dots later
    sliderSpeed?: string | number | null;          // autoplay delay in ms
};

const clampInt = (v: unknown, min: number, max: number, fallback: number) => {
    const n =
        typeof v === "string" ? parseInt(v, 10)
            : typeof v === "number" ? v
                : NaN;
    if (!Number.isFinite(n)) return fallback;
    return Math.min(max, Math.max(min, n));
};

/** Strict mapping so Tailwind can see classes at build time. */
export function perViewToGridCols(perView?: number | null) {
    const p = clampInt(perView, 1, 6, 3);
    // mobile 1, tablet 2/3, desktop p
    switch (p) {
        case 1:
            return "grid-cols-1 sm:grid-cols-1 lg:grid-cols-1";
        case 2:
            return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2";
        case 3:
            return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
        case 4:
            return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
        case 5:
            return "grid-cols-1 sm:grid-cols-3 lg:grid-cols-5";
        case 6:
        default:
            return "grid-cols-1 sm:grid-cols-3 lg:grid-cols-6";
    }
}

/** For CarouselItem width (Embla/Shadcn). */
export function perViewToItemBasis(perView?: number | null) {
    const p = clampInt(perView, 1, 6, 3);
    switch (p) {
        case 1:
            return "md:basis-full";
        case 2:
            return "md:basis-1/2";
        case 3:
            return "md:basis-1/3";
        case 4:
            return "md:basis-1/4";
        case 5:
            return "md:basis-1/5";
        case 6:
        default:
            return "md:basis-1/6";
    }
}

/** Embla slidesToScroll with sensible defaults for breakpoints. */
export function computeSlidesToScroll(perScroll?: number | null) {
    const s = clampInt(perScroll, 1, 6, 1);
    return {
        base: 1,          // phones scroll 1
        sm: Math.min(s, 1),
        md: Math.min(s, 2),
        lg: s,            // desktops follow configured value
    };
}

/** Normalize autoplay input to number (ms) or false. */
function normalizeAutoplay(
  autoplay?: boolean | string | number | null,
  sliderSpeed?: string | number | null,
  defaultDelay = 4000
): number | false {
  // 1. If autoplay is explicitly false → disable it
  if (autoplay === false) return false;

  // 2. If autoplay is true → use sliderSpeed if provided, else fallback
  if (autoplay === true) {
    const speedNum = Number(sliderSpeed);
    return !isNaN(speedNum) && speedNum > 0 ? speedNum : defaultDelay;
  }

  // 3. If autoplay is a number/string → treat it as milliseconds
  const autoNum = Number(autoplay);
  if (!isNaN(autoNum) && autoNum > 0) return autoNum;

  // 4. If only sliderSpeed is present → use it
  const sliderNum = Number(sliderSpeed);
  if (!isNaN(sliderNum) && sliderNum > 0) return sliderNum;

  // 5. Fallback default
  return defaultDelay;
}
/** Convenience helper (pure; safe on server). */
export function useCollectionLayout(opts: CollectionLayoutInputs = {}) {
    const { perView, perScroll, autoplay, loop, showArrow, showBullets } = opts;

    const gridCols = perViewToGridCols(perView);
    const itemBasis = perViewToItemBasis(perView);
    const slidesToScroll = computeSlidesToScroll(perScroll);
    const autoplayDelay = normalizeAutoplay(autoplay); // number | false
    const shouldLoop = loop ?? true;

    const showArrows = showArrow ?? true;
    const IsShowBullets = showBullets ?? false;

    return {
        // grid
        gridCols,
        // carousel
        itemBasis,
        slidesToScroll,
        autoplayDelay, // number (ms) or false
        loop: shouldLoop,
        showArrows,
        IsShowBullets
    };
}
