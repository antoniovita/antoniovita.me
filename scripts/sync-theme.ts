import fs from "fs";
import path from "path";

// data/theme.json holds two token sets: "light" (the default, on :root) and "dark"
// (applied with <html data-theme="dark">). This script writes them into
// app/globals.css between the theme-tokens markers, plus the Tailwind aliases
// (bg-surface, text-dim, border-line, …) that point at the CSS variables.

type Tokens = Record<string, { value: string; description?: string }>;

const theme = JSON.parse(fs.readFileSync(path.resolve("data/theme.json"), "utf-8")) as {
  dark: Tokens;
  light: Tokens;
};

const vars = (tokens: Tokens) =>
  Object.entries(tokens).map(([name, token]) => `  --${name}: ${token.value};`);

const block = [
  ":root {",
  ...vars(theme.light),
  "  color-scheme: light;",
  "}",
  "",
  ':root[data-theme="dark"] {',
  ...vars(theme.dark),
  "  color-scheme: dark;",
  "}",
  "",
  "@theme inline {",
  ...Object.keys(theme.light).map((name) => `  --color-${name}: var(--${name});`),
  "}",
].join("\n");

const cssPath = path.resolve("app/globals.css");
let css = fs.readFileSync(cssPath, "utf-8");

const marker = /\/\* theme-tokens-start \*\/[\s\S]*?\/\* theme-tokens-end \*\//;
const wrapped = `/* theme-tokens-start */\n${block}\n/* theme-tokens-end */`;

css = marker.test(css) ? css.replace(marker, wrapped) : `${css}\n${wrapped}\n`;

fs.writeFileSync(cssPath, css);
console.log("✔ theme tokens synced to globals.css");
