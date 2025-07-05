import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Các đường dẫn yêu cầu đăng nhập
const privatePaths = ["/me", "/quantri"];

// Các đường dẫn dành cho việc xác thực (đăng nhập, đăng ký)
const authPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionId = request.cookies.get("sessionId")?.value;

  // nếu chưa đăng nhập thì chuyển sang trang đăng nhập
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // nếu đăng nhập rồi thì chuyển về trang hồ sơ
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionId) {
    return NextResponse.redirect(new URL("/me", request.url));
  }

  return NextResponse.next();
}

// Cấu hình để middleware chỉ chạy trên các đường dẫn được chỉ định.
export const config = {
  matcher: ["/me", "/login", "/register", "/quantri"],
};
