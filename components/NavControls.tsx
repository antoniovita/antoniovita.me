"use client";
import { useEffect, useRef, useState } from "react";
import { PiGlobeBold, PiCaretDownBold } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const languages = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "it", label: "Italiano" },
];

export default function NavControls() {
  const [langOpen, setLangOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setLangOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <div className="inline-flex items-center gap-0 h-11 px-4 rounded-full border border-theme-border bg-white text-sm font-medium text-gray-700">
        <button
          onClick={() => setLangOpen((o) => !o)}
          className="flex items-center gap-1.5 hover:text-black transition-colors"
          aria-label="Select language"
        >
          <PiGlobeBold size={15} className="text-gray-500" />
          <span className="text-xs font-semibold tracking-wide uppercase">{locale}</span>
          <PiCaretDownBold
            size={11}
            className={`text-gray-400 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {langOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-36 rounded-2xl border border-theme-border bg-white shadow-lg overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors
                  ${locale === lang.code
                    ? "text-black font-semibold bg-gray-50"
                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
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
