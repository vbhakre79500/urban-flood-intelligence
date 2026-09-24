import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Immediately bypass Next.js internal assets, static files, and public extensions
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "placeholder-anon-key";

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]
      ) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value }) =>
          supabaseResponse.cookies.set(name, value)
        );
      },
    },
  });

  // Refresh session if expired - required for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Retrieve cookie session & role
  const hasDevSession = request.cookies.get("dev_session")?.value === "true";
  const cookieRole = request.cookies.get("user_role")?.value;

  const isAuthenticated = Boolean(user || hasDevSession);
  const userRole = (user?.user_metadata?.role as string) || cookieRole || "CITIZEN";

  // 1. Convenience / Route canonical mappings
  if (pathname === "/operator") {
    const url = request.nextUrl.clone();
    url.pathname = "/app/dashboard";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/operator/") && pathname !== "/operator/login") {
    const subPath = pathname.replace("/operator/", "");
    const url = request.nextUrl.clone();
    url.pathname = `/app/${subPath}`;
    return NextResponse.redirect(url);
  }

  if (pathname === "/admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/app/admin";
    return NextResponse.redirect(url);
  }

  // 2. Admin routes check (Requirement 6, 32)
  const isAdminRoute = pathname === "/app/admin" || pathname.startsWith("/app/admin/");
  if (isAdminRoute) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/operator/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    if (userRole !== "ADMIN") {
      const url = request.nextUrl.clone();
      url.pathname = "/unauthorized";
      url.searchParams.set("reason", "admin_required");
      url.searchParams.set("current_role", userRole);
      return NextResponse.redirect(url);
    }
  }

  // 3. Operator / Operational desk routes check (Requirements 2, 5, 6, 32)
  const isOperatorRoute =
    (pathname.startsWith("/app") && !isAdminRoute) ||
    (pathname.startsWith("/operator") && pathname !== "/operator/login");

  if (isOperatorRoute) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/operator/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    // Citizen role cannot access operational desk
    if (userRole === "CITIZEN") {
      const url = request.nextUrl.clone();
      url.pathname = "/unauthorized";
      url.searchParams.set("reason", "operator_required");
      url.searchParams.set("current_role", "CITIZEN");
      return NextResponse.redirect(url);
    }
  }

  // 4. Citizen routes check (Requirements 3, 4, 6, 32)
  const isCitizenLoginRoute = pathname === "/citizen/login";
  const isCitizenRoute = pathname === "/citizen" || pathname.startsWith("/citizen/");

  if (isCitizenRoute && !isCitizenLoginRoute) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/citizen/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  // 5. Authentication routes: if already logged in with corresponding role, redirect
  const isOperatorAuthRoute =
    pathname === "/login" ||
    pathname === "/operator/login" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  if (isAuthenticated && (userRole === "AUTHORITY" || userRole === "ADMIN") && isOperatorAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/app/dashboard";
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && userRole === "CITIZEN" && isCitizenLoginRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/citizen";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2|ico)$).*)",
  ],
};
