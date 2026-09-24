"use client";

import * as React from "react";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, title, description, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => onOpenChange(false)}
      />
      {/* Modal Dialog Content */}
      <div className="relative z-50 w-full max-w-lg rounded-lg border border-(--border-default) bg-(--surface-popover) p-6 shadow-xl transition-all">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-h3 font-semibold text-(--text-primary)">{title}</h2>
          {description && (
            <p className="text-body-small text-(--text-muted)">{description}</p>
          )}
        </div>
        <div className="mt-4">{children}</div>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-xs p-1 text-(--text-muted) hover:text-(--text-primary)"
        >
          <span className="sr-only">Close</span>
          ✕
        </button>
      </div>
    </div>
  );
}
