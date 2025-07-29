import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Các đường dẫn yêu cầu đăng nhập
const privatePaths = [
  "/account",
  "/quantri",
  "/payment",
  "/payment-callback",
  "/in-don",
  "/api/protected", // Protect API routes that require authentication
];

// Các đường dẫn dành cho việc xác thực (đăng nhập, đăng ký)
const authPaths = ["/login", "/register", "/forget-password"];

// Các đường dẫn API cần bảo vệ
const protectedApiPaths = ["/api/protected"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionId = request.cookies.get("sessionId")?.value;
  const isApiRoute = pathname.startsWith("/api/");

  // Kiểm tra nếu là API route được bảo vệ
  if (protectedApiPaths.some((path) => pathname.startsWith(path))) {
    if (!sessionId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  // Kiểm tra các route yêu cầu đăng nhập
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionId) {
    // Chuyển hướng đến trang login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Nếu đã đăng nhập, không cho phép truy cập các trang auth
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionId) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

// Cấu hình để middleware chạy trên các đường dẫn được chỉ định
export const config = {
  matcher: [
    "/account/:path*",
    "/login",
    "/register",
    "/forget-password",
    "/quantri/:path*",
    "/payment/:path*",
    "/payment-callback/:path*",
    "/in-don/:path*",
    "/api/protected/:path*",
  ],
};
