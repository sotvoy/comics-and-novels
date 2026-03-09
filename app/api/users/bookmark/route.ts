import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Add/remove bookmarks
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

    const userId = authHeader.replace('Bearer ', '');
    const { seriesId, action } = await req.json();

    if (!seriesId || !action) {
      return NextResponse.json(
        { error: 'Missing seriesId or action' },
        { status: 400 }
      );
    }

    if (action === 'add') {
      const { error } = await supabase
        .from('bookmarks')
        .insert({
          user_id: userId,
          series_id: seriesId
        });

      if (error && !error.message.includes('duplicate')) {
        throw error;
      }
    } else if (action === 'remove') {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', userId)
        .eq('series_id', seriesId);

      if (error) {
        throw error;
      }
    }

    return NextResponse.json({ success: true, action });
  } catch (error: any) {
    console.error('Bookmark error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process bookmark request' },
      { status: 500 }
    );
  }
}

// Get user bookmarks
export async function GET(req: NextRequest) {
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
    const authHeader = req.headers.get('authorization');
    const userId = authHeader?.replace('Bearer ', '');

    if (!userId) {
      return NextResponse.json({ bookmarks: [] });
    }

    const { data, error } = await supabase
      .from('bookmarks')
      .select('series_id, created_at')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ bookmarks: data || [] });
  } catch (error: any) {
    return NextResponse.json({ bookmarks: [] });
  }
}
