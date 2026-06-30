"use client";
import {
  PiGraduationCapBold,
  PiBookOpenBold,
  PiCalendarBold,
  PiMapPinBold,
  PiCertificateBold,
} from "react-icons/pi";
import { experiences, education, certifications } from "@/data/experience";
import { experiences as experiencesPt, education as educationPt, certifications as certificationsPt } from "@/data/experience.pt";
import { experiences as experiencesIt, education as educationIt, certifications as certificationsIt } from "@/data/experience.it";
import { useTranslations, useLocale } from "next-intl";

const Experience = () => {
  const t = useTranslations("experience");
  const locale = useLocale();

  const exp = locale === "pt" ? experiencesPt : locale === "it" ? experiencesIt : experiences;
  const edu = locale === "pt" ? educationPt : locale === "it" ? educationIt : education;
  const certs = locale === "pt" ? certificationsPt : locale === "it" ? certificationsIt : certifications;

  return (
    <div className="flex justify-center items-center min-h-screen pt-4 md:pt-8">
      <div className="w-[90%] max-w-7xl border-theme-border border-dashed px-4 md:px-6 border-l border-r py-12">

        {/* header */}
        <div className="mb-12 mt-20">
          <div className="space-y-2">
            <p className="text-sm text-theme-muted uppercase tracking-wide font-medium">
              {t("label")}
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-theme-fg">
              {t("title")}
            </h1>
            <p className="text-lg text-theme-fg-muted leading-relaxed max-w-3xl">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* left part */}
          <div className="space-y-6">
            {exp.map((item, index) => (
              <div key={index} className="bg-theme-bg border border-theme-border rounded-2xl p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-theme-fg">{item.position}</h3>
                    <p className="text-base font-semibold text-theme-fg-muted mt-1">{item.company}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-theme-surface rounded-full text-xs font-medium text-theme-fg-muted">
                      <PiCalendarBold size={14} />{item.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-theme-surface rounded-full text-xs font-medium text-theme-fg-muted">
                      <PiMapPinBold size={14} />{item.location}
                    </span>
                    <span className="px-3 py-1.5 bg-theme-accent text-theme-accent-fg rounded-full text-xs font-medium">
                      {item.type}
                    </span>
                  </div>

                  <p className="text-sm text-theme-fg-muted leading-relaxed">{item.description}</p>

                  <div>
                    <p className="text-xs font-semibold text-theme-muted uppercase tracking-wide mb-2">
                      {t("key_achievements")}
                    </p>
                    <ul className="space-y-1.5">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-theme-fg-muted flex items-start gap-2">
                          <span className="text-theme-fg mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-theme-muted uppercase tracking-wide mb-2">
                      {t("technologies")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 bg-theme-surface border border-theme-border rounded-lg text-xs font-medium text-theme-fg-muted">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* certificates */}
            <div className="bg-theme-bg border border-theme-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <PiCertificateBold size={24} className="text-theme-fg-muted" />
                <h3 className="text-xl font-bold text-theme-fg">{t("certifications")}</h3>
              </div>
              <div className="space-y-3">
                {certs.map((cert, index) => (
                  <div key={index} className="border-l-2 border-theme-fg pl-4 py-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-theme-fg">{cert.name}</p>
                        <p className="text-xs text-theme-fg-muted mt-0.5">{cert.issuer}</p>
                        <p className="text-xs text-theme-muted mt-1">{cert.description}</p>
                      </div>
                      <span className="text-xs font-semibold text-theme-accent-fg bg-theme-accent px-2 py-1 rounded whitespace-nowrap">
                        {cert.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* right part */}
          <div className="space-y-6">
            {edu.map((item, index) => (
              <div key={index} className="bg-theme-bg border border-theme-border rounded-2xl p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    {index < 2 ? (
                      <PiGraduationCapBold size={24} className="text-theme-fg-muted mt-1" />
                    ) : (
                      <PiBookOpenBold size={24} className="text-theme-fg-muted mt-1" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-theme-fg">{item.degree}</h3>
                      <p className="text-base font-semibold text-theme-fg-muted mt-1">{item.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-theme-surface rounded-full text-xs font-medium text-theme-fg-muted">
                      <PiCalendarBold size={14} />{item.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-theme-surface rounded-full text-xs font-medium text-theme-fg-muted">
                      <PiMapPinBold size={14} />{item.location}
                    </span>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      item.inProgress
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {item.inProgress ? t("status_in_progress") : t("status_completed")}
                    </span>
                  </div>

                  <p className="text-sm text-theme-fg-muted leading-relaxed">{item.description}</p>

                  <div>
                    <p className="text-xs font-semibold text-theme-muted uppercase tracking-wide mb-2">
                      {t("highlights")}
                    </p>
                    <ul className="space-y-1.5">
                      {item.highlights.map((highlight, i) => (
                        <li key={i} className="text-sm text-theme-fg-muted flex items-start gap-2">
                          <span className="text-theme-fg mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* timeline */}
        <div className="mt-12 bg-theme-bg border border-theme-border rounded-2xl p-6">
          <h3 className="text-xl font-bold text-theme-fg mb-4">{t("timeline_title")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-theme-surface rounded-xl">
              <p className="text-2xl font-bold text-theme-fg">2015</p>
              <p className="text-sm text-theme-muted mt-1">{t("timeline_started")}</p>
            </div>
            <div className="text-center p-4 bg-theme-surface rounded-xl">
              <p className="text-2xl font-bold text-theme-fg">2023</p>
              <p className="text-sm text-theme-muted mt-1">{t("timeline_freelance")}</p>
            </div>
            <div className="text-center p-4 bg-theme-surface rounded-xl">
              <p className="text-2xl font-bold text-theme-fg">2025</p>
              <p className="text-sm text-theme-muted mt-1">{t("timeline_puc_btg")}</p>
            </div>
            <div className="text-center p-4 bg-theme-accent rounded-xl">
              <p className="text-2xl font-bold text-theme-accent-fg">2028</p>
              <p className="text-sm text-theme-accent-fg opacity-70 mt-1">{t("timeline_graduation")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
