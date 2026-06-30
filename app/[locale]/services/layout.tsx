import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Freelance software development services by Antonio Vita — Full Stack web apps, mobile apps, dApps, smart contracts, and landing pages. Clear pricing and delivery timelines.",
  openGraph: {
    title: "Services | Antonio Vita",
    description:
      "Hire Antonio Vita for Full Stack, Web3, and mobile development. Smart contracts, dApps, web apps, and landing pages with clear pricing.",
    url: "https://antoniovita.dev/services",
  },
  twitter: {
    title: "Services | Antonio Vita",
    description:
      "Hire Antonio Vita for Full Stack, Web3, and mobile development. Smart contracts, dApps, web apps, and landing pages with clear pricing.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
