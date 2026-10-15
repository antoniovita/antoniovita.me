"use client";

import dynamic from "next/dynamic";

/** The globe loads after the page, so it never delays the first paint. */
const GlobeLazy = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => (
    <div className="relative aspect-square w-full">
      <div className="absolute inset-[7%] rounded-full border border-line bg-[radial-gradient(circle_at_35%_30%,var(--surface),var(--bg))]" />
    </div>
  ),
});

export default GlobeLazy;
