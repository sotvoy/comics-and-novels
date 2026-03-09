import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const series_id = searchParams.get('series_id');
    const chapter_id = searchParams.get('chapter_id');

    let query = supabase.from('likes').select('*');
    
    if (user_id) query = query.eq('user_id', user_id);
    if (series_id) query = query.eq('series_id', series_id);
    if (chapter_id) query = query.eq('chapter_id', chapter_id);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, series_id, chapter_id, comment_id } = body;

    // Check if already liked
    let query = supabase
      .from('likes')
      .select('*')
      .eq('user_id', user_id);
    
    if (series_id) query = query.eq('series_id', series_id);
    if (chapter_id) query = query.eq('chapter_id', chapter_id);
    if (comment_id) query = query.eq('comment_id', comment_id);

    const { data: existing } = await query.single();

    if (existing) {
      // Unlike
      await supabase.from('likes').delete().eq('id', existing.id);
      return NextResponse.json({ liked: false });
    } else {
      // Like
      await supabase.from('likes').insert([{ user_id, series_id, chapter_id, comment_id }]);
      return NextResponse.json({ liked: true });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
