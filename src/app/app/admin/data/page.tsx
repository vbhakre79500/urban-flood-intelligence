import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminDataSourcesPage() {
  const feeds = [
    { name: "Doppler Weather Radar Array", type: "WEATHER_RADAR", status: "ACTIVE" as const, sync: "2m ago" },
    { name: "Urban Stream Gauge Network", type: "STREAM_SENSOR", status: "ACTIVE" as const, sync: "30s ago" },
    { name: "Municipal Precipitation Telemetry", type: "RAIN_GAUGE", status: "DEGRADED" as const, sync: "14m ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-h3 font-bold text-(--text-primary)">Ingestion & Data Sources</h2>
        <p className="text-body-small text-(--text-muted)">Manage weather radar, sensor arrays, and external hydrological APIs</p>
      </div>

      <div className="space-y-4">
        {feeds.map((f) => (
          <Card key={f.name}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-body text-(--text-primary)">{f.name}</div>
                <div className="text-caption text-(--text-muted)">Type: {f.type} • Last sync: {f.sync}</div>
              </div>
              <Badge variant={f.status === "ACTIVE" ? "success" : "warning"}>{f.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
