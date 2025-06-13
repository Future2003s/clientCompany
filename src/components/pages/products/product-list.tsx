"use client";
import React, { useState } from "react";
import ProductBig from "../../../../public/products/IMG_0404.png";
import ProductSmall from "../../../../public/products/IMG_0405.png";
import Image, { StaticImageData } from "next/image";
import ProductDetailView from "./product-detail";
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: StaticImageData | string;
  imageThumbUrl?: string;
  galleryImages?: string | any[];
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

// Component hiển thị chi tiết một sản phẩm
interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
}
export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  const filteredProducts = sampleProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return (
      <ProductDetailView product={selectedProduct} onBack={handleBackToList} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-inter antialiased">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-extrabold text-gray-900 text-center mb-10 leading-tight">
          Khám phá Sản Phẩm <span className="text-blue-600">Tuyệt Vời</span>
        </h1>

        {/* Ô tìm kiếm được thiết kế lại */}
        <div className="mb-16 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, ví dụ: Mật Ong Hoa Vải..."
              className="w-full px-6 py-4 pr-12 border border-gray-200 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 text-lg text-gray-800 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Tìm kiếm sản phẩm"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Hiển thị thông báo nếu không tìm thấy sản phẩm */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-600 text-xl mt-16 py-8 px-6 bg-white rounded-lg shadow-md">
            Rất tiếc, không tìm thấy sản phẩm nào phù hợp với từ khóa "
            <span className="font-semibold text-red-500">{searchTerm}</span>".
            Vui lòng thử từ khóa khác!
          </p>
        )}

        {/* Lưới sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col cursor-pointer"
              onClick={() => handleProductClick(product)} // Xử lý click để hiển thị chi tiết
              role="button"
              tabIndex={0}
              aria-label={`Xem chi tiết sản phẩm ${product.name}`}
            >
              {/* Ảnh sản phẩm */}
              <div className="relative w-full h-56 overflow-hidden bg-gray-100 rounded-t-2xl">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://placehold.co/400x300/F0F0F0/000000?text=L%E1%BB%97i+%E1%BA%A2nh`;
                  }}
                />
              </div>
              {/* Chi tiết sản phẩm */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {product.description}
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <p className="text-3xl font-extrabold text-blue-700 mb-4">
                    {product.price.toLocaleString("vi-VN")} VNĐ
                  </p>
                  <button
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors shadow-md transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn chặn sự kiện click của thẻ cha
                      console.log(`Đã thêm ${product.name} vào giỏ hàng`);
                      // Trong một ứng dụng thực tế, bạn sẽ thêm vào giỏ hàng ở đây
                    }}
                    aria-label={`Thêm ${product.name} vào giỏ hàng`}
                  >
                    Mua Ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
