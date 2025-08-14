"use client";
import { useEffect, useMemo, useState } from "react";
import { productsApi, type ProductDetail } from "@/apiRequests/products";
import { useParams, useRouter } from "next/navigation";
import BuyNowModal from "@/components/ui/buy-now-modal";
import { useAppContextProvider } from "@/context/app-context";
import { useCartStore } from "@/store/cart";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount
  );

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id as string;
  const { sessionToken } = useAppContextProvider();

  const [item, setItem] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [buyOpen, setBuyOpen] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

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
            <button
              className="px-5 py-3 rounded bg-gray-900 text-white"
              onClick={() => {
                const variant =
                  item.variants?.find((x) => x.id === selectedVariant) || null;
                addItem({
                  id: item.id,
                  productId: item.id,
                  variantId: variant?.id || null,
                  variantName: variant?.name || null,
                  name: variant ? `${item.name} - ${variant.name}` : item.name,
                  price: Number(variant?.price ?? item.price) || 0,
                  quantity: qty,
                  imageUrl: item.imageUrls?.[0],
                });
              }}
            >
              Thêm vào giỏ
            </button>
            <button
              className="px-5 py-3 rounded bg-pink-600 text-white cursor-pointer"
              onClick={() => {
                if (!sessionToken) {
                  setLoginPromptOpen(true);
                  return;
                }
                setBuyOpen(true);
              }}
            >
              Mua ngay
            </button>
          </div>
          <BuyNowModal
            open={buyOpen}
            onClose={() => setBuyOpen(false)}
            items={[{ name: item.name, price, quantity: qty }]}
          />
          {loginPromptOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setLoginPromptOpen(false)}
              />
              <div className="relative bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden">
                <div className="px-5 py-4 border-b flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Yêu cầu đăng nhập</h3>
                  <button
                    onClick={() => setLoginPromptOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-gray-700">
                    Để tiếp tục mua hàng, vui lòng đăng nhập tài khoản.
                  </p>
                </div>
                <div className="px-5 py-4 border-t flex gap-3 justify-end">
                  <button
                    onClick={() => setLoginPromptOpen(false)}
                    className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-50"
                  >
                    Để sau
                  </button>
                  <button
                    onClick={() => router.push("/login")}
                    className="px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700"
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
