"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-11 h-6" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex w-11 h-6 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 ${
        isDark ? "bg-gray-700" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${
          isDark ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
