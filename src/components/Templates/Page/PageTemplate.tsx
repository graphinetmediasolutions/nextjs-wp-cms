// import CmsRenderer from "@/cms/CmsRenderer";
// import { print } from "graphql/language/printer";
// import { ContentNode } from "@/gql/graphql";
// import { fetchGraphQL } from "@/utils/fetchGraphQL";
// import { PageQuery } from "./PageQuery";

// interface TemplateProps {
//   node: ContentNode;
// }

// export default async function PageTemplate({ node }: TemplateProps) {
//   const { page } = await fetchGraphQL<{
//     page: {
//       content?: string | null;
//       pageBulider?: { pageLayout?: any[] | null } | null;
//     };
//   }>(print(PageQuery), { id: node.databaseId });

//   // 1) Prefer rendering ACF sections when present
//   const sections = page?.pageBulider?.pageLayout ?? [];
//   if (sections.length > 0) {
//     return <CmsRenderer sections={sections} />;
//   }

//   // 2) Fallback to WP content (if you still want Gutenberg HTML)
//   return page?.content ? (
//     <div dangerouslySetInnerHTML={{ __html: page.content }} />
//   ) : null;
// }




// import CmsRenderer from "@/cms/CmsRenderer";

import CmsRenderer from "@/cms/CmsRenderer";
// import type { Page } from "@/gql/graphql";

export default function PageTemplate({ page }: any) {

   console.log("Page ",page?.pageBuilder?.pageLayout);
  const sections = page?.pageBuilder?.pageLayout ?? [];
  console.log("Page in template",sections);
  if (sections.length > 0) {
    return <CmsRenderer sections={sections as any[]} />;
  }
  
}