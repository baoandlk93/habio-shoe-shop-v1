import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // Các route bắt buộc phải đăng nhập
  const isAuthRoute = pathname.startsWith("/admin") || pathname.startsWith("/user");

  // Nếu vào trang admin mà chưa đăng nhập hoặc không phải admin
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Nếu vào route user cần đăng nhập
  if (pathname.startsWith("/user")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Các route khác, không hạn chế truy cập
  return NextResponse.next();
}

/**
 * Cấu hình matcher cho middleware
 * Có thể hạn chế kiểm tra cho các route cụ thể hoặc mặc định toàn bộ app.
 */
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"]
};
