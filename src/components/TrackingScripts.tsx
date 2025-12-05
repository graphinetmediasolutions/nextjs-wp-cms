
import Script from "next/script";

type TrackingScriptsProps = {
  trackingCode?: string | null; // can be GTM-XXXX or G-XXXX
};

export default function TrackingScripts({ trackingCode }: TrackingScriptsProps) {
  if (!trackingCode) return null;

  const code = trackingCode.trim();
  const isGTM = code.startsWith("GTM-");
  const isGA4 = code.startsWith("G-");

  if (!isGTM && !isGA4) return null;

  return (
    <>
      {/* --- CASE 1: Google Tag Manager --- */}
      {isGTM && (
        <>
          {/* GTM (noscript) – should appear as high in <body> as possible */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${code}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>

          {/* GTM head script – Next will inject into <head> because of beforeInteractive */}
          <Script
            id="gtm-script-head"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${code}');`,
            }}
          />
        </>
      )}

      {/* --- CASE 2: Google Analytics 4 (direct, without GTM) --- */}
      {isGA4 && (
        <>
          {/* Load GA4 library */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${code}`}
            strategy="afterInteractive"
          />
          {/* Init GA4 */}
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${code}', {
  cookie_domain: window.location.hostname,
  cookie_flags: 'SameSite=None;Secure'
});
              `,
            }}
          />
        </>
      )}
    </>
  );
}
