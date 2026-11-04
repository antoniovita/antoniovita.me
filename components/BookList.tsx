"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import BookCard from "./BookCard";
import CategoryFilter, { matchesCategory } from "./CategoryFilter";
import { categoryId, categoryLabel } from "@/lib/article-categories";
import type { Locale } from "@/data/site";

type BookSummary = {
  title: string;
  author: string;
  cover: string;
  alt: string;
  recommendation: string;
  categories: string[];
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function BookList({ items, locale, allLabel, groupLabel }: { items: BookSummary[]; locale: Locale; allLabel: string; groupLabel: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const visible = items.filter((book) => matchesCategory(book.categories, selected));

  return (
    <>
      <CategoryFilter items={items} locale={locale} selected={selected} onSelect={setSelected}
        allLabel={allLabel} groupLabel={groupLabel} className="flex justify-center" />
      <ul className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 xl:grid-cols-5" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((book) => (
            <motion.li
              key={book.cover}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.6, ease }}
            >
              <BookCard cover={book.cover} alt={book.alt} index={items.indexOf(book)}>
                <div className="grid gap-2 px-[14%] pt-1">
                  <div>
                    <h2 className="min-h-[2.6em] font-display text-[clamp(17px,1.5vw,21px)] font-bold leading-[1.3] tracking-[-0.024em]">
                      <span className="grifo">{book.title}</span>
                    </h2>
                    <p className="mt-1 text-[13px] text-dim">{book.author}</p>
                  </div>
                  <span className="flex flex-wrap gap-1.5">
                    {book.categories.map((category) => (
                      <span key={categoryId(category)} className="chip text-[12px]">{categoryLabel(category, locale)}</span>
                    ))}
                  </span>
                  <p className="min-h-[4.875em] text-[13px] leading-relaxed text-dim">{book.recommendation}</p>
                </div>
              </BookCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}
