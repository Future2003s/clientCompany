"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useMemo, useState, useCallback } from "react";
import ProductBig from "../../../../public/products/IMG_0404.png";
import ProductSmall from "../../../../public/products/IMG_0405.png";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: StaticImageData | string;
  imageThumbUrl?: string;
  galleryImages?: string | any[];
  rating?: number;
  reviewCount?: number;
}

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
}

const sampleProducts: Product[] = [
  {
    id: "lychee-honey-2",
    name: "Mật Ong Hoa Vải Thanh Hà 165g",
    description:
      "Chai mật ong hoa vải nhỏ gọn, tiện lợi mang theo hoặc làm quà tặng.",
    price: 150000,
    imageUrl: ProductSmall, // Using provided image
    galleryImages: [ProductSmall, ProductSmall, ProductSmall, ProductSmall],
  },
  {
    id: "lychee-honey-1",
    name: "Mật Ong Hoa Vải Thanh Hà Dung Tích 435g",
    description:
      "Mật ong hoa vải nguyên chất từ vùng Thanh Hà, Hải Dương. Hương vị thơm ngon đặc trưng, màu vàng óng tự nhiên, và nhiều lợi ích cho sức khỏe. Thích hợp dùng pha đồ uống, làm bánh, hoặc ăn trực tiếp.",
    price: 250000,
    imageUrl: ProductBig,
    galleryImages: [ProductBig, ProductBig, ProductBig, ProductBig],
  },
];

export default function ProductDetailView({
  product,
  onBack,
}: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.imageUrl as string
  );
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const images: string[] = useMemo(() => {
    const base = typeof product.imageUrl === "string" ? product.imageUrl : "";
    const gallery = Array.isArray(product.galleryImages)
      ? product.galleryImages
      : [];
    const unique = [base, ...gallery].filter(Boolean);
    return Array.from(new Set(unique));
  }, [product]);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }, []);

  // Đặt lại ảnh chính và số lượng khi sản phẩm thay đổi và cuộn lên đầu trang
  useEffect(() => {
    setSelectedImage(product.imageUrl as string);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (images.length === 0) return;
      const idx = images.findIndex((i) => i === selectedImage);
      if (e.key === "ArrowRight") {
        const next = images[(idx + 1) % images.length];
        setSelectedImage(next);
      } else if (e.key === "ArrowLeft") {
        const prev = images[(idx - 1 + images.length) % images.length];
        setSelectedImage(prev);
      } else if (e.key === "Escape" && lightboxOpen) {
        setLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images, selectedImage, lightboxOpen]);

  const handleAddToCart = () => {
    console.log(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng.`);
    setMessage(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng.`);
    setTimeout(() => setMessage(""), 3000); // Xóa thông báo sau 3 giây
  };

  const handleBuyNow = () => {
    console.log(`Mua ngay ${quantity} sản phẩm "${product.name}".`);
    setMessage(`Mua ngay ${quantity} sản phẩm "${product.name}".`);
    setTimeout(() => setMessage(""), 3000); // Xóa thông báo sau 3 giây
    // Logic điều hướng đến trang thanh toán hoặc mở modal thanh toán ngay lập tức
  };

  const handleImageClick = (imgSrc: string) => {
    setSelectedImage(imgSrc);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-inter antialiased mt-25">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm text-gray-500 mb-4">
          <button onClick={onBack} className="hover:text-gray-700">
            Sản phẩm
          </button>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-medium line-clamp-1">
            {product.name}
          </span>
        </nav>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="p-6 bg-gray-50">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-white shadow-sm">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/800x600/F0F0F0/000000?text=No+Image`;
                }}
              />
            </div>
            <div className="mt-4 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 gap-2">
              {images.map((imgSrc, index) => (
                <button
                  key={index}
                  className={`relative aspect-square rounded-md overflow-hidden border ${
                    selectedImage === imgSrc
                      ? "border-blue-500"
                      : "border-transparent"
                  } bg-white hover:border-blue-300 transition`}
                  onClick={() => handleImageClick(imgSrc)}
                  aria-label={`Ảnh ${index + 1}`}
                >
                  <img
                    src={imgSrc}
                    alt={`Thumb ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/120x120/F0F0F0/000000?text=No+Image`;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
              {product.name}
            </h1>
            <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    className={`w-4 h-4 ${i < 5 ? "fill-current" : ""}`}
                  >
                    <path d="M12 .587l3.668 7.425 8.2 1.192-5.934 5.786 1.401 8.167L12 18.896l-7.335 3.861 1.401-8.167L.132 9.204l8.2-1.192L12 .587z" />
                  </svg>
                ))}
              </div>
              <span>5.0 (200+ đánh giá)</span>
            </div>

            <div className="mt-4 text-3xl font-extrabold text-blue-700">
              {formatCurrency(product.price)}
            </div>
            <p className="mt-4 text-gray-700 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số lượng
              </label>
              <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Giảm số lượng"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center py-2 focus:outline-none"
                  min={1}
                />
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Tăng số lượng"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-white border border-blue-600 text-blue-700 font-semibold py-3 rounded-lg hover:bg-blue-50 transition shadow-sm"
              >
                Thêm vào giỏ
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition shadow"
              >
                Mua ngay
              </button>
            </div>

            {message && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-md text-sm">
                {message}
              </div>
            )}

            <div className="mt-8 divide-y divide-gray-100 rounded-lg border border-gray-100">
              <details className="p-4 group" open>
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  Mô tả chi tiết
                  <span className="text-gray-400 group-open:rotate-180 transition">
                    ⌄
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 text-sm leading-relaxed">
                  {product.description}
                </div>
              </details>
              <details className="p-4 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  Hướng dẫn sử dụng
                  <span className="text-gray-400 group-open:rotate-180 transition">
                    ⌄
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 text-sm leading-relaxed">
                  Pha với nước ấm, dùng làm bánh hoặc ăn trực tiếp tùy khẩu vị.
                </div>
              </details>
              <details className="p-4 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  Bảo quản
                  <span className="text-gray-400 group-open:rotate-180 transition">
                    ⌄
                  </span>
                </summary>
                <div className="mt-3 text-gray-700 text-sm leading-relaxed">
                  Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.
                </div>
              </details>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Sản phẩm liên quan
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {sampleProducts.slice(0, 4).map((related) => (
              <div
                key={related.id}
                className="bg-gray-50 rounded-lg overflow-hidden border border-gray-100"
              >
                <Image
                  src={related.imageUrl}
                  alt={related.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <div className="text-sm font-semibold text-gray-900 line-clamp-1">
                    {related.name}
                  </div>
                  <div className="text-sm text-blue-700 font-bold mt-1">
                    {formatCurrency(related.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-[90vw] max-h-[85vh] object-contain"
          />
        </div>
      )}
    </div>
  );
}
