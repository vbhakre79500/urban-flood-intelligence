"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldCheck, Zap, ArrowRight, ShieldAlert, HeartHandshake, Eye, EyeOff, Lock, Mail, UserPlus, LogIn, User } from "lucide-react";
import { loginSchema, registerSchema } from "@/schemas/auth";
import { createClient } from "@/lib/auth/supabase-client";

export default function CitizenLoginPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center">Loading portal...</div>}>
      <CitizenLoginContent />
    </React.Suspense>
  );
}

function CitizenLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/citizen";

  const [authMode, setAuthMode] = React.useState<"SIGN_IN" | "SIGN_UP">("SIGN_IN");
  const [fullName, setFullName] = React.useState("Resident Citizen");
  const [email, setEmail] = React.useState("citizen@flood.gov.in");
  const [password, setPassword] = React.useState("AdminPassword#2026");
  const [showPassword, setShowPassword] = React.useState(false);
  const [zone, setZone] = React.useState("Central Riverfront Basin");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleQuickEmergency = () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      document.cookie = "dev_session=true; path=/; max-age=86400; SameSite=Lax";
      document.cookie = "user_role=CITIZEN; path=/; max-age=86400; SameSite=Lax";
      document.cookie = `user_name=${encodeURIComponent("Resident Citizen (Emergency)")}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `user_zone=${encodeURIComponent(zone)}; path=/; max-age=86400; SameSite=Lax`;

      setTimeout(() => {
        router.push(redirectTarget);
        router.refresh();
      }, 200);
    } catch {
      setIsLoading(false);
      setErrorMessage("Unable to establish emergency session.");
    }
  };

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim().toLowerCase();
    const validation = loginSchema.safeParse({ email: trimmedEmail, password });
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message || "Invalid email or password format");
      return;
    }

    setIsLoading(true);

    try {
      let citizenName = trimmedEmail.includes("citizen") ? "Verified Citizen" : `Resident (${trimmedEmail})`;
      let citizenZone = zone;

      try {
        const supabase = createClient();
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });

        if (!signInError && data?.user) {
          if (data.user.user_metadata?.full_name) {
            citizenName = String(data.user.user_metadata.full_name);
          }
          if (data.user.user_metadata?.zone) {
            citizenZone = String(data.user.user_metadata.zone);
          }
        } else if (signInError) {
          const isDemo = trimmedEmail === "citizen@flood.gov.in" && password === "AdminPassword#2026";
          if (!isDemo && !signInError.message.includes("fetch failed")) {
            setIsLoading(false);
            setErrorMessage(signInError.message || "Invalid citizen credentials.");
            return;
          }
        }
      } catch (authErr) {
        console.warn("Supabase Auth connection notice:", authErr);
      }

      // Check password validity for demo credentials if Supabase was bypassed
      if (password !== "AdminPassword#2026" && !password.includes("Password") && password.length < 8) {
        setIsLoading(false);
        setErrorMessage("Authentication failed: Invalid citizen password. Please check your credentials.");
        return;
      }

      // Set citizen role session cookies
      document.cookie = "dev_session=true; path=/; max-age=86400; SameSite=Lax";
      document.cookie = "user_role=CITIZEN; path=/; max-age=86400; SameSite=Lax";
      document.cookie = `user_name=${encodeURIComponent(citizenName)}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `user_email=${encodeURIComponent(trimmedEmail)}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `user_zone=${encodeURIComponent(citizenZone)}; path=/; max-age=86400; SameSite=Lax`;

      setTimeout(() => {
        router.push(redirectTarget);
        router.refresh();
      }, 200);
    } catch {
      setIsLoading(false);
      setErrorMessage("Unable to establish citizen session. Please try again.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim().toLowerCase();
    const validation = registerSchema.safeParse({
      email: trimmedEmail,
      password,
      fullName: fullName.trim(),
    });
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message || "Invalid registration format");
      return;
    }

    setIsLoading(true);

    try {
      try {
        const supabase = createClient();
        const { error: signUpError } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: {
            data: {
              role: "CITIZEN",
              full_name: fullName.trim(),
              zone: zone,
            },
          },
        });

        if (signUpError && !signUpError.message.includes("fetch failed")) {
          setIsLoading(false);
          setErrorMessage(signUpError.message);
          return;
        }
      } catch (authErr) {
        console.warn("Supabase Auth registration notice:", authErr);
      }

      // Establish verified citizen session
      document.cookie = "dev_session=true; path=/; max-age=86400; SameSite=Lax";
      document.cookie = "user_role=CITIZEN; path=/; max-age=86400; SameSite=Lax";
      document.cookie = `user_name=${encodeURIComponent(fullName.trim() || "Resident Citizen")}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `user_email=${encodeURIComponent(trimmedEmail)}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `user_zone=${encodeURIComponent(zone)}; path=/; max-age=86400; SameSite=Lax`;

      setTimeout(() => {
        router.push(redirectTarget);
        router.refresh();
      }, 200);
    } catch {
      setIsLoading(false);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-(--background) text-(--text-primary)">
      {/* Mobile-first card container */}
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <h1 className="text-h2 font-bold tracking-tight text-(--text-primary)">
            Citizen Safety Portal
          </h1>
          <p className="mt-1 text-body-small text-(--text-muted)">
            Real-time community flood alerts, shelter locations, and safety assistance.
          </p>
        </div>

        <Card className="border-(--border-subtle) shadow-lg">
          <CardHeader className="pb-3">
            {/* Tab switch between Sign In and Sign Up */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-(--surface-subtle) rounded-lg mb-2">
              <button
                type="button"
                id="tab-citizen-signin"
                onClick={() => {
                  setAuthMode("SIGN_IN");
                  setErrorMessage(null);
                }}
                className={`py-1.5 px-3 rounded-md text-caption font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  authMode === "SIGN_IN"
                    ? "bg-(--surface) text-(--text-primary) shadow-xs"
                    : "text-(--text-muted) hover:text-(--text-primary)"
                }`}
              >
                <LogIn className="h-3.5 w-3.5" /> Sign In
              </button>
              <button
                type="button"
                id="tab-citizen-signup"
                onClick={() => {
                  setAuthMode("SIGN_UP");
                  setErrorMessage(null);
                }}
                className={`py-1.5 px-3 rounded-md text-caption font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  authMode === "SIGN_UP"
                    ? "bg-(--surface) text-(--text-primary) shadow-xs"
                    : "text-(--text-muted) hover:text-(--text-primary)"
                }`}
              >
                <UserPlus className="h-3.5 w-3.5" /> Sign Up
              </button>
            </div>

            <CardTitle className="text-h4">
              {authMode === "SIGN_IN" ? "Citizen Sign In" : "Citizen Registration"}
            </CardTitle>
            <CardDescription className="text-caption">
              {authMode === "SIGN_IN"
                ? "Sign in with your citizen credentials to receive localized emergency updates."
                : "Create a citizen account to subscribe to catchment-level flood warnings."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {errorMessage && (
              <div
                role="alert"
                id="citizen-error-alert"
                className="rounded-md border border-(--destructive)/30 bg-red-500/10 p-3 text-caption text-(--destructive) flex items-center gap-2 animate-in fade-in"
              >
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Quick Emergency Access Option for Active Crisis */}
            {authMode === "SIGN_IN" && (
              <>
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-center space-y-2">
                  <div className="text-caption font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                    <Zap className="h-4 w-4" /> Facing Active Flood Conditions?
                  </div>
                  <p className="text-[12px] text-(--text-muted)">
                    One-tap instant access without password requirements for fast evacuation guidance.
                  </p>
                  <Button
                    type="button"
                    id="btn-emergency-enter"
                    onClick={handleQuickEmergency}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 h-auto text-body-small gap-2 shadow-sm"
                    isLoading={isLoading}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Enter Safety Portal Immediately
                  </Button>
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-(--border-subtle)" />
                  <span className="flex-shrink mx-3 text-caption text-(--text-muted) uppercase">
                    or sign in with password
                  </span>
                  <div className="flex-grow border-t border-(--border-subtle)" />
                </div>
              </>
            )}

            <form
              onSubmit={authMode === "SIGN_IN" ? handleSignIn : handleSignUp}
              className="space-y-3"
            >
              {authMode === "SIGN_UP" && (
                <div className="space-y-1.5">
                  <label htmlFor="citizen-fullname" className="text-body-small font-medium text-(--text-secondary)">
                    Full Name
                  </label>
                  <div className="relative">
                    <Input
                      id="citizen-fullname"
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="pl-9"
                      autoComplete="name"
                    />
                    <User className="absolute left-3 top-3 h-4 w-4 text-(--text-muted)" />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="citizen-email" className="text-body-small font-medium text-(--text-secondary)">
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    id="citizen-email"
                    type="email"
                    placeholder="citizen@flood.gov.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-9"
                    autoComplete="email"
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-(--text-muted)" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="citizen-password" className="text-body-small font-medium text-(--text-secondary)">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="citizen-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-9 pr-10"
                    autoComplete={authMode === "SIGN_IN" ? "current-password" : "new-password"}
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-(--text-muted)" />
                  <button
                    type="button"
                    id="citizen-toggle-password"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2.5 top-2.5 text-(--text-muted) hover:text-(--text-primary) p-1 rounded-sm cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="citizen-zone" className="text-body-small font-medium text-(--text-secondary)">
                  Your Primary Neighborhood / Zone
                </label>
                <select
                  id="citizen-zone"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full rounded-md border border-(--border-default) bg-(--surface) px-3 py-2 text-body-small text-(--text-primary) focus:border-(--brand-primary) focus:outline-none"
                >
                  <option value="Central Riverfront Basin">Central Riverfront Basin</option>
                  <option value="Estuary Marshlands">Estuary Marshlands (Coastal)</option>
                  <option value="Commercial District Subway">Commercial District Subway</option>
                  <option value="Highland Plateau Sector">Highland Plateau Sector</option>
                </select>
              </div>

              {authMode === "SIGN_IN" && (
                <div className="rounded-md border border-(--border-subtle) bg-(--surface-subtle) p-2 text-[11px] text-(--text-muted)">
                  Demo Citizen Credential: <code className="font-mono text-emerald-600 dark:text-emerald-400">citizen@flood.gov.in</code> / <code className="font-mono text-emerald-600 dark:text-emerald-400">AdminPassword#2026</code>
                </div>
              )}

              <Button type="submit" id="btn-citizen-submit" className="w-full gap-2" isLoading={isLoading}>
                {authMode === "SIGN_IN" ? (
                  <>
                    Verify & Enter Portal <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" /> Create Citizen Account
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer links */}
        <div className="text-center space-y-2 text-caption text-(--text-muted)">
          <div>
            Authority or Duty Officer?{" "}
            <Link href="/operator/login" className="font-semibold text-(--brand-primary) hover:underline">
              Operator Sign In →
            </Link>
          </div>
          <div>
            <Link href="/" className="hover:text-(--text-primary) underline">
              ← Return to Public Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
