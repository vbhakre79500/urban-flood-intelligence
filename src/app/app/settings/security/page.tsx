import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/app/settings">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Settings
          </Button>
        </Link>
        <div>
          <h1 className="text-h2 font-bold text-(--text-primary)">Security & Access Control</h1>
          <p className="text-body-small text-(--text-muted)">
            Manage multi-factor authentication, cryptographic sessions, and API access
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-body font-medium text-(--text-primary)">HTTP-only Cookie Sessions</div>
              <div className="text-caption text-(--text-muted)">Protected against XSS and client token inspection</div>
            </div>
            <Badge variant="success">Enforced</Badge>
          </div>

          <div className="flex items-center justify-between border-t border-(--border-subtle) pt-4">
            <div>
              <div className="text-body font-medium text-(--text-primary)">PostgreSQL Row Level Security (RLS)</div>
              <div className="text-caption text-(--text-muted)">Enforces database table-level access isolation</div>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
