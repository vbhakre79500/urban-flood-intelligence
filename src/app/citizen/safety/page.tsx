"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Button } from "@/components/ui/button";
import {
  ShieldAlert,
  Printer,
  CheckSquare,
  AlertTriangle,
  HelpCircle,
  HeartPulse,
} from "lucide-react";

export default function CitizenSafetyPage() {
  const handlePrint = () => {
    window.print();
  };

  const checklistItems = [
    "Drinking water stored in clean, sealed containers (at least 3 liters per person/day for 3 days).",
    "Waterproof pouch with identification documents, property papers, insurance, and medical records.",
    "First aid kit, essential prescription medications (7-day supply), and sanitary supplies.",
    "Battery-powered or hand-crank emergency radio, high-power LED torch, and spare batteries.",
    "Fully charged power bank and mobile phone charging cables.",
    "Non-perishable ready-to-eat dry foods (energy bars, biscuits, canned food) and manual can opener.",
    "Sturdy waterproof boots, raincoats, and emergency thermal blankets.",
  ];

  return (
    <div className="space-y-6">
      {/* Scroll Progress Indicator for Long Guide (Requirement 16) */}
      <ScrollProgress />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-h2 font-bold text-(--text-primary)">
            Flood Preparedness & Survival Manual
          </h1>
          <p className="text-body-small text-(--text-muted) mt-0.5">
            Vital civic protocols to protect lives and property before, during, and after flood inundation.
          </p>
        </div>

        {/* Print Button (Requirement 18) */}
        <Button
          onClick={handlePrint}
          variant="outline"
          size="sm"
          className="gap-1.5 self-start sm:self-auto no-print"
        >
          <Printer className="h-4 w-4" />
          Print Checklist
        </Button>
      </div>

      {/* Three Phased Action Guide */}
      <div className="space-y-4">
        {/* Phase 1: Before Flood */}
        <Card className="border-(--border-subtle) print-readable">
          <CardHeader className="p-4 pb-2 bg-emerald-500/5 border-b border-(--border-subtle)">
            <CardTitle className="text-h4 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Phase 1: Before Flooding (Preparedness)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2.5 text-body-small text-(--text-secondary)">
            <p>
              • <strong>Know your catchment zone:</strong> Check the Citizen Portal daily during
              monsoon seasons for zone-specific flood probability alerts.
            </p>
            <p>
              • <strong>Clear domestic stormwater drains:</strong> Ensure private gutters and downspouts
              are free of debris and plastic silt.
            </p>
            <p>
              • <strong>Elevate vital utilities:</strong> Elevate electrical panels, water heaters, and
              appliances at least 1 meter above floor level if located in ground-floor premises.
            </p>
            <p>
              • <strong>Identify high ground:</strong> Memorize the designated evacuation route to your
              nearest community shelter (accessible in the Safe Map tab).
            </p>
          </CardContent>
        </Card>

        {/* Phase 2: During Flood */}
        <Card className="border-(--border-subtle) print-readable">
          <CardHeader className="p-4 pb-2 bg-amber-500/5 border-b border-(--border-subtle)">
            <CardTitle className="text-h4 text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Phase 2: During Flooding (Immediate Survival)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2.5 text-body-small text-(--text-secondary)">
            <p>
              • <strong>Turn off master utilities:</strong> Switch off the main electricity breaker and gas
              valves before floodwaters enter your dwelling.
            </p>
            <p>
              • <strong>Never walk through moving water:</strong> 15 centimeters (6 inches) of moving
              water can knock down an adult. Always use a pole or stick to check ground firmness.
            </p>
            <p>
              • <strong>Never drive through water:</strong> 30 centimeters (12 inches) of water can float
              most standard passenger vehicles. If trapped in a rising car, abandon the car immediately
              and move to higher ground.
            </p>
            <p>
              • <strong>Avoid electrical hazards:</strong> Stay at least 10 meters away from fallen power
              cables, submerged junction boxes, and streetlights.
            </p>
          </CardContent>
        </Card>

        {/* Phase 3: After Flood */}
        <Card className="border-(--border-subtle) print-readable">
          <CardHeader className="p-4 pb-2 bg-blue-500/5 border-b border-(--border-subtle)">
            <CardTitle className="text-h4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Phase 3: After Water Recedes (Recovery)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2.5 text-body-small text-(--text-secondary)">
            <p>
              • <strong>Wait for official clearance:</strong> Do not return to your home until municipal
              authorities confirm the area is structurally safe.
            </p>
            <p>
              • <strong>Boil all drinking water:</strong> Floodwaters severely contaminate piped water
              and municipal borewells. Boil water vigorously for at least 1 minute before consumption.
            </p>
            <p>
              • <strong>Watch for wildlife & pests:</strong> Snakes, rodents, and insects frequently seek
              refuge in flooded houses. Wear heavy gloves and boots during cleanup.
            </p>
            <p>
              • <strong>Document damages:</strong> Take photographic evidence of waterlines and damage
              before cleanup for municipal relief assistance claims.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Printable Emergency Preparedness Checklist */}
      <Card className="border-(--border-default) print-readable">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-h4 flex items-center gap-2 text-(--text-primary)">
            <HeartPulse className="h-5 w-5 text-red-500" />
            72-Hour Emergency Go-Bag Checklist
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="space-y-2">
            {checklistItems.map((item, idx) => (
              <label
                key={idx}
                className="flex items-start gap-2.5 p-2 rounded-md hover:bg-(--surface-subtle) transition-colors cursor-pointer text-body-small text-(--text-secondary)"
              >
                <input
                  type="checkbox"
                  className="mt-1 rounded border-(--border-default) text-(--brand-primary) focus:ring-(--brand-primary)"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expandable FAQ (Requirement 27) */}
      <div className="space-y-3 no-print">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-(--brand-primary)" />
          <h2 className="text-h3 font-bold text-(--text-primary)">
            Frequently Asked Questions (FAQ)
          </h2>
        </div>

        <Accordion>
          <AccordionItem
            id="faq-1"
            question="What do the four flood risk levels mean?"
            defaultOpen={true}
            answer={
              <div className="space-y-2">
                <p>
                  <strong>LOW (Green):</strong> Normal hydrological telemetry. Water levels within safe
                  drainage margins.
                </p>
                <p>
                  <strong>MODERATE (Yellow):</strong> Rainfall rate is elevated. Minor water accumulation
                  in low-lying streets and depression corridors.
                </p>
                <p>
                  <strong>HIGH (Orange):</strong> Runoff exceeds 65% of drainage capacity. Water levels
                  rising rapidly; prepare for evacuation if advised.
                </p>
                <p>
                  <strong>CRITICAL (Red):</strong> Extreme inundation hazard. Immediate threat to life and
                  ground-floor dwellings. Move to designated high ground immediately.
                </p>
              </div>
            }
          />

          <AccordionItem
            id="faq-2"
            question="What should I do as soon as a flood warning is issued?"
            answer="Check your phone for SMS or portal notifications. Secure your 72-hour Go-Bag, elevate irreplaceable possessions, switch off primary power breakers, and proceed calmly along designated elevated evacuation routes towards the nearest open relief camp."
          />

          <AccordionItem
            id="faq-3"
            question="How are alerts generated by this system?"
            answer="Alerts are produced by combining real-time rainfall radar telemetry, micro-catchment elevation models, urban drainage capacity ratings, and automated hydrological predictive algorithms monitored by municipal disaster command duty officers."
          />

          <AccordionItem
            id="faq-4"
            question="How can I report localized flooding in my street?"
            answer="Navigate to the 'Report Flooding' section from the Citizen Portal home. Provide your neighborhood location, estimated water depth, and emergency remarks. Reports are relayed directly to municipal pumping and rescue dispatch teams."
          />

          <AccordionItem
            id="faq-5"
            question="What should I do if mobile connectivity is lost during an emergency?"
            answer="Tune into local All India Radio / emergency AM/FM broadcasts on battery power. Follow ward sirens and community announcements. Move towards established public relief camps (e.g. municipal stadiums and elevated civic schools), which are equipped with satellite comms and generator power."
          />
        </Accordion>
      </div>
    </div>
  );
}
