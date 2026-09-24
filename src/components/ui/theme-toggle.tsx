"use client";

import * as React from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "button";
}

export function ThemeToggle({ className, variant = "icon" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-9 w-9 rounded-md border border-(--border-subtle) p-2 text-(--text-secondary) opacity-50",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  if (variant === "button") {
    return (
      <button
        onClick={handleToggle}
        className={cn(
          "flex items-center gap-2 rounded-md border border-(--border-subtle) px-3 py-1.5 text-body-small text-(--text-secondary) hover:bg-(--surface-subtle) hover:text-(--text-primary) transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-(--brand-primary)",
          className
        )}
        type="button"
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      >
        {isDark ? (
          <>
            <Sun className="h-4 w-4 text-amber-400" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="h-4 w-4 text-(--brand-primary)" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "rounded-md border border-(--border-subtle) p-2 text-(--text-secondary) hover:bg-(--surface-subtle) hover:text-(--text-primary) transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-(--brand-primary)",
        className
      )}
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400" />
      ) : (
        <Moon className="h-4 w-4 text-(--brand-primary)" />
      )}
    </button>
  );
}
