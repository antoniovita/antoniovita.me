"use client";

import dynamic from "next/dynamic";
import type { FeaturedSlug } from "@/data/content";
import type { Locale } from "@/data/site";

/** Remotion only loads on case pages, after the rest of the page. */
const CasePlayerView = dynamic(() => import("./CasePlayerView"), {
  ssr: false,
  loading: () => <div className="aspect-video w-full rounded-[18px] bg-raised" />,
});

export default function CasePlayer(props: { slug: FeaturedSlug; locale: Locale }) {
  return <CasePlayerView {...props} />;
}
