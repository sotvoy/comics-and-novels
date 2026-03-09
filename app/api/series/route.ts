import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const genre = searchParams.get('genre');
    const sort = searchParams.get('sort') || 'new';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let query = supabase
      .from('series')
      .select(`
        *,
        author:users!series_author_id_fkey(username, avatar_url),
        chapters(count)
      `, { count: 'exact' });

    if (type) query = query.eq('type', type);
    if (status) query = query.eq('status', status);

    // Sorting
    switch (sort) {
      case 'popular':
        query = query.order('views', { ascending: false });
        break;
      case 'updated':
        query = query.order('updated_at', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, cover_url, banner_url, type, status, author_id, genres, tags } = body;

    const { data, error } = await supabase
      .from('series')
      .insert([{
        title,
        slug,
        description,
        cover_url,
        banner_url,
        type,
        status: status || 'ongoing',
        author_id,
        genres,
        tags,
        views: 0,
        likes: 0,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
