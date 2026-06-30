"use client";
import {
  PiGraduationCapBold,
  PiCodeBold,
  PiRocketLaunchBold,
  PiLightbulbBold,
  PiBookOpenBold,
  PiBriefcaseBold,
  PiGlobeBold,
} from "react-icons/pi";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiSolidity,
  SiPython,
  SiSpringboot,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";
import { useTranslations } from "next-intl";

const techStack = [
  { icon: <SiNextdotjs size={22} />, name: "Next.js" },
  { icon: <SiReact size={22} />, name: "React" },
  { icon: <SiTypescript size={22} />, name: "TypeScript" },
  { icon: <SiTailwindcss size={22} />, name: "Tailwind" },
  { icon: <SiSolidity size={22} />, name: "Solidity" },
  { icon: <SiPython size={22} />, name: "Python" },
  { icon: <SiSpringboot size={22} />, name: "Spring Boot" },
  { icon: <SiNodedotjs size={22} />, name: "Node.js" },
  { icon: <SiPostgresql size={22} />, name: "PostgreSQL" },
  { icon: <SiDocker size={22} />, name: "Docker" },
];

const About = () => {
  const t = useTranslations("about");

  const timelineEvents = [
    { year: "2017", title: t("timeline.2017_title"), description: t("timeline.2017_desc"), icon: <PiLightbulbBold size={20} /> },
    { year: "2019", title: t("timeline.2019_title"), description: t("timeline.2019_desc"), icon: <PiCodeBold size={20} /> },
    { year: "2020", title: t("timeline.2020_title"), description: t("timeline.2020_desc"), icon: <PiRocketLaunchBold size={20} /> },
    { year: "2023", title: t("timeline.2023_title"), description: t("timeline.2023_desc"), icon: <PiCodeBold size={20} /> },
    { year: "2024", title: t("timeline.2024_title"), description: t("timeline.2024_desc"), icon: <PiGraduationCapBold size={20} /> },
    { year: "2025", title: t("timeline.2025a_title"), description: t("timeline.2025a_desc"), icon: <PiBookOpenBold size={20} /> },
    { year: "2025", title: t("timeline.2025b_title"), description: t("timeline.2025b_desc"), icon: <PiBriefcaseBold size={20} /> },
    { year: "2025", title: t("timeline.2025c_title"), description: t("timeline.2025c_desc"), icon: <PiBookOpenBold size={20} /> },
    { year: "2026", title: t("timeline.2026_title"), description: t("timeline.2026_desc"), icon: <PiBriefcaseBold size={20} /> },
  ];

  const languages = [
    { name: t("languages.portuguese"), level: "Native", percentage: 100 },
    { name: t("languages.english"), level: "C1", percentage: 90 },
    { name: t("languages.italian"), level: "C1", percentage: 90 },
    { name: t("languages.spanish"), level: "B2", percentage: 70 },
    { name: t("languages.french"), level: "B1", percentage: 60 },
  ];

  const expertise = [
    { title: t("expertise.frontend_title"), stack: t("expertise.frontend_stack") },
    { title: t("expertise.backend_title"), stack: t("expertise.backend_stack") },
    { title: t("expertise.contracts_title"), stack: t("expertise.contracts_stack") },
    { title: t("expertise.uiux_title"), stack: t("expertise.uiux_stack") },
  ];

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

          {/* left */}
          <div className="space-y-8">

            {/* story */}
            <div className="bg-theme-bg border border-theme-border rounded-2xl p-6 space-y-4">
              <p className="text-xs font-semibold text-theme-muted uppercase tracking-wide">{t("background_label")}</p>
              <div className="space-y-4 text-sm text-theme-fg-muted leading-relaxed">
                <p>{t("background_p1")}</p>
                <p>{t("background_p2")}</p>
                <p>{t("background_p3")}</p>
              </div>
            </div>

            {/* expertise */}
            <div className="bg-theme-bg border border-theme-border rounded-2xl p-6">
              <p className="text-xs font-semibold text-theme-muted uppercase tracking-wide mb-4">{t("expertise_label")}</p>
              <div className="grid grid-cols-2 gap-3">
                {expertise.map((item) => (
                  <div key={item.title} className="p-4 bg-theme-surface border border-theme-border rounded-xl transition-colors">
                    <p className="text-sm font-semibold text-theme-fg">{item.title}</p>
                    <p className="text-xs text-theme-muted mt-1">{item.stack}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* tech stack */}
            <div className="bg-theme-bg border border-theme-border rounded-2xl p-6">
              <p className="text-xs font-semibold text-theme-muted uppercase tracking-wide mb-4">{t("tech_stack_label")}</p>
              <div className="grid grid-cols-5 gap-3">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex flex-col items-center gap-1.5 p-3 bg-theme-surface border border-theme-border rounded-xl hover:bg-theme-elevated transition-all group"
                  >
                    <span className="text-theme-fg-muted group-hover:text-theme-fg transition-colors">{tech.icon}</span>
                    <span className="text-[10px] font-medium text-theme-muted group-hover:text-theme-fg-muted transition-colors text-center leading-tight">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* languages */}
            <div className="bg-theme-bg border border-theme-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <PiGlobeBold size={18} className="text-theme-fg-muted" />
                <p className="text-xs font-semibold text-theme-muted uppercase tracking-wide">{t("languages_label")}</p>
              </div>
              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.name} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-theme-fg">{lang.name}</span>
                      <span className="text-xs font-semibold text-theme-fg-muted bg-theme-surface px-2 py-0.5 rounded">
                        {lang.level}
                      </span>
                    </div>
                    <div className="w-full bg-theme-surface rounded-full h-1.5">
                      <div
                        className="bg-theme-fg h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* right — timeline */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-theme-muted uppercase tracking-wide mb-2">{t("timeline_label")}</p>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-theme-border" />
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-theme-accent text-theme-accent-fg flex items-center justify-center">
                      {event.icon}
                    </div>
                    <div className="bg-theme-bg border border-theme-border rounded-xl p-4 transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-theme-accent-fg bg-theme-accent px-2 py-0.5 rounded">
                          {event.year}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-theme-fg mb-1">{event.title}</h3>
                      <p className="text-xs text-theme-fg-muted leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
