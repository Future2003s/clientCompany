import { NextRequest } from "next/server";
import { proxyJson } from "@/lib/next-api-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return proxyJson(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/v1/api/products/createProduct`,
      request,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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
