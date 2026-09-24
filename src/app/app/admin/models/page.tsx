import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminModelsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-h3 font-bold text-(--text-primary)">Predictive Model Registries</h2>
        <p className="text-body-small text-(--text-muted)">Manage machine learning inference pipelines, weight versions, and fallback heuristics</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Model: Urban-Hydrology-XGBoost-v2.4</CardTitle>
            <Badge variant="success">PRODUCTION</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-body-small">
          <p className="text-(--text-secondary)">
            Features 24 catchment hydraulic models trained on 15 years of meteorological records.
            Fallback heuristic automatically engages if sensor latency exceeds 15 minutes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
