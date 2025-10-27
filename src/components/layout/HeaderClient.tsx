"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { MenuIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { useFlyoutSide } from "@/hooks/useFlyoutSide";
import { SocialIcon } from "../SocialIcon";

/* -------------------- TYPES -------------------- */
export type MenuNode = {
  id: string;
  label: string;
  url?: string | null;
  uri?: string | null;
  path?: string | null;
  target?: string | null;
  cssClasses?: string[] | null;
  childItems?: { edges?: { node: MenuNode }[] | null } | null;
};

export function nodes(
  conn?: { edges?: { node: MenuNode }[] | null } | null
): MenuNode[] {
  return conn?.edges?.map((e) => e.node) ?? [];
}

/* -------------------- HELPERS -------------------- */
function getHref(n: MenuNode): { href: string; external: boolean } {
  const internal = n.uri || n.path;
  if (internal) return { href: internal, external: false };
  const abs = n.url ?? "#";
  const external = /^https?:\/\//i.test(abs);
  return { href: abs, external };
}

function hasChildren(n: MenuNode) {
  return nodes(n.childItems).length > 0;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* -------------------- LINK WRAPPER -------------------- */
function LinkOrA({
  href,
  external,
  target,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  target?: string | null;
  className?: string;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/* -------------------- SUBMENU FLYOUT (extract for hook) -------------------- */
function SubmenuFlyout({ child }: { child: MenuNode }) {
  const gkids = nodes(child.childItems);
  const { href: chHref, external: chExt } = getHref(child);

  // ✅ Hook is now at the top-level of a component (valid)
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

/* ======================================================================== */
/*                                HEADER                                    */
/* ======================================================================== */

export default function HeaderClient({ data, headerLogo, socials }: any) {
  return (
    <header className="sticky top-0 z-50 py-3 border-b bg-white ">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="font-semibold">
            {headerLogo && (
              <Image
                src={headerLogo}
                alt="Header Logo"
                width={300}
                height={120}
                className="h-20 w-auto"
              />
            )}
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:block">
            <DesktopNav items={data} />
          </div>

          {/* Mobile hamburger */}
          <div className="xl:hidden">
            <MobileNav items={data} />
          </div>
        </div>
      </div>
    </header>
  );
}

function DesktopNav({ items }: { items: MenuNode[] }) {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {items.map((top) => {
          const kids = nodes(top.childItems);
          const { href, external } = getHref(top);

          // Leaf → render as a simple link styled like a trigger
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

          // Has children → dropdown; grandchildren open in a right/left flyout
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

                      // ✅ Use a component that owns the hook
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

/* -------------------- MOBILE NAV (Sheet + Accordion) -------------------- */
function MobileNav({ items }: { items: MenuNode[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open menu">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[86vw] max-w-[380px] p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left"
      >
        <SheetHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
          <SheetTitle className="text-base">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close menu" />
          </SheetClose>
        </SheetHeader>

        <nav className="max-h-[calc(100dvh-56px)] overflow-y-auto px-2 py-2">
          <Accordion type="single" collapsible className="w-full">
            {items.map((top) => {
              const topKids = nodes(top.childItems);
              const { href, external } = getHref(top);

              // Leaf → render as plain link row
              if (topKids.length === 0) {
                return (
                  <div key={top.id} className="border-b">
                    <LinkOrA
                      href={href}
                      external={external}
                      target={top.target}
                      className="block px-3 py-3 text-base hover:bg-muted"
                    >
                      {top.label}
                    </LinkOrA>
                  </div>
                );
              }

              // Branch → Accordion + nested content
              return (
                <AccordionItem key={top.id} value={top.id} className="border-b">
                  <AccordionTrigger className="px-2 py-3 text-base">
                    {top.label}
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-3">
                    {/* If the top itself has a link, show a “View all” */}
                    {href && (
                      <div className="mb-2">
                        <LinkOrA
                          href={href}
                          external={external}
                          target={top.target}
                          className="block rounded px-2 py-2 text-sm font-medium hover:bg-accent"
                        >
                          View all {top.label}
                        </LinkOrA>
                      </div>
                    )}

                    {/* Level-2 list / nested accordions for grandchildren */}
                    <Accordion type="single" collapsible className="w-full">
                      {topKids.map((child) => {
                        const gkids = nodes(child.childItems);
                        const { href: chHref, external: chExt } = getHref(child);

                        if (gkids.length === 0) {
                          return (
                            <div key={child.id}>
                              <LinkOrA
                                href={chHref}
                                external={chExt}
                                target={child.target}
                                className="block rounded px-2 py-2 text-sm hover:bg-muted"
                              >
                                {child.label}
                              </LinkOrA>
                            </div>
                          );
                        }

                        return (
                          <AccordionItem key={child.id} value={child.id}>
                            <AccordionTrigger className="rounded px-2 py-2 text-sm hover:bg-muted">
                              {child.label}
                            </AccordionTrigger>
                            <AccordionContent className="pl-2">
                              <ul className="space-y-1">
                                {gkids.map((g) => {
                                  const { href: gHref, external: gExt } = getHref(g);
                                  return (
                                    <li key={g.id}>
                                      <LinkOrA
                                        href={gHref}
                                        external={gExt}
                                        target={g.target}
                                        className="block rounded px-2 py-2 text-sm hover:bg-accent"
                                      >
                                        {g.label}
                                      </LinkOrA>
                                    </li>
                                  );
                                })}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
