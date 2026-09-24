"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUIStore } from "@/stores/ui-store";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { SiteSearch } from "@/components/ui/site-search";
import {
  LayoutDashboard,
  MapPin,
  ShieldAlert,
  LineChart,
  History,
  Bell,
  Settings,
  Shield,
  Menu,
  X,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Users,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/app/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Flood Risk Map", href: "/app/map", icon: <MapPin className="h-5 w-5" /> },
  { label: "Urban Zones", href: "/app/zones", icon: <ShieldAlert className="h-5 w-5" /> },
  { label: "Risk Predictions", href: "/app/predictions", icon: <LineChart className="h-5 w-5" /> },
  { label: "Active Alerts", href: "/app/alerts", icon: <Bell className="h-5 w-5" />, badge: "2" },
  { label: "Historical Records", href: "/app/history", icon: <History className="h-5 w-5" /> },
  { label: "Notifications", href: "/app/notifications", icon: <Bell className="h-5 w-5" /> },
  { label: "System Settings", href: "/app/settings", icon: <Settings className="h-5 w-5" /> },
  { label: "Administration", href: "/app/admin", icon: <Shield className="h-5 w-5" />, adminOnly: true },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isSidebarCollapsed, toggleSidebar, isMobileSidebarOpen, setMobileSidebarOpen } = useUIStore();
  const { theme, setTheme } = useTheme();

  const [userRole, setUserRole] = React.useState<string>("AUTHORITY");
  const [userName, setUserName] = React.useState<string>("Duty Officer");
  const [userDept, setUserDept] = React.useState<string>("Emergency Response Unit");

  React.useEffect(() => {
    // Read user role and details from cookies
    const getCookie = (name: string): string | null => {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
      return match && match[2] ? decodeURIComponent(match[2]) : null;
    };

    const role = getCookie("user_role");
    const name = getCookie("user_name");
    const dept = getCookie("user_dept");

    if (role) setUserRole(role);
    if (name) setUserName(name);
    if (dept) setUserDept(dept);
  }, []);

  const handleSignOut = async () => {
    try {
      const { createClient } = await import("@/lib/auth/supabase-client");
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Supabase Auth sign out notice:", err);
    }
    document.cookie = "dev_session=; path=/; max-age=0";
    document.cookie = "user_role=; path=/; max-age=0";
    document.cookie = "user_name=; path=/; max-age=0";
    document.cookie = "user_email=; path=/; max-age=0";
    document.cookie = "user_dept=; path=/; max-age=0";
    router.push("/operator/login");
    router.refresh();
  };

  // Filter out admin routes if current user is not ADMIN (Requirement 6)
  const visibleNavItems = NAV_ITEMS.filter((item) => {
    if (item.adminOnly && userRole !== "ADMIN") return false;
    return true;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-(--background) text-(--text-primary)">
      {/* Skip to Content Link (Requirement 20) */}
      <a
        href="#operator-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-(--brand-primary) focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-xs"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Persistent Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-(--border-subtle) bg-(--surface) transition-all duration-300 md:static",
          isSidebarCollapsed ? "w-18" : "w-64",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-(--border-subtle)">
          <Link href="/app/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 shrink-0 rounded-md bg-(--brand-primary) flex items-center justify-center text-white font-bold">
              ▲
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-body text-(--text-primary) whitespace-nowrap">
                  FLOOD INTEL
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-(--brand-secondary)">
                  Operational Desk
                </span>
              </div>
            )}
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden p-1 text-(--text-muted) hover:text-(--text-primary)"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-body-small font-medium transition-colors",
                  isActive
                    ? "bg-(--brand-primary)/10 text-(--brand-primary) font-semibold"
                    : "text-(--text-secondary) hover:bg-(--surface-subtle) hover:text-(--text-primary)",
                  isSidebarCollapsed && "justify-center px-2"
                )}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <span className={cn("shrink-0", isActive ? "text-(--brand-primary)" : "text-(--text-muted)")}>
                  {item.icon}
                </span>
                {!isSidebarCollapsed && (
                  <div className="flex flex-1 items-center justify-between">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-(--risk-critical) px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer with Collapse Trigger and Citizen Portal switch */}
        <div className="border-t border-(--border-subtle) p-3 flex flex-col gap-2">
          {!isSidebarCollapsed && (
            <Link
              href="/citizen"
              className="flex items-center gap-2 rounded-md p-2 text-caption text-(--text-muted) hover:bg-(--surface-subtle) hover:text-(--text-primary) transition-colors"
            >
              <Users className="h-4 w-4 text-emerald-500" />
              <span>Switch to Citizen Portal</span>
            </Link>
          )}

          <button
            onClick={toggleSidebar}
            className="hidden md:flex items-center gap-2 rounded-md p-2 text-caption text-(--text-muted) hover:bg-(--surface-subtle) hover:text-(--text-primary) w-full justify-center"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Execution View */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header (Requirement 19: Sticky Operational Header) */}
        <header className="flex h-16 items-center justify-between border-b border-(--border-subtle) bg-(--surface)/90 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-(--text-secondary) hover:text-(--text-primary)"
              aria-label="Open sidebar menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-caption font-semibold text-(--text-muted) uppercase tracking-wider hidden sm:inline">
                Telemetry Active • Freshness: 3m
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SiteSearch />

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-md border border-(--border-subtle) p-2 text-(--text-secondary) hover:bg-(--surface-subtle) transition-colors cursor-pointer"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-(--brand-primary)" />}
            </button>

            {/* User Profile Info with Dynamic Role */}
            <div className="flex items-center gap-3 border-l border-(--border-subtle) pl-4">
              <div className="h-8 w-8 rounded-full bg-(--brand-primary)/20 text-(--brand-primary) flex items-center justify-center font-bold text-caption uppercase">
                {userRole === "ADMIN" ? "AD" : "OP"}
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-body-small font-medium text-(--text-primary)">
                  {userName}
                </span>
                <span className="text-[11px] text-(--text-muted)">
                  {userDept} ({userRole})
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="p-1.5 text-(--text-muted) hover:text-(--destructive) transition-colors cursor-pointer"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main
          id="operator-content"
          className="flex-1 overflow-y-auto p-6 bg-(--background) focus:outline-none"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
