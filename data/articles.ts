import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { articleCategories, categoryId } from "../lib/article-categories";
import { isLocale, type Locale } from "./site";

export type ArticleText = {
  title: string;
  summary: string;
  body: string;
};

export type Article = {
  slug: string;
  date: string;
  readingMinutes: number;
  categories: string[];
  text: Partial<Record<Locale, ArticleText>>;
};

const directory = path.join(process.cwd(), "content/articles");

/** Files use <slug>.<locale>.md. Drafts are excluded from every public route. */
export function getArticles(): Article[] {
  if (!existsSync(directory)) return [];
  const grouped = new Map<string, Article>();
  for (const file of readdirSync(directory).sort()) {
    if (!file.endsWith(".md") || file === "README.md") continue;
    const match = file.match(/^([a-z0-9]+(?:-[a-z0-9]+)*)\.(pt|en|it)\.md$/);
    if (!match || !isLocale(match[2])) throw new Error(`Invalid article filename: ${file}`);
    const [, slug, locale] = match as [string, string, Locale];
    const { data, content } = matter(readFileSync(path.join(directory, file), "utf8"));
    if (data.draft === true) continue;
    for (const field of ["title", "summary"] as const) {
      if (typeof data[field] !== "string" || !data[field].trim()) {
        throw new Error(`${file}: ${field} must be a non-empty string`);
      }
    }
    const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) {
      throw new Error(`${file}: date must be a valid YYYY-MM-DD date`);
    }
    if (data.readingMinutes !== undefined && (!Number.isInteger(data.readingMinutes) || data.readingMinutes < 1)) {
      throw new Error(`${file}: readingMinutes must be a positive integer`);
    }
    const categories = articleCategories(data.categories, file);
    const article: Article = grouped.get(slug) ?? {
      slug, date,
      readingMinutes: data.readingMinutes ?? Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)),
      categories: [],
      text: {},
    };
    if (article.date !== date) throw new Error(`${file}: translations must share the same date`);
    article.categories = [...new Map([...article.categories, ...categories].map((category) => [categoryId(category), category])).values()];
    article.text[locale] = { title: data.title, summary: data.summary, body: content };
    grouped.set(slug, article);
  }
  return [...grouped.values()].sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((article) => article.slug === slug);
}

/** Portuguese-only articles are supported; English remains the preferred fallback. */
export function articleText(article: Article, locale: Locale): ArticleText {
  const text = article.text[locale] ?? article.text.en ?? article.text.pt ?? article.text.it;
  if (!text) throw new Error(`Article ${article.slug} has no published text`);
  return text;
}
