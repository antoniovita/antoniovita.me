import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://antoniovita.me";
  const locales = ["en", "pt", "it"];
  const pages = [
    { path: "", priority: 1 },
    { path: "/projects", priority: 0.9 },
    { path: "/experience", priority: 0.8 },
    { path: "/services", priority: 0.8 },
    { path: "/about", priority: 0.7 },
  ];

  return locales.flatMap((locale) =>
    pages.map(({ path, priority }) => ({
      url: `${baseUrl}/${locale}${path}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
    })),
  );
}
