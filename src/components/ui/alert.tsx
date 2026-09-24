import * as React from "react";
import { cn } from "@/lib/utils";

export interface AlertBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "warning" | "destructive" | "risk-critical";
  title?: string;
}

export function AlertBanner({
  className,
  variant = "info",
  title,
  children,
  ...props
}: AlertBannerProps) {
  const variantStyles = {
    info: "border-(--info)/40 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    warning: "border-(--warning)/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    destructive: "border-(--destructive)/40 bg-red-500/10 text-red-700 dark:text-red-300",
    "risk-critical": "border-(--risk-critical) bg-(--risk-critical-bg) text-(--risk-critical) font-semibold",
  };

  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4 text-body-small",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {title && <h5 className="mb-1 font-semibold leading-none tracking-tight">{title}</h5>}
      <div className="text-body-small [&_p]:leading-relaxed">{children}</div>
    </div>
  );
}
