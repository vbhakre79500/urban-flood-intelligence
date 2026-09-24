import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function AlertDetailPage({
  params,
}: {
  params: Promise<{ alertId: string }>;
}) {
  const resolvedParams = await params;
  const alertId = resolvedParams.alertId;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/app/alerts">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Alerts
          </Button>
        </Link>
        <div>
          <h1 className="text-h2 font-bold text-(--text-primary)">Alert Record: {alertId}</h1>
          <p className="text-body-small text-(--text-muted)">
            Operational directives, evacuation thresholds, and civil action guidelines
          </p>
        </div>
      </div>

      <Card className="border-l-4 border-l-(--destructive)">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="risk-critical">EMERGENCY WARNING</Badge>
            <span className="text-caption text-(--text-muted)">Status: ACTIVE</span>
          </div>
          <CardTitle className="mt-2">Flash Inundation Emergency Warning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-red-500/10 p-4 border border-red-500/20 text-body-small text-red-700 dark:text-red-300">
            Immediate threat to low-lying transport links. Citizens are advised to avoid underpasses and estuary walkways.
          </div>

          <div>
            <h4 className="text-body font-semibold text-(--text-primary) mb-2">Mandatory Action Guidelines</h4>
            <ul className="list-disc list-inside space-y-1 text-body-small text-(--text-secondary)">
              <li>Deploy hydraulic flood barriers at Sectors 3 and 4</li>
              <li>Redirect vehicular traffic from Coastal Expressway</li>
              <li>Pre-position emergency water pumps at stormwater drainage outfall</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
