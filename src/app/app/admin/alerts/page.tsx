"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { AlertTriangle, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminAlertsPage() {
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [isDispatched, setIsDispatched] = React.useState(false);
  const selectedZone = "Estuary Marshlands (ZN-COASTAL-03)";

  const handleDispatch = () => {
    setIsDispatched(true);
    setIsConfirmOpen(false);
    setTimeout(() => {
      setIsDispatched(false);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-h3 font-bold text-(--text-primary)">Alert Dispatch Console</h2>
          <p className="text-body-small text-(--text-muted)">
            Transmit emergency civil protection directives with cryptographic logging
          </p>
        </div>
        {/* High-Impact Action requiring confirmation (Requirement 25) */}
        <Button variant="risk" size="sm" onClick={() => setIsConfirmOpen(true)}>
          <AlertTriangle className="h-4 w-4 mr-1.5" /> Emergency Warning Trigger
        </Button>
      </div>

      {isDispatched && (
        <div
          role="status"
          className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400 flex items-center justify-between animate-in fade-in"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <div>
              <div className="text-body-small font-bold">Civil Emergency Warning Dispatched</div>
              <div className="text-caption text-(--text-muted)">
                Atomic transaction complete • Public sirens & SMS broadcast triggered for {selectedZone}.
              </div>
            </div>
          </div>
          <Badge variant="success" className="text-[10px]">DISPATCHED</Badge>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Broadcast Configuration & Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-body-small text-(--text-muted)">
            Operational alerts trigger atomic PostgreSQL database transactions ensuring simultaneous
            creation of public alerts and immutable compliance audit logs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3 rounded-lg border border-(--border-subtle) bg-(--surface-subtle) space-y-1">
              <span className="text-caption text-(--text-muted)">Target Zone</span>
              <div className="text-body-small font-semibold text-(--text-primary)">{selectedZone}</div>
            </div>
            <div className="p-3 rounded-lg border border-(--border-subtle) bg-(--surface-subtle) space-y-1">
              <span className="text-caption text-(--text-muted)">Severity Protocol</span>
              <div className="text-body-small font-semibold text-red-500">Tier-1 Life-Safety EMERGENCY</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal (Requirement 25) */}
      <Dialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        title="Confirm Civil Emergency Warning Broadcast"
        description="This action will issue an immediate public emergency warning across all civil channels."
      >
        <div className="space-y-4 pt-2">
          <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-caption text-(--destructive) flex items-start gap-2.5">
            <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">High-Impact Emergency Broadcast:</strong>
              Public notifications will be pushed immediately to all connected Citizen Portals, SMS
              relays, and municipal disaster responders.
            </div>
          </div>

          <div className="space-y-1.5 text-body-small text-(--text-secondary)">
            <div className="flex justify-between">
              <span className="text-(--text-muted)">Target Micro-Catchment:</span>
              <span className="font-semibold text-(--text-primary)">{selectedZone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-(--text-muted)">Broadcast Severity:</span>
              <span className="font-semibold text-red-500">CRITICAL EMERGENCY</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-(--border-subtle)">
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="risk" onClick={handleDispatch}>
              Confirm & Dispatch Alert
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
