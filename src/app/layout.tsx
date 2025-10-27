import type { Metadata } from "next";
import { Brygada_1918, Mulish, Outfit } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeaderServer from "@/components/layout/HeaderNew";
import { getGlobal } from "@/lib/getGlobal";
import { collectSocials } from "@/lib/socials";
import Script from "next/script";


const brygada = Brygada_1918({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-brygada" });
const mulish = Mulish({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800", "900"], display: "swap", variable: "--font-mulish" });
const outfit = Outfit({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], display: "swap", variable: "--font-outfit" });

export async function generateMetadata(): Promise<Metadata> {
  const g = await getGlobal();
  const ts = g.websiteSettings?.themeSettings;
  const favicon = ts?.favicon?.node?.sourceUrl;

  return {
    title: {
      default: "My Site",
      template: "%s | My Site",
    },
    description: "Powered by WordPress + Next.js 15",
    icons: favicon
      ? [
        { rel: "icon", url: favicon },
        { rel: "shortcut icon", url: favicon },
      ]
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const g = await getGlobal();
  const ts = g.websiteSettings?.themeSettings;
  const headerLogo = ts?.headerLogo?.node?.sourceUrl || undefined;
  const footerLogo = ts?.footerLogo?.node?.sourceUrl || undefined;
  const favicon = ts?.favicon?.node?.sourceUrl || undefined;
  const socials = collectSocials(ts);

  console.log("ts", ts)
  return (
    <html lang="en">
      <body
        className={`${brygada.variable} ${mulish.variable} ${outfit.variable} antialiased`}
      >
        {/* ✅ Global CSS from WordPress */}
        {ts?.globalCss && (
          <style
            id="wp-global-css"
            dangerouslySetInnerHTML={{ __html: ts.globalCss }}
          />
        )}
        {ts?.headerJs && (
          <Script id="wp-header-js" strategy="beforeInteractive">
            {ts.headerJs}
          </Script>
        )}
        {/* <Header /> */}
        <HeaderServer headerLogo={headerLogo} socials={socials} />

        {children}
        <Footer footerLogo={footerLogo} socials={socials} />

        {/* ✅ WordPress Scripts */}


        {ts?.bodyJs && (
          <Script id="wp-body-js" strategy="afterInteractive">
            {ts.bodyJs}
          </Script>
        )}
      </body>
    </html>
  );
}
