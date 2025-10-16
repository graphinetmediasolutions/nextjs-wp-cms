"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

/* ---------- types ---------- */
type Child = { label: string; href: string };
type Item = { label: string; href: string; children?: Child[] };
export type HeaderData = { links: Item[] };

/* ---------- tiny collapsible with smooth height animation ---------- */
function Collapse({
  open,
  children,
  duration = 250,
}: {
  open: boolean;
  children: React.ReactNode;
  duration?: number;
}) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    // measure on open and when children change
    const h = el.scrollHeight;
    setMaxHeight(h);
  }, [open, children]);

  return (
    <div
      style={{
        maxHeight: open ? maxHeight : 0,
        opacity: open ? 1 : 0,
        overflow: "hidden",
        transition: `max-height ${duration}ms cubic-bezier(0.2,0.8,0.2,1), opacity ${duration}ms ease`,
      }}
      aria-hidden={!open}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

/* ---------- header ---------- */
export default function HeaderClient({ data }: { data: HeaderData }) {
  // Mobile drawer
  const [open, setOpen] = useState(false);
  // Single-open accordion in mobile
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus management + reset
  useEffect(() => {
    if (open) closeRef.current?.focus();
    else {
      hamburgerRef.current?.focus();
      setActiveKey(null);
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-[60] isolate overflow-visible">
      <div className="bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55 border-b overflow-visible">
        <nav className="container mx-auto px-4 overflow-visible">
          <div className="flex h-16 items-center justify-between overflow-visible">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              <span className="inline-block rounded-lg bg-foreground/5 px-2 py-1">MySite</span>
            </Link>

            {/* ----- Desktop nav (smooth via shadcn motion classes) ----- */}
            <div className="hidden md:block">
              <NavigationMenu className="relative overflow-visible">
                <NavigationMenuList className="flex items-center gap-1">
                  {data.links.map((item) => (
                    <NavigationMenuItem key={item.label}>
                      {item.children?.length ? (
                        <>
                          <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            {/* vertical list */}
                            <ul className="w-[min(92vw,320px)] max-h-[70vh] overflow-auto p-1 flex flex-col gap-1">
                              {item.children.map((c) => (
                                <li key={c.href}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={c.href}
                                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                                    >
                                      {c.label}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                          <Link href={item.href}>{item.label}</Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>

                {/* viewport handles alignment + uses smooth zoom/fade (see ui file tweak below) */}
                <NavigationMenuViewport className="rounded-xl border bg-popover text-popover-foreground shadow-xl" />
              </NavigationMenu>
            </div>

            {/* ----- Mobile hamburger ----- */}
            <button
              ref={hamburgerRef}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-px w-4 bg-foreground after:absolute after:left-0 after:top-[-6px] after:block after:h-px after:w-4 after:bg-foreground before:absolute before:left-0 before:top-[6px] before:block before:h-px before:w-4 before:bg-foreground" />
            </button>
          </div>
        </nav>
      </div>

      {/* ----- Mobile drawer + animations ----- */}
      {open && (
        <>
          {/* overlay: fade in */}
          <button
            className="fixed inset-0 z-[59] bg-black/30 md:hidden animate-in fade-in-0 duration-200"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
          />

          {/* slide-in panel */}
          <div className="fixed inset-y-0 left-0 z-[60] w-[84vw] max-w-[360px] md:hidden animate-in slide-in-from-left-4 duration-250">
            <div className="relative h-full bg-background border-r shadow-xl p-3 overflow-auto">
              {/* Close button */}
              <button
                ref={closeRef}
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                ✕
              </button>

              {/* brand */}
              <Link
                href="/"
                className="mb-6 inline-block text-base font-semibold"
                onClick={() => setOpen(false)}
              >
                MySite
              </Link>

              {/* accordion list (only one open) with smooth height */}
              <nav className="flex flex-col gap-1">
                {data.links.map((item) => {
                  const hasChildren = !!item.children?.length;
                  const isOpen = activeKey === item.label;

                  return (
                    <div key={item.label} className="mb-1">
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>

                        {hasChildren && (
                          <button
                            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-md border text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                            aria-expanded={isOpen}
                            aria-controls={`sec-${item.label}`}
                            onClick={() =>
                              setActiveKey((prev) => (prev === item.label ? null : item.label))
                            }
                          >
                            {isOpen ? "–" : "+"}
                          </button>
                        )}
                      </div>

                      {hasChildren && (
                        <Collapse open={isOpen}>
                          <ul
                            id={`sec-${item.label}`}
                            className="ml-3 mt-1 flex flex-col gap-1 border-l pl-3"
                          >
                            {item.children!.map((c) => (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                  onClick={() => setOpen(false)}
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Collapse>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
