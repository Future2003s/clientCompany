import { NextResponse, NextRequest } from "next/server";

const privatePath: string[] = ["/me"];
const publicPath: string[] = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const sessionId = request.cookies.get("sessionToken")?.value;

  console.log("pathName >>>>", pathName);

  // đăng nhập vào đường dẫn khi đã đăng nhập
  if (privatePath.some((path) => pathName.startsWith(path)) && !sessionId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // đã đăng nhập nhưng vẫn truy cập vào trang đăng nhập
  if (publicPath.some((path) => pathName.startsWith(path)) && sessionId) {
    return NextResponse.redirect(new URL("/me", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/me", "/register"],
};
