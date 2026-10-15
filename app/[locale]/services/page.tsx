import { notFound } from "next/navigation";
import Redirect from "@/components/Redirect";
import { isLocale } from "@/data/site";
import { getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

// Old URL kept so shared links keep working. It points to /contact.
type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return pageMetadata({ locale, path: "/contact", title: t("meta.contact.title"), description: t("meta.contact.description"), og: "contact", noindex: true });
}

export default async function MovedPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getT(locale);
  return <Redirect to={`/${locale}/contact/`} message={t("redirect.moved")} linkLabel={t("redirect.go")} />;
}
