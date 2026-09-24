"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SiteSearch } from "@/components/ui/site-search";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { BackToTop } from "@/components/ui/back-to-top";
import { Menu, X, Shield, Users } from "lucide-react";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-(--background) text-(--text-primary)">
      {/* Skip to Content Link (Requirement 20) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-(--brand-primary) focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Public Header (Requirement 19: Sticky Header) */}
      <header className="h-16 border-b border-(--border-subtle) bg-(--surface)/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-md bg-(--brand-primary) flex items-center justify-center text-white font-bold text-lg">
              ▲
            </div>
            <div>
              <span className="font-bold tracking-tight text-body-large text-(--text-primary)">
                URBAN FLOOD INTEL
              </span>
              <span className="hidden md:inline-block ml-2 text-caption px-2 py-0.5 rounded-full bg-(--brand-primary)/10 text-(--brand-primary) font-semibold">
                EARLY WARNING
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3">
          <SiteSearch />

          <Link
            href="/status"
            className="text-body-small text-(--text-secondary) hover:text-(--text-primary) transition-colors px-2 py-1"
          >
            System Status
          </Link>

          <ThemeToggle />

          <Link href="/operator/login">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              Operator Sign In
            </Button>
          </Link>

          <Link href="/citizen">
            <Button variant="primary" size="sm" className="gap-1.5">
              <Users className="h-3.5 w-3.5" />
              Citizen Portal
            </Button>
          </Link>
        </div>

        {/* Mobile / Tablet Header Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <SiteSearch />
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            type="button"
            className="p-2 text-(--text-secondary) hover:text-(--text-primary) rounded-md border border-(--border-subtle) cursor-pointer focus-visible:outline-2 focus-visible:outline-(--brand-primary)"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu (Requirement 13) */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 bg-(--surface) border-b border-(--border-subtle) p-4 shadow-xl lg:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/citizen"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-lg bg-(--brand-primary)/10 text-(--brand-primary) font-medium text-body-small"
            >
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Citizen Portal (Emergency & Safety)
              </span>
              <span>→</span>
            </Link>

            <Link
              href="/operator/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-lg border border-(--border-subtle) text-(--text-primary) hover:bg-(--surface-subtle) text-body-small font-medium"
            >
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-amber-500" />
                Operator Sign In (Authorities)
              </span>
              <span>→</span>
            </Link>

            <Link
              href="/status"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 text-body-small text-(--text-secondary) hover:text-(--text-primary)"
            >
              Operational System Status
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 flex flex-col focus:outline-none" tabIndex={-1}>
        {children}
      </main>

      {/* Public Footer */}
      <footer className="border-t border-(--border-subtle) py-6 px-6 text-center text-caption text-(--text-muted) bg-(--surface-subtle)/30">
        <p>Urban Flood Prediction & Early Warning System • Operational Platform</p>
      </footer>

      {/* Non-intrusive Cookie Consent (Requirement 10) */}
      <CookieConsent />

      {/* Back To Top (Requirement 12) */}
      <BackToTop />
    </div>
  );
}
