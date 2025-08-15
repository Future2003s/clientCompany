import { NextRequest } from "next/server";
import { getAuthHeaderOrRefresh } from "@/lib/next-api-auth";

export async function GET(request: NextRequest) {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_END_POINT || "";
    const { authHeader } = await getAuthHeaderOrRefresh(request);

    let backendStatus: number | null = null;
    let backendMessage: string | null = null;

    if (apiBase) {
      try {
        const url = new URL(`${apiBase}/v1/api/orders`);
        url.searchParams.set("page", "1");
        url.searchParams.set("size", "1");
        const res = await fetch(url.toString(), {
          headers: authHeader ? { Authorization: authHeader } : undefined,
          cache: "no-store",
        });
        backendStatus = res.status;
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          backendMessage = (data && (data.message || data.status || null)) || null;
        } else {
          backendMessage = await res.text();
        }
      } catch (e) {
        backendMessage = e instanceof Error ? e.message : "Backend check failed";
      }
    }

    return new Response(
      JSON.stringify({
        status: "ok",
        hasApiBase: Boolean(apiBase),
        hasAuth: Boolean(authHeader),
        backendStatus,
        backendMessage,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal Error";
    return new Response(JSON.stringify({ message: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}