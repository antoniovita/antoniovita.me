import type { Metadata } from "next";
import { locales, ogLocale, site, type Locale } from "@/data/site";

type PageMeta = {
  locale: Locale;
  /** Path after the locale, without trailing slash: "" for home, "/work", "/articles/my-article". */
  path: string;
  title: string;
  description: string;
  /** Use the title as is, without the "| Antonio Vita" suffix. */
  absoluteTitle?: boolean;
  noindex?: boolean;
  image?: { url: string; alt: string };
};

const url = (locale: Locale, path: string) => `${site.url}/${locale}${path}/`;

export function pageMetadata({ locale, path, title, description, absoluteTitle, noindex, image = { url: "/me.png", alt: title } }: PageMeta): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, url(l, path)]));

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url(locale, path),
      languages: { ...languages, "x-default": url("en", path) },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      url: url(locale, path),
      title: absoluteTitle ? title : `${title} | ${site.name}`,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? title : `${title} | ${site.name}`,
      description,
      images: [image.url],
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
