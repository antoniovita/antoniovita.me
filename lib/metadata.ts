import type { Metadata } from "next";
import { locales, ogLocale, site, type Locale } from "@/data/site";

type PageMeta = {
  locale: Locale;
  /** Path after the locale, without trailing slash: "" for home, "/work", "/work/fuoco". */
  path: string;
  title: string;
  description: string;
  /** Name of the generated share image in public/og/<locale>/<og>.png. */
  og: string;
  /** Use the title as is, without the "| Antonio Vita" suffix. */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

const url = (locale: Locale, path: string) => `${site.url}/${locale}${path}/`;

export function pageMetadata({ locale, path, title, description, og, absoluteTitle, noindex }: PageMeta): Metadata {
  const image = { url: `/og/${locale}/${og}.png`, width: 1200, height: 630, alt: title };
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
