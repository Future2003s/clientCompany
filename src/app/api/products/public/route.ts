import { NextRequest } from "next/server";
import { envConfig } from "@/config";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const categoryId = searchParams.get("categoryId");
  const brandId = searchParams.get("brandId");
  const page = searchParams.get("page") ?? "0";
  const size = searchParams.get("size") ?? "20";

  const backendUrl = new URL(
    `${envConfig.NEXT_PUBLIC_API_END_POINT}/v1/api/products/public`
  );
  if (q) backendUrl.searchParams.set("q", q);
  if (categoryId) backendUrl.searchParams.set("categoryId", categoryId);
  if (brandId) backendUrl.searchParams.set("brandId", brandId);
  backendUrl.searchParams.set("page", page);
  backendUrl.searchParams.set("size", size);

  try {
    const res = await fetch(backendUrl.toString(), { cache: "no-store" });
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
