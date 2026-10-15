import { notFound } from "next/navigation";
import Redirect from "@/components/Redirect";
import { isLocale } from "@/data/site";
import { getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

// Old URL kept so shared links keep working. It points to /about.
type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return pageMetadata({ locale, path: "/about", title: t("meta.about.title"), description: t("meta.about.description"), og: "about", noindex: true });
}

export default async function MovedPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getT(locale);
  return <Redirect to={`/${locale}/about/`} message={t("redirect.moved")} linkLabel={t("redirect.go")} />;
}
