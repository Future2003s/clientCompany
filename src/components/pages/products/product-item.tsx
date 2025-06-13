"use client";
import React, { useState } from "react";

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageThumbUrl: string; // Thêm trường cho ảnh thumbnail
}

// Dữ liệu sản phẩm mẫu (có thể lấy từ API thực tế)
const sampleProduct: Product = {
  id: "lychee-honey-1",
  name: "Mật Ong Hoa Vải Thanh Hà",
  description:
    "Mật ong hoa vải nguyên chất từ vùng Thanh Hà, Hải Dương. Sản phẩm có hương vị thơm ngon đặc trưng, màu vàng óng tự nhiên, và nhiều lợi ích cho sức khỏe. Thích hợp dùng pha đồ uống, làm bánh, hoặc ăn trực tiếp.",
  price: 250000, // Giá sản phẩm
  imageUrl:
    "https://placehold.co/600x400/F0F0F0/000000?text=M%E1%BA%ADt+ong+hoa+v%E1%BA%A3i+l%E1%BB%9Bn", // Placeholder cho ảnh lớn
  imageThumbUrl:
    "https://placehold.co/100x100/F0F0F0/000000?text=M%E1%BA%ADt+ong+nh%E1%BB%8F", // Placeholder cho ảnh thumbnail
};

// Component chính của ứng dụng
export default function ProductItem() {
  const [product, setProduct] = useState<Product>(sampleProduct);
  const [selectedImage, setSelectedImage] = useState(product.imageUrl); // State cho ảnh đang hiển thị
  const [quantity, setQuantity] = useState(1); // State cho số lượng sản phẩm

  const handleAddToCart = () => {
    // Logic thêm sản phẩm vào giỏ hàng
    console.log(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng.`);
    // Có thể tích hợp API giỏ hàng ở đây
    alert(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng.`);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:flex">
        {/* Phần ảnh sản phẩm */}
        <div className="md:w-1/2 p-6 flex flex-col items-center justify-center bg-gray-50 rounded-l-lg">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-auto object-contain rounded-lg shadow-md mb-4 max-h-[500px]"
          />
          {/* Gallery ảnh thumbnail */}
          <div className="flex space-x-2">
            <img
              src="AQ0P4307.jpg"
              alt="Mật ong hoa vải chai nhỏ"
              className="w-24 h-24 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all duration-200"
              onClick={() => handleImageClick("AQ0P4307.jpg")}
            />
            <img
              src="chai mat ong.jpg"
              alt="Mật ong hoa vải chai lớn"
              className="w-24 h-24 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all duration-200"
              onClick={() => handleImageClick("chai mat ong.jpg")}
            />
            <img
              src="https://placehold.co/100x100/ADD8E6/000000?text=Ảnh+3"
              alt="Ảnh sản phẩm 3"
              className="w-24 h-24 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all duration-200"
              onClick={() =>
                handleImageClick(
                  "https://placehold.co/600x400/ADD8E6/000000?text=Ảnh+sản+phẩm+3"
                )
              }
            />
            <img
              src="https://placehold.co/100x100/90EE90/000000?text=Ảnh+4"
              alt="Ảnh sản phẩm 4"
              className="w-24 h-24 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all duration-200"
              onClick={() =>
                handleImageClick(
                  "https://placehold.co/600x400/90EE90/000000?text=Ảnh+sản+phẩm+4"
                )
              }
            />
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
        </div>
      </div>

      {/* Phần sản phẩm liên quan (ví dụ) */}
      <div className="max-w-7xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Sản phẩm liên quan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card sản phẩm liên quan 1 */}
          <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src="https://placehold.co/400x300/F0F0F0/000000?text=S%E1%BA%A3n+ph%E1%BA%A9m+li%C3%AAn+quan+1"
              alt="Sản phẩm liên quan 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Sữa ong chúa
              </h3>
              <p className="text-gray-600 text-sm mb-2">150.000 VNĐ</p>
              <button className="w-full bg-green-500 text-white py-2 rounded-md text-sm hover:bg-green-600 transition-colors">
                Xem chi tiết
              </button>
            </div>
          </div>

          {/* Card sản phẩm liên quan 2 */}
          <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src="https://placehold.co/400x300/F0F0F0/000000?text=S%E1%BA%A3n+ph%E1%BA%A9m+li%C3%AAn+quan+2"
              alt="Sản phẩm liên quan 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Phấn hoa
              </h3>
              <p className="text-gray-600 text-sm mb-2">120.000 VNĐ</p>
              <button className="w-full bg-green-500 text-white py-2 rounded-md text-sm hover:bg-green-600 transition-colors">
                Xem chi tiết
              </button>
            </div>
          </div>

          {/* Card sản phẩm liên quan 3 */}
          <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src="https://placehold.co/400x300/F0F0F0/000000?text=S%E1%BA%A3n+ph%E1%BA%A3m+li%C3%AAn+quan+3"
              alt="Sản phẩm liên quan 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Mật ong rừng
              </h3>
              <p className="text-gray-600 text-sm mb-2">300.000 VNĐ</p>
              <button className="w-full bg-green-500 text-white py-2 rounded-md text-sm hover:bg-green-600 transition-colors">
                Xem chi tiết
              </button>
            </div>
          </div>

          {/* Card sản phẩm liên quan 4 */}
          <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src="https://placehold.co/400x300/F0F0F0/000000?text=S%E1%BA%A3n+ph%E1%BA%A3m+li%C3%AAn+quan+4"
              alt="Sản phẩm liên quan 4"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Keo ong
              </h3>
              <p className="text-gray-600 text-sm mb-2">280.000 VNĐ</p>
              <button className="w-full bg-green-500 text-white py-2 rounded-md text-sm hover:bg-green-600 transition-colors">
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
