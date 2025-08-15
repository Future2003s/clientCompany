import { NextRequest } from "next/server";
import { envConfig } from "@/config";

export async function GET(
  _request: NextRequest,
  ctx: any
) {
  const id = ctx?.params?.id as string;
  try {
    const res = await fetch(
      `${envConfig.NEXT_PUBLIC_API_END_POINT}/v1/api/products/public/${id}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: "Internal Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
