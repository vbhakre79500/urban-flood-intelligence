"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
}

export function CopyButton({ value, label, className }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-(--border-subtle) bg-(--surface-subtle) px-2.5 py-1 text-caption font-medium text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--surface) transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-(--brand-primary)",
        copied && "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
        className
      )}
      aria-label={copied ? `Copied ${label || value}` : `Copy ${label || value}`}
      title={copied ? "Copied to clipboard" : `Copy ${value}`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-500" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5 text-(--text-muted)" />
          <span>{label || "Copy"}</span>
        </>
      )}
    </button>
  );
}
