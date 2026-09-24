import { Card, CardContent } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { Phone, ShieldAlert, HeartPulse, Building2, Flame, AlertTriangle } from "lucide-react";
import { APP_CONFIG } from "@/config";

export default function CitizenContactPage() {
  const contacts = [
    {
      id: "c-1",
      name: "National Unified Emergency Hotline",
      number: APP_CONFIG.emergencyHotline,
      description: "24/7 National Emergency number for police, fire, rescue, and life-safety dispatch.",
      icon: <Phone className="h-5 w-5 text-red-500" />,
      priority: true,
    },
    {
      id: "c-2",
      name: "State Disaster Management Authority (SDMA)",
      number: "1070",
      description: "State disaster relief coordination, boat rescue, and emergency shelter dispatch.",
      icon: <Building2 className="h-5 w-5 text-amber-500" />,
      priority: true,
    },
    {
      id: "c-3",
      name: "District Flood Control Room (DEOC)",
      number: "1077",
      description: "Local district collectorate flood control desk, stormwater pumping, and sandbag dispatch.",
      icon: <ShieldAlert className="h-5 w-5 text-blue-500" />,
      priority: false,
    },
    {
      id: "c-4",
      name: "Emergency Medical & Ambulance Service",
      number: "108",
      description: "Ambulance, trauma support, and hospital evacuation coordination.",
      icon: <HeartPulse className="h-5 w-5 text-emerald-500" />,
      priority: false,
    },
    {
      id: "c-5",
      name: "Fire & Rescue Service Command",
      number: "101",
      description: "Water rescue teams, inflatable rescue boats, and structural collapse response.",
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      priority: false,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-h2 font-bold text-(--text-primary)">Emergency Helplines</h1>
        <p className="text-body-small text-(--text-muted) mt-0.5">
          Verified 24/7 disaster response numbers. Tap to call directly or copy to share.
        </p>
      </div>

      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />
          <div>
            <div className="text-body-small font-bold text-red-600 dark:text-red-400">
              Immediate Life Safety Threat?
            </div>
            <div className="text-caption text-(--text-muted)">
              Do not wait. Dial {APP_CONFIG.emergencyHotline} immediately.
            </div>
          </div>
        </div>
        <a
          href={`tel:${APP_CONFIG.emergencyHotline}`}
          className="rounded-md bg-red-600 hover:bg-red-700 text-white font-bold px-3.5 py-1.5 text-body-small shrink-0 transition-colors shadow-sm"
        >
          Call 112
        </a>
      </div>

      <div className="space-y-3">
        {contacts.map((c) => (
          <Card key={c.id} className="border-(--border-subtle) hover:border-(--border-default) transition-colors">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-(--surface-subtle) border border-(--border-subtle) flex items-center justify-center shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <h2 className="text-body font-bold text-(--text-primary)">{c.name}</h2>
                    <p className="text-caption text-(--text-muted) mt-0.5 leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-(--border-subtle)">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-h4 font-extrabold text-(--brand-primary)">
                    {c.number}
                  </span>
                  {/* Copy Button (Requirement 17) */}
                  <CopyButton value={c.number} label="Copy" />
                </div>

                <a
                  href={`tel:${c.number}`}
                  className="inline-flex items-center gap-1.5 rounded-md bg-(--brand-primary) hover:bg-(--brand-secondary) text-white font-semibold px-3 py-1.5 text-body-small transition-colors shadow-xs"
                  aria-label={`Dial ${c.name} at ${c.number}`}
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call</span>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
