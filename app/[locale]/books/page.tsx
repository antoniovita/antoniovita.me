import { notFound } from "next/navigation";
import BookList from "@/components/BookList";
import { PageHeader } from "@/components/PageHeader";
import { bookRecommendation, books } from "@/data/books";
import { isLocale } from "@/data/site";
import { getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return pageMetadata({ locale, path: "/books", title: t("meta.books.title"), description: t("meta.books.description") });
}

export default async function BooksPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getT(locale);

  return (
    <div className="grid gap-2 md:gap-3">
      <PageHeader title={t("books.title")} subtitle={t("books.subtitle")} />
      {books.length === 0 ? (
        <section className="card pad flex min-h-[320px] flex-col justify-center gap-4">
          <h2 className="font-display text-[clamp(30px,4vw,52px)] font-bold tracking-[-0.024em]">{t("books.emptyTitle")}</h2>
          <p className="max-w-[52ch] text-dim">{t("books.emptyText")}</p>
        </section>
      ) : (
        <section className="card pad">
          <BookList
            locale={locale}
            allLabel={t("books.allCategories")}
            groupLabel={t("books.filterCategories")}
            items={books.map((book) => ({
              title: book.title,
              author: book.author,
              cover: book.cover,
              alt: t("books.coverAlt", { title: book.title }),
              recommendation: bookRecommendation(book, locale),
              categories: book.categories,
            }))}
          />
        </section>
      )}
    </div>
  );
}
