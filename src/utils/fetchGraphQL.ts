import "server-only";

export async function fetchGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>,
  headers?: Record<string, string>
): Promise<T> {
  
  try {
    const body = JSON.stringify({
      query,
      variables: { ...(variables ?? {}) }, // no preview prop injected
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(headers ?? {}),
        },
        body,
        cache: "force-cache",
        // cache: "no-cache",                 // cache enabled
        next: { tags: ["wordpress"] },        // tag for on-demand revalidation
        // If you want a time-based fallback too:
        // next: { tags: ["wordpress"], revalidate: 60 },
      }
    );

    const data = await response.json();

    if (!response.ok || data.errors) {
      console.error("GraphQL Error:", JSON.stringify(data.errors ?? response.statusText, null, 2));
      throw new Error("Error executing GraphQL query");
    }

    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
