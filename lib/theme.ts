export type Theme = "dark" | "light";

/** Runs in <head> before paint so the stored theme never flashes. Light is the default. */
export const themeInitScript = `try{var t=localStorage.getItem("theme");if(t==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.dataset.theme = "dark";
  else delete root.dataset.theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Private mode or blocked storage: the choice lasts for this page only.
  }
}

/** Subscribe to theme changes, for useSyncExternalStore. */
export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function toggleTheme() {
  setTheme(currentTheme() === "light" ? "dark" : "light");
}
