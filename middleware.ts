import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/creator/:path*',
    '/settings/:path*',
    '/my-list/:path*',
    '/profile/:path*',
    '/publish-art/:path*',
    '/write-stories/:path*',
  ],
};

export async function middleware(req: NextRequest) {
  // Skip middleware entirely in production to avoid Supabase connection issues
  // Page-level auth will handle protection
  return NextResponse.next();
}
