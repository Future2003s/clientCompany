import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ message: "Unauthenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    // In a real app, you would persist the order and trigger notifications here
    const body = await request.json();
    // Basic validation
    if (
      !body?.customer?.fullName ||
      !body?.customer?.phone ||
      !body?.customer?.address
    ) {
      return new Response(
        JSON.stringify({ message: "Thiếu thông tin khách hàng" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    // Proxy to backend orders create
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/v1/api/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );
    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await res.json()
      : await res.text();
    return new Response(
      typeof data === "string" ? data : JSON.stringify(data),
      {
        status: res.status,
        headers: { "Content-Type": contentType || "application/json" },
      }
    );
  } catch (e) {
    return new Response(JSON.stringify({ message: "Internal Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
