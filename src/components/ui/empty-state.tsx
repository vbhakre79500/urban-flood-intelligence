import * as React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-(--border-default) p-8 text-center",
        className
      )}
    >
      {icon && <div className="mb-4 text-(--text-muted)">{icon}</div>}
      <h3 className="text-h4 font-medium text-(--text-primary)">{title}</h3>
      <p className="mt-1 max-w-sm text-body-small text-(--text-muted)">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
