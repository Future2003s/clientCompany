"use client";
export default function AboutUsPage() {
  // Hàm xử lý lỗi tải ảnh cho Hero Section
  const handleHeroImageError = (e: any) => {
    e.currentTarget.src =
      "https://placehold.co/1920x600/FF3366/FFFFFF?text=Lalalycheee+Câu+Chuyện";
  };

  // Hàm xử lý lỗi tải ảnh cho phần Câu Chuyện và Sứ Mệnh
  const handleMissionImageError = (e: any) => {
    e.currentTarget.src =
      "https://placehold.co/600x400/99CCFF/FFFFFF?text=Câu+Chuyện+Lalalycheee";
  };

  // Hàm xử lý lỗi tải ảnh cho phần Tác Động & Cam Kết
  const handleImpactImageError = (e: any) => {
    e.currentTarget.src =
      "https://placehold.co/600x400/66CC66/FFFFFF?text=Cam+Kết+Bền+Vững";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans antialiased text-gray-800">
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 space-y-16 sm:space-y-24 lg:space-y-32">
        {/* Hero Section for About Page */}
        <section className="relative w-full py-20 px-4 text-center bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-3xl shadow-xl overflow-hidden">
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
          {/* Placeholder image for background */}
          <img
            src="https://placehold.co/1920x600/FF3366/FFFFFF?text=Về+Chúng+Tôi"
            alt="About Us Background"
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
            onError={handleHeroImageError} // Gán hàm xử lý lỗi
          />
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg rounded-xl">
              Về Chúng Tôi
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-95 rounded-xl">
              Nâng tầm giá trị nông sản Việt, dệt nên phong cách bền vững.
            </p>
          </div>
        </section>

        {/* Our Story and Mission */}
        <section className="container mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 rounded-xl">
                Câu Chuyện và Sứ Mệnh
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 text-justify">
                **CÔNG TY TNHH LALA - LYCHEEE** ra đời từ niềm đam mê kết nối
                tinh hoa nông sản Việt Nam với ngành thời trang và tiêu dùng bền
                vững. Chúng tôi tin rằng những giá trị tự nhiên từ vải thiều
                không chỉ mang lại sự thoải mái mà còn góp phần vào một tương
                lai xanh hơn.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 text-justify">
                Sứ mệnh của chúng tôi là **khai thác và phát triển vật liệu vải
                thiều một cách đổi mới**, mang đến những sản phẩm chất lượng
                cao, thân thiện với môi trường, đồng thời tạo ra giá trị bền
                vững cho cộng đồng nông dân địa phương.
              </p>
            </div>
            <div>
              <img
                src="https://placehold.co/600x400/99CCFF/FFFFFF?text=Sứ+Mệnh+Lalalycheee"
                alt="Our Mission"
                className="rounded-3xl shadow-2xl transform hover:scale-102 transition duration-300 w-full"
                onError={handleMissionImageError} // Gán hàm xử lý lỗi
              />
            </div>
          </div>
        </section>

        {/* Our Philosophy and Process */}
        <section className="container mx-auto bg-purple-50 rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center rounded-xl">
            Triết Lý và Quy Trình Của Chúng Tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4 bg-white p-6 rounded-2xl shadow-md transform hover:scale-105 transition duration-300">
              <div className="p-3 bg-pink-500 rounded-full text-white shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.92 14.996L3 15h18l.08-1.004a12.001 12.001 0 00-1.392-7.98z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 rounded-xl">
                Chất Lượng Tối Ưu
              </h3>
              <p className="text-gray-700">
                Chúng tôi áp dụng quy trình kiểm soát chất lượng nghiêm ngặt từ
                khâu nguyên liệu đến sản phẩm cuối cùng.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 bg-white p-6 rounded-2xl shadow-md transform hover:scale-105 transition duration-300">
              <div className="p-3 bg-pink-500 rounded-full text-white shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 rounded-xl">
                Phát Triển Bền Vững
              </h3>
              <p className="text-gray-700">
                Lalalycheee cam kết sử dụng các phương pháp thân thiện môi
                trường và giảm thiểu tác động sinh thái.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 bg-white p-6 rounded-2xl shadow-md transform hover:scale-105 transition duration-300">
              <div className="p-3 bg-pink-500 rounded-full text-white shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 rounded-xl">
                Đổi Mới Công Nghệ
              </h3>
              <p className="text-gray-700">
                Chúng tôi không ngừng nghiên cứu và ứng dụng công nghệ mới để
                tối ưu hóa sợi vải thiều.
              </p>
            </div>
          </div>
        </section>

        {/* Impact and Commitment */}
        <section className="container mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center rounded-xl">
            Tác Động & Cam Kết
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://placehold.co/600x400/66CC66/FFFFFF?text=Tác+Động+Lalalycheee"
                alt="Impact"
                className="rounded-3xl shadow-2xl transform hover:scale-102 transition duration-300 w-full"
                onError={handleImpactImageError} // Gán hàm xử lý lỗi
              />
            </div>
            <div className="space-y-6 text-center lg:text-left">
              <p className="text-lg leading-relaxed text-gray-700 text-justify">
                Lalalycheee không chỉ mang đến sản phẩm, mà còn là một phần của
                chuỗi giá trị bền vững. Chúng tôi tự hào đóng góp vào:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg ml-4">
                <li>
                  **Phát triển nông nghiệp địa phương:** Tạo thêm nguồn thu nhập
                  ổn định cho nông dân trồng vải.
                </li>
                <li>
                  **Bảo vệ môi trường:** Giảm thiểu rác thải nông nghiệp bằng
                  cách tận dụng phần không ăn được của quả vải.
                </li>
                <li>
                  **Giáo dục và nhận thức:** Nâng cao nhận thức về các vật liệu
                  bền vững và thân thiện môi trường trong ngành tiêu dùng.
                </li>
              </ul>
              <p className="text-lg leading-relaxed text-gray-700 text-justify">
                Mỗi sản phẩm Lalalycheee là một minh chứng cho sự kết hợp giữa
                đổi mới, chất lượng và trách nhiệm xã hội.
              </p>
            </div>
          </div>
        </section>

        {/* Video Section - Giới thiệu */}
        <section className="flex flex-col items-center justify-center container mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center rounded-xl">
            Tìm hiểu thêm về Lalalycheee
          </h2>
          <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 transition-all duration-300 hover:scale-[1.01]">
            <div
              className="relative"
              style={{ paddingBottom: "56.25%" /* 16:9 Aspect Ratio */ }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/Rk0E8dK32j0?si=xXvD3x70x0xX_z-Y" // THAY THẾ BẰNG ID VIDEO THỰC CỦA BẠN (ví dụ: một video giới thiệu vải thiều)
                title="Giới thiệu về Vải Thiều Thanh Hà"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-gradient-to-r from-pink-500 to-red-500 text-white text-center rounded-3xl shadow-xl">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg rounded-xl">
              Bạn Muốn Tìm Hiểu Thêm?
            </h2>
            <p className="text-xl font-light opacity-95 px-4 rounded-xl">
              Khám phá các sản phẩm độc đáo từ vải thiều của chúng tôi hoặc liên
              hệ để được tư vấn.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-8 py-4 bg-white text-pink-600 text-lg font-semibold rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl transition duration-300 transform hover:scale-105">
                Xem Sản Phẩm
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-full shadow-lg hover:bg-white hover:text-pink-600 transition duration-300 transform hover:scale-105">
                Liên Hệ Với Chúng Tôi
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
