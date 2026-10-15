"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { CASE_FILM, CaseFilm } from "@/remotion/CaseFilm";
import type { FeaturedSlug } from "@/data/content";
import type { Locale } from "@/data/site";
import { currentTheme, subscribeTheme, type Theme } from "@/lib/theme";

const serverTheme = (): Theme => "light";

export default function CasePlayerView({ slug, locale }: { slug: FeaturedSlug; locale: Locale }) {
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, serverTheme);
  const playerRef = useRef<PlayerRef>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Play once the film scrolls into view; reduced motion keeps the finished diagram.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reduced) return;
    let played = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          played = true;
          playerRef.current?.seekTo(0);
          playerRef.current?.play();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div ref={wrapRef} className="overflow-hidden rounded-[18px] bg-raised">
      <Player
        ref={playerRef}
        component={CaseFilm}
        inputProps={{ slug, locale, theme }}
        durationInFrames={CASE_FILM.durationInFrames}
        fps={CASE_FILM.fps}
        compositionWidth={CASE_FILM.width}
        compositionHeight={CASE_FILM.height}
        initialFrame={CASE_FILM.durationInFrames - 1}
        controls
        clickToPlay
        style={{ width: "100%", aspectRatio: `${CASE_FILM.width} / ${CASE_FILM.height}` }}
      />
    </div>
  );
}
