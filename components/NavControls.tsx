"use client";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { PiSunBold, PiMoonBold, PiGlobeBold, PiCaretDownBold } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const languages = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "it", label: "Italiano" },
];

export default function NavControls() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!mounted) return <div className="h-11 w-36 rounded-full bg-gray-100 dark:bg-dark-surface" />;

  const isDark = resolvedTheme === "dark";

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setLangOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <div className="inline-flex items-center gap-0 h-11 px-4 rounded-full border border-theme-border bg-white dark:bg-dark-surface text-sm font-medium text-gray-700 dark:text-dark-muted">
        <button
          onClick={() => setLangOpen((o) => !o)}
          className="flex items-center gap-1.5 pr-3 hover:text-black dark:hover:text-white transition-colors"
          aria-label="Select language"
        >
          <PiGlobeBold size={15} className="text-gray-500 dark:text-dark-muted" />
          <span className="text-xs font-semibold tracking-wide uppercase">{locale}</span>
          <PiCaretDownBold
            size={11}
            className={`text-gray-400 dark:text-dark-muted transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
          />
        </button>

        <span className="w-px h-4 bg-theme-border" />

        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle theme"
          className="flex items-center justify-center pl-3 hover:text-black dark:hover:text-white transition-colors"
        >
          {isDark ? <PiSunBold size={16} /> : <PiMoonBold size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {langOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-36 rounded-2xl border border-theme-border bg-white dark:bg-dark-surface shadow-lg overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors
                  ${locale === lang.code
                    ? "text-black dark:text-white font-semibold bg-gray-50 dark:bg-dark-elevated"
                    : "text-gray-600 dark:text-dark-muted hover:bg-gray-50 dark:hover:bg-dark-elevated hover:text-black dark:hover:text-white"
                  }`}
              >
                <span className="text-xs font-bold tracking-wide w-6 uppercase">{lang.code}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
