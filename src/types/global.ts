// src/types/global.ts
export type Widget = { id: string; name: string; title?: string | null; content?: string | null };
export type WidgetArea = { id: string; name: string; description?: string | null; widgets: Widget[] };


export type SocialLink = {
  label: string;
  url: string;
};

export type ThemeSettings = {
  address?: string | null;
  bodyJs?: string | null;
  contactNumber?: string | null;
  email?: string | null;
  facebookLink?: string | null;
  footerJs?: string | null;
  footerTagline?: string | null;
  globalCss?: string | null;
  headerJs?: string | null;
  headerTagline?: string | null;
  instagramLink?: string | null;
  linkedinLink?: string | null;
  pinterestLink?: string | null;
  twitterLink?: string | null;
  whatsappLink?: string | null;
  youtubeLink?: string | null;
  headerLogo?: { node?: { sourceUrl?: string | null } | null } | null;
  footerLogo?: { node?: { sourceUrl?: string | null } | null } | null;
  favicon?:    { node?: { sourceUrl?: string | null } | null } | null;
};

export type GlobalData = {
  generalSettings: { title: string; url: string; description: string; language: string };
  websiteSettings?: { themeSettings?: ThemeSettings | null } | null;
  widgetAreas: WidgetArea[];
};
