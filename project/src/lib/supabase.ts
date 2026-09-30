import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type GyroMode = 'Always On' | 'Scope On' | 'Off';

export interface Setup {
  id: string;
  device_name: string;
  sensitivity_code: string;
  gyro_mode: GyroMode;
  author_name: string;
  tdm_tip: string | null;
  likes: number;
  created_at: string;
}
