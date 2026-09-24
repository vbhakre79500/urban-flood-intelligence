"use client";

import * as React from "react";
import Link from "next/link";
import { Search, X, Phone, ShieldAlert, Home, HelpCircle, FileText, ExternalLink } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";

interface SearchItem {
  id: string;
  title: string;
  category: "helpline" | "shelter" | "safety" | "zone" | "guideline";
  description: string;
  href: string;
  meta?: string;
}

const SEARCH_DIRECTORY: SearchItem[] = [
  {
    id: "h1",
    title: "National Emergency Helpline (112)",
    category: "helpline",
    description: "24x7 unified national emergency response for life-safety, rescue, and police.",
    href: "/citizen/contact",
    meta: "Hotline: 112",
  },
  {
    id: "h2",
    title: "State Disaster Management Authority (SDMA)",
    category: "helpline",
    description: "State flood monitoring command desk and relief coordination cell.",
    href: "/citizen/contact",
    meta: "1070",
  },
  {
    id: "h3",
    title: "District Flood Control Room",
    category: "helpline",
    description: "Local micro-catchment waterlogging and pumping assistance dispatch.",
    href: "/citizen/contact",
    meta: "1077",
  },
  {
    id: "s1",
    title: "North Basin High Ground Relief Camp",
    category: "shelter",
    description: "Primary elevated shelter equipped with clean drinking water and medical outpost.",
    href: "/citizen/map",
    meta: "Capacity: 1,200 persons",
  },
  {
    id: "s2",
    title: "Central Stadium Community Shelter",
    category: "shelter",
    description: "Major civic rescue evacuation center, high ground, accessible via Highway 4.",
    href: "/citizen/map",
    meta: "Capacity: 3,500 persons",
  },
  {
    id: "g1",
    title: "What to do Before a Flood (Preparedness Checklist)",
    category: "safety",
    description: "Step-by-step checklist: secure vital documents, emergency bag, water & battery kit.",
    href: "/citizen/safety",
  },
  {
    id: "g2",
    title: "Flash Flood Action Protocol (During Flood)",
    category: "safety",
    description: "Immediate safety actions: do not walk or drive through moving water, switch off main breaker.",
    href: "/citizen/safety",
  },
  {
    id: "g3",
    title: "Safe Evacuation Routes & Guidelines",
    category: "guideline",
    description: "Approved designated elevated evacuation routes avoiding underpasses and canal banks.",
    href: "/citizen/safety",
  },
  {
    id: "z1",
    title: "Estuary Marshlands (Coastal Zone)",
    category: "zone",
    description: "High surge vulnerability zone under active continuous hydrological telemetry surveillance.",
    href: "/citizen/map",
  },
  {
    id: "z2",
    title: "Central Riverfront Basin",
    category: "zone",
    description: "Riverbank catchment basin with active water-level gauging stations.",
    href: "/citizen/map",
  },
];

export function SiteSearch() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return SEARCH_DIRECTORY.slice(0, 6);
    const q = query.toLowerCase();
    return SEARCH_DIRECTORY.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.meta && item.meta.toLowerCase().includes(q))
    );
  }, [query]);

  const getIcon = (category: SearchItem["category"]) => {
    switch (category) {
      case "helpline":
        return <Phone className="h-4 w-4 text-emerald-500" />;
      case "shelter":
        return <Home className="h-4 w-4 text-blue-500" />;
      case "safety":
        return <ShieldAlert className="h-4 w-4 text-amber-500" />;
      case "zone":
        return <FileText className="h-4 w-4 text-(--brand-primary)" />;
      default:
        return <HelpCircle className="h-4 w-4 text-(--text-muted)" />;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex items-center gap-2 rounded-md border border-(--border-subtle) bg-(--surface-subtle) px-3 py-1.5 text-body-small text-(--text-muted) hover:text-(--text-primary) hover:border-(--border-default) transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-(--brand-primary)"
        aria-label="Search safety guidelines, shelters and helplines"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search safety, shelters, helplines...</span>
        <span className="sm:hidden">Search</span>
        <kbd className="hidden sm:inline-block ml-1 rounded bg-(--surface) px-1.5 py-0.5 text-[10px] font-mono border border-(--border-subtle)">
          ⌘K
        </kbd>
      </button>

      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Search Emergency Resources"
        description="Quickly look up safety protocols, evacuation shelters, helplines, and zones."
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-(--text-muted)" />
            <input
              type="text"
              placeholder="Search by topic, shelter name, helpline..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-md border border-(--border-default) bg-(--surface) pl-9 pr-8 py-2 text-body-small text-(--text-primary) placeholder:text-(--text-muted) focus:border-(--brand-primary) focus:outline-none"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-2.5 text-(--text-muted) hover:text-(--text-primary) p-1"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto space-y-1.5 divide-y divide-(--border-subtle)">
            {filteredItems.length === 0 ? (
              <div className="p-6 text-center text-body-small text-(--text-muted)">
                No emergency resources found matching &quot;{query}&quot;. For immediate life safety,
                call <strong className="text-emerald-500">112</strong>.
              </div>
            ) : (
              filteredItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-md hover:bg-(--surface-subtle) transition-colors text-left group"
                >
                  <div className="mt-0.5 shrink-0 rounded-md bg-(--surface) p-1.5 border border-(--border-subtle)">
                    {getIcon(item.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-body-small font-semibold text-(--text-primary) group-hover:text-(--brand-primary) transition-colors truncate">
                        {item.title}
                      </span>
                      {item.meta && (
                        <span className="shrink-0 text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-(--brand-primary)/10 text-(--brand-primary)">
                          {item.meta}
                        </span>
                      )}
                    </div>
                    <p className="text-caption text-(--text-muted) line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-(--text-muted) opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
                </Link>
              ))
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}
