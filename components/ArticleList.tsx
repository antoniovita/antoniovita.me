"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { PiArrowUpRightBold } from "react-icons/pi";
import { Stagger, StaggerItem } from "./motion/Reveal";
import { categoryId, categoryLabel } from "@/lib/article-categories";
import type { Locale } from "@/data/site";

type ArticleSummary = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingMinutes: number;
  categories: string[];
};

export default function ArticleList({ items, locale }: { items: ArticleSummary[]; locale: Locale }) {
  const t = useTranslations("articles");
  const filterId = useId();
  const reducedMotion = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);
  const categories = [...new Map(items.flatMap((article) => article.categories).map((category) => [categoryId(category), category])).entries()]
    .sort((a, b) => categoryLabel(a[1], locale).localeCompare(categoryLabel(b[1], locale), locale));
  const visible = selected === null ? items : items.filter((article) => article.categories.some((category) => categoryId(category) === selected));

  return (
    <>
      {categories.length > 0 && (
        <div className="no-scrollbar overflow-x-auto pb-5">
          <LayoutGroup id={filterId}>
            <div role="group" aria-label={t("filterCategories")}
              className="relative inline-flex isolate items-center gap-1 rounded-full bg-raised p-1 ring-1 ring-inset ring-fg/5">
              {[{ id: null, label: t("allCategories"), count: items.length }, ...categories.map(([id, category]) => ({
                id, label: categoryLabel(category, locale),
                count: items.filter((article) => article.categories.some((item) => categoryId(item) === id)).length,
              }))].map(({ id, label, count }) => (
                <button key={id ?? "all"} type="button" aria-pressed={selected === id} onClick={() => setSelected(id)}
                  className={`relative min-h-10 shrink-0 rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 active:scale-[0.98] motion-reduce:transform-none ${selected === id ? "text-fg" : "text-dim"}`}>
                  {selected === id && (
                    <motion.span layoutId="category-selection" initial={false} aria-hidden="true"
                      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-surface shadow-[0_1px_3px_rgba(0,0,0,0.10),0_3px_8px_rgba(0,0,0,0.04)] ring-1 ring-inset ring-fg/5" />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {label}
                    <span className={`font-mono text-[11px] tabular-nums transition-colors duration-200 ${selected === id ? "text-dim" : "text-faint"}`}>{count}</span>
                  </span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>
      )}
      <div aria-live="polite" aria-atomic="false">
        <Stagger key={selected ?? "all"} as="ul">
          {visible.map((article, i) => (
            <StaggerItem as="li" key={article.slug} className={`bleed ${i > 0 ? "rule" : ""}`}>
              <Link href={`/${locale}/articles/${article.slug}/`}
                className="group grid gap-x-10 gap-y-2 py-8 md:grid-cols-[180px_minmax(0,1.3fr)_minmax(0,1fr)_auto] md:items-baseline">
                <span className="text-[14px] text-dim">{article.date}</span>
                <div>
                  <h2 className="font-display text-[clamp(24px,2.6vw,34px)] font-bold leading-[1.05] tracking-[-0.028em]">{article.title}</h2>
                  {article.categories.length > 0 && (
                    <span className="mt-3 flex flex-wrap gap-1.5">
                      {article.categories.map((category) => (
                        <span key={categoryId(category)} className="chip text-[12px]">{categoryLabel(category, locale)}</span>
                      ))}
                    </span>
                  )}
                </div>
                <p className="text-[15.5px] text-dim">{article.summary}</p>
                <span className="inline-flex items-center gap-3 text-[13px] text-dim md:justify-end">
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
