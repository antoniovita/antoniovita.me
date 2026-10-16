/**
 * Renders the Remotion media the site serves as static files:
 *   public/media/genesis.{webm,mp4,jpg}            hero portrait film + poster of the last frame (720×900)
 *   public/og/<locale>/<page>.png                  Open Graph images (1200×630)
 *
 *   npm run media                 everything
 *   npm run media -- --only=genesis
 *   npm run media -- --only=og
 *   npm run media -- --locale=pt  (OG images for one locale; combinable with --only)
 *
 * Relative imports only: this file and remotion/ are not compiled by Next, so "@/..." does not resolve.
 */
import fs from "node:fs";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import {
  ensureBrowser,
  openBrowser,
  renderMedia,
  renderStill,
  selectComposition,
  type Codec,
} from "@remotion/renderer";
import { featuredSlugs } from "../data/content";
import { locales, type Locale } from "../data/site";

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const mediaDir = path.join(publicDir, "media");
const ogDir = path.join(publicDir, "og");

const OG_PAGES = ["home", "work", "articles", "now", "about", "contact", ...featuredSlugs];

// Genesis is 1080×1350; the site only needs 720×900.
const GENESIS_SCALE = 720 / 1080;
const VIDEO_FORMATS: { ext: string; codec: Codec; crf: number }[] = [
  { ext: "webm", codec: "vp9", crf: 30 },
  { ext: "mp4", codec: "h264", crf: 21 },
];

type Target = "genesis" | "og";

const args = process.argv.slice(2);
const arg = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];

const only = arg("only");
if (only && only !== "genesis" && only !== "og") {
  throw new Error(`--only must be "genesis" or "og", got "${only}"`);
}
const targets: Target[] = only ? [only as Target] : ["genesis", "og"];

const localeArg = arg("locale");
if (localeArg && !(locales as readonly string[]).includes(localeArg)) {
  throw new Error(`--locale must be one of ${locales.join(", ")}, got "${localeArg}"`);
}
const selectedLocales: readonly Locale[] = localeArg ? [localeArg as Locale] : locales;

const seconds = (since: number) => `${((Date.now() - since) / 1000).toFixed(1)}s`;
const size = (file: string) => `${(fs.statSync(file).size / 1024).toFixed(0)} KB`;
const rel = (file: string) => path.relative(root, file);

async function main() {
  const startedAt = Date.now();

  console.log("Bundling remotion/index.ts…");
  let lastBundleLog = -1;
  const serveUrl = await bundle({
    entryPoint: path.join(root, "remotion", "index.ts"),
    publicDir,
    onProgress: (p) => {
      if (p >= lastBundleLog + 25 || p === 100) {
        lastBundleLog = p;
        console.log(`  bundle ${p}%`);
      }
    },
  });
  console.log(`Bundled in ${seconds(startedAt)}`);

  await ensureBrowser();
  const browser = await openBrowser("chrome");

  try {
    if (targets.includes("genesis")) {
      // Locale-independent: rendered once.
      fs.mkdirSync(mediaDir, { recursive: true });
      const inputProps = {};
      const composition = await selectComposition({ serveUrl, id: "Genesis", inputProps, puppeteerInstance: browser });

      for (const { ext, codec, crf } of VIDEO_FORMATS) {
        const out = path.join(mediaDir, `genesis.${ext}`);
        const t = Date.now();
        let lastLog = -1;
        await renderMedia({
          serveUrl,
          composition,
          inputProps,
          codec,
          crf,
          outputLocation: out,
          scale: GENESIS_SCALE,
          muted: true,
          imageFormat: "jpeg",
          jpegQuality: 92,
          x264Preset: codec === "h264" ? "slow" : undefined,
          puppeteerInstance: browser,
          onProgress: ({ progress }) => {
            const pct = Math.floor(progress * 100);
            if (pct >= lastLog + 20) {
              lastLog = pct;
              console.log(`  ${rel(out)} ${pct}%`);
            }
          },
        });
        console.log(`✔ ${rel(out)}  ${size(out)}  (${seconds(t)})`);
      }

      const poster = path.join(mediaDir, "genesis.jpg");
      const t = Date.now();
      await renderStill({
        serveUrl,
        composition,
        inputProps,
        frame: composition.durationInFrames - 1,
        output: poster,
        imageFormat: "jpeg",
        jpegQuality: 86,
        scale: GENESIS_SCALE,
        puppeteerInstance: browser,
      });
      console.log(`✔ ${rel(poster)}  ${size(poster)}  (${seconds(t)})`);
    }

    if (targets.includes("og")) {
      for (const locale of selectedLocales) {
        fs.mkdirSync(path.join(ogDir, locale), { recursive: true });
        for (const page of OG_PAGES) {
          const inputProps = { page, locale };
          const composition = await selectComposition({ serveUrl, id: "OgStill", inputProps, puppeteerInstance: browser });
          const out = path.join(ogDir, locale, `${page}.png`);
          const t = Date.now();
          await renderStill({
            serveUrl,
            composition,
            inputProps,
            output: out,
            imageFormat: "png",
            puppeteerInstance: browser,
          });
          console.log(`✔ ${rel(out)}  ${size(out)}  (${seconds(t)})`);
        }
      }
    }
  } finally {
    await browser.close({ silent: true });
  }

  console.log(`Done in ${seconds(startedAt)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
