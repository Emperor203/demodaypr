"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed right-3 top-3 z-50 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-2 text-[var(--color-foreground)] shadow-sm sm:right-4 sm:top-4"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  );
}
