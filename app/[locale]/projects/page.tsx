"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  PiGithubLogo,
  PiXBold,
  PiStarBold,
  PiGitForkBold,
  PiCalendarBold,
} from "react-icons/pi";
import { projects, projectCategories, type Project } from "@/data/projects";
import { projects as projectsPt, projectCategories as categoriesPt } from "@/data/projects.pt";
import { projects as projectsIt, projectCategories as categoriesIt } from "@/data/projects.it";
import { useTranslations, useLocale } from "next-intl";

const Projects = () => {
  const t = useTranslations("projects");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const allProjects = locale === "pt" ? projectsPt : locale === "it" ? projectsIt : projects;
  const allCategories = locale === "pt" ? categoriesPt : locale === "it" ? categoriesIt : projectCategories;

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedProject(null); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const cat = searchParams.get("category");
    return cat && allCategories.includes(cat) ? cat : allCategories[0];
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== allCategories[0]) params.set("category", selectedCategory);
    const query = params.toString();
    router.replace(query ? `/${locale}/projects?${query}` : `/${locale}/projects`, { scroll: false });
  }, [selectedCategory, router, locale, allCategories]);

  const filteredProjects =
    selectedCategory === allCategories[0]
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory || selectedCategory === allCategories[0]);

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

          {/* categories */}
          <div className="flex flex-wrap gap-2 mt-6">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-theme-accent text-theme-accent-fg"
                    : "bg-theme-bg border border-theme-border text-theme-fg-muted hover:bg-theme-surface dark:hover:bg-dark-elevated"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                whileHover={{ opacity: 0.92, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                transition={{ duration: 0.25, delay: index * 0.04, ease: "easeOut" }}
                className="bg-theme-bg dark:bg-dark-surface border border-theme-border rounded-2xl overflow-hidden"
              >
                <div className="relative h-40 bg-linear-to-br from-theme-elevated to-theme-surface overflow-hidden">
                  <Image
                    width={800}
                    height={450}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 bg-theme-accent text-theme-accent-fg text-xs font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-theme-fg mb-1">{project.title}</h3>
                    <p className="text-xs text-theme-fg-muted leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-theme-muted">
                    <span className="flex items-center gap-1"><PiStarBold size={12} />{project.stars}</span>
                    <span className="flex items-center gap-1"><PiGitForkBold size={12} />{project.forks}</span>
                    <span className="flex items-center gap-1"><PiCalendarBold size={12} />{project.date}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 bg-theme-surface border border-theme-border rounded text-xs font-medium text-theme-fg-muted">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 text-xs font-medium text-theme-fg-subtle">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {project.github === "#" ? (
                      <span className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-theme-border rounded-lg text-xs font-medium text-theme-muted cursor-default select-none">
                        <PiGithubLogo size={16} />
                        {t("private")}
                      </span>
                    ) : (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-theme-border rounded-lg hover:bg-theme-surface dark:hover:bg-dark-elevated transition-colors text-xs font-medium text-theme-fg-muted"
                      >
                        <PiGithubLogo size={16} />
                        {t("code")}
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 hover:cursor-pointer py-2 bg-theme-accent text-theme-accent-fg rounded-lg hover:opacity-80 transition-opacity text-xs font-medium"
                    >
                      {t("view_details")}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="mt-12 bg-theme-bg border border-theme-border rounded-2xl p-6">
          <h3 className="text-xl font-bold text-theme-fg mb-4">{t("stats_title")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-theme-surface rounded-xl">
              <p className="text-3xl font-bold text-theme-fg">{allProjects.length}</p>
              <p className="text-sm text-theme-muted mt-1">{t("total_projects")}</p>
            </div>
            <div className="text-center p-4 bg-theme-surface rounded-xl">
              <p className="text-3xl font-bold text-theme-fg">
                {allProjects.reduce((sum, p) => sum + p.stars, 0)}
              </p>
              <p className="text-sm text-theme-muted mt-1">{t("github_stars")}</p>
            </div>
            <div className="text-center p-4 bg-theme-surface rounded-xl">
              <p className="text-3xl font-bold text-theme-fg">
                {allProjects.reduce((sum, p) => sum + p.forks, 0)}
              </p>
              <p className="text-sm text-theme-muted mt-1">{t("total_forks")}</p>
            </div>
            <div className="text-center p-4 bg-theme-accent rounded-xl">
              <p className="text-3xl font-bold text-theme-accent-fg">
                {new Set(allProjects.flatMap((p) => p.technologies)).size}
              </p>
              <p className="text-sm text-theme-accent-fg opacity-70 mt-1">{t("technologies_used")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-theme-bg rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="bg-theme-bg border-b border-theme-border p-6 flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-theme-fg mb-2">{selectedProject.title}</h2>
                  <span className="px-3 py-1 bg-theme-accent text-theme-accent-fg text-xs font-semibold rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-theme-surface dark:hover:bg-dark-elevated rounded-lg transition-colors text-theme-fg"
                >
                  <PiXBold size={24} />
                </button>
              </div>

              <div className="overflow-y-auto p-6 bg-theme-bg dark:bg-dark-surface">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="relative h-64 bg-linear-to-br from-theme-elevated to-theme-surface rounded-xl overflow-hidden">
                      <Image
                        src={selectedProject.image}
                        width={800}
                        height={450}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-theme-fg mb-2">{t("about")}</h3>
                      <p className="text-sm text-theme-fg-muted leading-relaxed">{selectedProject.longDescription}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-theme-fg mb-3">{t("technologies")}</h3>
                      <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap">
                        {selectedProject.technologies.map((tech, i) => (
                          <span key={i} className="px-3 py-1.5 bg-theme-surface border border-theme-border rounded-lg text-sm font-medium text-theme-fg-muted">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-theme-fg mb-3">{t("key_achievements")}</h3>
                      <ul className="space-y-2">
                        {selectedProject.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-theme-fg-muted flex items-start gap-2">
                            <span className="text-theme-fg mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-theme-border">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-theme-muted mb-1">
                      <PiStarBold size={16} />
                      <span className="text-xl font-bold text-theme-fg">{selectedProject.stars}</span>
                    </div>
                    <p className="text-xs text-theme-muted">{t("stars")}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-theme-muted mb-1">
                      <PiGitForkBold size={16} />
                      <span className="text-xl font-bold text-theme-fg">{selectedProject.forks}</span>
                    </div>
                    <p className="text-xs text-theme-muted">{t("forks")}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-theme-muted mb-1">
                      <PiCalendarBold size={16} />
                      <span className="text-xl font-bold text-theme-fg">{selectedProject.date}</span>
                    </div>
                    <p className="text-xs text-theme-muted">{t("year")}</p>
                  </div>
                </div>

                {selectedProject.github === "#" ? (
                  <span className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-theme-surface text-theme-muted rounded-lg font-medium cursor-default select-none">
                    <PiGithubLogo size={20} />
                    {t("private_repo")}
                  </span>
                ) : (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-theme-accent text-theme-accent-fg rounded-lg hover:opacity-80 transition-opacity font-medium"
                  >
                    <PiGithubLogo size={20} />
                    {t("view_github")}
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
