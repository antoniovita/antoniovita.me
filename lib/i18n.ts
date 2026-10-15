import { createTranslator } from "next-intl";
import en from "@/messages/en.json";
import pt from "@/messages/pt.json";
import it from "@/messages/it.json";
import type { Locale } from "@/data/site";

export type Messages = typeof en;

export const messagesByLocale: Record<Locale, Messages> = { en, pt, it };

/**
 * Translator for server components. It reads the bundled messages directly, so
 * static export works without next-intl's request config.
 */
export function getT(locale: Locale) {
  return createTranslator({ locale, messages: messagesByLocale[locale] });
}

export const languageNames: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  it: "Italiano",
};
