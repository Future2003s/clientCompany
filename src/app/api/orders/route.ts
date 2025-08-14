import { NextRequest } from "next/server";
import { proxyJson } from "@/lib/next-api-auth";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/v1/api/orders`
    );
    const page = request.nextUrl.searchParams.get("page");
    const size = request.nextUrl.searchParams.get("size");
    if (page) url.searchParams.set("page", page);
    if (size) url.searchParams.set("size", size);
    return proxyJson(url.toString(), request, {
      method: "GET",
      requireAuth: true,
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: "Internal Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const orderId = body.orderId;
    const status = body.status;
    if (!orderId || !status) {
      return new Response(
        JSON.stringify({ message: "Missing orderId or status" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return proxyJson(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/v1/api/orders/${orderId}`,
      request,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        requireAuth: true,
      }
    );
  } catch (e) {
    return new Response(JSON.stringify({ message: "Internal Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return proxyJson(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/v1/api/orders`,
      request,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        // allow unauth if backend allows public create; otherwise set true
        requireAuth: false,
      }
    );
  } catch (e) {
    return new Response(JSON.stringify({ message: "Internal Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
