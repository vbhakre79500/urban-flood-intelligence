import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "risk-low"
    | "risk-moderate"
    | "risk-high"
    | "risk-critical"
    | "success"
    | "warning"
    | "destructive";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-(--brand-primary) text-white",
    secondary: "bg-(--surface-subtle) text-(--text-secondary) border border-(--border-subtle)",
    outline: "border border-(--border-default) text-(--text-secondary)",
    "risk-low": "bg-(--risk-low-bg) text-(--risk-low) border border-(--risk-low)",
    "risk-moderate": "bg-(--risk-moderate-bg) text-(--risk-moderate) border border-(--risk-moderate)",
    "risk-high": "bg-(--risk-high-bg) text-(--risk-high) border border-(--risk-high)",
    "risk-critical": "bg-(--risk-critical-bg) text-(--risk-critical) border border-(--risk-critical) font-bold animate-pulse",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
    destructive: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-caption font-semibold tracking-wide transition-colors uppercase",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
