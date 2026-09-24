import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: "1",
      title: "Flash Inundation Warning Dispatched",
      message: "Emergency broadcast transmitted to 14,200 registered citizen devices in Estuary Marshlands.",
      channel: "SMS / PUSH",
      time: "22 mins ago",
      read: false,
    },
    {
      id: "2",
      title: "Model Cycle Refresh Completed",
      message: "Predictive model inference cycle completed with 94.2% confidence.",
      channel: "SYSTEM",
      time: "1 hour ago",
      read: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h2 font-bold text-(--text-primary)">Alert & Civil Notifications</h1>
        <p className="text-body-small text-(--text-muted)">
          Operational communication channels and citizen warning dispatch log
        </p>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <Card key={n.id} className={n.read ? "opacity-75" : "border-l-4 border-l-(--brand-primary)"}>
            <CardContent className="p-4 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-(--brand-primary)/10 text-(--brand-primary) flex items-center justify-center shrink-0 mt-0.5">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-body font-semibold text-(--text-primary)">{n.title}</h4>
                  <p className="text-body-small text-(--text-secondary) mt-1">{n.message}</p>
                  <div className="flex items-center gap-3 mt-2 text-caption text-(--text-muted)">
                    <span>{n.time}</span>
                    <span>•</span>
                    <Badge variant="outline">{n.channel}</Badge>
                  </div>
                </div>
              </div>
              {!n.read && (
                <span className="h-2 w-2 rounded-full bg-(--brand-primary) shrink-0" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
