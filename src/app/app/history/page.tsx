import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function HistoryPage() {
  const events = [
    { date: "2026-08-14", zone: "Estuary Marshlands", event: "Monsoon Surge Peak", crest: "+2.1m", severity: "HIGH" as const, duration: "18h" },
    { date: "2026-07-22", zone: "Central Riverfront Basin", event: "Overbank Inundation", crest: "+1.6m", severity: "HIGH" as const, duration: "12h" },
    { date: "2026-06-05", zone: "Commercial District Subway", event: "Drainage Backflow", crest: "+0.6m", severity: "MODERATE" as const, duration: "4h" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h2 font-bold text-(--text-primary)">Historical Flood & Inundation Archive</h1>
        <p className="text-body-small text-(--text-muted)">
          Chronological record of past inundation events, crest recordings, and impact evaluations
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historical Flood Inundation Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Date</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Event Classification</TableHead>
                <TableHead>Peak Crest</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((e, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-mono">{e.date}</TableCell>
                  <TableCell className="font-medium">{e.zone}</TableCell>
                  <TableCell>{e.event}</TableCell>
                  <TableCell className="font-mono">{e.crest}</TableCell>
                  <TableCell>
                    <Badge variant={e.severity === "HIGH" ? "risk-high" : "risk-moderate"}>
                      {e.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{e.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
