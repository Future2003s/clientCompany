"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
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
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSelectedImage(product.imageUrl);
    setQuantity(1);
  }, [product]);

  const handleAddToCart = () => {
    console.log(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng.`);
    setMessage(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng.`);
    setTimeout(() => setMessage(""), 3000); // Xóa thông báo sau 3 giây
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter antialiased mt-52">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:flex">
        {/* Nút quay lại */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm z-10"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Quay lại danh sách
        </button>

        {/* Phần ảnh sản phẩm */}
        <div className="md:w-1/2 p-6 flex flex-col items-center justify-center bg-gray-50 rounded-l-lg relative">
          <Image
            src={selectedImage}
            alt={product.name}
            className="w-full h-auto object-contain rounded-lg shadow-md mb-4 max-h-[500px]"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/600x400/F0F0F0/000000?text=L%E1%BB%97i+%E1%BA%A2nh`;
            }}
          />
          {/* Gallery ảnh thumbnail */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {/*@ts-ignore*/}
            {product.galleryImages?.map(
              (imgUrl: string | StaticImageData, index: any) => (
                <Image
                  key={index}
                  src={imgUrl}
                  alt={`${product.name} - Ảnh ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    selectedImage === imgUrl
                      ? "border-blue-500"
                      : "border-transparent"
                  } hover:border-blue-500 transition-all duration-200`}
                  onClick={() => handleImageClick(imgUrl as any)}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://placehold.co/100x100/F0F0F0/000000?text=L%E1%BB%97i`;
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* Phần chi tiết sản phẩm */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl text-gray-700 mb-6 font-semibold">
              {product.price.toLocaleString("vi-VN")} VNĐ
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Điều chỉnh số lượng */}
            <div className="flex items-center mb-6">
              <label
                htmlFor="quantity"
                className="text-gray-700 font-medium mr-4"
              >
                Số lượng:
              </label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 transition-colors"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center border-l border-r border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 transition-colors"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Nút thêm vào giỏ hàng */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-6 md:mt-0"
          >
            Thêm vào giỏ hàng
          </button>

          {/* Message box */}
          {message && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md text-center">
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Phần sản phẩm liên quan (ví dụ) */}
      <div className="max-w-7xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Sản phẩm liên quan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleProducts.slice(0, 4).map(
            (relatedProduct) =>
              relatedProduct.id !== product.id && ( // Không hiển thị sản phẩm hiện tại trong danh sách liên quan
                <div
                  key={relatedProduct.id}
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => onBack()} // Quay lại danh sách để click vào sản phẩm khác
                >
                  <Image
                    src={relatedProduct.imageUrl}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/400x300/F0F0F0/000000?text=L%E1%BB%97i+%E1%BA%A2nh`;
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {relatedProduct.price.toLocaleString("vi-VN")} VNĐ
                    </p>
                    <button
                      className="w-full bg-green-500 text-white py-2 rounded-md text-sm hover:bg-green-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent parent div click
                        onBack(); // Go back to list and simulate clicking on related product
                      }}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
