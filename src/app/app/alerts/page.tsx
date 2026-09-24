import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, ArrowRight } from "lucide-react";

export default function AlertsPage() {
  const activeAlerts = [
    {
      id: "alt-01",
      severity: "EMERGENCY" as const,
      zone: "Estuary Marshlands (ZN-COASTAL-03)",
      title: "Flash Inundation Emergency Warning",
      message: "Severe high-tide combined with 65mm/hr precipitation event creates immediate danger of low-lying road submergence.",
      issuedAt: "18 mins ago",
      expiresIn: "6 hours",
    },
    {
      id: "alt-02",
      severity: "WATCH" as const,
      zone: "Central Riverfront Basin (ZN-RIVERFRONT-01)",
      title: "Elevated Water Level Flood Watch",
      message: "Stream gauges upstream indicate rising hydraulic crest. Expect localized basement and canal overflow.",
      issuedAt: "45 mins ago",
      expiresIn: "12 hours",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-h2 font-bold text-(--text-primary)">Operational Alerts & Civil Warnings</h1>
          <p className="text-body-small text-(--text-muted)">
            Dispatch, manage, and monitor active public civil protection alerts
          </p>
        </div>

        <Link href="/app/admin/alerts">
          <Button variant="risk" size="sm">
            <AlertTriangle className="h-4 w-4 mr-2" /> Authorize New Warning
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {activeAlerts.map((alt) => (
          <Card key={alt.id} className="border-l-4 border-l-(--destructive)">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <Badge variant={alt.severity === "EMERGENCY" ? "risk-critical" : "risk-high"}>
                  {alt.severity}
                </Badge>
                <span className="text-body-small font-semibold text-(--text-muted)">{alt.zone}</span>
              </div>
              <div className="text-caption text-(--text-muted) flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> Issued {alt.issuedAt}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <h3 className="text-h4 font-bold text-(--text-primary)">{alt.title}</h3>
              <p className="text-body-small text-(--text-secondary)">{alt.message}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-caption text-(--text-muted)">Expires in: {alt.expiresIn}</span>
                <Link href={`/app/alerts/${alt.id}`}>
                  <Button variant="outline" size="sm">
                    View Action Protocols <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
