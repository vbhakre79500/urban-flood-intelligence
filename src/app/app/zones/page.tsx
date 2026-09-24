import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ArrowRight, MapPin } from "lucide-react";

export default function ZonesPage() {
  const zonesList = [
    { id: "1", code: "ZN-COASTAL-03", name: "Estuary Marshlands", district: "South Coastal", risk: "CRITICAL" as const, elev: 3.2, drainage: "20%", pop: "6,900" },
    { id: "2", code: "ZN-RIVERFRONT-01", name: "Central Riverfront Basin", district: "Downtown North", risk: "HIGH" as const, elev: 12.4, drainage: "35%", pop: "8,500" },
    { id: "3", code: "ZN-DOWNTOWN-04", name: "Commercial District Subway", district: "Metropolitan Center", risk: "MODERATE" as const, elev: 18.0, drainage: "55%", pop: "14,200" },
    { id: "4", code: "ZN-UPTOWN-02", name: "Highland Plateau Sector", district: "West Hills", risk: "LOW" as const, elev: 48.6, drainage: "82%", pop: "4,200" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-h2 font-bold text-(--text-primary)">Urban Catchment Zones</h1>
          <p className="text-body-small text-(--text-muted)">
            Monitored municipal hydrological sub-sectors and topography classifications
          </p>
        </div>
        <Link href="/app/map">
          <Button variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-2" /> Spatial Map View
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Active Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone Code</TableHead>
                <TableHead>Zone Name</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Baseline Risk</TableHead>
                <TableHead>Elevation</TableHead>
                <TableHead>Drainage Capacity</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zonesList.map((z) => (
                <TableRow key={z.id}>
                  <TableCell className="font-mono font-semibold">{z.code}</TableCell>
                  <TableCell className="font-medium text-(--text-primary)">{z.name}</TableCell>
                  <TableCell className="text-(--text-secondary)">{z.district}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        z.risk === "CRITICAL"
                          ? "risk-critical"
                          : z.risk === "HIGH"
                          ? "risk-high"
                          : z.risk === "MODERATE"
                          ? "risk-moderate"
                          : "risk-low"
                      }
                    >
                      {z.risk}
                    </Badge>
                  </TableCell>
                  <TableCell>{z.elev} m</TableCell>
                  <TableCell>{z.drainage}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/app/zones/${z.id}`}>
                      <Button variant="ghost" size="sm">
                        Details <ArrowRight className="h-4 w-4 ml-1" />
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
