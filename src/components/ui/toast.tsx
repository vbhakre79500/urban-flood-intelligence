"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  variant?: "info" | "success" | "warning" | "destructive";
  onDismiss: (id: string) => void;
}

export function Toast({ id, title, description, variant = "info", onDismiss }: ToastProps) {
  const variantStyles = {
    info: "border-(--info) bg-(--surface) text-(--text-primary)",
    success: "border-(--success) bg-(--surface) text-(--text-primary)",
    warning: "border-(--warning) bg-(--surface) text-(--text-primary)",
    destructive: "border-(--destructive) bg-(--surface) text-(--text-primary)",
  };

  return (
    <div
      role="status"
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border-l-4 p-4 shadow-lg ring-1 ring-black/5 bg-(--surface-popover)",
        variantStyles[variant]
      )}
    >
      <div className="flex-1">
        <h4 className="text-body font-semibold text-(--text-primary)">{title}</h4>
        {description && (
          <p className="mt-1 text-body-small text-(--text-muted)">{description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="rounded-xs p-1 text-(--text-muted) hover:text-(--text-primary)"
      >
        ✕
      </button>
    </div>
  );
}
