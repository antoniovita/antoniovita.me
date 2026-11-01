import type { Locale } from "./site";
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
