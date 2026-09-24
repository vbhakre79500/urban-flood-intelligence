import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function PredictionDetailPage({
  params,
}: {
  params: Promise<{ predictionId: string }>;
}) {
  const resolvedParams = await params;
  const predictionId = resolvedParams.predictionId;

  const drivers = [
    { factor: "Precipitation Accumulation Rate", weight: 45, desc: "Exceeds 90th percentile historical benchmark" },
    { factor: "Antecedent Soil Saturation", weight: 30, desc: "Soil storage capacity at 88% capacity" },
    { factor: "Tidal Elevation Backflow", weight: 15, desc: "High astronomical tide impeding gravity outflow" },
    { factor: "Drainage Inlet Choke Ratio", weight: 10, desc: "Culvert throughput restricted by debris index" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/app/predictions">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Predictions
          </Button>
        </Link>
        <div>
          <h1 className="text-h2 font-bold text-(--text-primary)">Forecast Explainability: {predictionId}</h1>
          <p className="text-body-small text-(--text-muted)">
            Breakdown of contributing features and model inference weights
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Feature Contribution Weights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {drivers.map((d) => (
              <div key={d.factor} className="space-y-1.5">
                <div className="flex justify-between text-body-small font-medium">
                  <span className="text-(--text-primary)">{d.factor}</span>
                  <span className="font-mono font-bold text-(--brand-primary)">{d.weight}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-(--surface-subtle) overflow-hidden">
                  <div
                    className="h-full bg-(--brand-primary) rounded-full"
                    style={{ width: `${d.weight}%` }}
                  />
                </div>
                <p className="text-caption text-(--text-muted)">{d.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inference Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-body-small">
            <div className="flex justify-between">
              <span className="text-(--text-muted)">Model Engine</span>
              <span className="font-semibold">Hydrology-ML v2.4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-(--text-muted)">Confidence</span>
              <span className="font-mono text-emerald-500 font-bold">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-(--text-muted)">Mode</span>
              <span className="text-emerald-500 font-medium">Standard Telemetry</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
