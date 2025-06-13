"use client";
import React, { useState } from "react";

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Dữ liệu sản phẩm mẫu (có thể lấy từ API thực tế)
const sampleProducts: Product[] = [
  {
    id: "lychee-honey-1",
    name: "Mật Ong Hoa Vải Thanh Hà (Chai lớn)",
    description:
      "Mật ong hoa vải nguyên chất từ vùng Thanh Hà, Hải Dương. Hương vị thơm ngon đặc trưng, màu vàng óng tự nhiên.",
    price: 250000,
    imageUrl: "chai mat ong.jpg", // Using provided image
  },
  {
    id: "lychee-honey-2",
    name: "Mật Ong Hoa Vải Thanh Hà (Chai nhỏ)",
    description:
      "Chai mật ong hoa vải nhỏ gọn, tiện lợi mang theo hoặc làm quà tặng.",
    price: 150000,
    imageUrl: "AQ0P4307.jpg", // Using provided image
  },
  {
    id: "royal-jelly",
    name: "Sữa Ong Chúa Tươi Nguyên Chất",
    description:
      "Sữa ong chúa tươi nguyên chất, được thu hoạch cẩn thận để giữ trọn vẹn dưỡng chất, giúp tăng cường sức khỏe và làm đẹp da từ bên trong.",
    price: 350000,
    imageUrl:
      "https://placehold.co/400x300/e6f0e6/000000?text=S%E1%BB%AFa+Ong+Ch%C3%BAa",
  },
  {
    id: "pollen",
    name: "Phấn Hoa Tự Nhiên Cao Cấp",
    description:
      "Phấn hoa tự nhiên, giàu vitamin, khoáng chất và axit amin thiết yếu. Sản phẩm hỗ trợ tiêu hóa, tăng cường miễn dịch và cải thiện năng lượng tổng thể.",
    price: 180000,
    imageUrl:
      "https://placehold.co/400x300/f0e6e6/000000?text=Ph%E1%BA%A5n+Hoa",
  },
  {
    id: "forest-honey",
    name: "Mật Ong Rừng Hoang Dã",
    description:
      "Mật ong khai thác từ rừng tự nhiên, không pha tạp, mang hương vị đậm đà, đặc trưng của hoa rừng. Sản phẩm lý tưởng cho những ai tìm kiếm sự tinh khiết và tự nhiên.",
    price: 400000,
    imageUrl:
      "https://placehold.co/400x300/e6e6f0/000000?text=M%E1%BA%ADt+Ong+R%E1%BB%ABng",
  },
  {
    id: "propolis",
    name: "Keo Ong Nguyên Chất",
    description:
      "Keo ong được thu hoạch từ tổ ong, nổi tiếng với đặc tính kháng khuẩn, chống viêm và tăng cường hệ miễn dịch. Sản phẩm tự nhiên hỗ trợ bảo vệ sức khỏe.",
    price: 280000,
    imageUrl: "https://placehold.co/400x300/e6f0f0/000000?text=Keo+Ong",
  },
  {
    id: "bee-wax",
    name: "Sáp Ong Tinh Khiết",
    description:
      "Sáp ong tự nhiên, không qua xử lý hóa chất. Thích hợp dùng trong làm nến, mỹ phẩm handmade, hoặc các ứng dụng tự nhiên khác. An toàn và thân thiện với môi trường.",
    price: 80000,
    imageUrl: "https://placehold.co/400x300/f0f0e6/000000?text=S%C3%A1p+Ong",
  },
  {
    id: "honeycomb",
    name: "Tổ Ong Mật Tươi Nguyên Tổ",
    description:
      "Tổ ong mật tươi nguyên miếng, mang đến trải nghiệm hương vị mật ong tự nhiên nhất cùng với sáp ong mềm mại, giàu dưỡng chất.",
    price: 500000,
    imageUrl:
      "https://placehold.co/400x300/f0eaf0/000000?text=T%E1%BB%95+Ong+M%E1%BA%ADt",
  },
];

// Component chính của ứng dụng danh sách sản phẩm
export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  const filteredProducts = sampleProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              onClick={() =>
                console.log(`Xem chi tiết sản phẩm: ${product.name}`)
              }
              role="button"
              tabIndex={0}
              aria-label={`Xem chi tiết sản phẩm ${product.name}`}
            >
              {/* Ảnh sản phẩm */}
              <div className="relative w-full h-56 overflow-hidden bg-gray-100 rounded-t-2xl">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // Prevent infinite loop if placeholder also errors
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
                      e.stopPropagation(); // Prevent card click event from firing
                      console.log(`Đã thêm ${product.name} vào giỏ hàng`);
                      // In a real app, you'd add to cart here
                    }}
                    aria-label={`Thêm ${product.name} vào giỏ hàng`}
                  >
                    Thêm vào giỏ hàng
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
