import { NextRequest, NextResponse } from "next/server";

type RefreshResult = {
  authHeader: string | null;
  setCookie?: string | null;
};

export async function getAuthHeaderOrRefresh(
  request: NextRequest
): Promise<RefreshResult> {
  let authHeader = request.headers.get("authorization") || "";
  if (authHeader.startsWith("Bearer ")) {
    return { authHeader, setCookie: null };
  }
  const accessFromCookie = request.cookies.get("sessionToken")?.value || "";
  if (accessFromCookie) {
    return { authHeader: `Bearer ${accessFromCookie}` } as any;
  }
  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (!refreshToken) return { authHeader: null };
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/v1/api/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (!res.ok) return { authHeader: null };
    const contentType = res.headers.get("content-type") || "";
    const data: any = contentType.includes("application/json")
      ? await res.json()
      : {};
    const newAccess = data?.accessToken || data?.data?.accessToken;
    const setCookie = res.headers.get("set-cookie");
    if (!newAccess) return { authHeader: null };
    return { authHeader: `Bearer ${newAccess}`, setCookie };
  } catch {
    return { authHeader: null };
  }
}

export async function proxyJson<ResponseBody = any>(
  backendUrl: string,
  request: NextRequest,
  init: RequestInit & { requireAuth?: boolean } = {}
) {
  const { authHeader, setCookie } = await getAuthHeaderOrRefresh(request);
  if (init.requireAuth && !authHeader) {
    return new NextResponse(JSON.stringify({ message: "Unauthenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch(backendUrl, {
    ...init,
    headers: {
      ...(init.headers || {}),
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") || "application/json";
  const body = contentType.includes("application/json")
    ? await res.json()
    : await res.text();
  const response = new NextResponse(
    typeof body === "string" ? body : JSON.stringify(body),
    { status: res.status, headers: { "Content-Type": contentType } }
  );
  if (setCookie) response.headers.set("set-cookie", setCookie);
  return response;
}
