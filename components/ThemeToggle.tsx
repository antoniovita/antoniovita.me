"use client";

import { useSyncExternalStore } from "react";
import { PiMoonBold, PiSunBold } from "react-icons/pi";
import { currentTheme, subscribeTheme, toggleTheme, type Theme } from "@/lib/theme";

const serverTheme = (): Theme => "dark";

export default function ThemeToggle({ label }: { label: string }) {
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, serverTheme);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center rounded-full text-dim transition-colors hover:bg-raised hover:text-fg"
    >
      {theme === "light" ? <PiMoonBold size={16} /> : <PiSunBold size={16} />}
    </button>
  );
}
