"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="h-14 w-14 rounded-full"
        aria-label="Toggle theme"
        title="Toggle theme"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      className="h-14 w-14 rounded-full"
      aria-label={
        isDark ? "Switch to light theme" : "Switch to dark theme"
      }
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun
        className="!h-7 !w-7 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />

      <Moon
        className="absolute !h-7 !w-7 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
}