import type { Locale } from "./site";

export type Book = {
  /** Original title; shown as is in any language without an entry in `titles`. */
  title: string;
  /** Published or natural title per language, when it differs from the original. */
  titles?: Partial<Record<Locale, string>>;
  author: string;
  cover: string;
  /** Same category names as articles (lib/article-categories.ts), so labels are translated. */
  categories: string[];
  recommendation: Partial<Record<Locale, string>>;
};

/** Covers live in public/books/; the order here is the order shown on the site. */
export const books: Book[] = [
  {
    title: "Economics in One Lesson",
    titles: { pt: "Economia em Uma Lição", it: "L'economia in una lezione" },
    author: "Henry Hazlitt",
    cover: "/books/economics-one-lesson.png",
    categories: ["Economia"],
    recommendation: {
      pt: "Como enxergar os efeitos invisíveis das decisões econômicas.",
      en: "How to see the hidden effects of economic decisions.",
      it: "Come vedere gli effetti nascosti delle scelte economiche.",
    },
  },
  {
    title: "Bitcoin: A Moeda na Era Digital",
    titles: { en: "Bitcoin: The Currency of the Digital Age", it: "Bitcoin: la moneta nell'era digitale" },
    author: "Fernando Ulrich",
    cover: "/books/bitcoin-ulrich.png",
    categories: ["Cripto", "Economia"],
    recommendation: {
      pt: "Os fundamentos do Bitcoin e por que uma moeda livre importa.",
      en: "Bitcoin's foundations and why a free currency matters.",
      it: "Le basi di Bitcoin e perché una moneta libera conta.",
    },
  },
  {
    title: "As Seis Lições",
    titles: { en: "The Six Lessons", it: "Le sei lezioni" },
    author: "Ludwig von Mises",
    cover: "/books/six-lessons.png",
    categories: ["Economia"],
    recommendation: {
      pt: "Seis palestras curtas, uma porta de entrada para Mises.",
      en: "Six short lectures, an easy way into Mises's ideas.",
      it: "Sei brevi lezioni, una porta d'ingresso alle idee di Mises.",
    },
  },
  {
    title: "Code",
    author: "Charles Petzold",
    cover: "/books/code.png",
    categories: ["Engenharia"],
    recommendation: {
      pt: "Do código Morse ao processador: como o computador funciona.",
      en: "From Morse code to the processor: how a computer works.",
      it: "Dal codice Morse al processore: come funziona un computer.",
    },
  },
  {
    title: "Anatomia do Estado",
    titles: { en: "Anatomy of the State", it: "Anatomia dello Stato" },
    author: "Murray N. Rothbard",
    cover: "/books/anatomia-do-estado.png",
    categories: ["Política"],
    recommendation: {
      pt: "Um ensaio curto sobre o que é o Estado e como ele cresce.",
      en: "A short essay on what the State is and how it grows.",
      it: "Un breve saggio su cos'è lo Stato e come cresce.",
    },
  },
  {
    title: "Dinero, crédito bancario y ciclos económicos",
    titles: {
      pt: "Moeda, Crédito Bancário e Ciclos Econômicos",
      en: "Money, Bank Credit, and Economic Cycles",
      it: "Denaro, credito bancario e cicli economici",
    },
    author: "Jesús Huerta de Soto",
    cover: "/books/money-bank-credit.png",
    categories: ["Economia", "Cripto"],
    recommendation: {
      pt: "Uma crítica às reservas fracionárias e ao crédito bancário como origem dos ciclos econômicos.",
      en: "A critique of fractional-reserve banking and bank credit as the source of economic cycles.",
      it: "Una critica alla riserva frazionaria e al credito bancario come origine dei cicli economici.",
    },
  },
];

export function bookTitle(book: Book, locale: Locale): string {
  return book.titles?.[locale] ?? book.title;
}

export function bookRecommendation(book: Book, locale: Locale): string {
  return book.recommendation[locale] ?? book.recommendation.pt ?? book.recommendation.en ?? book.recommendation.it ?? "";
}
