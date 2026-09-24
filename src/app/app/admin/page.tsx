import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Users, Database, FileText } from "lucide-react";

export default function AdminOverviewPage() {
  const cards = [
    { title: "Active Operators", count: "12", sub: "3 On-Duty currently", icon: <Users className="h-5 w-5 text-blue-500" /> },
    { title: "Monitored Catchments", count: "24", sub: "All geometries valid", icon: <ShieldCheck className="h-5 w-5 text-emerald-500" /> },
    { title: "Connected Data Feeds", count: "6", sub: "Radar, gauges, telemetry", icon: <Database className="h-5 w-5 text-purple-500" /> },
    { title: "Audit Trail Records", count: "1,428", sub: "Immutable system logs", icon: <FileText className="h-5 w-5 text-amber-500" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card key={c.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-label text-(--text-muted)">{c.title}</span>
              {c.icon}
            </CardHeader>
            <CardContent>
              <div className="text-display text-2xl font-bold font-mono text-(--text-primary)">
                {c.count}
              </div>
              <p className="text-caption text-(--text-muted) mt-1">{c.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Administrative Governance & Guardrails</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-body-small text-(--text-secondary)">
          <p>
            This portal is restricted to authorized emergency administrative personnel. All state mutations
            are recorded in the PostgreSQL audit log table with operator cryptographic signature and IP footprint.
          </p>
          <div className="flex gap-2 pt-2">
            <Badge variant="default">Strict RLS Active</Badge>
            <Badge variant="secondary">Zero-Trust Boundaries</Badge>
            <Badge variant="secondary">Immutable Auditing</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
