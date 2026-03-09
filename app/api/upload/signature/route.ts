import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import crypto from 'crypto';

// Cloudinary signature generation (server-only)
function generateCloudinarySignature(params: Record<string, string>): string {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiSecret) {
    throw new Error('CLOUDINARY_API_SECRET not configured');
  }
  
  const sortedParams = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  
  const signature = crypto
    .createHash('sha256')
    .update(`${sortedParams}&api_secret=${apiSecret}`)
    .digest('hex');
  
  return signature;
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createMiddlewareClient({ req, NextResponse });
    
    // Verify user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized - must be logged in' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { filename, folder = 'cn-uploads' } = body;

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      );
    }

    // Generate unique public_id with timestamp
    const timestamp = Math.floor(Date.now() / 1000);
    const publicId = `${folder}/${session.user.id}_${timestamp}_${filename.replace(/\.[^/.]+$/, '')}`;

    // Prepare parameters for signed upload
    const paramsToSign = {
      timestamp: timestamp.toString(),
      folder,
      public_id: publicId,
    };

    // Generate signature
    const signature = generateCloudinarySignature(paramsToSign);

    return NextResponse.json({
      signature,
      timestamp: paramsToSign.timestamp,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder,
      publicId,
    });
  } catch (error) {
    console.error('Error generating upload signature:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate signature' },
      { status: 500 }
    );
  }
}
