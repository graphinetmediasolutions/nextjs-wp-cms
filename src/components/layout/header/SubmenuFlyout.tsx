"use client";

import * as React from "react";
import { useFlyoutSide } from "@/hooks/useFlyoutSide";
import LinkOrA from "./LinkOrA";
import { MenuNode, nodes } from "./types";
import { getHref } from "./utils";

type Props = { child: MenuNode };

function SubmenuFlyoutBase({ child }: Props) {
  const gkids = nodes(child.childItems);
  const { href: chHref, external: chExt } = getHref(child);

  // Hook is at top-level of this component (valid)
  const { bind, openLeft } = useFlyoutSide(220, 8);

  return (
    <div className="relative group/sub" {...bind}>
      {chHref ? (
        <LinkOrA
          href={chHref}
          external={chExt}
          target={child.target}
          className="flex items-center justify-between rounded px-2 py-1 hover:bg-muted"
        >
          <span className="text-sm">{child.label}</span>
          <span aria-hidden className="ml-2 text-xs">›</span>
        </LinkOrA>
      ) : (
        <button
          type="button"
          className="flex w-full items-center justify-between rounded px-2 py-1 text-left hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="text-sm">{child.label}</span>
          <span aria-hidden className="ml-2 text-xs">›</span>
        </button>
      )}

      <ul
        className={[
          "nav-flyout",
          "invisible absolute top-0 z-50 min-w-[220px] rounded-md border bg-popover p-2 text-popover-foreground shadow-md opacity-0 transition",
          openLeft ? "right-full " : "left-full ",
          "group-hover/sub:visible group-hover/sub:opacity-100 group-focus-within/sub:visible group-focus-within/sub:opacity-100",
          "!overflow-visible",
        ].join(" ")}
      >
        {gkids.map((g) => {
          const { href: gHref, external: gExt } = getHref(g);
          return (
            <li key={g.id}>
              <LinkOrA
                href={gHref}
                external={gExt}
                target={g.target}
                className="block rounded px-2 py-1 text-sm hover:bg-muted"
              >
                {g.label}
              </LinkOrA>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Small perf win: memo to avoid re-render when parents change unrelated props
const SubmenuFlyout = React.memo(SubmenuFlyoutBase);
export default SubmenuFlyout;
