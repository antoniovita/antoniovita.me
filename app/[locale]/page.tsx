"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import {
  PiMapPinBold,
  PiBriefcaseBold,
  PiGraduationCapBold,
  PiBookOpenBold,
  PiInstagramLogo,
  PiFileArrowDownBold,
  PiArrowRightBold,
  PiGithubLogo,
  PiLinkedinLogo,
  PiMedalBold,
} from "react-icons/pi";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { projects } from "@/data/projects";
import { projects as projectsPt } from "@/data/projects.pt";
import { projects as projectsIt } from "@/data/projects.it";

export default function Home() {
  const t = useTranslations("home");
  const locale = useLocale();
  const allProjects = locale === "pt" ? projectsPt : locale === "it" ? projectsIt : projects;
  const featuredProjects = allProjects.slice(0, 3);

  return (
    <div className="flex justify-center items-center min-h-screen pt-4 md:pt-8">
      <div className="w-[90%] max-w-7xl border-theme-border border-dashed px-4 md:px-6 border-l border-r">

        {/* main section */}
        <div className="flex flex-col lg:grid mt-20 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* left */}
          <div className="flex flex-col justify-center space-y-6 lg:col-start-1 lg:row-start-1">

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-theme-accent text-theme-accent-fg rounded-full text-xs">
                <PiMapPinBold size={16} />
                {t("location_badge")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-theme-accent text-theme-accent-fg rounded-full text-xs">
                <PiBriefcaseBold size={16} />
                {t("role_badge")}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-theme-muted uppercase tracking-wide font-medium">
                {t("subtitle")}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-fg">
                Antonio Vita
              </h1>
            </div>

            <p className="text-md text-theme-fg-muted leading-relaxed">
              {t("bio")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center">
                <span className="text-sm font-medium">📝 {t("trait_web3")}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">💻 {t("trait_fullstack")}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">🎓 {t("trait_scholarship")}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">🌎 {t("trait_remote")}</span>
              </div>
            </div>

            {/* action buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Link className="inline-flex hover:cursor-pointer text-sm items-center gap-2 px-6 py-3 bg-theme-accent text-theme-accent-fg rounded-xl hover:opacity-80 transition-colors font-medium" href={`/${locale}/projects`}>
                <PiBookOpenBold size={18} />
                {t("view_projects")}
                <PiArrowRightBold />
              </Link>
              <a className="inline-flex text-sm hover:cursor-pointer items-center gap-2 px-6 py-3 border-2 border-theme-border rounded-xl hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors font-medium"
                href="/cv.pdf"
                download
              >
                <PiFileArrowDownBold size={18} />
                {t("download_cv")}
              </a>
            </div>

            {/* profile image — sits right below the action buttons on mobile */}
            <div className="flex justify-center lg:hidden">
              <div className="relative w-full max-w-md">
                <div className="relative bg-linear-to-br from-gray-100 to-gray-200 dark:from-dark-elevated dark:to-dark-surface rounded-3xl overflow-hidden aspect-3/4 flex items-center justify-center">
                  <Image
                    src="/me.jpeg"
                    alt="Antonio Vita — Full Stack & Web3 Engineer"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>

            {/* social */}
            <div className="pt-4 space-y-3">
              <p className="text-sm text-theme-muted font-medium">{t("social_media")}</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.instagram.com/defi.institute/" className="inline-flex items-center gap-2 px-4 py-2 bg-theme-surface border border-theme-border rounded-lg hover:bg-theme-elevated transition-colors text-sm">
                  <PiInstagramLogo size={20} />defi.institute
                </a>
                <a href="https://github.com/antoniovita" className="inline-flex items-center gap-2 px-4 py-2 bg-theme-surface border border-theme-border rounded-lg hover:bg-theme-elevated transition-colors text-sm">
                  <PiGithubLogo size={20} />antoniovita
                </a>
                <a href="https://www.linkedin.com/in/antonio-vita-6177922b7/" className="inline-flex items-center gap-2 px-4 py-2 bg-theme-surface border border-theme-border rounded-lg hover:bg-theme-elevated transition-colors text-sm">
                  <PiLinkedinLogo size={20} />Antonio Vita
                </a>
              </div>
            </div>

            {/* experience */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-theme-muted font-medium">{t("experience_label")}</p>
                <Link href={`/${locale}/experience`} className="inline-flex items-center gap-2 text-xs ml-2 font-medium text-theme-fg hover:text-theme-muted transition-colors">
                  {t("view_more")}<PiArrowRightBold size={16} />
                </Link>
              </div>
              <div className="flex items-start gap-3 p-4 bg-theme-surface border border-theme-border rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-theme-fg">{t("btg_title")}</p>
                  <p className="text-xs text-theme-muted">{t("btg_period")}</p>
                  <p className="text-sm text-theme-fg-muted mt-1">{t("btg_desc")}</p>
                </div>
              </div>
            </div>

            {/* education */}
            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-theme-muted font-medium">{t("education_label")}</p>
                <Link href={`/${locale}/experience`} className="inline-flex items-center gap-2 text-xs font-medium text-theme-fg hover:text-theme-muted transition-colors">
                  {t("view_more")}<PiArrowRightBold size={16} />
                </Link>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-theme-surface border border-theme-border rounded-xl">
                  <PiGraduationCapBold size={22} className="text-theme-fg-muted mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-theme-fg">{t("cs_degree")}</p>
                    <p className="text-xs text-theme-muted">{t("puc_period")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-theme-surface border border-theme-border rounded-xl">
                  <PiMedalBold size={22} className="text-theme-fg-muted mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-theme-fg">{t("cambridge")}</p>
                    <p className="text-xs text-theme-muted">{t("cambridge_period")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="flex flex-col items-center lg:items-end space-y-6 lg:col-start-2 lg:row-start-1 lg:pt-4">

            {/* profile image — desktop only, mobile copy lives right below Download CV */}
            <div className="hidden lg:flex lg:justify-end w-full">
              <div className="relative w-full max-w-md">
                <div className="relative bg-linear-to-br from-gray-100 to-gray-200 dark:from-dark-elevated dark:to-dark-surface rounded-3xl overflow-hidden aspect-3/4 flex items-center justify-center">
                  <Image
                    src="/me.jpeg"
                    alt="Antonio Vita — Full Stack & Web3 Engineer"
                    fill
                    priority
                    className="object-cover"
                    sizes="28rem"
                  />
                </div>
              </div>
            </div>

            {/* stats */}
            <div className="grid grid-cols-1 gap-3 w-full max-w-md">
              <div className="bg-theme-surface border border-theme-border rounded-2xl p-5">
                <p className="text-xs text-theme-muted uppercase tracking-wide font-medium mb-1">{t("currently_label")}</p>
                <p className="text-sm font-bold text-theme-fg">{t("currently_role")}</p>
                <p className="text-xs text-theme-muted mt-0.5">{t("currently_desc")}</p>
              </div>
              <div className="bg-theme-surface border border-theme-border rounded-2xl p-5">
                <p className="text-xs text-theme-muted uppercase tracking-wide font-medium mb-1">{t("education_label")}</p>
                <p className="text-sm font-bold text-theme-fg">{t("education_degree")}</p>
                <p className="text-xs text-theme-muted mt-0.5">{t("education_desc")}</p>
              </div>
              <div className="bg-theme-accent rounded-2xl p-5">
                <p className="text-xs text-theme-accent-fg/60 uppercase tracking-wide font-medium mb-1">{t("specialization_label")}</p>
                <p className="text-sm font-bold text-theme-accent-fg">{t("specialization_title")}</p>
                <p className="text-xs text-theme-accent-fg/60 mt-0.5">{t("specialization_desc")}</p>
              </div>
            </div>

            {/* projects carousel */}
            <div className="w-full max-w-md pb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-theme-muted font-medium">{t("projects_label")}</p>
                <Link href={`/${locale}/projects`} className="inline-flex items-center gap-2 text-xs font-medium text-theme-fg hover:text-theme-muted transition-colors">
                  {t("view_more")}<PiArrowRightBold size={16} />
                </Link>
              </div>
              <div className="bg-theme-surface border border-theme-border rounded-2xl p-4">
                <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} spaceBetween={12} slidesPerView={1} className="w-full">
                  {featuredProjects.map((project) => (
                    <SwiperSlide key={project.title}>
                      <div className="rounded-xl border border-theme-border p-4">
                        <p className="text-sm font-semibold text-theme-fg">{project.title}</p>
                        <p className="text-xs text-theme-muted mt-1">{project.technologies.slice(0, 3).join(" • ")}</p>
                        <p className="text-sm text-theme-fg-muted mt-2">{project.description}</p>
                        <div className="flex items-center gap-2 mt-4">
                          {project.github !== "#" && (
                            <a href={project.github} className="inline-flex items-center gap-2 text-xs px-3 py-2 border border-theme-border rounded-lg hover:bg-theme-elevated transition-colors">
                              <PiGithubLogo size={16} />{t("code")}
                            </a>
                          )}
                          <Link href={`/${locale}/projects`} className="inline-flex items-center gap-2 text-xs px-3 py-2 bg-theme-accent text-theme-accent-fg rounded-lg hover:opacity-80 transition-colors">
                            {t("view_details")}<PiArrowRightBold size={14} />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
