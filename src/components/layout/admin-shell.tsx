"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Shield, Users, MapPin, BellRing, Database, Cpu, FileText } from "lucide-react";

interface AdminTab {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const ADMIN_TABS: AdminTab[] = [
  { label: "Overview", href: "/app/admin", icon: <Shield className="h-4 w-4" /> },
  { label: "Users & Roles", href: "/app/admin/users", icon: <Users className="h-4 w-4" /> },
  { label: "Zones", href: "/app/admin/zones", icon: <MapPin className="h-4 w-4" /> },
  { label: "Alert Dispatch", href: "/app/admin/alerts", icon: <BellRing className="h-4 w-4" /> },
  { label: "Data Sources", href: "/app/admin/data", icon: <Database className="h-4 w-4" /> },
  { label: "Predictive Models", href: "/app/admin/models", icon: <Cpu className="h-4 w-4" /> },
  { label: "Audit Logs", href: "/app/admin/audit", icon: <FileText className="h-4 w-4" /> },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-(--border-subtle) pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-purple-500/10 p-1.5 text-purple-600 dark:text-purple-400">
              <Shield className="h-5 w-5" />
            </span>
            <h1 className="text-h2 font-bold tracking-tight text-(--text-primary)">
              System Administration
            </h1>
          </div>
          <p className="mt-1 text-body-small text-(--text-muted)">
            Elevated governance, role management, ML model telemetry, and immutable audit logs.
          </p>
        </div>
      </div>

      {/* Admin Subnavigation Tabs */}
      <div className="flex overflow-x-auto space-x-1 border-b border-(--border-subtle) pb-2">
        {ADMIN_TABS.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-body-small font-medium rounded-md whitespace-nowrap transition-colors",
                isActive
                  ? "bg-(--brand-primary) text-white font-semibold"
                  : "text-(--text-muted) hover:text-(--text-primary) hover:bg-(--surface-subtle)"
              )}
            >
              {tab.icon}
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div>{children}</div>
    </div>
  );
}
