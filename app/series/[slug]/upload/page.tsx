'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { notFound, redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import UploadChapterForm from '@/components/creator/UploadChapterForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function UploadChapterPage({ params }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [seriesData, setSeriesData] = useState<{ id: string; slug: string; user_id: string } | null>(null);
  const resolvedParams = use(params);

  useEffect(() => {
    const slug = resolvedParams.slug;
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      // Fetch series
      const { data: series } = await supabase
        .from('series')
        .select('id, slug, user_id')
        .eq('slug', slug)
        .single();

      if (!series) {
        return;
      }

      // Check ownership
      if (series.user_id !== session.user.id) {
        return;
      }

      // Get chapter count
      const { count } = await supabase
        .from('chapters')
        .select('*', { count: 'exact', head: true })
        .eq('series_id', series.id);

      setSeriesData({ ...series, currentChapters: count || 0 } as any);
      setLoading(false);
    };
    checkAuth();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-500" />
      </div>
    );
  }

  if (!seriesData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">You can only upload chapters to your own series.</p>
        </div>
      </div>
    );
  }

  return <UploadChapterForm seriesId={seriesData.id} seriesSlug={seriesData.slug} currentChapters={0} />;
}
