import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const series_id = searchParams.get('series_id');
    const chapter_id = searchParams.get('chapter_id');

    let query = supabase
      .from('comments')
      .select(`
        *,
        user:users(username, avatar_url, level, exp)
      `)
      .order('created_at', { ascending: false });

    if (series_id) query = query.eq('series_id', series_id);
    if (chapter_id) query = query.eq('chapter_id', chapter_id);

    const { data, error } = await query;

    if (error) throw error;

    // Organize threaded comments
    const rootComments = data?.filter(c => !c.parent_id) || [];
    const replies = data?.filter(c => c.parent_id) || [];
    
    const commentsWithReplies = rootComments.map(comment => ({
      ...comment,
      replies: replies.filter(r => r.parent_id === comment.id)
    }));

    return NextResponse.json(commentsWithReplies);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, series_id, chapter_id, parent_id, content } = body;

    const { data, error } = await supabase
      .from('comments')
      .insert([{ 
        user_id, 
        series_id, 
        chapter_id, 
        parent_id, 
        content,
        created_at: new Date().toISOString()
      }])
      .select(`
        *,
        user:users(username, avatar_url)
      `)
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
