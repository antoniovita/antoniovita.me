"use client";

import { useId } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { categoryId, categoryLabel } from "@/lib/article-categories";
import type { Locale } from "@/data/site";

type CategoryFilterProps = {
  items: { categories: string[] }[];
  locale: Locale;
  selected: string | null;
  onSelect: (id: string | null) => void;
  allLabel: string;
  groupLabel: string;
  className?: string;
};

/** Pill toggle that filters a list by category; the selection slides between options. */
export default function CategoryFilter({ items, locale, selected, onSelect, allLabel, groupLabel, className = "" }: CategoryFilterProps) {
  const filterId = useId();
  const reducedMotion = useReducedMotion();
  const categories = [...new Map(items.flatMap((item) => item.categories).map((category) => [categoryId(category), category])).entries()]
    .sort((a, b) => categoryLabel(a[1], locale).localeCompare(categoryLabel(b[1], locale), locale));

  if (categories.length === 0) return null;

  return (
    <div className={`no-scrollbar overflow-x-auto pb-5 ${className}`}>
      <LayoutGroup id={filterId}>
        <div role="group" aria-label={groupLabel}
          className="relative inline-flex isolate items-center gap-1 rounded-full bg-raised p-1 ring-1 ring-inset ring-fg/5">
          {[{ id: null, label: allLabel, count: items.length }, ...categories.map(([id, category]) => ({
            id, label: categoryLabel(category, locale),
            count: items.filter((item) => item.categories.some((other) => categoryId(other) === id)).length,
          }))].map(({ id, label, count }) => (
            <button key={id ?? "all"} type="button" aria-pressed={selected === id} onClick={() => onSelect(id)}
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
  );
}

export function matchesCategory(categories: string[], selected: string | null): boolean {
  return selected === null || categories.some((category) => categoryId(category) === selected);
}
