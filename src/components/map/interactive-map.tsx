"use client";

import * as React from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Loader2, AlertCircle, Shield, Home } from "lucide-react";

export interface ZoneFeature {
  id: string;
  name: string;
  code: string;
  risk: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  lat: number;
  lng: number;
  elev: string;
  advice: string;
  waterLevel?: string;
}

export interface ShelterFeature {
  id: string;
  name: string;
  lat: number;
  lng: number;
  capacity: string;
  phone: string;
  status: string;
  address: string;
}

export const DEFAULT_ZONES: ZoneFeature[] = [
  {
    id: "zone-1",
    code: "DEV-ZN-COASTAL-03",
    name: "Estuary Marshlands",
    risk: "CRITICAL",
    lat: 13.0512,
    lng: 80.2825,
    elev: "3.2m",
    advice: "Severe inundation warning. Coastal drainage gates fully opened.",
    waterLevel: "+1.8m above flood stage",
  },
  {
    id: "zone-2",
    code: "DEV-ZN-RIVERFRONT-01",
    name: "Central Riverfront Basin",
    risk: "HIGH",
    lat: 13.0827,
    lng: 80.2707,
    elev: "12.4m",
    advice: "Riverbank overflow warning. Low-lying basements evacuated.",
    waterLevel: "+0.9m above normal",
  },
  {
    id: "zone-3",
    code: "DEV-ZN-DOWNTOWN-04",
    name: "Commercial District Subway",
    risk: "MODERATE",
    lat: 13.065,
    lng: 80.26,
    elev: "18.0m",
    advice: "Surface runoff ponding in underpasses. Emergency pumps active.",
    waterLevel: "+0.3m ponding",
  },
  {
    id: "zone-4",
    code: "DEV-ZN-UPTOWN-02",
    name: "Highland Plateau Sector",
    risk: "LOW",
    lat: 13.0901,
    lng: 80.245,
    elev: "48.6m",
    advice: "Free drainage area. Designated secondary evacuation staging area.",
    waterLevel: "Normal flow",
  },
];

export const DEFAULT_SHELTERS: ShelterFeature[] = [
  {
    id: "sh-1",
    name: "North Basin Elevated Relief Camp",
    lat: 13.095,
    lng: 80.255,
    capacity: "850 spaces available",
    phone: "1077",
    status: "OPEN",
    address: "Sector 4 Civic Complex, High Ground",
  },
  {
    id: "sh-2",
    name: "Central Stadium Community Shelter",
    lat: 13.085,
    lng: 80.278,
    capacity: "Medical Aid Post Active",
    phone: "1077",
    status: "OPEN",
    address: "Grand Avenue, 2nd Floor Pavilion",
  },
];

const RISK_COLORS: Record<string, { bg: string; border: string; badge: string }> = {
  CRITICAL: { bg: "#ef4444", border: "#991b1b", badge: "bg-red-600 text-white" },
  HIGH: { bg: "#f97316", border: "#9a3412", badge: "bg-orange-500 text-white" },
  MODERATE: { bg: "#eab308", border: "#854d0e", badge: "bg-amber-500 text-black font-semibold" },
  LOW: { bg: "#10b981", border: "#065f46", badge: "bg-emerald-600 text-white" },
};

const DEFAULT_RISK_COLOR = { bg: "#10b981", border: "#065f46", badge: "bg-emerald-600 text-white" };

interface InteractiveMapProps {
  mode?: "citizen" | "operator";
  selectedZoneId?: string | null;
  onSelectZone?: (zoneId: string | null) => void;
  showShelters?: boolean;
  className?: string;
}

