"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { locales, site, type Locale } from "@/data/site";
import { cn } from "@/lib/cn";
import LocalClock from "./LocalClock";
import { swapLocale } from "./NavBar";
import { Signature } from "./Signature";
import ThemeToggle from "./ThemeToggle";

/** Top strip of each page's first card: signature, local time, language and theme, above a full-width divider. */
export default function TopBar({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname() || `/${locale}/`;

  return (
    <div className={cn("bleed -mt-[calc(var(--pad)-18px)] flex items-center justify-between gap-4 border-b border-line pb-4", className)}>
      <Link href={`/${locale}/`} aria-label={`Antonio Vita · ${t("home")}`} className="shrink-0 text-fg">
        <Signature className="h-[28px] w-[94px]" />
      </Link>
      <div className="flex items-center gap-3 sm:gap-5">
        <span className="hidden text-[13.5px] text-dim sm:inline">
          {site.location.city} · <LocalClock timeZone={site.location.timeZone} locale={locale} className="tabular-nums" />
        </span>
        <div className="flex items-center" role="group" aria-label={t("language")}>
          {locales.map((l) => (
            <Link
              key={l}
              href={swapLocale(pathname, l)}
              hrefLang={l}
              aria-current={l === locale ? "true" : undefined}
              className={cn("rounded-full px-2 py-1 text-[12.5px] font-semibold uppercase transition-colors", l === locale ? "text-fg" : "text-faint hover:text-fg")}
            >
              {l}
            </Link>
          ))}
        </div>
        <ThemeToggle label={t("theme")} />
      </div>
    </div>
  );
}
