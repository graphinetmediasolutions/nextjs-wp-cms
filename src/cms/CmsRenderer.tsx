// import { loaders } from "./registry";


// type Block = { __typename: string; id?: string; fieldGroupName?: string } & Record<string, unknown>;



// export default async function CmsRenderer({ sections }: { sections?: Block[] }) {

//   console.log("Sections in CmsRenderer",sections);

//   if (!sections?.length) return null;

//   const nodes = await Promise.all(
//     sections.map(async (b, i) => {
//       const load = loaders[b.__typename];
//       if (!load) {
//         if (process.env.NODE_ENV !== "production") {
//           console.warn("Missing component for", b.__typename);
//         }
//         return null; // or render a dev placeholder
//       }
//       const { default: Cmp } = await load(); // code-split per block type
//       const { __typename, ...props } = b as any;
//       const key = b.id ?? b.fieldGroupName ?? `${__typename}-${i}`;
//       return <Cmp key={key} {...props} />;
//     })
//   );

//   return <>{nodes}</>;
// }


import { registry } from "./registry";

type Block = {
  __typename: string;
  id?: string;
  fieldGroupName?: string;
} & Record<string, unknown>;

export default function CmsRenderer({ sections = [] }: { sections?: Block[] }) {
  console.log("Sections in CmsRenderer", sections);
  if (!sections.length) return null;

  return (
    <>
      {sections.map((b, i) => {
        const Cmp = registry[b.__typename];

        console.log("Rendering section:", b.__typename, Cmp);
        if (!Cmp) {
          if (process.env.NODE_ENV !== "production") {
            console.warn("Missing component for", b.__typename);
          }
          return null;
        }
        const { __typename, ...props } = b;
        const key = b.id ?? b.fieldGroupName ?? `${__typename}-${i}`;
        return <Cmp key={key} data={props} />;
      })}
    </>
  );
}
