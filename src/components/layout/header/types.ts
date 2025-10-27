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
