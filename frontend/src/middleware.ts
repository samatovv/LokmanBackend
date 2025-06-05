import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token && !isAuthPage) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (token && isAuthPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};

