// src/app/head.tsx
import { getGlobal } from "@/lib/getGlobal";

export default async function Head() {
  const g = await getGlobal();
  const ts = g.websiteSettings?.themeSettings;

  const favicon = ts?.favicon?.node?.sourceUrl;
  const globalCss = ts?.globalCss;

  return (
    <>
      {/* Favicon from WP */}
      {favicon && <link rel="icon" href={favicon} />}

      {/* Global CSS from WP */}
      {globalCss && (
        <style
          id="wp-global-css"
          // Only do this if you trust the source; sanitize on WP-side if needed
          dangerouslySetInnerHTML={{ __html: globalCss }}
        />
      )}
    </>
  );
}
