import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ADMIN_SESSION_COOKIE,
  adminCookieOptions,
  createAdminSessionToken,
  isAdminConfigured,
  isSameOrigin,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

const loginSchema = z.object({
  email: z.email().max(160),
  password: z.string().min(8).max(256),
});

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function clientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 0, resetAt: now + WINDOW_MS });
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailure(key: string) {
  const entry = attempts.get(key);
  if (entry) entry.count += 1;
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Requête refusée." }, { status: 403 });
  }

  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "L'accès administrateur n'est pas encore configuré." },
      { status: 503 },
    );
  }

  const key = clientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  const parsed = loginSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    recordFailure(key);
    return NextResponse.json(
      { error: "Identifiants incorrects." },
      { status: 401 },
    );
  }

  const isValid = await verifyAdminCredentials(
    parsed.data.email,
    parsed.data.password,
  );

  if (!isValid) {
    recordFailure(key);
    await new Promise((resolve) => setTimeout(resolve, 350));
    return NextResponse.json(
      { error: "Identifiants incorrects." },
      { status: 401 },
    );
  }

  attempts.delete(key);
  const response = NextResponse.json({ success: true });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    createAdminSessionToken(),
    adminCookieOptions,
  );
  return response;
}
