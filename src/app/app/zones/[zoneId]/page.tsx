import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function ZoneDetailPage({
  params,
}: {
  params: Promise<{ zoneId: string }>;
}) {
  const resolvedParams = await params;
  const zoneId = resolvedParams.zoneId;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/app/zones">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Zones
          </Button>
        </Link>
        <div>
          <h1 className="text-h2 font-bold text-(--text-primary)">Zone Profile: {zoneId}</h1>
          <p className="text-body-small text-(--text-muted)">
            Catchment hydrology telemetry and historical risk profile
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Hydrological Topography</CardTitle>
              <Badge variant="risk-high">High Baseline Risk</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-(--surface-subtle)">
                <div className="text-caption text-(--text-muted)">Elevation Above Sea Level</div>
                <div className="text-body-large font-bold mt-1">12.4 meters</div>
              </div>
              <div className="p-3 rounded-lg bg-(--surface-subtle)">
                <div className="text-caption text-(--text-muted)">Drainage Capacity Score</div>
                <div className="text-body-large font-bold mt-1">35 / 100</div>
              </div>
            </div>
            <p className="text-body-small text-(--text-secondary)">
              Zone features significant low-lying topography with historical riverbank breach vulnerability
              during high precipitation events (&gt; 50mm/hr).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Telemetry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-body-small">
              <span className="text-(--text-muted)">Current Water Level</span>
              <span className="font-mono font-bold">+1.2m</span>
            </div>
            <div className="flex items-center justify-between text-body-small">
              <span className="text-(--text-muted)">Sensor Signal</span>
              <span className="text-emerald-500 font-medium">Active (100%)</span>
            </div>
            <div className="flex items-center justify-between text-body-small">
              <span className="text-(--text-muted)">Last Telemetry Sync</span>
              <span>2 mins ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
