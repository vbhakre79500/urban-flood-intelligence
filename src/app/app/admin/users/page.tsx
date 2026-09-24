import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
  const users = [
    { id: "1", name: "Dr. S. Raman", email: "s.raman@flood.gov.in", role: "ADMIN" as const, dept: "Hydrological Command" },
    { id: "2", name: "K. Priya", email: "k.priya@flood.gov.in", role: "AUTHORITY" as const, dept: "Emergency Response" },
    { id: "3", name: "A. Verma", email: "a.verma@flood.gov.in", role: "AUTHORITY" as const, dept: "Drainage Infrastructure" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-h3 font-bold text-(--text-primary)">User & Role Management</h2>
          <p className="text-body-small text-(--text-muted)">Enforce role-based access control (CITIZEN, AUTHORITY, ADMIN)</p>
        </div>
        <Button size="sm">Provision Operator</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Access Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-semibold">{u.name}</TableCell>
                  <TableCell className="font-mono text-body-small">{u.email}</TableCell>
                  <TableCell>{u.dept}</TableCell>
                  <TableCell>
                    <Badge variant={u.role === "ADMIN" ? "default" : "secondary"}>{u.role}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit Clearance</Button>
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
