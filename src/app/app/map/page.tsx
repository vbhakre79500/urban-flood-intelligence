"use client";

import * as React from "react";
import { useMapStore } from "@/stores/map-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Layers, Compass, ShieldAlert } from "lucide-react";

import { InteractiveMap } from "@/components/map";

export default function MapPage() {
  const { activeLayers, toggleLayer, selectedZoneId, selectZone } = useMapStore();

  const mockZones = [
    { id: "zone-1", name: "Estuary Marshlands", code: "ZN-COASTAL-03", risk: "CRITICAL" as const, elev: "3.2m" },
    { id: "zone-2", name: "Central Riverfront Basin", code: "ZN-RIVERFRONT-01", risk: "HIGH" as const, elev: "12.4m" },
    { id: "zone-3", name: "Commercial District Subway", code: "ZN-DOWNTOWN-04", risk: "MODERATE" as const, elev: "18.0m" },
    { id: "zone-4", name: "Highland Plateau Sector", code: "ZN-UPTOWN-02", risk: "LOW" as const, elev: "48.6m" },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-4">
      {/* Real Map Viewport Area */}
      <div className="flex-1 relative rounded-lg border border-(--border-subtle) bg-(--surface-card) overflow-hidden flex flex-col min-h-[400px]">
        {/* Top Control Bar */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded-md bg-(--surface)/90 p-2 shadow-md backdrop-blur-xs border border-(--border-subtle)">
          <Compass className="h-4 w-4 text-(--brand-primary)" />
          <span className="text-body-small font-semibold">13.0827° N, 80.2707° E</span>
          <span className="text-caption text-(--text-muted) border-l border-(--border-subtle) pl-2">
            Active Spatial Canvas
          </span>
        </div>

        {/* Real Interactive MapLibre Canvas */}
        <InteractiveMap
          mode="operator"
          selectedZoneId={selectedZoneId}
          onSelectZone={selectZone}
          showShelters={true}
          className="flex-1 w-full h-full"
        />
      </div>

      {/* Map Side Panel / Layer Controller */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-body font-semibold flex items-center gap-2">
              <Layers className="h-4 w-4 text-(--brand-primary)" /> Spatial Overlays
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-body-small text-(--text-secondary)">Risk Heatmap</span>
              <Switch
                checked={activeLayers.riskHeatmap}
                onCheckedChange={() => toggleLayer("riskHeatmap")}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-body-small text-(--text-secondary)">Drainage Network</span>
              <Switch
                checked={activeLayers.drainageNetwork}
                onCheckedChange={() => toggleLayer("drainageNetwork")}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-body-small text-(--text-secondary)">Sensor Stations</span>
              <Switch
                checked={activeLayers.sensorStations}
                onCheckedChange={() => toggleLayer("sensorStations")}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-body-small text-(--text-secondary)">Radar Reflectivity</span>
              <Switch
                checked={activeLayers.radarReflectivity}
                onCheckedChange={() => toggleLayer("radarReflectivity")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Zones List in Viewport */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardHeader>
            <CardTitle className="text-body font-semibold flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-500" /> Active Sectors
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto divide-y divide-(--border-subtle) pr-2">
            {mockZones.map((z) => (
              <div
                key={z.id}
                onClick={() => selectZone(z.id === selectedZoneId ? null : z.id)}
                className={`py-2.5 cursor-pointer transition-colors ${
                  selectedZoneId === z.id ? "bg-(--brand-primary)/10 rounded px-2" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-body-small text-(--text-primary)">{z.name}</span>
                  <Badge
                    variant={
                      z.risk === "CRITICAL"
                        ? "risk-critical"
                        : z.risk === "HIGH"
                        ? "risk-high"
                        : z.risk === "MODERATE"
                        ? "risk-moderate"
                        : "risk-low"
                    }
                  >
                    {z.risk}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-caption text-(--text-muted) mt-1">
                  <span>{z.code}</span>
                  <span>Elevation: {z.elev}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
