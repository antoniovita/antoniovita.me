import type React from "react";
import { AbsoluteFill } from "remotion";
import { cases } from "../data/cases";
import { featuredSlugs, getProject, splitTitle, type FeaturedSlug } from "../data/content";
import type { Locale } from "../data/site";
import en from "../messages/en.json";
import it from "../messages/it.json";
import pt from "../messages/pt.json";
import { Grifo, Signature } from "./brand";
import { DISPLAY_TRACKING, fonts } from "./fonts";

export type OgStillProps = { page: string; locale: Locale };

export const OG_STILL = { width: 1200, height: 630 } as const;

export const ogPages = ["home", "work", "articles", "now", "about", "contact"] as const;
type OgPage = (typeof ogPages)[number];

type Messages = {
  meta: Record<OgPage, { title: string; description: string }>;
  home: { tagline: string };
};

const messages: Record<Locale, Messages> = { en, pt, it };

const isFeatured = (page: string): page is FeaturedSlug => (featuredSlugs as readonly string[]).includes(page);
const isOgPage = (page: string): page is OgPage => (ogPages as readonly string[]).includes(page);

const describe = (page: string, locale: Locale): { title: string; subtitle: string; path: string } => {
  const m = messages[locale];
  if (isFeatured(page)) {
    const project = getProject(locale, page);
    return {
      title: project ? splitTitle(project.title).name : page,
      subtitle: cases[page].tagline[locale],
      path: `work/${page}`,
    };
  }
  if (page === "home") return { title: "Antonio Vita", subtitle: m.home.tagline, path: "" };
  if (isOgPage(page)) return { title: m.meta[page].title, subtitle: m.meta[page].description, path: page };
  return { title: page, subtitle: "", path: page };
};

const PAD = 64;

/** Monochrome: white page, black ink. */
const og = {
  bg: "#FFFFFF",
  ink: "#0A0A0A",
  dim: "#5E5E5E",
  line: "#E3E3E3",
} as const;

/** Grifo on the last word of the title; for a single word that is the whole title. */
const HighlightLastWord: React.FC<{ text: string }> = ({ text }) => {
  const i = text.lastIndexOf(" ");
  if (i < 0) return <Grifo>{text}</Grifo>;
  return (
    <>
      {text.slice(0, i + 1)}
      <Grifo>{text.slice(i + 1)}</Grifo>
    </>
  );
};

export const OgStill: React.FC<OgStillProps> = ({ page, locale }) => {
  const { title, subtitle, path } = describe(page, locale);
  // Shrink very long titles so they always fit on one line.
  const titleSize = Math.min(128, Math.floor(1040 / Math.max(1, title.length * 0.58 + 0.3)));

  return (
    <AbsoluteFill style={{ backgroundColor: og.bg, color: og.ink, overflow: "hidden" }}>
      <Signature width={250} color={og.ink} style={{ position: "absolute", left: PAD - 6, top: 50 }} />
      <div
        style={{
          position: "absolute",
          right: PAD,
          top: 72,
          fontFamily: fonts.mono,
          fontSize: 24,
          color: og.dim,
          letterSpacing: "0.01em",
        }}
      >
        antoniovita.me
      </div>
      <div style={{ position: "absolute", left: PAD, top: 178, right: PAD }}>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: titleSize,
            lineHeight: 1,
            letterSpacing: DISPLAY_TRACKING,
            whiteSpace: "nowrap",
          }}
        >
          <HighlightLastWord text={title} />
        </div>
        {subtitle ? (
          <div
            style={{
              marginTop: 30,
              maxWidth: 820,
              fontFamily: fonts.sans,
              fontSize: 36,
              lineHeight: 1.28,
              color: og.dim,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          left: PAD,
          bottom: 58,
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: fonts.mono,
        }}
      >
        <div
          style={{
            padding: "6px 14px",
            border: `2px solid ${og.line}`,
            borderRadius: 999,
            fontSize: 20,
            fontWeight: 500,
            color: og.ink,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {locale}
        </div>
        <div style={{ fontSize: 22, color: og.dim }}>{`antoniovita.me/${locale}/${path}`}</div>
      </div>
    </AbsoluteFill>
  );
};
