import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Report content
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
    const userId = authHeader?.replace('Bearer ', '');

    const body = await req.json();
    const { 
      contentType, 
      contentId, 
      reason, 
      description 
    } = body;

    // Validate required fields
    if (!contentType || !contentId || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields: contentType, contentId, reason' },
        { status: 400 }
      );
    }

    // Validate reason is from allowed list
    const allowedReasons = [
      'spam',
      'harassment',
      'inappropriate_content',
      'copyright',
      'violence',
      'misinformation',
      'other'
    ];

    if (!allowedReasons.includes(reason)) {
      return NextResponse.json(
        { error: 'Invalid reason. Must be one of: ' + allowedReasons.join(', ') },
        { status: 400 }
      );
    }

    // Insert report
    const { data, error } = await supabase
      .from('reports')
      .insert({
        reporter_id: userId,
        content_type: contentType,
        content_id: contentId,
        reason: reason,
        description: description || '',
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Report submitted successfully',
      reportId: data.id
    });
  } catch (error: any) {
    console.error('Report error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit report' },
      { status: 500 }
    );
  }
}

// Get reports (admin only - stub for now)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'pending';

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // For now, return empty list - in production, check admin role
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      throw error;
    }

    return NextResponse.json({ reports: data || [] });
  } catch (error: any) {
    return NextResponse.json({ reports: [] });
  }
}
