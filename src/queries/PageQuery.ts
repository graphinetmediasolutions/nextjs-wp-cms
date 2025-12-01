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
        title
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
          heading
          subheading
          backgroundColor
          showPost
          displayPerRow
          layout
          isSlider
          autoplay
          showArrow
          showBullets
          sliderSpeed
          sliderPerScroll
          loopForSlider
          pagination
          actionButtonLabel
          showDate
          showAuthor
          sectionWidth
          cssClass        
          parentPage {
            edges {
              node {
                id
                uri
              }
            }
          }
          childPages {
            id
            title
            slug
            uri
            date
            featuredImage{
            node{
              sourceUrl
              altText
             }
            }
            excerpt
            
            author {
              node {
                id
                name
              }
            }
          }
        }






        ... on PageBuilderPageLayoutListingBlockLayout {
         heading
         headingTag
         headingPosition
          
          subheading
          subheadingPosition
          description
          layout
          displayPerRow
          showPost
          isSlider
          autoplay
          showArrow
          showBullets
          sliderPerScroll
          sliderSpeed
          loopForSlider
          actionButtonLabel
          actionButtonUrl
          showDate
          showAuthor
          backgroundColor
          sectionWidth
          cssClass
          backgroundImage{
            node{
              sourceUrl
              altText
            }
          }

          parentPage {
            edges {
              node {
                id
              }
            }
          }
          childPages {
            id
            title
            slug
            uri
            date
            featuredImage{
            node{
              sourceUrl
              altText
             }
            }
             excerpt
            author {
              node {
                id
                name
              }
            }
          }
        }






       ... on PageBuilderPageLayoutTestimonialBlockLayout{
        heading
        headingTag
        headingPosition
        subheading
        subheadingPosition
        description
        layout
        displayPerRow
        showPost
        isSlider
        autoplay
        showArrow
        showBullets
        sliderPerScroll
        sliderSpeed
        loopForSlider
        actionButtonLabel
        actionButtonUrl
        sectionWidth
        cssClass
        backgroundColor
        backgroundImage{
          node{
            sourceUrl
            altText
          }
        }
        testimonials{
          testimonialName
          testimonialRole
          testimonialQuote
          testimonialImage{
            node{
              sourceUrl
              altText
            }
          }
          testimonialVideoUrl
        }
      }




      ... on PageBuilderPageLayoutTeamBlockLayout {
          heading
          headingTag
          headingPosition
          subheading
          subheadingPosition
          description
          layout
          displayPerRow
          showPost
          isSlider
          autoplay
          showArrow
          showBullets
          sliderPerScroll
          sliderSpeed
          loopForSlider
          actionButtonLabel
          actionButtonUrl
          sectionWidth
          cssClass
          backgroundColor
          backgroundImage{
            node{
              sourceUrl
            }
          }
          teamMembers{
            name
            designation
            shortBio
            detailBio
            videoUrl
            photo{
              node{
                sourceUrl
              }
            }
            socialLinks{
              facebookLinks
              instagarmLinks
              twitterLinks
              linkedinLinks
            }
          }
        }





        ... on PageBuilderPageLayoutCtaSectionLayout {
          heading
          subheading
          layout
          description
          sectionWidth
          backgroundColor
          textColor
          cssClass
          backgroundImage{
            node{
              sourceUrl
              altText
            }
          }
          alignItem
          image{
            node{
              sourceUrl
              altText
            }
          }
          imageAlign
          ctaItems{
            ctaOptions{
              actionButtonLabel
              actionButtonUrl
              actionButtonClass
            }
          }
        }





        ... on PageBuilderPageLayoutFaqSectionLayout {
          heading
          headingTag
          headingPosition
          subheading
          layout
          showPost
          displayPerRow
          sectionWidth
          cssClass
          faqItems{
            faqQuestion
            faqAnswer
          }
        }







        ... on PageBuilderPageLayoutFeatureListLayout {
          heading
          headingTag
          headingPosition
          subheading
          layout
          displayPerRow
          textColor
          backgroundColor
          sectionWidth
          cssClass
          featureItesm{
            imageOrIcon
            imageIcon{
              node{
                sourceUrl
              }
            }
            featureTitle
            featureDescription
            actionButtonUrl
          }
        }




         ... on PageBuilderPageLayoutTimelineBlockLayout {
          heading
          headingTag
          headingPosition
          subheading
          sectionWidth
          cssClass
          layout
         timelineItems
          {
            imageOrIcon
            imageIcon{
              node{
                sourceUrl
                altText
              }
            }
            title
            description
            date
            year
          }
        }
          






          




          }
        }
      }
    }
  }
`;
