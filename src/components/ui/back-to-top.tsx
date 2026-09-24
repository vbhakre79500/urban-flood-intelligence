"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop({ className }: { className?: string }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      type="button"
      className={cn(
        "fixed bottom-20 right-5 z-40 rounded-full border border-(--border-default) bg-(--surface) p-2.5 text-(--text-secondary) shadow-md hover:bg-(--surface-subtle) hover:text-(--text-primary) hover:border-(--brand-primary) transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-(--brand-primary)",
        className
      )}
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
