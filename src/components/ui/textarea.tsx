import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border bg-(--surface) px-3 py-2 text-body shadow-xs transition-colors",
          "placeholder:text-(--text-muted)",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-secondary) focus-visible:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-(--surface-subtle)",
          error
            ? "border-(--destructive) focus-visible:ring-(--destructive)"
            : "border-(--border-default) hover:border-(--border-active)",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
