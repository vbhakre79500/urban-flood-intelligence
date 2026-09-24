import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-h2 font-bold text-(--text-primary)">Operator Profile</h1>
        <p className="text-body-small text-(--text-muted)">
          Authenticated personnel details and operational clearance levels
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Credentials & Clearance</CardTitle>
            <Badge variant="default">AUTHORITY OPERATOR</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-caption text-(--text-muted)">Full Name</label>
              <div className="font-semibold text-body">Chief Response Officer</div>
            </div>
            <div>
              <label className="text-caption text-(--text-muted)">Official Email</label>
              <div className="font-semibold text-body">operator@flood.gov.in</div>
            </div>
            <div>
              <label className="text-caption text-(--text-muted)">Department</label>
              <div className="font-semibold text-body">Municipal Disaster Management Authority</div>
            </div>
            <div>
              <label className="text-caption text-(--text-muted)">Operational Jurisdiction</label>
              <div className="font-semibold text-body">Metropolitan Catchment Zone 1-4</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
