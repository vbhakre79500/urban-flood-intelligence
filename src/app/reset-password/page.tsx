"use client";

import * as React from "react";
import Link from "next/link";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/schemas/auth";

export default function ResetPasswordPage() {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = resetPasswordSchema.safeParse({ password, confirmPassword });
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message || "Validation failed");
      return;
    }

    setIsSuccess(true);
  };

  return (
    <AuthShell
      title="Create New Password"
      subtitle="Ensure your new password contains at least 8 characters"
    >
      {isSuccess ? (
        <div className="text-center space-y-4">
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-4 text-body-small text-emerald-600 dark:text-emerald-400">
            Password has been successfully updated.
          </div>
          <Link href="/login">
            <Button className="w-full">Proceed to Login</Button>
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
              New Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-body-small font-medium text-(--text-secondary)">
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-2">
            Update Password
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
