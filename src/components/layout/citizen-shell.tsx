"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Bell, MapPin, ShieldCheck, Phone, LogOut, AlertTriangle } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SiteSearch } from "@/components/ui/site-search";
import { BackToTop } from "@/components/ui/back-to-top";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { APP_CONFIG } from "@/config";

interface CitizenShellProps {
  children: React.ReactNode;
}

export function CitizenShell({ children }: CitizenShellProps) {
  const pathname = usePathname();
  const router = useRouter();

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
    document.cookie = "user_zone=; path=/; max-age=0";
    document.cookie = "user_email=; path=/; max-age=0";
    document.cookie = "user_dept=; path=/; max-age=0";
    router.push("/citizen/login");
    router.refresh();
  };

  const navItems = [
    { label: "Status", href: "/citizen", icon: <Home className="h-5 w-5" /> },
    { label: "Alerts", href: "/citizen/alerts", icon: <Bell className="h-5 w-5" />, badge: "2" },
    { label: "Safe Map", href: "/citizen/map", icon: <MapPin className="h-5 w-5" /> },
    { label: "Safety Guide", href: "/citizen/safety", icon: <ShieldCheck className="h-5 w-5" /> },
    { label: "Helpline", href: "/citizen/contact", icon: <Phone className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-(--background) text-(--text-primary) flex flex-col">
      {/* Skip to Content */}
      <a
        href="#citizen-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-(--brand-primary) focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Centered Mobile Container Wrapper for Desktop */}
      <div className="w-full max-w-xl mx-auto min-h-screen flex flex-col border-x border-(--border-subtle) bg-(--surface) shadow-sm pb-24 relative">
        {/* Compact Emergency Header */}
        <header className="h-14 border-b border-(--border-subtle) px-4 sticky top-0 z-30 bg-(--surface)/95 backdrop-blur-md flex items-center justify-between">
          <Link href="/citizen" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-(--brand-primary) flex items-center justify-center text-white font-bold text-xs">
              ▲
            </div>
            <div>
              <span className="font-bold text-body tracking-tight text-(--text-primary)">
                CITIZEN FLOOD ALERT
              </span>
              <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                LIVE
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1.5">
            <SiteSearch />
            <ThemeToggle />
            <button
              onClick={handleSignOut}
              className="p-1.5 text-(--text-muted) hover:text-(--destructive) transition-colors cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-(--brand-primary)"
              aria-label="Sign out of Citizen Portal"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Sticky Emergency Quick SOS Banner (Requirement 28) */}
        <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-2 flex items-center justify-between text-caption sticky top-14 z-20 backdrop-blur-xs">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold">
            <AlertTriangle className="h-4 w-4 animate-pulse shrink-0" />
            <span>Emergency Hotline: {APP_CONFIG.emergencyHotline}</span>
          </div>
          <a
            href={`tel:${APP_CONFIG.emergencyHotline}`}
            className="rounded-full bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 text-[11px] uppercase tracking-wider transition-colors shadow-xs"
            aria-label={`Call emergency hotline ${APP_CONFIG.emergencyHotline}`}
          >
            Call Now
          </a>
        </div>

        {/* Main Citizen Content */}
        <main id="citizen-content" className="flex-1 p-4 space-y-4 focus:outline-none" tabIndex={-1}>
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar (Requirement 8) */}
        <nav
          aria-label="Citizen portal navigation"
          className="fixed bottom-0 inset-x-0 sm:max-w-xl sm:mx-auto z-40 bg-(--surface)/95 backdrop-blur-md border-t border-(--border-subtle) px-2 py-1.5 flex items-center justify-around shadow-lg"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-1 px-2 rounded-md transition-colors min-w-[56px] relative text-[11px] font-medium",
                  isActive
                    ? "text-(--brand-primary) font-semibold"
                    : "text-(--text-muted) hover:text-(--text-primary)"
                )}
              >
                <div className="relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-1 -right-2 h-4 w-4 rounded-full bg-(--risk-critical) text-[9px] font-bold text-white flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="mt-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <BackToTop className="sm:right-[calc(50%-270px)]" />
      <CookieConsent />
    </div>
  );
}
