import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const { data: series, error } = await supabase
      .from('series')
      .select(`
        *,
        author:users!series_author_id_fkey(id, username, avatar_url, bio),
        genres:series_genres(genres(id, name, slug))
      `)
      .eq('slug', slug)
      .single();

    if (error) throw error;

    // Get chapters
    const { data: chapters } = await supabase
      .from('chapters')
      .select('*')
      .eq('series_id', series.id)
      .order('chapter_number', { ascending: false });

    return NextResponse.json({ ...series, chapters });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
