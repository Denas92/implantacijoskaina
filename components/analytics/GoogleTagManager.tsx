import Script from "next/script";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

/**
 * GTM snippet — įdėkite į layout (body pradžioje + noscript).
 * https://tagmanager.google.com/ → Container ID (GTM-XXXXXX)
 */
export function GoogleTagManagerScripts() {
  if (!gtmId) return null;

  const gtmScript = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');
`;

  return (
    <Script id="google-tag-manager" strategy="afterInteractive">
      {gtmScript}
    </Script>
  );
}

export function GoogleTagManagerNoScript() {
  if (!gtmId) return null;
  return (
    <noscript>
      <iframe
        title="Google Tag Manager"
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height={0}
        width={0}
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
