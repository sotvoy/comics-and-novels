import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Follow/unfollow users
export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get current user from auth header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { userId, action } = await req.json();

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'Missing userId or action' },
        { status: 400 }
      );
    }

    if (action === 'follow') {
      const { error } = await supabase
        .from('follows')
        .insert({
          follower_id: authHeader.replace('Bearer ', ''),
          following_id: userId
        });

      if (error && !error.message.includes('duplicate')) {
        throw error;
      }
    } else if (action === 'unfollow') {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', authHeader.replace('Bearer ', ''))
        .eq('following_id', userId);

      if (error) {
        throw error;
      }
    }

    return NextResponse.json({ success: true, action });
  } catch (error: any) {
    console.error('Follow error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process follow request' },
      { status: 500 }
    );
  }
}

// Get follow status
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const authHeader = req.headers.get('authorization');
    const currentUserId = authHeader?.replace('Bearer ', '');

    if (!currentUserId) {
      return NextResponse.json({ following: false });
    }

    const { data, error } = await supabase
      .from('follows')
      .select('*')
      .eq('follower_id', currentUserId)
      .eq('following_id', userId)
      .single();

    return NextResponse.json({ following: !!data });
  } catch (error: any) {
    return NextResponse.json({ following: false });
  }
}
