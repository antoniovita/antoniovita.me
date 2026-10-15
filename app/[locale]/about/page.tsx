import Image from "next/image";
import { notFound } from "next/navigation";
import { PiFileArrowDownBold } from "react-icons/pi";
import { PageHeader } from "@/components/PageHeader";
import { Signature } from "@/components/Signature";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { getExperience } from "@/data/content";
import { isLocale, site } from "@/data/site";
import { getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return pageMetadata({ locale, path: "/about", title: t("meta.about.title"), description: t("meta.about.description"), og: "about" });
}

export default async function AboutPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getT(locale);
  const { experiences, education, certifications } = getExperience(locale);
  const timeline = t.raw("about.timeline") as { year: string; title: string; text: string }[];
  const languages = t.raw("about.languages") as { name: string; level: string }[];

  return (
    <div className="grid gap-2 md:gap-3">
      <PageHeader title={t("about.title")} subtitle={t("about.subtitle")} />

      <div className="grid gap-2 md:gap-3 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="card pad flex flex-col">
          <div className="grid gap-5 text-[clamp(18px,1.6vw,21px)] leading-[1.6]">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>
          <a href={site.cv} download className="btn btn-primary mt-10 self-start">
            <PiFileArrowDownBold size={16} />
            {t("about.cv")}
          </a>
        </Reveal>
        <Reveal delay={0.1} className="card overflow-hidden p-2">
          <div className="relative h-full min-h-[460px] overflow-hidden rounded-2xl md:rounded-[22px]">
            <Image src="/me.jpeg" alt={t("home.portraitAlt")} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover contrast-[1.08] grayscale" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,11,14,.6)_0%,rgba(11,11,14,0)_45%)]" />
            <Signature className="sig-shadow absolute text-white bottom-[6%] left-[6%] w-[84%] -rotate-6" />
          </div>
        </Reveal>
      </div>

      <Reveal className="card pad pb-0">
        <h2 className="font-display text-[clamp(32px,4vw,52px)] font-semibold tracking-[-0.04em]">{t("about.timelineLabel")}</h2>
        <Stagger as="ol" className="mt-8">
          {timeline.map((step, i) => {
            const last = i === timeline.length - 1;
            return (
              <StaggerItem
                as="li"
                key={`${step.year}-${step.title}`}
                className="bleed rule group grid gap-x-8 gap-y-1 py-6 transition-colors hover:bg-raised/60 md:grid-cols-[140px_minmax(0,1fr)_minmax(0,1.2fr)] md:items-baseline"
              >
                <span className={`font-display text-[28px] font-semibold tracking-[-0.03em] ${last ? "text-fg" : "text-faint group-hover:text-fg"} transition-colors`}>{step.year}</span>
                <h3 className="font-display text-[22px] font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="text-dim">{step.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Reveal>

      <div className="grid gap-2 md:gap-3 lg:grid-cols-2">
        <Reveal className="card pad pb-0">
          <h2 className="font-display text-[32px] font-semibold tracking-[-0.035em]">{t("about.experienceLabel")}</h2>
          <ul className="mt-6">
            {experiences.map((job) => (
              <li key={`${job.company}-${job.period}`} className="bleed rule py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-[24px] font-semibold tracking-[-0.025em]">{job.company}</h3>
                  <span className="text-[14px] text-dim">{job.period}</span>
                </div>
                <p className="mt-0.5 font-medium">{job.position}</p>
                <p className="mt-2 text-[15.5px] text-dim">{job.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {job.technologies.map((tech) => (
                    <li key={tech} className="chip text-[12.5px]">
                      {tech}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="card pad pb-0">
          <h2 className="font-display text-[32px] font-semibold tracking-[-0.035em]">{t("about.educationLabel")}</h2>
          <ul className="mt-6">
            {education.map((item) => (
              <li key={`${item.name}-${item.degree}`} className="bleed rule py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-[24px] font-semibold tracking-[-0.025em]">{item.name}</h3>
                  <span className="text-[14px] text-dim">
                    {item.inProgress && <span className="mr-2 text-ok">● {t("about.inProgress")}</span>}
                    {item.period}
                  </span>
                </div>
                <p className="mt-0.5 text-dim">{item.degree}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="grid gap-2 md:gap-3 lg:grid-cols-2">
        <Reveal className="card pad pb-0">
          <h2 className="font-display text-[32px] font-semibold tracking-[-0.035em]">{t("about.certificationsLabel")}</h2>
          <ul className="mt-6">
            {certifications.map((cert) => (
              <li key={cert.name} className="bleed rule flex flex-wrap items-baseline justify-between gap-2 py-4">
                <span>
                  <span className="font-semibold">{cert.name}</span>
                  <span className="block text-[14.5px] text-dim">{cert.issuer}</span>
                </span>
                <span className="font-mono text-[13px] text-dim">{cert.date}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="card pad pb-0">
          <h2 className="font-display text-[32px] font-semibold tracking-[-0.035em]">{t("about.languagesLabel")}</h2>
          <ul className="mt-6">
            {languages.map((lang) => (
              <li key={lang.name} className="bleed rule flex items-baseline justify-between gap-2 py-4">
                <span className="font-semibold">{lang.name}</span>
                <span className="font-mono text-[13px] text-dim">{lang.level}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
