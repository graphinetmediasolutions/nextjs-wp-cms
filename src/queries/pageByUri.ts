import { gql } from "graphql-tag";

export const PageByUriDocument = gql/* GraphQL */ `
  query PageByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on Page {
        id
        title
        builder {
          sections {
            __typename
            # Inline fields for EACH layout you support (use your typename)
            ... on Page_Builder_Sections_Hero {
            __typename
              heading
              subheading
              ctaLabel
              ctaUrl
              bgImage { sourceUrl altText }
            }
          }
        }
      }
    }
  }
`;
