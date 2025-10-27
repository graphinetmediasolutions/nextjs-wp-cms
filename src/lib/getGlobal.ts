import { print } from "graphql";
import type { GlobalData } from "@/types/global";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { GlobalQueryDocument } from "@/queries/globalQuery";

export async function getGlobal(): Promise<GlobalData> {
  const data = await fetchGraphQL<GlobalData>(print(GlobalQueryDocument));
  return data;
}