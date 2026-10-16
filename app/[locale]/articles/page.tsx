import Link from "next/link";
import { notFound } from "next/navigation";
import { PiArrowRightBold, PiArrowUpRightBold } from "react-icons/pi";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { articleText, getArticles } from "@/data/articles";
import { isLocale } from "@/data/site";
import { getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return pageMetadata({ locale, path: "/articles", title: t("meta.articles.title"), description: t("meta.articles.description"), og: "articles" });
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
            <Link href={`/${locale}/now/`} className="btn btn-primary">
              {t("articles.emptyLink")}
              <PiArrowRightBold size={14} />
            </Link>
          </div>
        </Reveal>
      ) : (
        <Reveal className="card pad pb-0">
          <Stagger as="ul">
            {list.map((article, i) => {
              const text = articleText(article, locale);
              return (
                <StaggerItem as="li" key={article.slug} className={`bleed ${i > 0 ? "rule" : ""}`}>
                  <Link
                    href={`/${locale}/articles/${article.slug}/`}
                    className="group grid gap-x-10 gap-y-2 py-8 transition-colors hover:bg-raised/60 md:grid-cols-[180px_minmax(0,1.3fr)_minmax(0,1fr)_auto] md:items-baseline"
                  >
                    <span className="text-[14px] text-dim">{format.format(new Date(`${article.date}T12:00:00-03:00`))}</span>
                    <h2 className="font-display text-[clamp(24px,2.6vw,34px)] font-bold leading-[1.05] tracking-[-0.028em]">{text.title}</h2>
                    <p className="text-[15.5px] text-dim">{text.summary}</p>
                    <span className="inline-flex items-center gap-3 text-[13px] text-dim md:justify-end">
                      {t("articles.minRead", { minutes: article.readingMinutes })}
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-raised text-fg transition-all duration-300 group-hover:rotate-45 group-hover:bg-fg group-hover:text-surface">
                        <PiArrowUpRightBold size={14} />
                      </span>
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Reveal>
      )}
    </div>
  );
}
