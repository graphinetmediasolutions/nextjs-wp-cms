import { MenuNode } from "./types";

export function getHref(n: MenuNode): { href: string; external: boolean } {
  const internal = n.uri || n.path;
  if (internal) return { href: internal, external: false };
  const abs = n.url ?? "#";
  const external = /^https?:\/\//i.test(abs);
  return { href: abs, external };
}

export function hasChildren(n: MenuNode) {
  return (n.childItems?.edges?.length ?? 0) > 0;
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
