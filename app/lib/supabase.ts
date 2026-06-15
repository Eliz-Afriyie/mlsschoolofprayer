import "server-only";

import { createClient } from "@supabase/supabase-js";

function cleanSupabaseUrl(value?: string) {
  return value
    ?.trim()
    .replace(/\/rest\/v1\/?$/, "")
    .replace(/\/$/, "");
}

export function hasSupabaseConfig() {
  return Boolean(
    cleanSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      process.env.SUPABASE_SECRET_KEY?.trim()
  );
}

export function getSupabaseAdmin() {
  const url = cleanSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();

  if (!url || !secretKey) {
    throw new Error("Supabase is not configured.");
  }

  return createClient(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
