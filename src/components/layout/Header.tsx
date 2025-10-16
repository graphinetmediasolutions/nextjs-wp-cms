"use client";

import * as React from "react";
import Link from "next/link";
import {
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";

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

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="font-semibold">
            Logo
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:block">
            <NavigationMenu /* keeps content inside header */
              viewport={false}
            >
              <NavigationMenuList>
                {/* Home dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                  <NavigationMenuContent className="shadow-lg">
                    <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden transition"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              shadcn/ui
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Beautifully designed components built with
                              Tailwind CSS.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/docs" title="Introduction">
                        Re-usable components built using Radix UI and Tailwind
                        CSS.
                      </ListItem>
                      <ListItem href="/docs/installation" title="Installation">
                        How to install dependencies and structure your app.
                      </ListItem>
                      <ListItem
                        href="/docs/primitives/typography"
                        title="Typography"
                      >
                        Styles for headings, paragraphs, lists...etc
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Components grid */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent className="shadow-lg">
                    <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Simple link */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/docs">Docs</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* List */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>List</NavigationMenuTrigger>
                  <NavigationMenuContent className="shadow-lg">
                    <ul className="grid w-[300px] gap-4 p-4">
                      <li className="space-y-3">
                        <NavigationMenuLink asChild>
                          <Link href="#" className="block">
                            <div className="font-medium">Components</div>
                            <div className="text-muted-foreground">
                              Browse all components in the library.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#" className="block">
                            <div className="font-medium">Documentation</div>
                            <div className="text-muted-foreground">
                              Learn how to use the library.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#" className="block">
                            <div className="font-medium">Blog</div>
                            <div className="text-muted-foreground">
                              Read our latest blog posts.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Simple */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
                  <NavigationMenuContent className="shadow-lg">
                    <ul className="grid w-[220px] gap-2 p-3">
                      <li className="space-y-1">
                        <NavigationMenuLink asChild>
                          <Link href="#" className="block">
                            Components
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#" className="block">
                            Documentation
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#" className="block">
                            Blocks
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* With Icon */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
                  <NavigationMenuContent className="shadow-lg">
                    <ul className="grid w-[240px] gap-2 p-3">
                      <li className="space-y-2">
                        <NavigationMenuLink asChild>
                          <Link href="#" className="flex items-center gap-2">
                            <CircleHelpIcon className="h-4 w-4" />
                            Backlog
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#" className="flex items-center gap-2">
                            <CircleIcon className="h-4 w-4" />
                            To Do
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#" className="flex items-center gap-2">
                            <CircleCheckIcon className="h-4 w-4" />
                            Done
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile hamburger */}
          <div className="xl:hidden">
            <MobileOffcanvas />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- MOBILE OFFCANVAS ---------- */
function MobileOffcanvas() {
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
            <Button variant="ghost" size="icon" aria-label="Close menu">
              {/* <XIcon className="h-5 w-5" /> */}
            </Button>
          </SheetClose>
        </SheetHeader>

        {/* Scrollable content */}
        <nav className="max-h-[calc(100dvh-56px)] overflow-y-auto px-2 py-2">
          {/* Use single-type Accordion so opening one closes others */}
          <Accordion type="single" collapsible className="w-full">
            {/* Home group */}
            <AccordionItem value="home" className="border-b">
              <AccordionTrigger className="px-2 py-3 text-base">
                Home
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-3">
                <div className="rounded-md border p-3">
                  <Link href="/" className="block">
                    <div className="mb-1 text-sm font-medium">shadcn/ui</div>
                    <p className="text-sm text-muted-foreground">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </Link>
                </div>
                <ul className="mt-3 space-y-2">
                  <li>
                    <Link href="/docs" className="block rounded p-2 hover:bg-muted">
                      <span className="text-sm font-medium">Introduction</span>
                      <p className="text-xs text-muted-foreground">
                        Re-usable components built using Radix UI and Tailwind CSS.
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/installation"
                      className="block rounded p-2 hover:bg-muted"
                    >
                      <span className="text-sm font-medium">Installation</span>
                      <p className="text-xs text-muted-foreground">
                        How to install dependencies and structure your app.
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/primitives/typography"
                      className="block rounded p-2 hover:bg-muted"
                    >
                      <span className="text-sm font-medium">Typography</span>
                      <p className="text-xs text-muted-foreground">
                        Styles for headings, paragraphs, lists...etc
                      </p>
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Components grid as vertical list */}
            <AccordionItem value="components" className="border-b">
              <AccordionTrigger className="px-2 py-3 text-base">
                Components
              </AccordionTrigger>
              <AccordionContent className="px-2 pb-3">
                {/* second level: show another Accordion for sub-groups (example of 2-level) */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="all">
                    <AccordionTrigger className="rounded px-2 py-2 text-sm hover:bg-muted">
                      All
                    </AccordionTrigger>
                    <AccordionContent className="pl-2">
                      <ul className="space-y-1">
                        {components.map((c) => (
                          <li key={c.title}>
                            <Link
                              href={c.href}
                              className="block rounded px-2 py-2 text-sm hover:bg-accent"
                            >
                              <div className="font-medium">{c.title}</div>
                              <p className="text-xs text-muted-foreground">
                                {c.description}
                              </p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>

            {/* Docs simple link */}
            <AccordionItem value="docs" className="border-b">
              <AccordionTrigger className="px-2 py-3 text-base">
                <Link href="/docs" className="w-full text-left">
                  Docs
                </Link>
              </AccordionTrigger>
              <AccordionContent className="px-2 pb-3">
                <p className="rounded bg-muted p-3 text-sm text-muted-foreground">
                  Read the documentation.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* List group */}
            <AccordionItem value="list" className="border-b">
              <AccordionTrigger className="px-2 py-3 text-base">
                List
              </AccordionTrigger>
              <AccordionContent className="px-2 pb-3">
                <ul className="space-y-1">
                  <li>
                    <Link href="#" className="block rounded p-2 hover:bg-muted">
                      <div className="font-medium">Components</div>
                      <div className="text-sm text-muted-foreground">
                        Browse all components in the library.
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block rounded p-2 hover:bg-muted">
                      <div className="font-medium">Documentation</div>
                      <div className="text-sm text-muted-foreground">
                        Learn how to use the library.
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block rounded p-2 hover:bg-muted">
                      <div className="font-medium">Blog</div>
                      <div className="text-sm text-muted-foreground">
                        Read our latest blog posts.
                      </div>
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Simple */}
            <AccordionItem value="simple" className="border-b">
              <AccordionTrigger className="px-2 py-3 text-base">
                Simple
              </AccordionTrigger>
              <AccordionContent className="px-2 pb-3">
                <ul className="space-y-1">
                  <li>
                    <Link href="#" className="block rounded p-2 hover:bg-muted">
                      Components
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block rounded p-2 hover:bg-muted">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block rounded p-2 hover:bg-muted">
                      Blocks
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* With Icon */}
            <AccordionItem value="with-icon" className="border-b">
              <AccordionTrigger className="px-2 py-3 text-base">
                With Icon
              </AccordionTrigger>
              <AccordionContent className="px-2 pb-3">
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 rounded p-2 hover:bg-muted"
                    >
                      <CircleHelpIcon className="h-4 w-4" />
                      Backlog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 rounded p-2 hover:bg-muted"
                    >
                      <CircleIcon className="h-4 w-4" />
                      To Do
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center gap-2 rounded p-2 hover:bg-muted"
                    >
                      <CircleCheckIcon className="h-4 w-4" />
                      Done
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

/* ---------- Shared list item for desktop grid cards ---------- */
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block rounded-md p-3 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
