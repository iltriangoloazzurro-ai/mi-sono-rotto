
import { createClient } from '@supabase/supabase-js';

// Safely probe for environment variables across different possible environments (Vite, Node-like shims, etc.)
const getEnvVar = (key: string): string | undefined => {
  try {
    // Check import.meta.env (Vite standard)
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      return (import.meta as any).env[key];
    }
  } catch (e) {}

  try {
    // Check process.env (Common fallback in many environments)
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key];
    }
  } catch (e) {}

  return undefined;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials missing. The app may not function correctly. " +
    "Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment."
  );
}

// Initialize client only if we have valid-looking strings to prevent immediate constructor throws
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);
