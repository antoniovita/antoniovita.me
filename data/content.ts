import type { Locale } from "./site";
import { projects as projectsEn, type Project } from "./projects";
import { projects as projectsPt } from "./projects.pt";
import { projects as projectsIt } from "./projects.it";
import {
  experiences as experiencesEn,
  education as educationEn,
  certifications as certificationsEn,
} from "./experience";
import {
  experiences as experiencesPt,
  education as educationPt,
  certifications as certificationsPt,
} from "./experience.pt";
import {
  experiences as experiencesIt,
  education as educationIt,
  certifications as certificationsIt,
} from "./experience.it";

const projectsByLocale: Record<Locale, Project[]> = {
  en: projectsEn,
  pt: projectsPt,
  it: projectsIt,
};

export const featuredSlugs = ["fuoco", "dargent", "irsa"] as const;
export type FeaturedSlug = (typeof featuredSlugs)[number];

export function getProjects(locale: Locale): Project[] {
  return projectsByLocale[locale];
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return projectsByLocale[locale].find((p) => p.slug === slug);
}

export function getFeatured(locale: Locale): Project[] {
  return featuredSlugs.map((slug) => getProject(locale, slug)).filter((p): p is Project => Boolean(p));
}

export function getArchive(locale: Locale): Project[] {
  const featured = new Set<string>(featuredSlugs);
  return projectsByLocale[locale].filter((p) => !featured.has(p.slug));
}

/** "Dargent — On-Chain Fund Platform" → { name: "Dargent", subtitle: "On-Chain Fund Platform" } */
export function splitTitle(title: string): { name: string; subtitle?: string } {
  const match = title.match(/^(.+?)\s*(?:—|–|:|\s-\s)\s*(.+)$/);
  if (!match) return { name: title };
  return { name: match[1].trim(), subtitle: match[2].trim() };
}

export function getExperience(locale: Locale) {
  if (locale === "pt") return { experiences: experiencesPt, education: educationPt, certifications: certificationsPt };
  if (locale === "it") return { experiences: experiencesIt, education: educationIt, certifications: certificationsIt };
  return { experiences: experiencesEn, education: educationEn, certifications: certificationsEn };
}

export const stack = [
  "TypeScript",
  "Python",
  "Java",
  "React",
  "Next.js",
  "React Native",
  "NestJS",
  "Spring Boot",
  "FastAPI",
  "PostgreSQL",
  "AWS",
  "Solidity",
];
