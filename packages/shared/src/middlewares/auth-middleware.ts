import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  if (!token) {
    // Nếu không có token, redirect về trang đăng nhập
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Nếu có token, cho phép tiếp tục
  return NextResponse.next();
}

// Áp dụng middleware cho tất cả các route cần bảo vệ
export const config = {
  matcher: [
    // Thay đổi pattern này cho phù hợp với app của bạn
    "/((?!login|_next|api|public).*)",
  ],
};
