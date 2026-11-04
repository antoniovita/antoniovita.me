import type { Locale } from "./site";

export type Book = {
  title: string;
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
    author: "Murray N. Rothbard",
    cover: "/books/anatomia-do-estado.png",
    categories: ["Política"],
    recommendation: {
      pt: "Um ensaio curto sobre o que é o Estado e como ele cresce.",
      en: "A short essay on what the State is and how it grows.",
      it: "Un breve saggio su cos'è lo Stato e come cresce.",
    },
  },
];

export function bookRecommendation(book: Book, locale: Locale): string {
  return book.recommendation[locale] ?? book.recommendation.pt ?? book.recommendation.en ?? book.recommendation.it ?? "";
}
