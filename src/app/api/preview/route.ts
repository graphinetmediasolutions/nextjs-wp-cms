import { print } from "graphql/language/printer";
// import { ContentNode } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { gql } from "graphql-tag";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const id = searchParams.get("id");

  if (secret !== process.env.HEADLESS_SECRET || !id) {
    return new Response("Invalid token", { status: 401 });
  }

  // --- Login mutation (typed minimally; no LoginPayload import needed) ---
  const mutation = gql/* GraphQL */ `
    mutation LoginUser {
      login(
        input: {
          clientMutationId: "uniqueId"
          username: "${process.env.WP_USER}"
          password: "${process.env.WP_APP_PASS}"
        }
      ) {
        authToken
        user {
          id
          name
        }
      }
    }
  `;

  const { login } = await fetchGraphQL<{ login: { authToken: string | null } }>(
    print(mutation)
  );

  const authToken = login?.authToken;
  if (!authToken) {
    return new Response("Failed to authenticate", { status: 401 });
  }

  // ✅ Next 15: draftMode is async
  const dm = await draftMode();
  dm.enable();

  // --- Resolve the target content by database ID ---
  const query = gql/* GraphQL */ `
    query GetContentNode($id: ID!) {
      contentNode(id: $id, idType: DATABASE_ID) {
        uri
        status
        databaseId
      }
    }
  `;

  const { contentNode } = await fetchGraphQL<{ contentNode: any }>(
    print(query),
    { id },
    { Authorization: `Bearer ${authToken}` }
  );

  if (!contentNode) {
    return new Response("Invalid id", { status: 401 });
  }

  const dest =
    contentNode.status?.toString().toLowerCase() === "draft"
      ? `/preview/${contentNode.databaseId}`
      : contentNode.uri || "/";

  const response = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}${dest}`
  );

  // Set preview JWT for server-side authenticated GraphQL requests
  // (httpOnly is safer; server reads it via next/headers cookies())
  response.cookies.set("wp_jwt", authToken, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
