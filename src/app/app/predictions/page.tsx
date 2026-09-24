import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ArrowRight } from "lucide-react";

export default function PredictionsPage() {
  const predictions = [
    {
      id: "pred-01",
      zone: "Estuary Marshlands",
      code: "ZN-COASTAL-03",
      risk: "CRITICAL" as const,
      rainfall: "82 mm",
      waterLevel: "+1.8m",
      confidence: "94%",
      freshness: "3m ago",
      primaryDriver: "Tidal Surge + Runoff",
    },
    {
      id: "pred-02",
      zone: "Central Riverfront Basin",
      code: "ZN-RIVERFRONT-01",
      risk: "HIGH" as const,
      rainfall: "64 mm",
      waterLevel: "+1.2m",
      confidence: "89%",
      freshness: "5m ago",
      primaryDriver: "Intense Precipitation",
    },
    {
      id: "pred-03",
      zone: "Commercial District Subway",
      code: "ZN-DOWNTOWN-04",
      risk: "MODERATE" as const,
      rainfall: "38 mm",
      waterLevel: "+0.4m",
      confidence: "91%",
      freshness: "8m ago",
      primaryDriver: "Impervious Surface Runoff",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-h2 font-bold text-(--text-primary)">Predictive Flood Intelligence</h1>
          <p className="text-body-small text-(--text-muted)">
            Hydrological forecasting, confidence metrics, and explainable risk drivers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">Model v2.4 Active</Badge>
          <Badge variant="secondary">Inference Cycle: 15m</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Forecast Horizon (T+0h to T+24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone</TableHead>
                <TableHead>Risk Projection</TableHead>
                <TableHead>Expected Rainfall</TableHead>
                <TableHead>Water Crest</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Primary Driver</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictions.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="font-semibold text-(--text-primary)">{p.zone}</div>
                    <div className="font-mono text-caption text-(--text-muted)">{p.code}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={p.risk === "CRITICAL" ? "risk-critical" : p.risk === "HIGH" ? "risk-high" : "risk-moderate"}>
                      {p.risk}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono font-semibold">{p.rainfall}</TableCell>
                  <TableCell className="font-mono">{p.waterLevel}</TableCell>
                  <TableCell className="font-mono text-emerald-500 font-semibold">{p.confidence}</TableCell>
                  <TableCell className="text-body-small">{p.primaryDriver}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/app/predictions/${p.id}`}>
                      <Button variant="ghost" size="sm">
                        Explain Drivers <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
