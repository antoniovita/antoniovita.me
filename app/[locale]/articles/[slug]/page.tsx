import Link from "next/link";
import { notFound } from "next/navigation";
import { PiArrowLeftBold } from "react-icons/pi";
import TopBar from "@/components/TopBar";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { articleText, articles, getArticle, type Block } from "@/data/articles";
import { isLocale, locales, site } from "@/data/site";
import { getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ locale: string; slug: string }> };

// A static export needs at least one param for a dynamic route. While there are no articles,
// a placeholder slug is generated; the page below turns it into a 404.
export function generateStaticParams() {
  const slugs = articles.length > 0 ? articles.map((a) => a.slug) : ["none"];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Params) {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!isLocale(locale) || !article) return {};
  const text = articleText(article, locale);
  return pageMetadata({ locale, path: `/articles/${slug}`, title: text.title, description: text.summary, og: "articles" });
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} className="mt-6 font-display text-[clamp(26px,3vw,36px)] font-bold leading-[1.1] tracking-[-0.028em]">
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul key={i} className="grid gap-2 pl-1">
          {block.items.map((item) => (
            <li key={item} className="grid grid-cols-[14px_1fr] gap-2">
              <span className="mt-[0.7em] h-1 w-1 rounded-full bg-fg" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={i} className="rounded-2xl bg-raised px-6 py-5 font-display text-[clamp(20px,2.2vw,26px)] leading-[1.3] tracking-[-0.02em]">
          {block.text}
        </blockquote>
      );
    case "code":
      return (
        <pre key={i} className="overflow-x-auto rounded-2xl bg-fg p-5 font-mono text-[13.5px] leading-[1.7] text-surface">
          <code>{block.code}</code>
        </pre>
      );
    default:
      return <p key={i}>{block.text}</p>;
  }
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
        </Reveal>
      </header>
      <Reveal className="card pad">
        <div className="mx-auto grid max-w-[680px] gap-5 text-[18px] leading-[1.75]">{text.body.map(renderBlock)}</div>
      </Reveal>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </article>
  );
}
