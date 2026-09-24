"use client";

import * as React from "react";
import Link from "next/link";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/schemas/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = forgotPasswordSchema.safeParse({ email });
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message || "Invalid email");
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <AuthShell
      title="Password Recovery"
      subtitle="Request a secure password reset link for your operator account"
    >
      {isSubmitted ? (
        <div className="text-center space-y-4">
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-4 text-body-small text-emerald-600 dark:text-emerald-400">
            If an account exists for {email}, a recovery link has been dispatched.
          </div>
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Return to Login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="rounded-md border border-(--destructive)/30 bg-red-500/10 p-3 text-caption text-(--destructive)">
              {errorMessage}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-body-small font-medium text-(--text-secondary)">
              Operator Email Address
            </label>
            <Input
              type="email"
              placeholder="operator@flood.gov.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-2">
            Send Reset Link
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
