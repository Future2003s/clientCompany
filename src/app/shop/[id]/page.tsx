"use client";
import { useEffect, useMemo, useState } from "react";
import { productsApi, ProductDetail } from "@/apiRequests/products";
import { useParams, useRouter } from "next/navigation";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount
  );

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id as string;

  const [item, setItem] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      try {
        const res: any = await productsApi.detail(id);
        setItem(res?.data ?? null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const price = useMemo(() => {
    if (!item) return 0;
    const v = item.variants?.find((x) => x.id === selectedVariant);
    return Number(v?.price ?? item.price);
  }, [item, selectedVariant]);

  if (loading || !item) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="aspect-square bg-gray-200 rounded animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <button
        onClick={() => router.back()}
        className="text-gray-500 hover:text-gray-700 mb-4"
      >
        Quay lại
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="aspect-square overflow-hidden rounded bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrls?.[0] || "https://placehold.co/800x800"}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          {item.imageUrls?.length > 1 && (
            <div className="flex gap-2 mt-2">
              {item.imageUrls.map((u, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={u}
                  alt="thumb"
                  className="w-16 h-16 rounded object-cover border"
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{item.name}</h1>
          <div className="text-pink-600 text-xl font-bold mt-2">
            {formatCurrency(price)}
          </div>
          {item.brandName && (
            <div className="text-sm text-gray-500 mt-1">{item.brandName}</div>
          )}
          {item.categoryName && (
            <div className="text-sm text-gray-500">{item.categoryName}</div>
          )}

          {item.variants?.length > 0 && (
            <div className="mt-4">
              <div className="text-sm text-gray-700 mb-1">Chọn biến thể</div>
              <div className="flex flex-wrap gap-2">
                {item.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v.id)}
                    className={`px-3 py-1 rounded border ${
                      selectedVariant === v.id
                        ? "border-pink-600 text-pink-600"
                        : "border-gray-300"
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-9 w-9 rounded border"
            >
              -
            </button>
            <div className="w-10 text-center">{qty}</div>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="h-9 w-9 rounded border"
            >
              +
            </button>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="px-5 py-3 rounded bg-gray-900 text-white">
              Thêm vào giỏ
            </button>
            <button className="px-5 py-3 rounded bg-pink-600 text-white">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
