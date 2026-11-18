import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const url = import.meta.env.VITE_SUPABASE_URL?.trim() ?? '';
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ?? '';
export const isSupabaseConfigured = Boolean(
  /^https?:\/\//.test(url) && !url.includes('your-project-ref') &&
  key && !key.startsWith('replace_')
);

// The setup screen blocks authentication/network use until configuration exists.
export const supabase = createClient<Database>(
  isSupabaseConfigured ? url : 'http://127.0.0.1:54321',
  isSupabaseConfigured ? key : 'configuration-required',
  { auth: { storage: localStorage, persistSession: true, autoRefreshToken: true } }
);
