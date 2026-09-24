import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldAlert, Activity, CloudRain, ArrowRight, ShieldCheck, Clock, Shield, Users } from "lucide-react";

export default function HomePage() {
  return (
    <PublicShell>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 px-6 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-(--border-subtle) bg-(--surface-subtle) px-3 py-1 text-caption text-(--text-secondary) mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-time Urban Hydrological Telemetry • Live Monitoring</span>
        </div>

        <h1 className="text-display text-3xl sm:text-5xl font-extrabold tracking-tight text-(--text-primary) max-w-4xl mx-auto">
          Operational Urban Flood Prediction & Early Warning
        </h1>

        <p className="mt-6 text-body-large text-(--text-muted) max-w-2xl mx-auto">
          Predicting flood-prone metropolitan zones using precipitation telemetry, terrain
          elevation models, drainage capacities, and machine-learning risk inference.
        </p>

        {/* Distinct Dual Actions for Citizen vs Operator (Requirements 2, 3, 31) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/citizen">
            <Button size="lg" className="gap-2 bg-(--brand-primary) hover:bg-(--brand-secondary) text-white font-semibold">
              <Users className="h-4 w-4" />
              Citizen Safety Portal <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/operator/login">
            <Button variant="outline" size="lg" className="gap-2">
              <Shield className="h-4 w-4 text-amber-500" />
              Operator Command Desk
            </Button>
          </Link>
          <Link href="/app/map">
            <Button variant="ghost" size="lg" className="text-(--text-secondary) hover:text-(--text-primary)">
              Explore Spatial Map
            </Button>
          </Link>
        </div>

        {/* Real-time Status Notice */}
        <div className="mt-8 text-caption text-(--text-muted) flex items-center justify-center gap-2">
          <Clock className="h-3.5 w-3.5 text-(--brand-primary)" />
          <span>Telemetry Status: Active • Last synchronized: 24 Sep 2026, 11:30 AM IST</span>
        </div>
      </section>

      {/* Operational Highlights Grid */}
      <section className="py-12 px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-(--brand-primary)/10 text-(--brand-primary) flex items-center justify-center mb-2">
                <CloudRain className="h-5 w-5" />
              </div>
              <CardTitle>Predictive Hydrology</CardTitle>
              <CardDescription>
                High-resolution forecast models analyzing rainfall rate, soil saturation, and urban runoff.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-caption text-(--text-muted) flex items-center gap-2">
                <Clock className="h-4 w-4 text-(--brand-primary)" /> Forecast horizon: 6h / 12h / 24h
              </div>
            </CardContent>
          </Card>

          {/* Zone-Wise Risk Assessment (Requirement 1 Fix) */}
          <Card>
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <CardTitle>Zone-Wise Risk Assessment</CardTitle>
              <CardDescription>
                Precision micro-catchment zone classification with live driver explanations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Responsive 4-level Risk Layout: Horizontal on desktop, clean 2x2 on mobile, no overlap, distinct semantic colors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full pt-1">
                <div
                  className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-caption uppercase tracking-wider text-center"
                  title="Low Flood Risk - Normal conditions"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Low</span>
                </div>
                <div
                  className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-caption uppercase tracking-wider text-center"
                  title="Moderate Flood Risk - Elevated vigilance"
                >
                  <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                  <span>Moderate</span>
                </div>
                <div
                  className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg border border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold text-caption uppercase tracking-wider text-center"
                  title="High Flood Risk - Prepare precautions"
                >
                  <span className="h-2 w-2 rounded-full bg-orange-500 shrink-0" />
                  <span>High</span>
                </div>
                <div
                  className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-caption uppercase tracking-wider text-center"
                  title="Critical Flood Risk - Imminent hazard"
                >
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                  <span>Critical</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
                <Activity className="h-5 w-5" />
              </div>
              <CardTitle>Degraded Mode Resilience</CardTitle>
              <CardDescription>
                Deterministic offline rules and fallback heuristics when radar networks or sensors drop.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-caption text-(--text-muted) flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Continuous failover ready
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicShell>
  );
}
