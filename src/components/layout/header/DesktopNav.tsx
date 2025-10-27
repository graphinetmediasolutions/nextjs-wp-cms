"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import LinkOrA from "./LinkOrA";
import SubmenuFlyout from "./SubmenuFlyout";
import { MenuNode, nodes } from "./types";
import { getHref } from "./utils";

type Props = { items: MenuNode[] };

export default function DesktopNav({ items }: Props) {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {items.map((top) => {
          const kids = nodes(top.childItems);
          const { href, external } = getHref(top);

          if (kids.length === 0) {
            return (
              <NavigationMenuItem key={top.id} className="hidden md:block">
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <LinkOrA href={href} external={external} target={top.target}>
                    {top.label}
                  </LinkOrA>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={top.id} className="hidden md:block">
              <NavigationMenuTrigger>{top.label}</NavigationMenuTrigger>

              <NavigationMenuContent className="allow-overflow !overflow-visible z-50 bg-transparent p-0">
                <ul className="grid w-[200px] gap-2 p-3">
                  <li className="space-y-1">
                    {kids.map((child) => {
                      const gkids = nodes(child.childItems);
                      const { href: chHref, external: chExt } = getHref(child);

                      if (gkids.length === 0) {
                        return (
                          <NavigationMenuLink key={child.id} asChild>
                            <LinkOrA
                              href={chHref}
                              external={chExt}
                              target={child.target}
                              className="block rounded px-2 py-1 hover:bg-muted"
                            >
                              {child.label}
                            </LinkOrA>
                          </NavigationMenuLink>
                        );
                      }

                      return <SubmenuFlyout key={child.id} child={child} />;
                    })}
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
