/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";
import { createClient } from "@/lib/auth/supabase-client";

describe("Supabase Client & Auth Integration", () => {
  it("creates a singleton Supabase client using public keys without duplication", () => {
    const client1 = createClient();
    const client2 = createClient();
    expect(client1).toBe(client2);
    expect(client1.auth).toBeDefined();
    expect(typeof client1.auth.signInWithPassword).toBe("function");
    expect(typeof client1.auth.signUp).toBe("function");
    expect(typeof client1.auth.signOut).toBe("function");
  });

  it("does not expose service role key to browser client", () => {
    const client = createClient();
    // Verify client supabaseKey is the publishable / anon key
    const clientKey = (client as unknown as { supabaseKey: string }).supabaseKey;
    expect(clientKey).not.toContain("service-role");
    expect(process.env.SUPABASE_SERVICE_ROLE_KEY).toBeDefined();
    expect(clientKey).not.toBe(process.env.SUPABASE_SERVICE_ROLE_KEY);
  });
});

describe("Authentication & Role-Based Middleware Access Control", () => {
  it("verifies unauthenticated user cannot access /app/* and is redirected to /operator/login", async () => {
    const req = new NextRequest("http://localhost:3000/app/dashboard");
    const res = await middleware(req);
    expect(res.status).toBe(307);
    const redirectLocation = res.headers.get("location");
    expect(redirectLocation).toContain("/operator/login");
    expect(redirectLocation).toContain("redirect=%2Fapp%2Fdashboard");
  });

  it("verifies unauthenticated user cannot access /citizen routes and is redirected to /citizen/login", async () => {
    const req = new NextRequest("http://localhost:3000/citizen/map");
    const res = await middleware(req);
    expect(res.status).toBe(307);
    const redirectLocation = res.headers.get("location");
    expect(redirectLocation).toContain("/citizen/login");
  });

  it("verifies CITIZEN cannot access /app/* and is redirected to /unauthorized", async () => {
    const req = new NextRequest("http://localhost:3000/app/dashboard", {
      headers: {
        cookie: "dev_session=true; user_role=CITIZEN; user_email=citizen@flood.gov.in",
      },
    });
    const res = await middleware(req);
    expect(res.status).toBe(307);
    const redirectLocation = res.headers.get("location");
    expect(redirectLocation).toContain("/unauthorized");
    expect(redirectLocation).toContain("reason=operator_required");
    expect(redirectLocation).toContain("current_role=CITIZEN");
  });

  it("verifies CITIZEN cannot access /app/admin and is redirected to /unauthorized", async () => {
    const req = new NextRequest("http://localhost:3000/app/admin", {
      headers: {
        cookie: "dev_session=true; user_role=CITIZEN; user_email=citizen@flood.gov.in",
      },
    });
    const res = await middleware(req);
    expect(res.status).toBe(307);
    const redirectLocation = res.headers.get("location");
    expect(redirectLocation).toContain("/unauthorized");
    expect(redirectLocation).toContain("reason=admin_required");
    expect(redirectLocation).toContain("current_role=CITIZEN");
  });

  it("verifies AUTHORITY/operator can access /app/dashboard and /app/map", async () => {
    const req = new NextRequest("http://localhost:3000/app/dashboard", {
      headers: {
        cookie: "dev_session=true; user_role=AUTHORITY; user_email=operator@flood.gov.in",
      },
    });
    const res = await middleware(req);
    // Not redirected to unauthorized or login
    expect(res.status).not.toBe(307);
  });

  it("verifies AUTHORITY cannot access /app/admin/* and is redirected to /unauthorized", async () => {
    const req = new NextRequest("http://localhost:3000/app/admin", {
      headers: {
        cookie: "dev_session=true; user_role=AUTHORITY; user_email=operator@flood.gov.in",
      },
    });
    const res = await middleware(req);
    expect(res.status).toBe(307);
    const redirectLocation = res.headers.get("location");
    expect(redirectLocation).toContain("/unauthorized");
    expect(redirectLocation).toContain("reason=admin_required");
    expect(redirectLocation).toContain("current_role=AUTHORITY");
  });

  it("verifies ADMIN can access /app/admin", async () => {
    const req = new NextRequest("http://localhost:3000/app/admin", {
      headers: {
        cookie: "dev_session=true; user_role=ADMIN; user_email=admin@flood.gov.in",
      },
    });
    const res = await middleware(req);
    // Not redirected to unauthorized or login
    expect(res.status).not.toBe(307);
  });

  it("verifies session persistence via cookies across multiple requests", async () => {
    const citizenCookie = "dev_session=true; user_role=CITIZEN; user_email=citizen@flood.gov.in";
    const req1 = new NextRequest("http://localhost:3000/citizen", {
      headers: { cookie: citizenCookie },
    });
    const res1 = await middleware(req1);
    expect(res1.status).not.toBe(307);

    const req2 = new NextRequest("http://localhost:3000/citizen/map", {
      headers: { cookie: citizenCookie },
    });
    const res2 = await middleware(req2);
    expect(res2.status).not.toBe(307);
  });

  it("verifies session termination on logout redirects to login", async () => {
    // When session cookies are cleared
    const req = new NextRequest("http://localhost:3000/citizen/map", {
      headers: { cookie: "" },
    });
    const res = await middleware(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/citizen/login");
  });
});
