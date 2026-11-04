import Link from "next/link";
import BookCard from "@/components/BookCard";
import ArticleCover from "@/components/ArticleCover";
import { notFound } from "next/navigation";
import { PiArrowRightBold, PiArrowUpRightBold, PiGithubLogoBold, PiInstagramLogoBold, PiLinkedinLogoBold } from "react-icons/pi";
import Portrait from "@/components/Portrait";
import TopBar from "@/components/TopBar";
import GlobeLazy from "@/components/GlobeLazy";
import LocalClock from "@/components/LocalClock";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { getExperience, stack } from "@/data/content";
import { bookTitle, books } from "@/data/books";
import { articleText, getArticles } from "@/data/articles";
import { isLocale, site } from "@/data/site";
import { getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return pageMetadata({ locale, path: "", title: t("meta.home.title"), description: t("meta.home.description"), absoluteTitle: true });
}

export default async function Home({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getT(locale);
  const { experiences } = getExperience(locale);
  const articles = getArticles().slice(0, 3);
  const articleDate = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" });
  const path = t.raw("home.path") as { year: string; text: string }[];
  const socials = [
    { href: site.github, label: "GitHub", handle: site.github.replace("https://github.com/", "@"), Icon: PiGithubLogoBold },
    { href: site.linkedin, label: "LinkedIn", handle: site.name, Icon: PiLinkedinLogoBold },
    { href: site.instagram, label: "Instagram", handle: site.instagramHandle, Icon: PiInstagramLogoBold },
  ];
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
          <h1 className="mt-10 font-display text-[clamp(44px,6.2vw,96px)] font-bold leading-[0.9] tracking-[-0.024em] lg:mt-auto lg:pt-10">
            <SplitWords lines={[{ text: t("home.h1a") }, { text: t("home.h1b"), mark: "all" }]} />
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
          <Portrait alt={t("home.portraitAlt")} className="aspect-4/5 w-full lg:aspect-auto lg:h-full lg:min-h-[600px]" />
        </Reveal>
        </div>
      </section>

      <div className="grid gap-2 md:grid-cols-2 md:gap-3 lg:grid-flow-row-dense lg:grid-cols-12">
        {/* Base + globe */}
        <Reveal delay={0.08} className="card pad flex flex-col overflow-hidden md:col-span-2 lg:col-span-5 lg:col-start-8 lg:row-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-[28px] font-bold tracking-[-0.024em]">{t("home.baseTitle")}</h2>
              <p className="font-mono text-[12.5px] text-dim">
                {lat}°S · {lng}°W
              </p>
            </div>
            <div className="text-right">
              <LocalClock timeZone={site.location.timeZone} locale={locale} className="font-display text-[40px] font-bold leading-none tracking-[-0.024em] tabular-nums" />
              <p className="mt-1 text-[13px] text-dim">{t("home.localTime")}</p>
            </div>
          </div>
          <div className="my-2 flex flex-1 items-center justify-center">
            <div className="w-full max-w-[560px]">
            <GlobeLazy label={t("home.globeAlt")} marker={{ lat: site.location.lat, lng: site.location.lng, name: site.location.city }} />
            </div>
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
        <Reveal className="card pad pb-0 md:col-span-2 lg:col-span-7">
          <div className="flex items-baseline justify-between gap-4 pb-5">
            <h2 className="font-display text-[24px] font-bold tracking-[-0.025em]">{t("home.workLabel")}</h2>
            <Link href={`/${locale}/work/`} className="text-[14px] font-medium text-dim transition-colors hover:text-fg">
              {t("home.workAll")} →
            </Link>
          </div>
          <ul>
            {experiences.map((job) => (
              <li key={job.company} className="bleed rule py-5">
                <Link href={`/${locale}/work/`} className="group flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-display text-[24px] font-bold tracking-[-0.024em]">{job.company}</span>
                  <span className="text-[15px] text-dim">{job.position}</span>
                </Link>
              </li>
            ))}
            <li className="bleed rule py-5">
              <Link href={`/${locale}/work/#bobbio`} className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-display text-[24px] font-bold tracking-[-0.024em]">Bobbio</span>
                <span className="text-[15px] text-dim">{t("work.bobbioStatus")}</span>
              </Link>
            </li>
          </ul>
        </Reveal>

        {/* Books */}
        <Reveal className="card pad flex flex-col md:col-span-2 lg:col-span-8">
          <h2 className="font-display text-[clamp(30px,3.6vw,48px)] font-bold leading-[1.02] tracking-[-0.024em]">{t("home.booksTitle")}</h2>
          <p className="mt-3 max-w-[46ch] text-dim">{t("home.booksText")}</p>
          {books.length > 0 ? (
            <ul className="mt-6 grid grid-cols-3 gap-3">
              {books.slice(0, 3).map((book, index) => (
                <li key={`${book.title}-${book.author}`} className="min-w-0">
                  <BookCard cover={book.cover} alt={t("books.coverAlt", { title: bookTitle(book, locale) })} index={index}>
                    <div className="px-[14%] pb-6">
                      <h3 className="min-h-[2.6em] font-display text-[clamp(14px,1.2vw,17px)] font-bold leading-[1.3] tracking-[-0.02em]">
                        <span className="grifo">{bookTitle(book, locale)}</span>
                      </h3>
                      <p className="mt-1 truncate text-[12px] text-dim">{book.author}</p>
                    </div>
                  </BookCard>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-[15px] text-dim">{t("home.booksEmpty")}</p>
          )}
          <Link href={`/${locale}/books/`} className="bleed rule group mt-auto -mb-[var(--pad)] flex items-center justify-between pt-6 pb-5 text-[15px] font-semibold">
            {t("home.booksLink")}
            <PiArrowRightBold size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* Socials: the one dark card, for contrast. */}
        <Reveal delay={0.08} className="card pad flex flex-col !bg-fg text-surface md:col-span-2 lg:col-span-4">
          <h2 className="font-display text-[clamp(28px,3vw,38px)] font-bold leading-[1.05] tracking-[-0.028em]">{t("home.socialTitle")}</h2>
          <p className="mt-3 text-[15px] text-surface/60">{t("home.socialText")}</p>
          <ul className="mt-auto pt-10">
            {socials.map(({ href, label, handle, Icon }) => (
              <li key={label} className="bleed border-t border-surface/15">
                <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-4">
                  <Icon size={22} aria-hidden="true" />
                  <span className="font-display text-[20px] font-bold tracking-[-0.02em]">{label}</span>
                  <span className="ml-auto truncate text-[14px] text-surface/60">{handle}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface/10 transition-all duration-300 group-hover:rotate-45 group-hover:bg-surface group-hover:text-fg">
                    <PiArrowUpRightBold size={14} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {articles.length > 0 && (
        <section className="card pad pb-0" aria-labelledby="home-articles-title">
          <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5">
            <h2 id="home-articles-title" className="font-display text-[24px] font-bold tracking-[-0.025em]">{t("home.articlesTitle")}</h2>
            <Link href={`/${locale}/articles/`} className="inline-flex items-center gap-2 text-[14px] font-medium text-dim transition-colors hover:text-fg">
              {t("home.articlesAll")}
              <PiArrowRightBold size={14} />
            </Link>
          </div>
          <ul>
            {articles.map((article) => {
              const text = articleText(article, locale);
              return (
                <li key={article.slug} className="bleed rule">
                  <Link href={`/${locale}/articles/${article.slug}/`} className={`group grid items-center gap-4 py-6 md:gap-7 ${text.cover ? "grid-cols-[96px_minmax(0,1fr)] sm:grid-cols-[160px_minmax(0,1fr)] lg:grid-cols-[200px_minmax(0,1fr)_auto]" : "lg:grid-cols-[minmax(0,1fr)_auto]"}`}>
                    {text.cover && <ArticleCover cover={text.cover} className="w-full self-start lg:self-center" />}
                    <div className="min-w-0">
                      <p className="mb-2 text-[13px] text-dim">
                        <time dateTime={article.date}>{articleDate.format(new Date(`${article.date}T12:00:00-03:00`))}</time>
                        {" · "}{t("articles.minRead", { minutes: article.readingMinutes })}
                      </p>
                      <h3 className="font-display text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.1] tracking-[-0.024em]">{text.title}</h3>
                      <p className="mt-3 text-[15px] text-dim">{text.summary}</p>
                    </div>
                    <span aria-hidden="true" className="hidden h-9 w-9 place-items-center rounded-full bg-raised transition-colors group-hover:bg-fg group-hover:text-surface lg:grid">
                      <PiArrowRightBold size={14} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
