import Link from "next/link";
import { notFound } from "next/navigation";
import { PiArrowRightBold } from "react-icons/pi";
import GenesisPortrait from "@/components/GenesisPortrait";
import TopBar from "@/components/TopBar";
import GlobeLazy from "@/components/GlobeLazy";
import LocalClock from "@/components/LocalClock";
import WorkRows from "@/components/WorkRows";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { cases } from "@/data/cases";
import { getFeatured, getProjects, splitTitle, stack } from "@/data/content";
import { isLocale, site } from "@/data/site";
import { getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return pageMetadata({ locale, path: "", title: t("meta.home.title"), description: t("meta.home.description"), og: "home", absoluteTitle: true });
}

export default async function Home({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getT(locale);
  const featured = getFeatured(locale);
  const total = getProjects(locale).length;
  const path = t.raw("home.path") as { year: string; text: string }[];
  const now = t.raw("now.items") as { title: string; text: string }[];
  const lat = Math.abs(site.location.lat).toFixed(2);
  const lng = Math.abs(site.location.lng).toFixed(2);

  return (
    <div className="grid gap-2 md:gap-3">
      {/* Hero: text and portrait share the same top and bottom edges. */}
      <section className="card pad">
        <TopBar className="mb-8 md:mb-10" />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="flex flex-col">
          <Reveal className="inline-flex items-center gap-2 self-start rounded-full bg-raised px-3.5 py-1.5 text-[13px] font-medium text-dim">
            <span className="status-dot" aria-hidden="true" />
            {t("home.status")}
          </Reveal>
          <h1 className="mt-10 font-display text-[clamp(48px,7.2vw,112px)] font-semibold leading-[0.9] tracking-[-0.055em] lg:mt-auto lg:pt-10">
            <SplitWords lines={[{ text: t("home.h1a") }, { text: t("home.h1b"), className: "text-faint" }]} />
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-6 font-display text-[clamp(20px,2.1vw,27px)] tracking-[-0.02em]">{t("home.tagline")}</p>
            <p className="mt-4 max-w-[54ch] text-dim">{t("home.bio")}</p>
            <div className="mt-8 hidden flex-wrap gap-2.5 md:flex">
              <Link href={`/${locale}/work/`} className="btn btn-primary">
                {t("home.ctaWork")}
                <PiArrowRightBold size={15} />
              </Link>
              <Link href={`/${locale}/contact/`} className="btn btn-soft">
                {t("home.ctaContact")}
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15} y={40} className="min-h-0">
          <GenesisPortrait alt={t("home.portraitAlt")} replayLabel={t("home.replay")} className="aspect-4/5 w-full lg:aspect-auto lg:h-full lg:min-h-[600px]" />
        </Reveal>
        </div>
      </section>

      <div className="grid gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-12">
        {/* Now */}
        <Reveal className="card pad flex flex-col md:col-span-2 lg:col-span-7">
          <h2 className="font-display text-[clamp(30px,3.6vw,48px)] font-semibold leading-[1.02] tracking-[-0.04em]">{t("home.nowTitle")}</h2>
          <p className="mt-3 max-w-[46ch] text-dim">{t("home.nowText")}</p>
          <ul className="mt-6">
            {now.map((item) => (
              <li key={item.title} className="bleed rule grid gap-x-6 gap-y-0.5 py-3.5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:items-baseline">
                <span className="font-semibold">{item.title}</span>
                <span className="text-[15px] text-dim">{item.text}</span>
              </li>
            ))}
          </ul>
          <Link href={`/${locale}/now/`} className="bleed rule group mt-auto -mb-[var(--pad)] flex items-center justify-between py-5 text-[15px] font-semibold">
            {t("home.nowLink")}
            <PiArrowRightBold size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* Base + globe */}
        <Reveal delay={0.08} className="card pad flex flex-col overflow-hidden md:col-span-2 lg:col-span-5 lg:row-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-[28px] font-semibold tracking-[-0.03em]">{t("home.baseTitle")}</h2>
              <p className="font-mono text-[12.5px] text-dim">
                {lat}°S · {lng}°W
              </p>
            </div>
            <div className="text-right">
              <LocalClock timeZone={site.location.timeZone} locale={locale} className="font-display text-[40px] font-semibold leading-none tracking-[-0.04em] tabular-nums" />
              <p className="mt-1 text-[13px] text-dim">{t("home.localTime")}</p>
            </div>
          </div>
          <div className="mx-auto my-2 w-full max-w-[560px] flex-1">
            <GlobeLazy label={t("home.globeAlt")} marker={{ lat: site.location.lat, lng: site.location.lng, name: site.location.city }} />
          </div>
          <p className="bleed rule -mb-[var(--pad)] py-5 text-[15px] text-dim">{t("home.baseNote")}</p>
        </Reveal>

        {/* Path */}
        <Reveal delay={0.05} className="card pad pb-0 lg:col-span-4">
          <ol className="-mt-3.5">
            {path.map((step, i) => (
              <li key={step.year} className="bleed rule grid grid-cols-[56px_1fr] gap-2 py-3.5 text-[15px] first:border-t-0">
                <span className={`font-mono text-[13px] leading-6 ${i === path.length - 1 ? "font-semibold text-fg" : "text-dim"}`}>{step.year}</span>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Stack */}
        <Reveal delay={0.1} className="card flex flex-col overflow-hidden lg:col-span-3">
          <div className="marquee-mask my-auto grid gap-2 py-8">
            {[0, 1, 2].map((row) => {
              const items = stack.filter((_, i) => i % 3 === row);
              return (
                <div key={row} className="overflow-hidden">
                  <div className="marquee-track gap-2" style={{ animationDuration: `${30 + row * 8}s`, animationDirection: row === 1 ? "reverse" : "normal" }}>
                    {[...items, ...items, ...items, ...items].map((item, i) => (
                      <span key={`${item}-${i}`} aria-hidden={i >= items.length ? true : undefined} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="rule pad-x py-5 text-[15px] text-dim">{t("home.stackNote")}</p>
        </Reveal>

        {/* Selected work */}
        <Reveal className="card pad pb-0 md:col-span-2 lg:col-span-8">
          <div className="flex items-baseline justify-between gap-4 pb-5">
            <h2 className="font-display text-[24px] font-semibold tracking-[-0.025em]">{t("home.workLabel")}</h2>
            <Link href={`/${locale}/work/`} className="text-[14px] font-medium text-dim transition-colors hover:text-fg">
              {t("home.workAll")} ({total}) →
            </Link>
          </div>
          <WorkRows
            rows={featured.map((p) => ({
              href: `/${locale}/work/${p.slug}/`,
              name: splitTitle(p.title).name,
              meta: cases[p.slug as keyof typeof cases].tagline[locale],
              year: p.date,
              image: p.image,
            }))}
          />
        </Reveal>

        {/* Contact: the one dark card, for contrast. */}
        <Reveal delay={0.08} className="card pad flex flex-col !bg-fg text-surface md:col-span-2 lg:col-span-4">
          <h2 className="font-display text-[clamp(28px,3vw,38px)] font-semibold leading-[1.05] tracking-[-0.035em]">{t("home.contactTitle")}</h2>
          <div className="mt-auto flex flex-wrap gap-2 pt-10">
            <Link href={`/${locale}/contact/?door=project`} className="btn bg-surface text-fg">
              {t("home.doorProject")}
            </Link>
            <Link href={`/${locale}/contact/?door=business`} className="btn text-surface ring-1 ring-current/30 hover:ring-current/60">
              {t("home.doorBusiness")}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
