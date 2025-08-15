import { NextRequest } from "next/server";
import { envConfig } from "@/config";
import { proxyJson } from "@/lib/next-api-auth";

export async function GET(
  _request: NextRequest,
  context: any
) {
  const id = context?.params?.id as string;
  try {
    const base = envConfig.NEXT_PUBLIC_API_END_POINT;
    const template = process.env.API_PRODUCTS_GET_URL_TEMPLATE; // e.g., /v1/api/products/public/{id}
    const candidates: string[] = [];
    if (template) {
      candidates.push(template.replace("{id}", id));
    }
    candidates.push(`/v1/api/products/public/${id}`);
    candidates.push(`/v1/api/products/${id}`);

    let lastRes: Response | null = null;
    for (const path of candidates) {
      const res = await fetch(
        `${base}${path.startsWith("/") ? path : `/${path}`}`,
        {
          cache: "no-store",
        }
      );
      lastRes = res;
      if (res.status !== 404 && res.status !== 405) {
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
      }
    }
    return new Response(
      JSON.stringify({
        message: "Detail endpoint not found",
        tried: candidates,
      }),
      {
        status: lastRes?.status ?? 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    return new Response(JSON.stringify({ message: "Internal Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(
  request: NextRequest,
  context: any
) {
  const id = context?.params?.id as string;
  try {
    const body = await request.json();
    const base = envConfig.NEXT_PUBLIC_API_END_POINT;
    const template = process.env.API_PRODUCTS_UPDATE_URL_TEMPLATE; // e.g., /v1/api/products/{id}
    const candidates: string[] = [];
    if (template) {
      candidates.push(template.replace("{id}", id));
    }
    candidates.push(`/v1/api/products/${id}`);
    candidates.push(`/v1/api/products/updateProduct/${id}`);

    let lastRes: Response | null = null;
    for (const path of candidates) {
      const res = await proxyJson(
        `${base}${path.startsWith("/") ? path : `/${path}`}`,
        request,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          requireAuth: true,
        }
      );
      if (res.status !== 404 && res.status !== 405) return res;
      lastRes = res as any;
    }
    return new Response(
      JSON.stringify({
        message: "Update endpoint not found",
        tried: candidates,
      }),
      {
        status: lastRes?.status ?? 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    return new Response(JSON.stringify({ message: "Internal Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(
  request: NextRequest,
  context: any
) {
  const id = context?.params?.id as string;
  try {
    const base = envConfig.NEXT_PUBLIC_API_END_POINT;
    const template = process.env.API_PRODUCTS_DELETE_URL_TEMPLATE; // e.g., /v1/api/products/{id}
    const candidates: string[] = [];
    if (template) {
      candidates.push(template.replace("{id}", id));
    }
    candidates.push(`/v1/api/products/${id}`);
    candidates.push(`/v1/api/products/deleteProduct/${id}`);

    let lastRes: Response | null = null;
    for (const path of candidates) {
      const res = await proxyJson(
        `${base}${path.startsWith("/") ? path : `/${path}`}`,
        request,
        { method: "DELETE", requireAuth: true }
      );
      if (res.status !== 404 && res.status !== 405) return res;
      lastRes = res as any;
    }
    return new Response(
      JSON.stringify({
        message: "Delete endpoint not found",
        tried: candidates,
      }),
      {
        status: lastRes?.status ?? 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    return new Response(JSON.stringify({ message: "Internal Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
