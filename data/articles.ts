import type { Locale } from "./site";

/** Content blocks an article body is made of. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; code: string; lang?: string };

export type ArticleText = {
  title: string;
  summary: string;
  body: Block[];
};

export type Article = {
  /** URL segment: /<locale>/articles/<slug>/. Same in every language. */
  slug: string;
  /** Publication date, YYYY-MM-DD. */
  date: string;
  readingMinutes: number;
  /** Text per language. A language without an entry falls back to English. */
  text: Partial<Record<Locale, ArticleText>> & { en: ArticleText };
};

/**
 * To publish an article, add an entry here and redeploy. Newest first.
 *
 * {
 *   slug: "my-first-article",
 *   date: "2026-11-02",
 *   readingMinutes: 5,
 *   text: {
 *     en: { title: "…", summary: "One or two sentences for the list.", body: [{ type: "p", text: "…" }] },
 *     pt: { … },
 *   },
 * },
 */
export const articles: Article[] = [];

export function getArticles(): Article[] {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function articleText(article: Article, locale: Locale): ArticleText {
  return article.text[locale] ?? article.text.en;
}
