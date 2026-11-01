import type { Locale } from "../data/site";

/** Stable keys let accents/casing and translations share the same filter. */
export function categoryId(category: string): string {
  return category.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

const labels: Record<string, Record<Locale, string>> = {
  economia: { pt: "Economia", en: "Economics", it: "Economia" },
  cripto: { pt: "Cripto", en: "Crypto", it: "Cripto" },
  engenharia: { pt: "Engenharia", en: "Engineering", it: "Ingegneria" },
};

export function categoryLabel(category: string, locale: Locale): string {
  return labels[categoryId(category)]?.[locale] ?? category;
}

export function articleCategories(value: unknown, file: string): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || !item.trim())) {
    throw new Error(`${file}: categories must be a list of non-empty strings`);
  }
  return [...new Map(value.map((item: string) => [categoryId(item), item.trim()])).values()];
}
