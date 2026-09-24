import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-h2 font-bold text-(--text-primary)">System Settings</h1>
        <p className="text-body-small text-(--text-muted)">
          Configure operational thresholds, alerting policies, and security parameters
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-(--brand-primary)/10 text-(--brand-primary)">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Notification Protocols</CardTitle>
                <p className="text-body-small text-(--text-muted)">
                  Emergency broadcast channels and contact lists
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/app/settings/notifications">
              <Button variant="outline" className="w-full">
                Configure Notifications
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Security & Authentication</CardTitle>
                <p className="text-body-small text-(--text-muted)">
                  Session management, MFA, and access keys
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/app/settings/security">
              <Button variant="outline" className="w-full">
                Security Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
