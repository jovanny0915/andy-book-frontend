import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Browser Supabase client for Auth (e.g. magic link / OTP).
 * Uses anon key only; no service role is exposed to the client.
 */
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export function isSupabaseAuthConfigured(): boolean {
  return !!(url && anonKey);
}
