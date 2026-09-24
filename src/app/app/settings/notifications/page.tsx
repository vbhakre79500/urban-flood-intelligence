"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotificationSettingsPage() {
  const [smsEnabled, setSmsEnabled] = React.useState(true);
  const [emailDigest, setEmailDigest] = React.useState(true);
  const [pushAlerts, setPushAlerts] = React.useState(true);

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/app/settings">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Settings
          </Button>
        </Link>
        <div>
          <h1 className="text-h2 font-bold text-(--text-primary)">Notification Settings</h1>
          <p className="text-body-small text-(--text-muted)">
            Dispatch channels and emergency notification routing preferences
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Civil Warning Dispatch Channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-body font-medium text-(--text-primary)">Emergency SMS Broadcast</div>
              <div className="text-caption text-(--text-muted)">Transmit high-priority warnings to citizens via telecom gateway</div>
            </div>
            <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
          </div>

          <div className="flex items-center justify-between border-t border-(--border-subtle) pt-4">
            <div>
              <div className="text-body font-medium text-(--text-primary)">Push Telemetry Alerts</div>
              <div className="text-caption text-(--text-muted)">Instant push notifications to mobile emergency responders</div>
            </div>
            <Switch checked={pushAlerts} onCheckedChange={setPushAlerts} />
          </div>

          <div className="flex items-center justify-between border-t border-(--border-subtle) pt-4">
            <div>
              <div className="text-body font-medium text-(--text-primary)">Daily Hydrological Digest</div>
              <div className="text-caption text-(--text-muted)">Consolidated 24-hour rainfall and water level summary via email</div>
            </div>
            <Switch checked={emailDigest} onCheckedChange={setEmailDigest} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
