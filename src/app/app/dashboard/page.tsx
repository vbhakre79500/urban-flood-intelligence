import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldAlert,
  CloudRain,
  MapPin,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const metrics = [
    { label: "Monitored Zones", value: "24", sub: "100% telemetry online", icon: <MapPin className="h-5 w-5 text-(--brand-primary)" /> },
    { label: "High Risk Zones", value: "3", sub: "Immediate surveillance", icon: <ShieldAlert className="h-5 w-5 text-amber-500" /> },
    { label: "24h Max Rainfall", value: "114 mm", sub: "Catchment basin north", icon: <CloudRain className="h-5 w-5 text-blue-500" /> },
    { label: "Active Civil Alerts", value: "2", sub: "1 Emergency, 1 Watch", icon: <AlertTriangle className="h-5 w-5 text-(--destructive)" /> },
  ];

  const recentZones = [
    { id: "1", code: "ZN-COASTAL-03", name: "Estuary Marshlands", risk: "CRITICAL" as const, waterLevel: "+1.8m", drainage: "20%" },
    { id: "2", code: "ZN-RIVERFRONT-01", name: "Central Riverfront Basin", risk: "HIGH" as const, waterLevel: "+1.2m", drainage: "35%" },
    { id: "3", code: "ZN-DOWNTOWN-04", name: "Commercial District Subway", risk: "MODERATE" as const, waterLevel: "+0.4m", drainage: "55%" },
    { id: "4", code: "ZN-UPTOWN-02", name: "Highland Plateau Sector", risk: "LOW" as const, waterLevel: "-0.1m", drainage: "82%" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-h2 font-bold tracking-tight text-(--text-primary)">
            Operational Risk Dashboard
          </h1>
          <p className="text-body-small text-(--text-muted)">
            Urban catchment flood risk telemetry and early warning intelligence
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/app/alerts">
            <Button variant="risk" size="sm">
              <AlertTriangle className="h-4 w-4 mr-1.5" /> Issue Operational Warning
            </Button>
          </Link>
          <Link href="/app/map">
            <Button variant="outline" size="sm">
              View Spatial Risk Map
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-label text-(--text-muted)">{m.label}</span>
              {m.icon}
            </CardHeader>
            <CardContent>
              <div className="text-display text-2xl font-bold font-mono text-(--text-primary)">
                {m.value}
              </div>
              <p className="text-caption text-(--text-muted) mt-1">{m.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid: Priority Zones & Forecast Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Priority Catchment Zones</CardTitle>
              <p className="text-body-small text-(--text-muted)">
                Current water level anomalies and drainage load
              </p>
            </div>
            <Link href="/app/zones" className="text-caption text-(--brand-primary) flex items-center gap-1 hover:underline">
              View All Zones <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-(--border-subtle)">
              {recentZones.map((z) => (
                <div key={z.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
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
                    <div>
                      <div className="font-semibold text-body-small text-(--text-primary)">
                        {z.name}
                      </div>
                      <div className="text-caption text-(--text-muted) font-mono">{z.code}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-body-small font-semibold text-(--text-primary)">
                      {z.waterLevel}
                    </div>
                    <div className="text-caption text-(--text-muted)">Drainage: {z.drainage}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prediction Insights Card */}
        <Card>
          <CardHeader>
            <CardTitle>Telemetry Freshness</CardTitle>
            <p className="text-body-small text-(--text-muted)">Hydrological model run details</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-(--border-subtle) bg-(--surface-subtle) p-3">
              <div className="text-caption text-(--text-muted)">Model Horizon</div>
              <div className="text-body font-semibold text-(--text-primary) flex items-center gap-2 mt-0.5">
                <TrendingUp className="h-4 w-4 text-(--brand-primary)" /> T+6h through T+24h
              </div>
            </div>

            <div className="space-y-2 text-body-small">
              <div className="flex justify-between">
                <span className="text-(--text-muted)">Confidence Index</span>
                <span className="font-mono font-semibold text-emerald-500">92.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-(--text-muted)">Primary Risk Driver</span>
                <span className="font-medium text-(--text-primary)">High Runoff Surge</span>
              </div>
              <div className="flex justify-between">
                <span className="text-(--text-muted)">Operational Status</span>
                <span className="font-medium text-emerald-500">Live Telemetry</span>
              </div>
            </div>

            <Link href="/app/predictions" className="block pt-2">
              <Button variant="outline" className="w-full text-body-small">
                Inspect Predictive Drivers
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
