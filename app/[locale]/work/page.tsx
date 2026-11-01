import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { getExperience } from "@/data/content";
import { isLocale } from "@/data/site";
import { getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return pageMetadata({ locale, path: "/work", title: t("meta.work.title"), description: t("meta.work.description") });
}

export default async function WorkPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getT(locale);
  const { experiences } = getExperience(locale);

  return (
    <div className="grid gap-2 md:gap-3">
      <PageHeader title={t("work.title")} subtitle={t("work.subtitle")} />

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

      <Reveal className="card pad">
        <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold tracking-[-0.024em]">{t("work.expertiseLabel")}</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {["Smart Contracts", "Harness", "Full Stack"].map((area, i) => (
            <li key={area} className="rounded-2xl bg-raised p-5 md:p-6">
              <span className="font-mono text-[13px] text-faint" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-[clamp(24px,3vw,32px)] font-bold leading-none tracking-[-0.024em]">{area}</h3>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal id="bobbio" className="card pad scroll-mt-24">
        <p className="text-[14px] text-dim">{t("work.bobbioStatus")}</p>
        <h2 className="mt-3 font-display text-[clamp(40px,6vw,76px)] font-bold leading-none tracking-[-0.034em]">Bobbio</h2>
        <p className="mt-5 max-w-[58ch] text-[19px] leading-[1.65]">{t("work.bobbioDescription")}</p>
      </Reveal>
    </div>
  );
}
