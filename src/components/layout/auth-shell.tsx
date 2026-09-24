import * as React from "react";
import Link from "next/link";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-(--background)">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="h-9 w-9 rounded-md bg-(--brand-primary) flex items-center justify-center text-white font-bold">
              ▲
            </div>
            <span className="font-bold tracking-tight text-h4 text-(--text-primary)">
              URBAN FLOOD INTEL
            </span>
          </Link>
          <h1 className="text-h2 font-bold text-(--text-primary)">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-body-small text-(--text-muted)">{subtitle}</p>
          )}
        </div>

        <div className="rounded-lg border border-(--border-subtle) bg-(--surface-card) p-8 shadow-sm">
          {children}
        </div>

        <div className="mt-6 text-center text-caption text-(--text-muted)">
          <Link href="/" className="hover:text-(--text-primary) underline">
            ← Return to Public Intelligence Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
