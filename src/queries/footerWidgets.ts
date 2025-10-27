// src/queries/footerWidgets.ts
import { gql } from "graphql-tag";

export const FooterWidgetsDocument = gql/* GraphQL */ `
  query FooterWidgets {
    widgets {
      footer1   { id name title content type }
      footer2   { id name title content type }
      footer3   { id name title content type }
      footer4   { id name title content type }
      topFooter { id name title content type }
      footerInfo{ id name title content type }
      # keep the rest if you’ll need them later:
      # sidebar   { id name title content type }
      # page404   { id name title content type }
      # topNav    { id name title content type }
      # topNav2   { id name title content type }
      # topNavSearch { id name title content type }
    }
  }
`;
