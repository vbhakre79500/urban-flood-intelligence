import * as React from "react";
import { cn } from "@/lib/utils";

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = "Loading operational telemetry...",
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center",
        className
      )}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-3 border-(--brand-primary) border-t-transparent mb-4" />
      <p className="text-body-small text-(--text-muted) animate-pulse">{message}</p>
    </div>
  );
}
