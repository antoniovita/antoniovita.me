import { loadFont as loadIbmPlexMono } from "@remotion/google-fonts/IBMPlexMono";
import { loadFont as loadIbmPlexSans } from "@remotion/google-fonts/IBMPlexSans";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";

// Only the latin subset: it covers en/pt/it (accents included) plus "·", "×" and "—".
const display = loadSpaceGrotesk("normal", { weights: ["700"], subsets: ["latin"] });
const sans = loadIbmPlexSans("normal", { weights: ["400", "500"], subsets: ["latin"] });
const mono = loadIbmPlexMono("normal", { weights: ["500"], subsets: ["latin"] });

export const fonts = {
  /** Titles: Space Grotesk Bold. */
  display: `"${display.fontFamily}", system-ui, sans-serif`,
  /** Body: IBM Plex Sans 400/500. */
  sans: `"${sans.fontFamily}", system-ui, sans-serif`,
  /** Labels, data, URLs: IBM Plex Mono Medium. */
  mono: `"${mono.fontFamily}", ui-monospace, monospace`,
} as const;

/** Tracking for display titles (Space Grotesk is wider than the previous face). */
export const DISPLAY_TRACKING = "-0.04em";
