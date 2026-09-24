import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Home,
  Phone,
  ArrowRight,
  CloudRain,
  AlertTriangle,
  Clock,
  FilePlus,
  ShieldCheck,
} from "lucide-react";

export default function CitizenHomePage() {
  const currentRisk = {
    level: "MODERATE" as const,
    zone: "Central Riverfront Basin",
    advisory: "River water discharge approaching warning benchmark. Low-lying streets may experience 0.3m backflow.",
    lastUpdated: "24 Sep 2026, 11:30 AM",
  };

  const nearbyShelters = [
    {
      name: "North Basin Elevated Relief Camp",
      address: "Sector 4 Civic Complex, High Ground",
      distance: "1.2 km away",
      capacity: "Open • Capacity: 850 available",
      status: "OPEN",
    },
    {
      name: "Central Stadium Community Shelter",
      address: "Grand Avenue, 2nd Floor Pavilion",
      distance: "2.4 km away",
      capacity: "Open • Medical Aid Post Active",
      status: "OPEN",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Risk Status Indicator (Requirement 4 & 8) */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-(--text-primary) shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-caption font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Current Area Status
            </span>
          </div>
          <Badge variant="risk-moderate">Moderate Risk</Badge>
        </div>

        <div className="mt-3">
          <h1 className="text-h3 font-bold text-(--text-primary)">
            {currentRisk.zone}
          </h1>
          <p className="mt-1 text-body-small text-(--text-secondary) leading-relaxed">
            {currentRisk.advisory}
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-amber-500/20 flex items-center justify-between text-caption text-(--text-muted)">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> Updated: {currentRisk.lastUpdated}
          </span>
          <Link
            href="/citizen/safety"
            className="font-medium text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            Safety Actions <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Touch-Friendly Quick Action Grid (Requirement 4) */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/citizen/map" className="block">
          <Card className="hover:border-(--brand-primary) transition-colors p-3.5 h-full flex flex-col justify-between">
            <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-2">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-body-small text-(--text-primary)">
                Find Safe Shelter
              </div>
              <div className="text-caption text-(--text-muted) mt-0.5">
                Nearby relief camps & dry ground
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/citizen/contact" className="block">
          <Card className="hover:border-emerald-500 transition-colors p-3.5 h-full flex flex-col justify-between">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-body-small text-(--text-primary)">
                Emergency Contacts
              </div>
              <div className="text-caption text-(--text-muted) mt-0.5">
                112, Flood room & ambulances
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/citizen/safety" className="block">
          <Card className="hover:border-amber-500 transition-colors p-3.5 h-full flex flex-col justify-between">
            <div className="h-9 w-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-body-small text-(--text-primary)">
                Safety Protocols
              </div>
              <div className="text-caption text-(--text-muted) mt-0.5">
                Checklists & survival guidance
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/citizen/report" className="block">
          <Card className="hover:border-purple-500 transition-colors p-3.5 h-full flex flex-col justify-between">
            <div className="h-9 w-9 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-2">
              <FilePlus className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-body-small text-(--text-primary)">
                Report Flooding
              </div>
              <div className="text-caption text-(--text-muted) mt-0.5">
                Submit localized waterlogging
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Active Community Alerts Preview */}
      <Card>
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-body font-bold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Active Warning Advisories
          </CardTitle>
          <Link
            href="/citizen/alerts"
            className="text-caption font-semibold text-(--brand-primary) hover:underline"
          >
            View All (2)
          </Link>
        </CardHeader>
        <CardContent className="p-4 pt-2 divide-y divide-(--border-subtle)">
          <div className="py-2.5 first:pt-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-body-small text-(--text-primary)">
                High Tide & Canal Water Surge
              </span>
              <Badge variant="risk-high" className="text-[10px]">
                High
              </Badge>
            </div>
            <p className="text-caption text-(--text-muted) mt-1">
              Estuary discharge gates opened due to 1.8m surge. Residents in low-lying coastal
              corridors are advised to move vehicles to higher terrain.
            </p>
          </div>

          <div className="py-2.5 last:pb-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-body-small text-(--text-primary)">
                Subway Underpass Waterlogging
              </span>
              <Badge variant="risk-moderate" className="text-[10px]">
                Watch
              </Badge>
            </div>
            <p className="text-caption text-(--text-muted) mt-1">
              Commercial district underpasses closed to light traffic. Municipal de-watering pumps
              actively operating.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Shelters Nearby */}
      <Card>
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-body font-bold flex items-center gap-2">
            <Home className="h-4 w-4 text-blue-500" />
            Nearest Relief Shelters
          </CardTitle>
          <Link
            href="/citizen/map"
            className="text-caption font-semibold text-(--brand-primary) hover:underline"
          >
            Open Map
          </Link>
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-2.5">
          {nearbyShelters.map((shelter) => (
            <div
              key={shelter.name}
              className="p-3 rounded-lg border border-(--border-subtle) bg-(--surface-subtle) space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-body-small text-(--text-primary)">
                  {shelter.name}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {shelter.status}
                </span>
              </div>
              <div className="text-caption text-(--text-muted) flex items-center gap-1">
                <MapPin className="h-3 w-3 shrink-0" />
                <span>{shelter.address}</span>
              </div>
              <div className="flex items-center justify-between pt-1 text-caption text-(--text-secondary)">
                <span className="font-medium text-blue-500">{shelter.distance}</span>
                <span className="text-[11px] text-(--text-muted)">{shelter.capacity}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Localized Weather & Rainfall (Simulated Telemetry) */}
      <div className="rounded-lg border border-(--border-subtle) bg-(--surface-subtle)/60 p-3.5 flex items-center justify-between text-body-small">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
            <CloudRain className="h-4 w-4" />
          </div>
          <div>
            <div className="font-semibold text-(--text-primary)">Precipitation Gauge: 38 mm</div>
            <div className="text-caption text-(--text-muted)">Next 6h Forecast: Light to Moderate Showers</div>
          </div>
        </div>
        <Badge variant="outline" className="text-[10px]">
          Live Sensor
        </Badge>
      </div>
    </div>
  );
}
