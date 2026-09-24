"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FilePlus, CheckCircle2 } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";

export default function CitizenReportPage() {
  const [incidentType, setIncidentType] = React.useState("WATERLOGGING");
  const [location, setLocation] = React.useState("");
  const [depth, setDepth] = React.useState("ANKLE");
  const [description, setDescription] = React.useState("");
  const [contactPhone, setContactPhone] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [submittedId, setSubmittedId] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    // Specific field validation (Requirement 24)
    if (!location.trim()) {
      errors.location = "Location or landmark is required to dispatch municipal pumps.";
    } else if (location.trim().length < 5) {
      errors.location = "Please provide a more specific street or landmark.";
    }

    if (!description.trim()) {
      errors.description = "Please describe the observed water situation or hazards.";
    }

    if (contactPhone.trim() && !/^[0-9+\s-]{8,15}$/.test(contactPhone.trim())) {
      errors.contactPhone = "Please enter a valid phone number (8 to 15 digits).";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      const generatedRefId = `REP-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 900000
      )}`;
      setIsSubmitting(false);
      setSubmittedId(generatedRefId);
    }, 400);
  };

  const handleReset = () => {
    setSubmittedId(null);
    setLocation("");
    setDescription("");
    setContactPhone("");
    setFieldErrors({});
  };

  if (submittedId) {
    // Form Success State (Requirement 23)
    return (
      <div className="space-y-4 animate-in fade-in duration-200">
        <Card className="border-emerald-500/30 bg-emerald-500/5 shadow-md">
          <CardContent className="p-6 text-center space-y-4">
            <div className="mx-auto h-14 w-14 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <h2 className="text-h3 font-bold text-(--text-primary)">
                Report Successfully Dispatched
              </h2>
              <p className="mt-1 text-body-small text-(--text-secondary) max-w-sm mx-auto">
                Your incident report has been routed to the local Disaster Management Pumping & Rescue
                Desk.
              </p>
            </div>

            <div className="rounded-lg border border-emerald-500/30 bg-(--surface) p-3 max-w-xs mx-auto space-y-1">
              <div className="text-caption text-(--text-muted)">Incident Reference Number</div>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-body font-bold text-emerald-600 dark:text-emerald-400">
                  {submittedId}
                </span>
                <CopyButton value={submittedId} label="Copy ID" />
              </div>
            </div>

            <div className="rounded-md bg-(--surface-subtle) p-3 text-left text-caption text-(--text-muted) space-y-1">
              <div className="font-semibold text-(--text-secondary)">Next Steps:</div>
              <div>• A municipal duty officer reviews incoming reports every 3 minutes.</div>
              <div>• If critical rescue is needed, call <strong>112</strong> immediately.</div>
              <div>• Keep this reference number for status verification with ward officials.</div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Link href="/citizen">
                <Button className="w-full">Return to Citizen Portal Home</Button>
              </Link>
              <Button variant="outline" onClick={handleReset} className="w-full">
                Submit Another Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-h2 font-bold text-(--text-primary)">Report Flood Incident</h1>
        <p className="text-body-small text-(--text-muted) mt-0.5">
          Report localized waterlogging, overflowing drains, or stranded residents to municipal teams.
        </p>
      </div>

      <Card className="border-(--border-subtle)">
        <CardContent className="p-4 pt-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Incident Type */}
            <div className="space-y-1.5">
              <label
                htmlFor="incident-type"
                className="text-body-small font-medium text-(--text-secondary)"
              >
                Incident Category
              </label>
              <select
                id="incident-type"
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="w-full rounded-md border border-(--border-default) bg-(--surface) px-3 py-2 text-body-small text-(--text-primary) focus:border-(--brand-primary) focus:outline-none"
              >
                <option value="WATERLOGGING">Street / Roadway Waterlogging</option>
                <option value="BLOCKED_DRAIN">Blocked Culvert or Storm Drain</option>
                <option value="INUNDATED_PROPERTY">Residential / Commercial Inundation</option>
                <option value="ELECTRICAL_HAZARD">Submerged Transformer / Live Wire</option>
                <option value="STRANDED_PERSONS">Stranded Residents Requiring Rescue</option>
              </select>
            </div>

            {/* Estimated Water Depth */}
            <div className="space-y-1.5">
              <label className="text-body-small font-medium text-(--text-secondary)">
                Estimated Water Depth
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "ANKLE", label: "Ankle (0.1 - 0.3m)" },
                  { id: "KNEE", label: "Knee (0.3 - 0.6m)" },
                  { id: "WAIST", label: "Waist+ (> 0.9m)" },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDepth(d.id)}
                    className={`p-2 rounded-md border text-caption font-medium transition-colors cursor-pointer ${
                      depth === d.id
                        ? "border-(--brand-primary) bg-(--brand-primary)/10 text-(--brand-primary) font-semibold"
                        : "border-(--border-subtle) bg-(--surface) text-(--text-secondary) hover:bg-(--surface-subtle)"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Field with specific error (Requirement 24) */}
            <div className="space-y-1.5">
              <label
                htmlFor="incident-location"
                className="text-body-small font-medium text-(--text-secondary)"
              >
                Street Name / Ward Landmark <span className="text-red-500">*</span>
              </label>
              <Input
                id="incident-location"
                type="text"
                placeholder="e.g. Cross Road 4, near Metro Pillar 114, Riverfront Ward"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (fieldErrors.location) {
                    setFieldErrors((prev) => ({ ...prev, location: "" }));
                  }
                }}
                className={fieldErrors.location ? "border-red-500" : ""}
                aria-invalid={Boolean(fieldErrors.location)}
                aria-describedby={fieldErrors.location ? "location-error" : undefined}
              />
              {fieldErrors.location && (
                <p id="location-error" className="text-caption text-red-500 font-medium">
                  {fieldErrors.location}
                </p>
              )}
            </div>

            {/* Description Field with specific error (Requirement 24) */}
            <div className="space-y-1.5">
              <label
                htmlFor="incident-desc"
                className="text-body-small font-medium text-(--text-secondary)"
              >
                Incident Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="incident-desc"
                placeholder="Describe current water flow, affected buildings, elderly/children needing assistance..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (fieldErrors.description) {
                    setFieldErrors((prev) => ({ ...prev, description: "" }));
                  }
                }}
                className={fieldErrors.description ? "border-red-500" : ""}
                rows={3}
                aria-invalid={Boolean(fieldErrors.description)}
                aria-describedby={fieldErrors.description ? "desc-error" : undefined}
              />
              {fieldErrors.description && (
                <p id="desc-error" className="text-caption text-red-500 font-medium">
                  {fieldErrors.description}
                </p>
              )}
            </div>

            {/* Optional Contact Phone */}
            <div className="space-y-1.5">
              <label
                htmlFor="incident-phone"
                className="text-body-small font-medium text-(--text-secondary)"
              >
                Contact Phone for Rescue Callback (Optional)
              </label>
              <Input
                id="incident-phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={contactPhone}
                onChange={(e) => {
                  setContactPhone(e.target.value);
                  if (fieldErrors.contactPhone) {
                    setFieldErrors((prev) => ({ ...prev, contactPhone: "" }));
                  }
                }}
                className={fieldErrors.contactPhone ? "border-red-500" : ""}
                aria-invalid={Boolean(fieldErrors.contactPhone)}
                aria-describedby={fieldErrors.contactPhone ? "phone-error" : undefined}
              />
              {fieldErrors.contactPhone && (
                <p id="phone-error" className="text-caption text-red-500 font-medium">
                  {fieldErrors.contactPhone}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full gap-2 mt-2" isLoading={isSubmitting}>
              <FilePlus className="h-4 w-4" />
              Submit Incident Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
