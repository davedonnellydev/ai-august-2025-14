import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Skip middleware for login page to prevent redirect loops
    if (req.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    const cookie = req.cookies.get('admin')?.value;
    if (cookie === 'ok') return NextResponse.next();

    // Basic prompt if not authenticated
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('next', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
}
