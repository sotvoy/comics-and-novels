import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zfsxduowawvnimojbtvk.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmc3hkdW93YXd2bmltb2J0dmsiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjU2MjIwMCwiZXhwIjoxOTM4MTM4MjAwfQ.K4AXxMHVd0VqeFR9gUGMSyq-zVYHj5p1l7r0YxXhBWA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role (use carefully!)
export const supabaseAdmin = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseServiceKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY not set');
    return supabase;
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

// Helper to check if user is authenticated
export async function getUser(token: string) {
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error) throw error;
  return user;
}

// Helper to get user profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}
