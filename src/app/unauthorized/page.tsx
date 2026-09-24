"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ShieldAlert, ArrowLeft, LogOut, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function UnauthorizedPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <UnauthorizedContent />
    </React.Suspense>
  );
}

function UnauthorizedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const currentRole = searchParams.get("current_role") || "CITIZEN";

  const handleSignOut = async () => {
    try {
      const { createClient } = await import("@/lib/auth/supabase-client");
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Supabase Auth sign out notice:", err);
    }
    document.cookie = "dev_session=; path=/; max-age=0";
    document.cookie = "user_role=; path=/; max-age=0";
    document.cookie = "user_email=; path=/; max-age=0";
    document.cookie = "user_name=; path=/; max-age=0";
    router.push("/operator/login");
  };

  const isOperatorRequired = reason === "operator_required";
  const isAdminRequired = reason === "admin_required";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-(--background) text-(--text-primary)">
      <Card className="w-full max-w-md border-(--destructive)/30 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto h-12 w-12 rounded-full bg-red-500/10 text-(--destructive) flex items-center justify-center mb-3">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <CardTitle className="text-h2 font-bold text-(--destructive)">
            Access Denied (403)
          </CardTitle>
          <CardDescription className="text-body-small mt-1">
            {isOperatorRequired && (
              <span>
                The requested operational desk and hazard controls are restricted to authorized disaster-management authorities.
              </span>
            )}
            {isAdminRequired && (
              <span>
                Elevated Administrator credentials are required to view system administration, governance, and audit logs.
              </span>
            )}
            {!isOperatorRequired && !isAdminRequired && (
              <span>You do not have the required permissions to view this resource.</span>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          <div className="rounded-md border border-(--border-subtle) bg-(--surface-subtle) p-3 text-caption space-y-1">
            <div className="flex justify-between">
              <span className="text-(--text-muted)">Current Active Role:</span>
              <span className="font-mono font-semibold text-(--brand-primary) uppercase">
                {currentRole}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-(--text-muted)">Required Role:</span>
              <span className="font-mono font-semibold text-amber-500 uppercase">
                {isAdminRequired ? "ADMIN" : "AUTHORITY / OPERATOR"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            {currentRole === "CITIZEN" ? (
              <Link href="/citizen" className="w-full">
                <Button className="w-full gap-2">
                  <Users className="h-4 w-4" />
                  Return to Citizen Safety Portal
                </Button>
              </Link>
            ) : (
              <Link href="/app/dashboard" className="w-full">
                <Button className="w-full gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Return to Operational Dashboard
                </Button>
              </Link>
            )}

            <Link href="/operator/login" className="w-full">
              <Button variant="outline" className="w-full gap-2">
                <Shield className="h-4 w-4 text-amber-500" />
                Sign In with Authorized Operator Account
              </Button>
            </Link>

            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full text-caption text-(--text-muted) hover:text-(--destructive) gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out & Clear Session
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
