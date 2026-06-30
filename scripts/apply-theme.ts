import fs from "fs";
import path from "path";

const files = [
  "app/layout.tsx",
  "app/page.tsx",
  "app/not-found.tsx",
  "app/experience/page.tsx",
  "app/about/page.tsx",
  "app/projects/page.tsx",
  "app/services/page.tsx",
  "components/NavBar.tsx",
  "components/NavControls.tsx",
  "components/Footer.tsx",
];

// Order matters: longest/most-specific patterns first
const replacements: [RegExp, string][] = [
  // ── dark: hardcoded hex ──────────────────────────────────────────────────
  [/dark:bg-\[#000000\]\/80/g,          "dark:bg-dark-bg/80"],
  [/dark:bg-\[#000000\]/g,              "dark:bg-dark-bg"],
  [/dark:bg-\[#282828\]/g,              "dark:bg-dark-surface"],
  [/dark:bg-\[#4F4F4F\]/g,              "dark:bg-dark-elevated"],
  [/dark:border-\[#4F4F4F\]\/80/g,      "dark:border-dark-elevated/80"],
  [/dark:border-\[#4F4F4F\]/g,          "dark:border-dark-elevated"],
  [/dark:border-\[#777777\]/g,          "dark:border-dark-border"],
  [/dark:bg-\[#777777\]/g,              "dark:bg-dark-border"],
  [/dark:text-\[#777777\]/g,            "dark:text-dark-border"],
  [/dark:text-\[#9E9E9E\]/g,            "dark:text-dark-muted"],
  [/dark:hover:bg-\[#282828\]/g,        "dark:hover:bg-dark-surface"],
  [/dark:hover:bg-\[#4F4F4F\]/g,        "dark:hover:bg-dark-elevated"],

  // ── dark: Tailwind defaults ──────────────────────────────────────────────
  [/dark:bg-gray-950\/80/g,             "dark:bg-dark-bg/80"],
  [/dark:bg-gray-950/g,                 "dark:bg-dark-bg"],
  [/dark:bg-gray-900/g,                 "dark:bg-dark-surface"],
  [/dark:bg-gray-800/g,                 "dark:bg-dark-elevated"],
  [/dark:border-gray-800\/80/g,         "dark:border-dark-elevated/80"],
  [/dark:border-gray-800/g,             "dark:border-dark-elevated"],
  [/dark:border-gray-700/g,             "dark:border-dark-border"],
  [/dark:text-gray-200/g,               "dark:text-white"],
  [/dark:text-gray-300/g,               "dark:text-dark-muted"],
  [/dark:text-gray-400/g,               "dark:text-dark-muted"],
  [/dark:text-gray-500/g,               "dark:text-dark-muted"],
  [/dark:text-gray-600/g,               "dark:text-dark-muted"],
  [/dark:hover:bg-gray-950/g,           "dark:hover:bg-dark-bg"],
  [/dark:hover:bg-gray-900/g,           "dark:hover:bg-dark-surface"],
  [/dark:hover:bg-gray-800/g,           "dark:hover:bg-dark-elevated"],
  [/dark:hover:bg-gray-100/g,           "dark:hover:bg-dark-elevated"],
  [/dark:hover:text-gray-300/g,         "dark:hover:text-dark-muted"],
  [/dark:from-gray-800/g,               "dark:from-dark-elevated"],
  [/dark:to-gray-900/g,                 "dark:to-dark-surface"],
];

for (const file of files) {
  const fullPath = path.resolve(file);
  if (!fs.existsSync(fullPath)) { console.warn(`skip: ${file}`); continue; }

  let content = fs.readFileSync(fullPath, "utf-8");
  const original = content;

  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }

  if (content !== original) {
    fs.writeFileSync(fullPath, content);
    console.log(`✔ updated: ${file}`);
  } else {
    console.log(`  no changes: ${file}`);
  }
}
