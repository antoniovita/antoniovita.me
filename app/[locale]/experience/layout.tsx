import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience and academic background of Antonio Vita — Software Engineer Intern at Parfin, former Automation Intern at BTG Pactual, and Computer Science student at PUC-Rio.",
  openGraph: {
    title: "Experience | Antonio Vita",
    description:
      "Antonio Vita's professional journey: internships at Parfin and BTG Pactual, Computer Science at PUC-Rio, and DeFi specialization at Duke University.",
    url: "https://antoniovita.me/experience",
  },
  twitter: {
    title: "Experience | Antonio Vita",
    description:
      "Antonio Vita's professional journey: internships at Parfin and BTG Pactual, Computer Science at PUC-Rio, and DeFi specialization at Duke University.",
  },
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
