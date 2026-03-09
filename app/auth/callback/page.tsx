'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState('Processing...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        setStatus('Error: ' + error.message);
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      if (session) {
        setStatus('Successfully signed in! Redirecting...');
        setTimeout(() => router.push('/'), 1000);
      } else {
        setStatus('No session found. Redirecting to login...');
        setTimeout(() => router.push('/login'), 2000);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p className="text-lg">{status}</p>
      </div>
    </div>
  );
}
