import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PiArrowLeftBold } from "react-icons/pi";
import ArticleEngagement from "@/components/ArticleEngagement";
import TopBar from "@/components/TopBar";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { articleText, getArticles, getArticle } from "@/data/articles";
import { isLocale, locales, site } from "@/data/site";
import { getT } from "@/lib/i18n";
import { categoryLabel } from "@/lib/article-categories";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ locale: string; slug: string }> };

// A static export needs at least one param for a dynamic route. While there are no articles,
// a placeholder slug is generated; the page below turns it into a 404.
export function generateStaticParams() {
  const articles = getArticles();
  const slugs = articles.length > 0 ? articles.map((a) => a.slug) : ["none"];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Params) {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!isLocale(locale) || !article) return {};
  const text = articleText(article, locale);
  return pageMetadata({ locale, path: `/articles/${slug}`, title: text.title, description: text.summary });
}

export default async function ArticlePage({ params }: Params) {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!isLocale(locale) || !article) notFound();
  const t = getT(locale);
  const text = articleText(article, locale);
  const date = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" }).format(
    new Date(`${article.date}T12:00:00-03:00`),
  );

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: text.title,
    description: text.summary,
    datePublished: article.date,
    articleSection: article.categories.map((category) => categoryLabel(category, locale)),
    inLanguage: locale,
    author: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/${locale}/articles/${slug}/`,
  };

  return (
    <article className="grid gap-2 md:gap-3">
      <header className="card pad">
        <TopBar className="mb-8" />
        <Link href={`/${locale}/articles/`} className="btn btn-soft px-4 py-2.5 text-[14px]">
          <PiArrowLeftBold size={13} />
          {t("articles.back")}
        </Link>
        <h1 className="mt-12 max-w-[20ch] font-display text-[clamp(40px,6vw,84px)] font-bold leading-[0.95] tracking-[-0.024em] md:mt-16">
          <SplitWords lines={[{ text: text.title, mark: "last" }]} />
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-6 max-w-[54ch] text-[19px] text-dim">{text.summary}</p>
          <p className="mt-4 text-[14px] text-faint">
            {t("articles.published", { date })} · {t("articles.minRead", { minutes: article.readingMinutes })}
          </p>
          {article.categories.length > 0 && (
            <ul aria-label={t("articles.categoriesLabel")} className="mt-4 flex flex-wrap gap-2">
              {article.categories.map((category) => (
                <li key={category} className="chip text-[12px]">{categoryLabel(category, locale)}</li>
              ))}
            </ul>
          )}
          <ArticleEngagement key={slug} slug={slug} />
        </Reveal>
      </header>
      <Reveal className="card pad">
        <div className="mx-auto grid max-w-[680px] gap-5 text-[18px] leading-[1.75]">
          <Markdown remarkPlugins={[remarkGfm]} components={{
          h1: ({ children }) => <h2 className="mt-6 font-display text-[36px] font-bold leading-tight">{children}</h2>,
          h2: ({ children }) => <h2 className="mt-6 font-display text-[clamp(26px,3vw,36px)] font-bold leading-tight">{children}</h2>,
          h3: ({ children }) => <h3 className="mt-4 font-display text-[24px] font-bold">{children}</h3>,
          ul: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
          blockquote: ({ children }) => <blockquote className="rounded-2xl bg-raised px-6 py-5 font-display text-[24px]">{children}</blockquote>,
          pre: ({ children }) => <pre className="overflow-x-auto rounded-2xl bg-fg p-5 font-mono text-[13.5px] leading-[1.7] text-surface">{children}</pre>,
          code: ({ children, className }) => <code className={className ?? "rounded bg-raised/20 px-1 font-mono text-[0.85em]"}>{children}</code>,
          a: ({ children, href }) => <a href={href} className="underline underline-offset-4">{children}</a>,
          table: ({ children }) => <div className="overflow-x-auto"><table className="w-full border-collapse text-left text-[15px]">{children}</table></div>,
          th: ({ children }) => <th className="border-b border-current/20 p-3 font-semibold">{children}</th>,
          td: ({ children }) => <td className="border-b border-current/20 p-3">{children}</td>,
          }}>
            {text.body}
          </Markdown>
        </div>
      </Reveal>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </article>
  );
}
