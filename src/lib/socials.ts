// src/lib/socials.ts
export function collectSocials(ts?: import("@/types/global").ThemeSettings | null) {
  if (!ts) return [];
  return [
    { label: "Facebook",  url: ts.facebookLink },
    { label: "Instagram", url: ts.instagramLink },
    { label: "YouTube",   url: ts.youtubeLink },
    { label: "LinkedIn",  url: ts.linkedinLink },
    { label: "Pinterest", url: ts.pinterestLink },
    { label: "Twitter",   url: ts.twitterLink },
    { label: "WhatsApp",  url: ts.whatsappLink },
  ].filter((s): s is {label:string; url:string} => !!s.url);
}
