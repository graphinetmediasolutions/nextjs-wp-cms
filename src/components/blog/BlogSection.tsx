import BlogGridLayout1 from "./layouts/BlogGridLayout1";
import BlogGridLayout2 from "./layouts//BlogCarouselLayout2";
import BlogGridLayout3 from "./layouts/BlogGridLayout3";
import BlogCarouselLayout1 from "./layouts/BlogCarouselLayout1";
import BlogCarouselLayout2 from "./layouts/BlogCarouselLayout2";
import BlogCarouselLayout3 from "./layouts/BlogCarouselLayout3";

import { BlogItem } from "@/lib/mappers/mapBlogBlock";
import Layout1 from "./layouts/LayouttestCarousel";

// import type { BlogItem } from "./layouts/BlogGridLayout1";

export default function BlogSection({
  items,
  isSlider,
  layout,
  perView,
  perScroll,
  autoplay,
  showArrow,
  showBullets,
  sliderSpeed,
  loopForSlider
}: {
  items: BlogItem[];
  isSlider: boolean;
  layout: "Layout 1" | "Layout 2" | "Layout 3";
  perView: number | undefined;
  perScroll: number | undefined;
  autoplay: boolean;
  showArrow?: boolean;
  showBullets?: boolean;
  sliderSpeed?: number | string;
  loopForSlider: boolean;
}) {
  if (!items?.length) return null;

  if (isSlider) {
    switch (layout) {
      case "Layout 2":
        return <BlogCarouselLayout2 items={items} />;
      case "Layout 3":
        return <BlogCarouselLayout3 items={items} />;
      default:
        return <BlogCarouselLayout1
          items={items}
          perView={perView ?? 3}
          perScroll={perScroll ?? 1}
          autoplay={autoplay}
          loop={loopForSlider}
          showArrow={showArrow}
          showBullets={showBullets}
          sliderSpeed={sliderSpeed}
          loopForSlider={loopForSlider}


        />;

    }
  }

  switch (layout) {
    case "Layout 2":
      return <BlogGridLayout2 items={items} />;
    case "Layout 3":
      return <BlogGridLayout3 items={items} />;
    default:
      return <BlogGridLayout1
        perView={perView ?? 3}
        items={items} />;
  }
}
