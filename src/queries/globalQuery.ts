// src/graphql/queries/global.query.ts
import { gql } from "graphql-tag";

export const GlobalQueryDocument = gql/* GraphQL */ `
  query GlobalQuery {
    websiteSettings {
      themeSettings {
        address
        bodyJs
        contactNumber
        email
        facebookLink
        footerTagline
        globalCss
        headerJs
        headerTagline
        instagramLink
        linkedinLink
        pinterestLink
        twitterLink
        whatsappLink
        youtubeLink
        headerLogo { node { sourceUrl } }
        footerLogo { node { sourceUrl } }
        favicon    { node { sourceUrl } }
      }
    }

  
  }
`;
