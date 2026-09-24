import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function AdminAuditPage() {
  const auditLogs = [
    { id: "aud-1", timestamp: "2026-09-24 02:45:12", user: "Chief Response Officer", action: "ALERT_ISSUED", entity: "ALERT/alt-01", ip: "192.168.1.45" },
    { id: "aud-2", timestamp: "2026-09-24 02:30:00", user: "System Scheduler", action: "MODEL_RUN_COMPLETED", entity: "MODEL/v2.4", ip: "10.0.0.12" },
    { id: "aud-3", timestamp: "2026-09-24 01:15:22", user: "Admin", action: "ZONE_BASELINE_MODIFIED", entity: "ZONE/ZN-COASTAL-03", ip: "192.168.1.10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-h3 font-bold text-(--text-primary)">Immutable Audit Trail</h2>
        <p className="text-body-small text-(--text-muted)">Tamper-evident record of all operator actions and critical system mutations</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target Entity</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-caption">{log.timestamp}</TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell className="font-mono font-semibold text-(--brand-primary)">{log.action}</TableCell>
                  <TableCell className="font-mono text-body-small">{log.entity}</TableCell>
                  <TableCell className="font-mono text-caption">{log.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
