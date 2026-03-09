import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Client component client (for use in client components)
export const supabaseClient = createClientComponentClient();

// Server component client (for use in server components)
export const createServerClient = () => {
  return createServerComponentClient({ cookies });
};
