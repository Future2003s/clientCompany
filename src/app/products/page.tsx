"use client";
import { useEffect, useMemo, useState } from "react";
import { productsApi, ProductListItem } from "@/apiRequests/products";
import Link from "next/link";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount
  );

export default function ShopPage() {
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res: any = await productsApi.list({ q });
        setItems(res?.data ?? []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [q]);

  const filtered = useMemo(() => items, [items]);

  return (
    <div className="container mx-auto px-4 py-10 mt-25">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Sản phẩm</h1>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm kiếm..."
          className="border rounded px-3 py-2 w-full max-w-md"
        />
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="h-40 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded mt-3 w-2/3" />
              <div className="h-4 bg-gray-200 rounded mt-2 w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="group border rounded-xl overflow-hidden bg-white hover:shadow-md"
            >
              <div className="aspect-square bg-gray-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.imageUrls?.[0] || "https://placehold.co/600x600"}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3">
                <div className="text-sm text-gray-500">
                  {p.brandName || p.categoryName || ""}
                </div>
                <div className="font-medium truncate" title={p.name}>
                  {p.name}
                </div>
                <div className="text-pink-600 font-semibold mt-1">
                  {formatCurrency(Number(p.price))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
