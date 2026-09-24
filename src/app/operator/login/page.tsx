import * as React from "react";
import { AuthShell } from "@/components/layout/auth-shell";
import { OperatorLoginForm } from "@/components/auth/operator-login-form";

export default function OperatorLoginPage() {
  return (
    <AuthShell
      title="Operator Sign In"
      subtitle="Authorized hydrological command desk & disaster telemetry authentication"
    >
      <React.Suspense fallback={<div className="p-4 text-center">Loading authentication...</div>}>
        <OperatorLoginForm />
      </React.Suspense>
    </AuthShell>
  );
}
