import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ShieldCheck, Info, MapPin } from "lucide-react";

export default function CitizenAlertsPage() {
  const alerts = [
    {
      id: "alt-1",
      severity: "HIGH" as const,
      title: "Estuary Marshlands Water Surge Warning",
      zone: "Coastal Estuary Sector (Ward 12 & 14)",
      time: "Issued 45 minutes ago • Valid until 6:00 PM today",
      description:
        "High tidal surge combined with upstream runoff has elevated canal levels by +1.8m. Inundation of ground-floor structures in coastal lowlands expected within 2 hours.",
      guidelines: [
        "Move vehicles and livestock to elevated parking or designated high grounds.",
        "Disconnect ground electrical appliances if water enters premises.",
        "Follow ward evacuation instructions towards North Basin High Ground Relief Camp.",
        "Avoid approaching coastal seawalls, sluice gates, and stormwater canals.",
      ],
    },
    {
      id: "alt-2",
      severity: "MODERATE" as const,
      title: "Subway & Underpass Inundation Watch",
      zone: "Commercial District Subway Corridor",
      time: "Issued 2 hours ago • Ongoing surveillance",
      description:
        "Surface runoff accumulation in vehicular underpasses exceeds 0.4m. Road transit diverted via outer ring road.",
      guidelines: [
        "Do not drive into flooded underpasses — water depth is deceptively dangerous.",
        "Pedestrians should avoid open drains, manholes, and fallen electrical cables.",
        "Use elevated pedestrian skywalks across the commercial corridor.",
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-h2 font-bold text-(--text-primary)">Community Flood Alerts</h1>
        <p className="text-body-small text-(--text-muted) mt-0.5">
          Official warnings and safety guidelines issued by the Hydrological Disaster Authority.
        </p>
      </div>

      <div className="flex items-center justify-between text-caption text-(--text-muted) px-1">
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-(--brand-primary)" />
          <span>Last synchronized: 24 Sep 2026, 11:30 AM IST</span>
        </span>
        <Badge variant="risk-critical" className="text-[10px]">
          2 Active Warnings
        </Badge>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className="border-(--border-subtle) overflow-hidden shadow-sm">
            <div
              className={`h-1.5 w-full ${
                alert.severity === "HIGH" ? "bg-(--risk-high)" : "bg-(--risk-moderate)"
              }`}
            />
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-caption font-mono text-(--text-muted)">
                    <MapPin className="h-3.5 w-3.5 text-(--brand-primary)" />
                    <span>{alert.zone}</span>
                  </div>
                  <CardTitle className="text-h4 text-(--text-primary)">{alert.title}</CardTitle>
                </div>
                <Badge
                  variant={alert.severity === "HIGH" ? "risk-high" : "risk-moderate"}
                  className="shrink-0"
                >
                  {alert.severity} Risk
                </Badge>
              </div>
              <div className="text-caption text-(--text-muted) pt-1">{alert.time}</div>
            </CardHeader>

            <CardContent className="p-4 pt-1 space-y-3">
              <p className="text-body-small text-(--text-secondary) leading-relaxed">
                {alert.description}
              </p>

              <div className="rounded-lg bg-(--surface-subtle) p-3 border border-(--border-subtle) space-y-2">
                <div className="text-caption font-semibold text-(--text-primary) flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  What Citizens Must Do:
                </div>
                <ul className="space-y-1.5 text-caption text-(--text-secondary)">
                  {alert.guidelines.map((g, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-(--brand-primary) font-bold mt-0.5">•</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-lg border border-(--border-subtle) bg-(--surface-subtle)/40 p-4 text-caption text-(--text-muted) flex items-start gap-2.5">
        <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
        <p>
          Alerts are automatically triggered when precipitation, river telemetry, and runoff models
          cross verified life-safety thresholds. To report unrecorded localized flooding in your street,
          use the <strong>Report Flooding</strong> feature.
        </p>
      </div>
    </div>
  );
}
