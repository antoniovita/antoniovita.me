import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated collection of Full Stack, Web3, AI/ML, and mobile projects by Antonio Vita — showcasing smart contracts, dApps, and modern web applications.",
  openGraph: {
    title: "Projects | Antonio Vita",
    description:
      "Explore Antonio Vita's portfolio: smart contracts, DeFi protocols, full-stack web apps, and mobile applications.",
    url: "https://antoniovita.me/projects",
  },
  twitter: {
    title: "Projects | Antonio Vita",
    description:
      "Explore Antonio Vita's portfolio: smart contracts, DeFi protocols, full-stack web apps, and mobile applications.",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
