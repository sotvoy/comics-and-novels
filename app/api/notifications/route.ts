import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    let query = supabase
      .from('notifications')
      .select(`
        *,
        user:users(username, avatar_url)
      `)
      .order('created_at', { ascending: false });

    if (user_id) query = query.eq('user_id', user_id);

    const { data, error } = await query.limit(50);

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, read } = body;

    const { data, error } = await supabase
      .from('notifications')
      .update({ read })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
