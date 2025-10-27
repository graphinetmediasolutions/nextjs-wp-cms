"use client";

import * as React from "react";
import { MenuIcon } from "lucide-react";
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import LinkOrA from "./LinkOrA";
import { MenuNode, nodes } from "./types";
import { getHref } from "./utils";

type Props = { items: MenuNode[] };

export default function MobileNav({ items }: Props) {
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

              return (
                <AccordionItem key={top.id} value={top.id} className="border-b">
                  <AccordionTrigger className="px-2 py-3 text-base">
                    {top.label}
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-3">
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
