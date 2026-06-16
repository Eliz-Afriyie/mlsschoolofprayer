import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const cookieName = "sop_admin_session";
const maxAge = 60 * 60 * 8;

function getSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ??
    "local-development-session-secret"
  );
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME?.trim() ?? "admin",
    password: process.env.ADMIN_PASSWORD?.trim() ?? "change-me",
  };
}

export async function createAdminSession(username: string) {
  const issuedAt = Date.now().toString();
  const payload = `${username}.${issuedAt}`;
  const session = `${payload}.${sign(payload)}`;
  const cookieStore = await cookies();

  cookieStore.set(cookieName, session, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(cookieName)?.value;

  if (!session) {
    return false;
  }

  const parts = session.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const [username, issuedAt, signature] = parts;
  const payload = `${username}.${issuedAt}`;
  const age = Date.now() - Number(issuedAt);

  if (!Number.isFinite(age) || age > maxAge * 1000) {
    return false;
  }

  return safeCompare(signature, sign(payload));
}
