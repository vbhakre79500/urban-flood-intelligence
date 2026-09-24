"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("border-b border-(--border-subtle) flex space-x-4", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 border-b-2 py-2.5 px-1 text-body-small font-medium transition-colors cursor-pointer",
              isActive
                ? "border-(--brand-primary) text-(--brand-primary)"
                : "border-transparent text-(--text-muted) hover:border-(--border-default) hover:text-(--text-primary)"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-caption font-semibold",
                  isActive
                    ? "bg-(--brand-primary)/10 text-(--brand-primary)"
                    : "bg-(--surface-subtle) text-(--text-muted)"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
