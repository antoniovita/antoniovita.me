import type { MetadataRoute } from "next";
import { getArticles } from "@/data/articles";
import { locales, site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/articles", priority: 0.8 },
    ...getArticles().map((a) => ({ path: `/articles/${a.slug}`, priority: 0.7 })),
    { path: "/books", priority: 0.7 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
  ];

  return pages.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}/`])),
      },
    })),
  );
}
