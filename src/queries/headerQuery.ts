import { gql } from "graphql-tag";


export const COMBINED_HEADER_QUERY = gql`
query combinedHeaderQuery {
  mainMenu: menuItems(where: {parentId: "0"}) {
    edges {
      node {
        id
        label
        url
        cssClasses
        uri
        path
        target
        childItems {
          edges {
            node {
              id
              label
              url
              cssClasses
              path
              uri
              target
              childItems {
                edges {
                  node {
                    id
                    label
                    url
                    uri
                    path
                    target
                    cssClasses
                    childItems {
                      edges {
                        node {
                          id
                          label
                          url
                          uri
                          path
                          cssClasses
                          target
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;