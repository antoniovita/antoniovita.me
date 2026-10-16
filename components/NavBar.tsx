"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import type { Locale } from "@/data/site";
import { cn } from "@/lib/cn";
import { useUi } from "./motion/MotionRoot";

const items = [
  { key: "work", href: "/work" },
  { key: "articles", href: "/articles" },
  { key: "now", href: "/now" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

/** "/pt/work/fuoco/" → "/en/work/fuoco/" */
export function swapLocale(pathname: string, next: Locale) {
  const parts = pathname.split("/");
  parts[1] = next;
  const joined = parts.join("/") || `/${next}`;
  return joined.endsWith("/") ? joined : `${joined}/`;
}

const spring = { type: "spring", stiffness: 420, damping: 36 } as const;

/** The search button. While the modal is open it lives there instead (same layoutId), so the modal grows out of the dock. */
function SearchButton({ label }: { label: string }) {
  const { searchOpen, openSearch } = useUi();
  if (searchOpen) return <span className="block h-10 w-10" aria-hidden="true" />;
  return (
    <motion.button
      layoutId="search-surface"
      type="button"
      onClick={openSearch}
      aria-label={label}
      aria-haspopup="dialog"
      transition={spring}
      style={{ borderRadius: 999 }}
      className="grid h-10 w-10 place-items-center bg-surface/10 text-surface hover:bg-surface/20"
    >
      <motion.span layout="position" className="grid place-items-center">
        <PiMagnifyingGlassBold size={16} />
      </motion.span>
    </motion.button>
  );
}

/** Main navigation: a dock floating at the bottom of the screen. */
export default function NavBar() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname() || `/${locale}/`;
  const isActive = (href: string) => pathname.startsWith(`/${locale}${href}`);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}>
      <motion.nav
        aria-label="Main"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="pointer-events-auto flex max-w-full items-center gap-0.5 rounded-full bg-fg p-1.5 text-surface shadow-(--shadow-pop)"
      >
        <ul className="flex items-center">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.key} className="relative">
                {active && <motion.span layoutId="nav-active" transition={spring} className="absolute inset-0 rounded-full bg-surface" aria-hidden="true" />}
                <Link
                  href={`/${locale}${item.href}/`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block rounded-full px-2.5 py-2.5 text-[13px] font-medium transition-colors sm:px-4 sm:text-[14px]",
                    active ? "text-fg" : "text-surface/75 hover:text-surface",
                  )}
                >
                  {t(item.key)}
                </Link>
              </li>
            );
          })}
        </ul>
        <SearchButton label={t("search")} />
      </motion.nav>
    </div>
  );
}
