"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home, Navigation, AlertTriangle, Phone } from "lucide-react";
import { InteractiveMap } from "@/components/map";

export default function CitizenMapPage() {
  const [filter, setFilter] = React.useState<"ALL" | "SHELTER" | "RISK">("ALL");

  const points = [
    {
      id: "sh-1",
      type: "SHELTER",
      name: "North Basin Elevated Relief Camp",
      address: "Sector 4 Civic Complex, High Ground",
      distance: "1.2 km",
      status: "OPEN • 850 spaces available",
      supplies: "Clean Water, Hot Meals, First Aid Outpost",
      phone: "1077",
      elevation: "18m Above Sea Level",
    },
    {
      id: "sh-2",
      type: "SHELTER",
      name: "Central Stadium Community Shelter",
      address: "Grand Avenue, 2nd Floor Pavilion",
      distance: "2.4 km",
      status: "OPEN • Medical Aid Post Active",
      supplies: "Bedding, Ambulatory Triage, Generator Power",
      phone: "1077",
      elevation: "22m Above Sea Level",
    },
    {
      id: "rk-1",
      type: "RISK",
      name: "Estuary Marshlands (Canal Sluice #3)",
      address: "Coastal Belt, Ward 12 & 14",
      distance: "3.1 km",
      status: "INUNDATED (+1.8m Water Level)",
      supplies: "Road Blocked • Drainage gates open",
      elevation: "1.5m (Low-Lying Hazard)",
    },
    {
      id: "rk-2",
      type: "RISK",
      name: "Commercial District Subway Corridor",
      address: "Central Metro Intersection",
      distance: "4.5 km",
      status: "WATERLOGGED (0.4m Surface Runoff)",
      supplies: "Underpass closed to vehicular traffic",
      elevation: "4.0m (Depression)",
    },
  ];

  const filteredPoints = points.filter((p) => {
    if (filter === "ALL") return true;
    return p.type === filter;
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-h2 font-bold text-(--text-primary)">Safe Evacuation Map</h1>
        <p className="text-body-small text-(--text-muted) mt-0.5">
          Find safe high ground, relief camps, and avoid waterlogged zones.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("ALL")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-body-small font-medium transition-colors border ${
            filter === "ALL"
              ? "bg-(--brand-primary) text-white border-(--brand-primary)"
              : "border-(--border-subtle) bg-(--surface) text-(--text-secondary)"
          }`}
        >
          All Locations
        </button>
        <button
          onClick={() => setFilter("SHELTER")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-body-small font-medium transition-colors border ${
            filter === "SHELTER"
              ? "bg-blue-600 text-white border-blue-600"
              : "border-(--border-subtle) bg-(--surface) text-(--text-secondary)"
          }`}
        >
          Safe Shelters
        </button>
        <button
          onClick={() => setFilter("RISK")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-body-small font-medium transition-colors border ${
            filter === "RISK"
              ? "bg-red-600 text-white border-red-600"
              : "border-(--border-subtle) bg-(--surface) text-(--text-secondary)"
          }`}
        >
          Hazard Zones
        </button>
      </div>

      {/* Real Interactive Map Canvas */}
      <div className="relative h-72 w-full rounded-xl border border-(--border-subtle) bg-(--surface-subtle) overflow-hidden shadow-sm">
        <InteractiveMap
          mode="citizen"
          showShelters={filter !== "RISK"}
          className="w-full h-full"
        />
      </div>

      {/* Locations List */}
      <div className="space-y-3">
        {filteredPoints.map((p) => {
          const isShelter = p.type === "SHELTER";
          return (
            <Card
              key={p.id}
              className={`border-(--border-subtle) ${
                isShelter ? "hover:border-blue-500/40" : "hover:border-red-500/40"
              } transition-colors`}
            >
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isShelter
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {isShelter ? <Home className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="font-semibold text-body-small text-(--text-primary)">
                        {p.name}
                      </div>
                      <div className="text-caption text-(--text-muted) flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{p.address}</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={isShelter ? "success" : "risk-critical"}
                    className="text-[10px] shrink-0"
                  >
                    {isShelter ? "SAFE" : "AVOID"}
                  </Badge>
                </div>

                <div className="rounded-md bg-(--surface-subtle) p-2.5 text-caption space-y-1">
                  <div className="flex justify-between">
                    <span className="text-(--text-muted)">Status:</span>
                    <span className="font-semibold text-(--text-primary)">{p.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-(--text-muted)">Elevation / Terrain:</span>
                    <span className="font-medium text-(--text-secondary)">{p.elevation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-(--text-muted)">Provisions / Notes:</span>
                    <span className="text-(--text-secondary)">{p.supplies}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-caption font-semibold text-blue-500 flex items-center gap-1">
                    <Navigation className="h-3.5 w-3.5" /> {p.distance}
                  </span>
                  {p.phone && (
                    <a
                      href={`tel:${p.phone}`}
                      className="text-caption font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <Phone className="h-3 w-3" /> Call Shelter ({p.phone})
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
