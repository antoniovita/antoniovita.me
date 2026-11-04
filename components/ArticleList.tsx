"use client";

import Link from "next/link";
import ArticleCover from "./ArticleCover";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { PiArrowUpRightBold } from "react-icons/pi";
import { Stagger, StaggerItem } from "./motion/Reveal";
import CategoryFilter, { matchesCategory } from "./CategoryFilter";
import { categoryId, categoryLabel } from "@/lib/article-categories";
import type { Locale } from "@/data/site";

type ArticleSummary = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingMinutes: number;
  categories: string[];
  cover?: { src: string; alt: string };
};

export default function ArticleList({ items, locale }: { items: ArticleSummary[]; locale: Locale }) {
  const t = useTranslations("articles");
  const [selected, setSelected] = useState<string | null>(null);
  const visible = items.filter((article) => matchesCategory(article.categories, selected));

  return (
    <>
      <CategoryFilter items={items} locale={locale} selected={selected} onSelect={setSelected}
        allLabel={t("allCategories")} groupLabel={t("filterCategories")} />
      <div aria-live="polite" aria-atomic="false">
        <Stagger key={selected ?? "all"} as="ul">
          {visible.map((article, i) => (
            <StaggerItem as="li" key={article.slug} className={`bleed ${i > 0 ? "rule" : ""}`}>
              <Link href={`/${locale}/articles/${article.slug}/`}
                className={`group grid items-center gap-5 py-7 md:gap-8 ${article.cover ? "grid-cols-[96px_minmax(0,1fr)] sm:grid-cols-[160px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)_auto]" : "lg:grid-cols-[minmax(0,1fr)_auto]"}`}>
                {article.cover && <ArticleCover cover={article.cover} className="w-full self-start lg:self-center" />}
                <div className="min-w-0">
                  <p className="mb-2 text-[13px] text-dim">{article.date}</p>
                  <h2 className="font-display text-[clamp(21px,2.6vw,32px)] font-bold leading-[1.05] tracking-[-0.028em]">{article.title}</h2>
                  {article.categories.length > 0 && (
                    <span className="mt-3 flex flex-wrap gap-1.5">
                      {article.categories.map((category) => (
                        <span key={categoryId(category)} className="chip text-[12px]">{categoryLabel(category, locale)}</span>
                      ))}
                    </span>
                  )}
                  <p className="mt-3 text-[15px] text-dim">{article.summary}</p>
                </div>
                <span className={`inline-flex items-center gap-3 text-[13px] text-dim lg:justify-end ${article.cover ? "col-start-2 lg:col-start-auto" : ""}`}>
                  {t("minRead", { minutes: article.readingMinutes })}
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-raised text-fg transition-all duration-300 group-hover:rotate-45 group-hover:bg-fg group-hover:text-surface">
                    <PiArrowUpRightBold size={14} />
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </>
  );
}
