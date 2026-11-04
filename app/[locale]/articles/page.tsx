import Link from "next/link";
import { notFound } from "next/navigation";
import { PiArrowRightBold } from "react-icons/pi";
import ArticleList from "@/components/ArticleList";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { articleText, getArticles } from "@/data/articles";
import { isLocale } from "@/data/site";
import { getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return pageMetadata({ locale, path: "/articles", title: t("meta.articles.title"), description: t("meta.articles.description") });
}

export default async function ArticlesPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getT(locale);
  const list = getArticles();
  const format = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" });

  return (
    <div className="grid gap-2 md:gap-3">
      <PageHeader title={t("articles.title")} subtitle={t("articles.subtitle")} />

      {list.length === 0 ? (
        <Reveal className="card pad flex min-h-[320px] flex-col justify-between gap-10">
          <h2 className="max-w-[18ch] font-display text-[clamp(32px,4.4vw,60px)] font-bold leading-[0.98] tracking-[-0.034em]">{t("articles.emptyTitle")}</h2>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-[46ch] text-dim">{t("articles.emptyText")}</p>
          <Link href={`/${locale}/books/`} className="btn btn-primary">
              {t("articles.emptyLink")}
              <PiArrowRightBold size={14} />
            </Link>
          </div>
        </Reveal>
      ) : (
        <Reveal className="card pad pb-0">
          <ArticleList locale={locale} items={list.map((article) => ({
            slug: article.slug,
            title: articleText(article, locale).title,
            summary: articleText(article, locale).summary,
            cover: articleText(article, locale).cover,
            date: format.format(new Date(`${article.date}T12:00:00-03:00`)),
            readingMinutes: article.readingMinutes,
            categories: article.categories,
          }))} />
        </Reveal>
      )}
    </div>
  );
}
