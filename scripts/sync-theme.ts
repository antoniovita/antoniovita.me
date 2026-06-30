import fs from "fs";
import path from "path";

const theme = JSON.parse(
  fs.readFileSync(path.resolve("data/theme.json"), "utf-8")
) as Record<string, Record<string, { value: string }>>;

// Build @theme block (registers Tailwind classes like bg-dark-bg, bg-theme-bg, etc.)
const themeLines: string[] = ["@theme {"];
for (const [mode, tokens] of Object.entries(theme)) {
  themeLines.push(`  /* ${mode} */`);
  for (const [name, token] of Object.entries(tokens)) {
    themeLines.push(`  --color-${mode}-${name}: ${token.value};`);
  }
  themeLines.push("");
}
// Semantic aliases that point to CSS vars (change with theme)
themeLines.push("  /* semantic aliases */");
for (const name of Object.keys(theme.light)) {
  themeLines.push(`  --color-theme-${name}: var(--theme-${name});`);
}
themeLines.push("}");

// Build :root + .dark CSS variable blocks
const rootLines: string[] = [":root {"];
for (const [name, token] of Object.entries(theme.light)) {
  rootLines.push(`  --theme-${name}: ${token.value};`);
}
rootLines.push("}");

const darkLines: string[] = [".dark {"];
for (const [name, token] of Object.entries(theme.dark)) {
  darkLines.push(`  --theme-${name}: ${token.value};`);
}
darkLines.push("}");

const block = [
  themeLines.join("\n"),
  rootLines.join("\n"),
  darkLines.join("\n"),
].join("\n\n");

const cssPath = path.resolve("app/globals.css");
let css = fs.readFileSync(cssPath, "utf-8");

const marker = /\/\* theme-tokens-start \*\/[\s\S]*?\/\* theme-tokens-end \*\//;
const wrapped = `/* theme-tokens-start */\n${block}\n/* theme-tokens-end */`;

if (marker.test(css)) {
  css = css.replace(marker, wrapped);
} else {
  css = css + "\n" + wrapped + "\n";
}

fs.writeFileSync(cssPath, css);
console.log("✔ theme tokens synced to globals.css");
