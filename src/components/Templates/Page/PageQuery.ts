import { gql } from "graphql-tag";

// export const PageQuery = gql`
//   query PageById($id: ID!, $idType: PageIdType!) {
//     page(id: $id, idType: $idType) {
//       id
//       uri
//       content
//       pageBulider {
//         pageLayout {
//           __typename
//           ... on PageBuliderPageLayoutContentBlockLayout {
//             fieldGroupName
//             heading
//             bannerImage { node { altText sourceUrl } }
//           }
//           ... on PageBuliderPageLayoutContentWithImageLayout {
//             fieldGroupName
//             heading
//             content
//             image { node { altText sourceUrl } }
//           }
//         }
//       }
//     }
//   }
// `;



export const PageQuery = gql`
  query NewQuery($id: ID!, $idType: PageIdType!) {
  page(id: $id, idType: $idType) {
    pageBuilder {
      pageLayout {
      __typename
        ... on PageBuilderPageLayoutHeroSectionLayout {
          fieldGroupName
          heroBackgroundVideo
          heroCtaText
          heroCtaUrl
          heroTitle
          heroSubtitle
          heroOverlayOpacity
          heroMobileVideo
        }
      }
    }
  }
}
`;



export const NodeByUriQuery = gql`
  query NodeByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on Page {
        id
        uri
        isFrontPage
        pageBuilder {
          pageLayout {
            __typename
            ... on PageBuilderPageLayoutHeroSectionLayout {
              fieldGroupName
              heroBackgroundVideo
              heroCtaText
              heroCtaUrl
              heroTitle
              heroSubtitle
              heroOverlayOpacity
              heroMobileVideo
            }



            ... on PageBuilderPageLayoutTextBlockLayout {
            cssClass
            fieldGroupName
            heading
            isImage
            sectionWidth
            subheading
            alignItem
            backgroundColor
            backgroundImage {
            node {
              sourceUrl
             }
            }
            textblockBody
            textblockImage {
            node {
              sourceUrl
            }
           }
           textblockImageAlign
          }






           ... on PageBuilderPageLayoutBlogBlockLayout {
            chooseLayout
            cssClass
            blogCarousel
            blogGridLayout
            displayPerRow
            fieldGroupName
            heading
            sectionWidth
            sliderPerScroll
            subheading
            blogItems {
              blogDate
              blogExcerpt
              blogSlug
              blogTitle
              fieldGroupName
              blogAuthor
              blogImage {
                node {
                  sourceUrl
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
