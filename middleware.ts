// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // ví dụ: kiểm tra gì đó
  }
  // Bắt buộc phải return NextResponse
  return NextResponse.next();
}
