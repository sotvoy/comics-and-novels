import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { data, error } = await supabase
      .from('chapters')
      .select(`
        *,
        series(id, title, slug, type),
        user:users(username, avatar_url)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { series_id, title, chapter_number, volume, content, pages, is_published, published_at } = body;

    const { data, error } = await supabase
      .from('chapters')
      .insert([{
        series_id,
        title,
        chapter_number,
        volume,
        content,
        pages,
        is_published: is_published ?? true,
        published_at: published_at ?? new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    // Update series updated_at
    await supabase
      .from('series')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', series_id);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
