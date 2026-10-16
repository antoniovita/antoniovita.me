import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PiArrowUpRightBold, PiLockSimpleBold } from "react-icons/pi";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cases } from "@/data/cases";
import { getArchive, getExperience, getFeatured, splitTitle } from "@/data/content";
import { isLocale } from "@/data/site";
import { getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return pageMetadata({ locale, path: "/work", title: t("meta.work.title"), description: t("meta.work.description"), og: "work" });
}

export default async function WorkPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getT(locale);
  const featured = getFeatured(locale);
  const archive = getArchive(locale);
  const { experiences } = getExperience(locale);

  return (
    <div className="grid gap-2 md:gap-3">
      <PageHeader title={t("work.title")} subtitle={t("work.subtitle")} />

      <Stagger className="grid gap-2 md:grid-cols-2 md:gap-3">
        {featured.map((project, i) => {
          const c = cases[project.slug as keyof typeof cases];
          const { name } = splitTitle(project.title);
          return (
            <StaggerItem key={project.slug} className={i === 0 ? "md:col-span-2" : ""}>
              <Link href={`/${locale}/work/${project.slug}/`} className="card group flex h-full flex-col overflow-hidden p-2">
                <div className={`relative shrink-0 overflow-hidden rounded-2xl bg-raised md:rounded-[22px] ${i === 0 ? "aspect-16/10 md:aspect-21/9" : "aspect-16/10"}`}>
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes={i === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                    className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                  />
                  <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-surface text-fg shadow-(--shadow-card) transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                    <PiArrowUpRightBold size={17} />
                  </span>
                </div>
                <div className="flex flex-1 flex-wrap items-end justify-between gap-x-6 gap-y-2 px-4 pb-4 pt-5 md:px-5">
                  <div>
                    <p className="text-[14px] text-dim">
                      {c.area[locale]} · {project.date}
                    </p>
                    <h2 className={`mt-1 font-display font-bold leading-none tracking-[-0.034em] ${i === 0 ? "text-[clamp(40px,6vw,76px)]" : "text-[40px]"}`}>{name}</h2>
                  </div>
                  <p className="max-w-[36ch] text-[15.5px] text-dim">{c.tagline[locale]}</p>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal className="card pad pb-0">
        <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold tracking-[-0.024em]">{t("work.experienceLabel")}</h2>
        <ul className="mt-8">
          {experiences.map((job) => (
            <li key={`${job.company}-${job.period}`} className="bleed rule grid gap-x-10 gap-y-3 py-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
              <div>
                <h3 className="font-display text-[clamp(26px,3vw,36px)] font-bold leading-none tracking-[-0.024em]">{job.company}</h3>
                <p className="mt-2 font-medium">{job.position}</p>
                <p className="mt-1 text-[14px] text-dim">
                  {job.period} · {job.location}
                </p>
                <p className="text-[14px] text-faint">{job.type}</p>
              </div>
              <div>
                <p className="text-[16.5px] leading-[1.6]">{job.description}</p>
                <ul className="mt-4 grid gap-2">
                  {job.achievements.map((item) => (
                    <li key={item} className="grid grid-cols-[14px_1fr] gap-2 text-[15px] text-dim">
                      <span className="mt-[0.62em] h-1 w-1 rounded-full bg-fg" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {job.technologies.map((tech) => (
                    <li key={tech} className="chip text-[12.5px]">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="card pad pb-0">
        <div className="flex items-baseline justify-between gap-4 pb-5">
          <h2 className="font-display text-[32px] font-bold tracking-[-0.028em]">{t("work.archiveLabel")}</h2>
          <span className="font-mono text-[13px] text-dim">{archive.length}</span>
        </div>
        <div className="bleed rule hidden grid-cols-[minmax(0,1.6fr)_80px_minmax(0,1fr)_minmax(0,1.2fr)_90px] gap-6 py-3 text-[13px] text-faint md:grid">
          <span>{t("work.colProject")}</span>
          <span>{t("work.colYear")}</span>
          <span>{t("work.colArea")}</span>
          <span>{t("work.colStack")}</span>
          <span className="text-right">{t("work.colLink")}</span>
        </div>
        <ul>
          {archive.map((project) => {
            const { name, subtitle } = splitTitle(project.title);
            const hasRepo = project.github !== "#";
            const Row = hasRepo ? "a" : "div";
            return (
              <li key={project.slug} className="bleed rule transition-colors hover:bg-raised/60">
                <Row
                  {...(hasRepo ? { href: project.github, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-4 md:grid-cols-[minmax(0,1.6fr)_80px_minmax(0,1fr)_minmax(0,1.2fr)_90px] md:items-baseline"
                >
                  <span className="min-w-0">
                    <span className="font-semibold">{name}</span>
                    <span className="block truncate text-[14.5px] text-dim">{subtitle ?? project.description}</span>
                  </span>
                  <span className="font-mono text-[13px] text-dim md:order-none">{project.date}</span>
                  <span className="hidden text-[15px] text-dim md:block">{project.category}</span>
                  <span className="col-span-2 font-mono text-[12.5px] text-dim md:col-span-1">{project.technologies.slice(0, 3).join(" · ")}</span>
                  <span className="hidden justify-end md:flex">
                    {hasRepo ? (
                      <span className="inline-flex items-center gap-1 text-[14px] font-medium underline-offset-4 group-hover:underline">
                        {t("work.code")}
                        <PiArrowUpRightBold size={12} />
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[13px] text-faint">
                        <PiLockSimpleBold size={12} />
                        {t("work.private")}
                      </span>
                    )}
                  </span>
                </Row>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </div>
  );
}
