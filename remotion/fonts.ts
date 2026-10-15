import { loadFont as loadFunnelDisplay } from "@remotion/google-fonts/FunnelDisplay";
import { loadFont as loadFunnelSans } from "@remotion/google-fonts/FunnelSans";
import { loadFont as loadGeistMono } from "@remotion/google-fonts/GeistMono";

// Only the latin subset: it covers en/pt/it (accents included) plus "·", "×" and "—".
// Glyphs outside it (e.g. "✓") are drawn as SVG instead of relying on a fallback font.
const display = loadFunnelDisplay("normal", { weights: ["600", "700"], subsets: ["latin"] });
const sans = loadFunnelSans("normal", { weights: ["400", "500"], subsets: ["latin"] });
const mono = loadGeistMono("normal", { weights: ["400", "500"], subsets: ["latin"] });

export const fonts = {
  display: `"${display.fontFamily}", "Funnel Sans", system-ui, sans-serif`,
  sans: `"${sans.fontFamily}", system-ui, sans-serif`,
  mono: `"${mono.fontFamily}", ui-monospace, monospace`,
} as const;

/** Tight tracking used for every display title. */
export const DISPLAY_TRACKING = "-0.05em";
