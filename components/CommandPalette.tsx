"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import {
  PiArrowRightBold,
  PiCopyBold,
  PiFileArrowDownBold,
  PiGlobeSimpleBold,
  PiMagnifyingGlassBold,
  PiMoonBold,
  PiSquaresFourBold,
} from "react-icons/pi";
import { locales, site, type Locale } from "@/data/site";
import { toggleTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";
import { useUi } from "./motion/MotionRoot";
import { swapLocale } from "./NavBar";

type Command = { id: string; group: string; title: string; hint?: string; icon: React.ReactNode; run: () => void };

const languageNames: Record<Locale, string> = { en: "English", pt: "Português", it: "Italiano" };

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  return !!el && (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));
}

export default function CommandPalette({ cases }: { cases: { slug: string; name: string }[] }) {
  const t = useTranslations("cmdk");
  const nav = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname() || `/${locale}/`;
  const { searchOpen: open, openSearch, closeSearch } = useUi();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (path: string) => () => router.push(`/${locale}${path}/`);
    const page = <PiArrowRightBold size={15} />;
    return [
      { id: "home", group: t("pages"), title: nav("home"), icon: page, run: go("") },
      { id: "work", group: t("pages"), title: nav("work"), icon: page, run: go("/work") },
      { id: "now", group: t("pages"), title: nav("now"), icon: page, run: go("/now") },
      { id: "about", group: t("pages"), title: nav("about"), icon: page, run: go("/about") },
      { id: "contact", group: t("pages"), title: nav("contact"), icon: page, run: go("/contact") },
      ...cases.map((c) => ({ id: `case-${c.slug}`, group: t("cases"), title: c.name, icon: <PiSquaresFourBold size={15} />, run: go(`/work/${c.slug}`) })),
      {
        id: "email",
        group: t("actions"),
        title: t("copyEmail"),
        hint: site.email,
        icon: <PiCopyBold size={15} />,
        run: () => {
          navigator.clipboard?.writeText(site.email).then(
            () => setToast(t("copied")),
            () => undefined,
          );
        },
      },
      {
        id: "cv",
        group: t("actions"),
        title: t("downloadCv"),
        icon: <PiFileArrowDownBold size={15} />,
        run: () => {
          const a = document.createElement("a");
          a.href = site.cv;
          a.download = "Antonio-Vita-CV.pdf";
          a.click();
        },
      },
      { id: "theme", group: t("actions"), title: t("toggleTheme"), icon: <PiMoonBold size={15} />, run: toggleTheme },
      ...locales
        .filter((l) => l !== locale)
        .map((l) => ({
          id: `lang-${l}`,
          group: t("actions"),
          title: t("switchTo", { language: languageNames[l] }),
          hint: l.toUpperCase(),
          icon: <PiGlobeSimpleBold size={15} />,
          run: () => router.push(swapLocale(pathname, l)),
        })),
    ];
  }, [cases, locale, nav, pathname, router, t]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return commands;
    return commands.filter((c) => normalize(`${c.title} ${c.hint ?? ""} ${c.group}`).includes(q));
  }, [commands, query]);

  // Shortcuts: "/" anywhere, or Ctrl/Cmd + K. Not advertised in the UI.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const combo = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const slash = e.key === "/" && !isTyping(e.target);
      if (combo || slash) {
        e.preventDefault();
        setQuery("");
        setSelected(0);
        if (open) closeSearch();
        else openSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, openSearch, closeSearch]);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(id);
  }, [toast]);

  const close = () => {
    closeSearch();
    setQuery("");
    setSelected(0);
  };

  const run = (command?: Command) => {
    if (!command) return;
    close();
    command.run();
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(filtered.length - 1, s + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(0, s - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[selected]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            className="fixed inset-0 z-[80] bg-overlay backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          />
        )}
      </AnimatePresence>
      {open && (
        <div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-center px-3"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
        >
          <motion.div
            layoutId="search-surface"
            role="dialog"
            aria-modal="true"
            aria-label={nav("search")}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            style={{ borderRadius: 26 }}
            className="pointer-events-auto w-full max-w-[600px] overflow-hidden bg-fg text-surface shadow-(--shadow-pop)"
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12, duration: 0.25 }}>
              <div className="flex items-center gap-3 border-b border-surface/10 px-5">
                <PiMagnifyingGlassBold size={18} className="shrink-0 text-surface/60" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected(0);
                  }}
                  onKeyDown={onInputKey}
                  placeholder={t("placeholder")}
                  aria-label={t("placeholder")}
                  aria-controls="cmdk-list"
                  aria-activedescendant={filtered[selected] ? `cmdk-${filtered[selected].id}` : undefined}
                  className="h-16 w-full bg-transparent text-[19px] text-surface outline-none placeholder:text-surface/40"
                />
                <button type="button" onClick={close} className="rounded-full bg-surface/10 px-2.5 py-1 text-xs text-surface/70 hover:text-surface">
                  Esc
                </button>
              </div>
              <ul
                id="cmdk-list"
                role="listbox"
                className="no-scrollbar max-h-[min(60vh,520px)] overflow-auto overscroll-contain py-2 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                data-lenis-prevent
              >
                {filtered.length === 0 && <li className="px-5 py-8 text-center text-surface/60">{t("empty")}</li>}
                {filtered.map((c, i) => {
                  const header = c.group !== lastGroup ? c.group : null;
                  lastGroup = c.group;
                  return (
                    <li key={c.id} role="presentation">
                      {header && <p className="px-5 pb-1.5 pt-3 text-[13px] font-medium text-surface/45">{header}</p>}
                      <div
                        id={`cmdk-${c.id}`}
                        role="option"
                        aria-selected={i === selected}
                        onMouseMove={() => setSelected(i)}
                        onClick={() => run(c)}
                        className="relative mx-2 flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-[15.5px]"
                      >
                        {i === selected && (
                          <motion.span
                            layoutId="cmdk-active"
                            className="absolute inset-0 rounded-2xl bg-surface/10"
                            transition={{ type: "spring", stiffness: 500, damping: 40 }}
                            aria-hidden="true"
                          />
                        )}
                        <span className={cn("relative grid h-7 w-7 place-items-center rounded-lg bg-surface/10 text-surface/70", i === selected && "bg-surface text-fg")}>{c.icon}</span>
                        <span className="relative flex-1">{c.title}</span>
                        {c.hint && <span className="relative truncate font-mono text-[11.5px] text-surface/45">{c.hint}</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="border-t border-surface/10 px-5 py-3 text-[12.5px] text-surface/45">{t("hint")}</p>
            </motion.div>
          </motion.div>
        </div>
      )}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full bg-fg px-4 py-2 text-sm text-surface"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
