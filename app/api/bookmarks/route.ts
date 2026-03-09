import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    const { data, error } = await supabase
      .from('bookmarks')
      .select(`
        *,
        series(*),
        chapters(*)
      `)
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, series_id, chapter_id } = body;

    // Check if already bookmarked
    const { data: existing } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user_id)
      .eq('chapter_id', chapter_id)
      .single();

    if (existing) {
      // Remove bookmark
      await supabase.from('bookmarks').delete().eq('id', existing.id);
      return NextResponse.json({ bookmarked: false });
    } else {
      // Add bookmark
      await supabase.from('bookmarks').insert([{ user_id, series_id, chapter_id }]);
      return NextResponse.json({ bookmarked: true });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
