import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "risk";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-secondary) disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-(--brand-primary) text-white hover:bg-(--brand-secondary) active:opacity-90 shadow-sm",
      secondary:
        "bg-(--surface-subtle) text-(--text-primary) hover:bg-(--border-subtle) border border-(--border-subtle)",
      outline:
        "border border-(--border-default) bg-transparent text-(--text-primary) hover:bg-(--surface-subtle)",
      ghost:
        "bg-transparent text-(--text-primary) hover:bg-(--surface-subtle)",
      destructive:
        "bg-(--destructive) text-white hover:opacity-90 shadow-sm",
      risk:
        "bg-(--risk-critical) text-white hover:opacity-90 font-semibold shadow-sm",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-body-small rounded-md gap-1.5",
      md: "h-9 px-4 text-body rounded-md gap-2",
      lg: "h-11 px-6 text-body-large rounded-lg gap-2.5",
      icon: "h-9 w-9 p-0 rounded-md",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
