import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        disabled={disabled}
        className={cn(
          "flex h-9 w-full rounded-md border bg-(--surface) px-3 py-1 text-body shadow-xs transition-colors",
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
Input.displayName = "Input";
