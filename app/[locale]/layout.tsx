import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans, Geist_Mono, Mrs_Saint_Delafield } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import MotionRoot from "@/components/motion/MotionRoot";
import { getFeatured, splitTitle } from "@/data/content";
import { isLocale, locales, site, type Locale } from "@/data/site";
import { getT, messagesByLocale } from "@/lib/i18n";
import { themeInitScript } from "@/lib/theme";

const display = Funnel_Display({ subsets: ["latin"], variable: "--font-funnel-display", display: "swap" });
const sans = Funnel_Sans({ subsets: ["latin"], variable: "--font-funnel-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const hand = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", variable: "--font-hand-signature", display: "swap", preload: false });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t("meta.siteTitle"), template: `%s | ${site.name}` },
    description: t("meta.siteDescription"),
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    keywords: ["Antonio Vita", "software engineer", "entrepreneur", "harness engineer", "Rio de Janeiro", "Next.js", "TypeScript"],
  };
}

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#EBEBEF",
  colorScheme: "dark light",
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getT(locale);
  const cases = getFeatured(locale).map((p) => ({ slug: p.slug, name: splitTitle(p.title).name }));

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    image: `${site.url}/me.jpeg`,
    jobTitle: t("meta.jobTitle"),
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Rio de Janeiro", addressCountry: "BR" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "PUC-Rio" },
    knowsLanguage: ["pt", "en", "it", "es", "fr"],
    sameAs: [site.github, site.linkedin],
  };

  return (
    <html lang={locale} suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable} ${hand.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh overflow-x-clip pb-28">
        {/* Every prop is passed explicitly so the provider never needs next-intl's request config (static export). */}
        <NextIntlClientProvider locale={locale} messages={messagesByLocale[locale]} timeZone={site.location.timeZone} now={new Date()} formats={{}}>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
          >
            {t("nav.skip")}
          </a>
          <MotionRoot>
            <NavBar />
            <CommandPalette cases={cases} />
            <main id="content" className="frame pt-2 md:pt-3">
              {children}
            </main>
            <Footer locale={locale} />
          </MotionRoot>
        </NextIntlClientProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </body>
    </html>
  );
}
