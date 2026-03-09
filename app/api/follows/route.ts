import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const series_id = searchParams.get('series_id');

    let query = supabase
      .from('follows')
      .select(`
        *,
        series(*),
        follower:users!follows_follower_id_fkey(username, avatar_url)
      `);
    
    if (user_id) query = query.eq('follower_id', user_id);
    if (series_id) query = query.eq('series_id', series_id);

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
    const { follower_id, series_id } = body;

    // Check if already following
    const { data: existing } = await supabase
      .from('follows')
      .select('*')
      .eq('follower_id', follower_id)
      .eq('series_id', series_id)
      .single();

    if (existing) {
      // Unfollow
      await supabase.from('follows').delete().eq('id', existing.id);
      return NextResponse.json({ following: false });
    } else {
      // Follow
      await supabase.from('follows').insert([{ follower_id, series_id }]);
      return NextResponse.json({ following: true });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
