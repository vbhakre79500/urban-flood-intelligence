"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: "left" | "right" | "bottom";
  title?: string;
  children: React.ReactNode;
}

export function Drawer({
  open,
  onOpenChange,
  position = "right",
  title,
  children,
}: DrawerProps) {
  if (!open) return null;

  const positionStyles = {
    right: "inset-y-0 right-0 h-full w-full max-w-md border-l animate-in slide-in-from-right",
    left: "inset-y-0 left-0 h-full w-full max-w-md border-r animate-in slide-in-from-left",
    bottom: "inset-x-0 bottom-0 max-h-[80vh] border-t animate-in slide-in-from-bottom",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => onOpenChange(false)}
      />
      <aside
        className={cn(
          "fixed z-50 bg-(--surface) p-6 shadow-xl flex flex-col border-(--border-subtle)",
          positionStyles[position]
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-(--border-subtle)">
          {title && <h2 className="text-h4 font-semibold text-(--text-primary)">{title}</h2>}
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-xs p-1 text-(--text-muted) hover:text-(--text-primary)"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pt-4">{children}</div>
      </aside>
    </div>
  );
}
