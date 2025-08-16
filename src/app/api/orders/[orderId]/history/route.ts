import { NextRequest } from "next/server";
import { proxyJson } from "@/lib/next-api-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    return proxyJson(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/v1/api/orders/${(await params).orderId}/history`,
      request,
      { method: "GET", requireAuth: true }
    );
  } catch (e) {
    return new Response(JSON.stringify({ message: "Internal Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
