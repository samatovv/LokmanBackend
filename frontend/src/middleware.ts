import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Больше не можем проверять LocalStorage, только куку — убираем проверку по token
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  // Можно просто оставить редиректы между auth и manager по факту
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL('/manager', request.url));
    }
  }

  return NextResponse.next();
}


