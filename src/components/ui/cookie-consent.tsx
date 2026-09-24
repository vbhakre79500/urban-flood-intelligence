"use client";

import * as React from "react";
import { ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    try {
      const consent = localStorage.getItem("flood_intel_cookie_consent");
      if (!consent) {
        // Small delay so it does not jump aggressively on first paint
        timer = setTimeout(() => setIsVisible(true), 1200);
      }
    } catch {
      // Ignore localStorage errors
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("flood_intel_cookie_consent", "accepted");
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem("flood_intel_cookie_consent", "dismissed");
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and Storage Notice"
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-40 rounded-lg border border-(--border-default) bg-(--surface) p-4 shadow-xl text-(--text-primary) backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-(--brand-primary)/10 text-(--brand-primary) shrink-0 mt-0.5">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-1">
          <h2 className="text-body-small font-semibold text-(--text-primary)">
            Essential Cookies & Local Storage
          </h2>
          <p className="text-caption text-(--text-muted) leading-relaxed">
            This platform uses essential cookies solely to maintain authorized operator sessions
            and local storage for flood safety preferences. No commercial tracking or advertising
            scripts are used.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <Button size="sm" variant="primary" onClick={handleAccept}>
              Accept Essential
            </Button>
            <Button size="sm" variant="outline" onClick={handleDismiss}>
              Dismiss
            </Button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-(--text-muted) hover:text-(--text-primary) p-1 rounded-sm cursor-pointer"
          aria-label="Close cookie notice"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
