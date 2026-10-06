import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import RouteDelayGate from "@/components/RouteDelayGate";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://antoniovita.me"),
  title: {
    default: "Antonio Vita — Full Stack & Web3 Engineer",
    template: "%s | Antonio Vita",
  },
  description:
    "Full Stack and Web3 Engineer specializing in smart contracts, dApps, and modern web applications. Computer Science student at PUC-Rio with a merit scholarship.",
  keywords: [
    "Antonio Vita",
    "Full Stack Engineer",
    "Web3 Developer",
    "Smart Contracts",
    "Solidity",
    "Next.js",
    "React",
    "TypeScript",
    "DeFi",
    "Blockchain",
  ],
  authors: [{ name: "Antonio Vita" }],
  creator: "Antonio Vita",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://antoniovita.me",
    siteName: "Antonio Vita",
    title: "Antonio Vita — Full Stack & Web3 Engineer",
    description:
      "Full Stack and Web3 Engineer specializing in smart contracts, dApps, and modern web applications.",
    images: [{ url: "/me.jpeg", width: 800, height: 600, alt: "Antonio Vita" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antonio Vita — Full Stack & Web3 Engineer",
    description:
      "Full Stack and Web3 Engineer specializing in smart contracts, dApps, and modern web applications.",
    images: ["/me.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "pt" | "it")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const envDelay = process.env.NEXT_PUBLIC_GLOBAL_DELAY_MS;
  const delayMs = Number.isFinite(Number(envDelay)) ? Number(envDelay) : 3000;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased bg-white text-black`}>
        <NextIntlClientProvider messages={messages}>
          <NavBar />
          <RouteDelayGate delayMs={delayMs} showOnRouteChange={false} />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
