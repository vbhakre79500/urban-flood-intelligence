import { PublicShell } from "@/components/layout/public-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export default function StatusPage() {
  const subsystems = [
    { name: "Doppler Weather Radar Ingestion", status: "Operational", latency: "42ms" },
    { name: "Hydrological Catchment Model (v2.4)", status: "Operational", latency: "115ms" },
    { name: "Urban Drainage Sensor Telemetry", status: "Degraded Mode (3/14 offline)", latency: "230ms", degraded: true },
    { name: "Civil Warning Alert Dispatcher", status: "Operational", latency: "18ms" },
    { name: "Edge API & Map Tile CDN", status: "Operational", latency: "12ms" },
    { name: "PostgreSQL Database Cluster", status: "Operational", latency: "4ms" },
  ];

  return (
    <PublicShell>
      <div className="py-12 px-6 max-w-4xl mx-auto w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-(--border-subtle) pb-6 gap-4">
          <div>
            <h1 className="text-h1 font-bold text-(--text-primary)">Operational System Status</h1>
            <p className="mt-1 text-body-small text-(--text-muted)">
              Real-time telemetry and service health indicators for flood intelligence services.
            </p>
          </div>
          <Badge variant="success" className="h-8 px-3 text-body-small">
            All Core Systems Normal
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subsystem Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subsystems.map((sub) => (
              <div
                key={sub.name}
                className="flex items-center justify-between border-b border-(--border-subtle) pb-3 last:border-0"
              >
                <div className="flex items-center gap-3">
                  {sub.degraded ? (
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  )}
                  <div>
                    <div className="text-body font-medium text-(--text-primary)">{sub.name}</div>
                    <div className="text-caption text-(--text-muted)">Latency: {sub.latency}</div>
                  </div>
                </div>
                <Badge variant={sub.degraded ? "warning" : "success"}>{sub.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PublicShell>
  );
}
