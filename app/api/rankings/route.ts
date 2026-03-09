import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'comic' or 'novel'
    const period = searchParams.get('period') || 'all'; // 'day', 'week', 'month', 'all'

    let query = supabase
      .from('series')
      .select(`
        *,
        author:users!series_author_id_fkey(username, avatar_url),
        chapters(count)
      `)
      .order('views', { ascending: false });

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query.limit(50);

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
