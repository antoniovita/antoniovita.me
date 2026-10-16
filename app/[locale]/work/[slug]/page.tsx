import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PiArrowLeftBold, PiArrowUpRightBold, PiGithubLogo } from "react-icons/pi";
import CasePlayer from "@/components/CasePlayer";
import TopBar from "@/components/TopBar";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { cases } from "@/data/cases";
import { featuredSlugs, getProject, splitTitle, type FeaturedSlug } from "@/data/content";
import { isLocale, locales } from "@/data/site";
import { getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => featuredSlugs.map((slug) => ({ locale, slug })));
}

function isFeatured(slug: string): slug is FeaturedSlug {
  return (featuredSlugs as readonly string[]).includes(slug);
}

export async function generateMetadata({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isFeatured(slug)) return {};
  const project = getProject(locale, slug);
  if (!project) return {};
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: splitTitle(project.title).name,
    description: `${cases[slug].tagline[locale]}. ${project.description}`,
    og: slug,
  });
}

export default async function CasePage({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isFeatured(slug)) notFound();
  const project = getProject(locale, slug);
  if (!project) notFound();
  const t = getT(locale);
  const c = cases[slug];
  const { name } = splitTitle(project.title);
  const nextSlug = featuredSlugs[(featuredSlugs.indexOf(slug) + 1) % featuredSlugs.length];
  const next = getProject(locale, nextSlug);

  return (
    <article className="grid gap-2 md:gap-3">
      <header className="card pad">
        <TopBar className="mb-8" />
        <Link href={`/${locale}/work/`} className="btn btn-soft px-4 py-2.5 text-[14px]">
          <PiArrowLeftBold size={13} />
          {t("case.back")}
        </Link>
        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <Reveal>
              <p className="text-[15px] text-dim">
                {c.area[locale]} · {project.date}
              </p>
            </Reveal>
            <h1 className="mt-4 font-display text-[clamp(46px,7vw,104px)] font-bold leading-[0.9] tracking-[-0.024em]">
              <SplitWords lines={[{ text: name, mark: "all" }]} />
            </h1>
          </div>
          <Reveal delay={0.3}>
            <p className="font-display text-[clamp(22px,2.4vw,30px)] leading-[1.2] tracking-[-0.02em]">{c.tagline[locale]}</p>
          </Reveal>
        </div>
      </header>

      <Reveal className="card overflow-hidden p-2">
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-raised md:aspect-21/9 md:rounded-[22px]">
          <Image src={project.image} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
      </Reveal>

      <section aria-labelledby="film-title" className="card pad">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="film-title" className="font-display text-[32px] font-bold tracking-[-0.028em]">
            {t("case.film")}
          </h2>
          <p className="max-w-[56ch] text-[15px] text-dim">{t("case.filmNote")}</p>
        </div>
        <CasePlayer slug={slug} locale={locale} />
      </section>

      <div className="grid gap-2 md:gap-3 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="card pad">
          <h2 className="font-display text-[24px] font-bold tracking-[-0.025em]">{t("case.about")}</h2>
          <p className="mt-5 max-w-[62ch] text-[19px] leading-[1.65]">{project.longDescription}</p>
          <h2 className="mt-12 font-display text-[24px] font-bold tracking-[-0.025em]">{t("case.built")}</h2>
          <Stagger as="ol" className="mt-4">
            {project.achievements.map((item, i) => (
              <StaggerItem as="li" key={item} className="bleed rule grid grid-cols-[40px_1fr] py-4 text-[16px]">
                <span className="font-mono text-[13px] leading-7 text-faint">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
        <Reveal delay={0.08} className="card pad flex flex-col gap-8">
          <div>
            <h2 className="font-display text-[24px] font-bold tracking-[-0.025em]">{t("case.stack")}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          {project.github !== "#" && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary self-start">
              <PiGithubLogo size={17} />
              {t("case.repo")}
            </a>
          )}
        </Reveal>
      </div>

      {next && (
        <Reveal>
          <Link href={`/${locale}/work/${nextSlug}/`} className="card pad group flex items-end justify-between gap-6 overflow-hidden">
            <span>
              <span className="text-[15px] text-dim">{t("case.next")}</span>
              <span className="mt-3 block font-display text-[clamp(36px,5.6vw,80px)] font-bold leading-[0.95] tracking-[-0.024em] transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
                {splitTitle(next.title).name}
              </span>
            </span>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-fg text-surface transition-transform duration-500 ease-out-expo group-hover:rotate-45 md:h-20 md:w-20">
              <PiArrowUpRightBold size={24} />
            </span>
          </Link>
        </Reveal>
      )}
    </article>
  );
}
