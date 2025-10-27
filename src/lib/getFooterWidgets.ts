// src/lib/getFooterWidgets.ts
import { print } from "graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { FooterWidgetsDocument } from "@/queries/footerWidgets";

export type Widget = { id: string; name: string; title?: string | null; content?: string | null; type?: string | null };
export type FooterWidgets = {
  widgets: {
    footer1?: Widget[] | null;
    footer2?: Widget[] | null;
    footer3?: Widget[] | null;
    footer4?: Widget[] | null;
    topFooter?: Widget[] | null;
    footerInfo?: Widget[] | null;
  };
};

export async function getFooterWidgets(): Promise<FooterWidgets["widgets"]> {
  const data = await fetchGraphQL<FooterWidgets>(print(FooterWidgetsDocument));
  return data.widgets ?? {};
}
