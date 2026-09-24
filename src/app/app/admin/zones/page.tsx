import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminZonesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-h3 font-bold text-(--text-primary)">Zone Geometry & Baselines</h2>
          <p className="text-body-small text-(--text-muted)">Configure micro-catchments, elevation contours, and drainage parameters</p>
        </div>
        <Button size="sm">Register New Catchment</Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-body-small text-(--text-muted)">
            Administrative zone boundary GeoJSON upload and drainage capacity adjustments are configured here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
