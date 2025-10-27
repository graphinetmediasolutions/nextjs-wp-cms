
// ===================== HeaderServer.tsx (server) =====================
import { print } from "graphql";
// import { COMBINED_HEADER_QUERY } from "./queries";

// import HeaderClient from "./HeaderClient";
import  HeaderClient  from "@/components/layout/header/HeaderClient";
// import { nodes, type MenuNode } from "./types";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { COMBINED_HEADER_QUERY } from "@/queries/headerQuery";

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

export function nodes(conn?: { edges?: { node: MenuNode }[] | null } | null): MenuNode[] {
  return conn?.edges?.map((e) => e.node) ?? [];
}

// Optional caching: export const revalidate = 300; // ISR every 5 min
// or per-request cache: const res = await fetchGraphQL(..., { next: { revalidate: 300 } });

export default async function HeaderServer({ headerLogo, socials }: { headerLogo?: string; socials: any[] }) {
  const { mainMenu } = await fetchGraphQL<{ mainMenu: { edges: { node: MenuNode }[] } }>(
    print(COMBINED_HEADER_QUERY),
    {}
  );
  const data = nodes(mainMenu);
  return <HeaderClient headerLogo={headerLogo} socials={socials} data={data} />;
  
}