export function InteractiveMap({
  mode = "operator",
  selectedZoneId,
  onSelectZone,
  showShelters = true,
  className = "",
}: InteractiveMapProps) {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const mapInstanceRef = React.useRef<maplibregl.Map | null>(null);
  const markersRef = React.useRef<maplibregl.Marker[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  // Initialize MapLibre
  React.useEffect(() => {
    if (!mapContainerRef.current) return () => {};

    try {
      // Standard raster OSM style with attribution
      const osmStyle: maplibregl.StyleSpecification = {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap Contributors",
          },
        },
        layers: [
          {
            id: "osm-layer",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      };

      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: osmStyle,
        center: [80.2707, 13.0827], // [lng, lat]
        zoom: 12,
        attributionControl: { compact: true },
      });

      // Add navigation controls (zoom, compass)
      map.addControl(
        new maplibregl.NavigationControl({
          showCompass: true,
          showZoom: true,
          visualizePitch: true,
        }),
        "top-right"
      );

      map.on("load", () => {
        setIsLoaded(true);
        map.resize();
      });

      map.on("error", (e: unknown) => {
        console.warn("Map tile warning:", e);
      });

      mapInstanceRef.current = map;

      // Handle window resize
      const handleResize = () => {
        map.resize();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        map.remove();
        mapInstanceRef.current = null;
      };
    } catch (err: unknown) {
      console.error("Map initialization error:", err);
      setLoadError("Unable to initialize spatial map engine.");
      return () => {};
    }
  }, []);

  // Update markers and popups
  React.useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !isLoaded) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add Zone Markers
    DEFAULT_ZONES.forEach((zone) => {
      const colors = RISK_COLORS[zone.risk] || DEFAULT_RISK_COLOR;

      const el = document.createElement("div");
      el.className = "zone-marker-pin cursor-pointer flex flex-col items-center group";
      el.style.transform = "translate(-50%, -100%)";
      el.setAttribute("data-zone-id", zone.id);
      el.setAttribute("aria-label", `${zone.name} - ${zone.risk} Risk`);

      el.innerHTML = `
        <div style="background-color: ${colors.bg}; border-color: ${colors.border};" 
             class="w-7 h-7 rounded-full border-2 text-white flex items-center justify-center font-bold text-[11px] shadow-lg relative transition-transform hover:scale-125">
          ${zone.risk === "CRITICAL" ? '<span class="absolute inset-0 rounded-full animate-ping opacity-75" style="background-color: #ef4444;"></span>' : ""}
          <span class="relative z-10">${zone.risk.charAt(0)}</span>
        </div>
        <div class="mt-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-white font-medium whitespace-nowrap shadow-sm backdrop-blur-xs">
          ${zone.name}
        </div>
      `;

      const popupHtml = `
        <div class="p-2 text-left max-w-xs font-sans text-neutral-900 dark:text-neutral-100">
          <div class="flex items-center justify-between gap-2 pb-1 border-b border-neutral-200 dark:border-neutral-700">
            <span class="font-bold text-sm">${zone.name}</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${colors.badge}">
              ${zone.risk}
            </span>
          </div>
          <div class="mt-2 text-xs space-y-1">
            <div class="flex justify-between">
              <span class="text-neutral-500">Sector Code:</span>
              <span class="font-mono">${zone.code}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500">Elevation:</span>
              <span class="font-semibold">${zone.elev}</span>
            </div>
            ${
              zone.waterLevel
                ? `<div class="flex justify-between">
                    <span class="text-neutral-500">Water Level:</span>
                    <span class="font-semibold text-blue-600 dark:text-blue-400">${zone.waterLevel}</span>
                  </div>`
                : ""
            }
            <div class="pt-1 mt-1 border-t border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 text-[11px] italic">
              ${zone.advice}
            </div>
            <div class="pt-1 text-[9px] text-amber-600 dark:text-amber-400 font-semibold uppercase">
              • Simulated Hydrology Model Data
            </div>
          </div>
        </div>
      `;

      const popup = new maplibregl.Popup({ offset: 25, closeButton: true }).setHTML(popupHtml);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([zone.lng, zone.lat])
        .setPopup(popup)
        .addTo(map);

      el.addEventListener("click", () => {
        onSelectZone?.(zone.id);
      });

      markersRef.current.push(marker);

      // Open popup if currently selected
      if (selectedZoneId === zone.id) {
        popup.addTo(map);
      }
    });

    // Add Shelter Markers if enabled
    if (showShelters) {
      DEFAULT_SHELTERS.forEach((shelter) => {
        const el = document.createElement("div");
        el.className = "shelter-marker-pin cursor-pointer flex flex-col items-center";
        el.style.transform = "translate(-50%, -100%)";
        el.setAttribute("aria-label", `Safe Shelter: ${shelter.name}`);

        el.innerHTML = `
          <div class="w-7 h-7 rounded-full bg-blue-600 border-2 border-white text-white flex items-center justify-center text-xs shadow-lg transition-transform hover:scale-125">
            ⛑️
          </div>
          <div class="mt-1 px-1.5 py-0.5 rounded bg-blue-900/90 text-[10px] text-blue-100 font-medium whitespace-nowrap shadow-sm">
            ${shelter.name}
          </div>
        `;

        const popupHtml = `
          <div class="p-2 text-left max-w-xs font-sans text-neutral-900 dark:text-neutral-100">
            <div class="flex items-center justify-between gap-2 pb-1 border-b border-neutral-200 dark:border-neutral-700">
              <span class="font-bold text-sm text-blue-600 dark:text-blue-400">${shelter.name}</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">SAFE</span>
            </div>
            <div class="mt-2 text-xs space-y-1">
              <div><span class="text-neutral-500">Address:</span> ${shelter.address}</div>
              <div class="flex justify-between">
                <span class="text-neutral-500">Capacity:</span>
                <span class="font-semibold">${shelter.capacity}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-500">Emergency Phone:</span>
                <a href="tel:${shelter.phone}" class="font-bold text-emerald-600 underline">${shelter.phone}</a>
              </div>
              <div class="pt-1 text-[9px] text-neutral-400 uppercase">
                • Verified Relief Camp (Demo)
              </div>
            </div>
          </div>
        `;

        const popup = new maplibregl.Popup({ offset: 25, closeButton: true }).setHTML(popupHtml);

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([shelter.lng, shelter.lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);
      });
    }
  }, [isLoaded, selectedZoneId, showShelters, onSelectZone]);

  // Recenter when selectedZoneId changes
  React.useEffect(() => {
    if (!mapInstanceRef.current || !selectedZoneId) return;
    const target = DEFAULT_ZONES.find((z) => z.id === selectedZoneId);
    if (target) {
      mapInstanceRef.current.flyTo({
        center: [target.lng, target.lat],
        zoom: 13.5,
        essential: true,
      });
    }
  }, [selectedZoneId]);

  return (
    <div
      data-map-mode={mode}
      className={`relative w-full h-full min-h-[300px] overflow-hidden rounded-lg ${className}`}
    >
      {/* Map Container */}
      <div
        ref={mapContainerRef}
        className="w-full h-full min-h-[300px]"
        id="interactive-hydrology-map"
      />

      {/* Loading Overlay */}
      {!isLoaded && !loadError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-(--surface)/80 backdrop-blur-xs text-(--text-muted)">
          <Loader2 className="h-8 w-8 animate-spin text-(--brand-primary)" />
          <span className="mt-2 text-body-small font-medium">Initializing Real Interactive Map...</span>
        </div>
      )}

      {/* Error Fallback */}
      {loadError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-red-500/10 p-4 text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
          <p className="text-body-small font-semibold text-red-600">{loadError}</p>
        </div>
      )}

      {/* Simulated Data Badge */}
      <div className="absolute bottom-2 left-2 z-10 pointer-events-none">
        <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[10px] font-mono text-amber-300 border border-amber-500/30 shadow-xs">
          Simulated Hydrology Telemetry (Demo)
        </span>
      </div>

      {/* Quick Legend Overlay */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 p-1.5 rounded bg-(--surface)/90 backdrop-blur-xs border border-(--border-subtle) text-[11px] shadow-sm">
        <span className="font-semibold text-(--text-secondary) flex items-center gap-1">
          <Shield className="h-3 w-3 text-(--brand-primary)" /> Zones:
        </span>
        <span className="flex items-center gap-0.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Low</span>
        <span className="flex items-center gap-0.5"><span className="h-2 w-2 rounded-full bg-yellow-500" /> Mod</span>
        <span className="flex items-center gap-0.5"><span className="h-2 w-2 rounded-full bg-orange-500" /> High</span>
        <span className="flex items-center gap-0.5"><span className="h-2 w-2 rounded-full bg-red-500" /> Crit</span>
        {showShelters && (
          <span className="flex items-center gap-0.5 ml-1 border-l border-(--border-subtle) pl-1 text-blue-600 dark:text-blue-400 font-medium">
            <Home className="h-3 w-3" /> Shelters
          </span>
        )}
      </div>
    </div>
  );
}
