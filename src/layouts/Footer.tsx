import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-600 to-blue-500 text-white py-16 px-4 rounded-t-sm shadow-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
        {/* Company Logo & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left lg:col-span-1">
          {/* Company Name as a stylish text logo */}
          <h3 className="text-4xl font-extrabold text-white mb-4 tracking-wider">
            Lalalycheee
          </h3>
          <p className="text-blue-100 leading-relaxed mb-6">
            Chúng tôi tự hào mang đến những sản phẩm vải thiều chất lượng cao,
            bền vững và thân thiện môi trường, góp phần nâng tầm giá trị nông
            sản Việt.
          </p>
          <div className="flex space-x-6">
            {/* Social Media Icons */}
            <a
              href="#"
              className="text-blue-200 hover:text-white transition duration-200 transform hover:scale-110"
            >
              {/* Facebook Icon */}
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-7 h-7"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a
              href="#"
              className="text-blue-200 hover:text-white transition duration-200 transform hover:scale-110"
            >
              {/* Twitter Icon */}
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-7 h-7"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.09 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a
              href="#"
              className="text-blue-200 hover:text-white transition duration-200 transform hover:scale-110"
            >
              {/* Instagram Icon */}
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-7 h-7"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              href="#"
              className="text-blue-200 hover:text-white transition duration-200 transform hover:scale-110"
            >
              {/* YouTube Icon */}
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-7 h-7"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.657 8.875c-.328-.158-.702-.27-1.127-.333-.925-.133-1.895-.192-2.88-.201-.013-.001-.027-.001-.04-.002h-.002c-.013 0-.027 0-.04 0-1.025 0-2.025.045-3.003.132-.328.016-.622.062-.876.126-.407.113-.717.29-.906.505-.189.215-.283.486-.283.818v6.786c0 .332.094.603.283.818.189.215.499.392.906.505.254.064.548.11.876.126.978.087 1.978.132 3.003.132.013 0 .027 0 .04 0h.002c.013 0 .027 0 .04-.002.985-.009 1.955-.068 2.88-.201.425-.063.799-.175 1.127-.333.328-.158.599-.387.818-.687.219-.3.328-.667.328-1.1v-6.786c0-.433-.109-.8-.328-1.1-.219-.3-.49-.529-.818-.687zM10.875 16.5v-9l5.25 4.5-5.25 4.5z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-4 rounded-xl">
            Liên kết nhanh
          </h3>
          <nav className="flex flex-col space-y-2">
            <a
              href="#"
              className="text-blue-200 hover:text-white transition duration-200 rounded-xl"
            >
              Trang chủ
            </a>
            <a
              href="#"
              className="text-blue-200 hover:text-white transition duration-200 rounded-xl"
            >
              Sản phẩm
            </a>
            <a
              href="#"
              className="text-blue-200 hover:text-white transition duration-200 rounded-xl"
            >
              Về chúng tôi
            </a>
            <a
              href="#"
              className="text-blue-200 hover:text-white transition duration-200 rounded-xl"
            >
              Liên hệ
            </a>
            <a
              href="#"
              className="text-blue-200 hover:text-white transition duration-200 rounded-xl"
            >
              Tin tức & Sự kiện
            </a>
          </nav>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-4 rounded-xl">
            Liên hệ chúng tôi
          </h3>
          <address className="not-italic space-y-2">
            <p className="text-blue-200">
              <span className="font-semibold text-blue-300">Địa chỉ: </span>
              LALALYCHEEE, Vĩnh Lập, Vĩnh Cường, Thanh Hà, Hải Dương 03227, Việt
              Nam
            </p>
            <p className="text-blue-200">
              <span className="font-semibold text-blue-300">Email:</span>{" "}
              <a
                href="mailto:lalalycheee1@gmail.com"
                className="hover:text-white transition duration-200"
              >
                lalalycheee1@gmail.com
              </a>
            </p>
            <p className="text-blue-200">
              <span className="font-semibold text-blue-300">Điện thoại:</span>{" "}
              <a
                href="tel:+84962215666"
                className="hover:text-white transition duration-200"
              >
                (+84) 962-215-666
              </a>
            </p>
          </address>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-4 rounded-xl">
            Đăng ký nhận tin
          </h3>
          <p className="text-blue-200 mb-4">
            Nhận tin tức và ưu đãi mới nhất từ Lalalycheee!
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              aria-label="Email for newsletter"
              className="p-3 rounded-xl bg-blue-800 border border-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition duration-300 transform hover:scale-105 shadow-md"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Legal Links */}
      <div className="mt-12 pt-8 border-t border-blue-700 text-center text-black text-sm font-bold">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Lalalycheee. Bảo lưu mọi quyền.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="hover:text-white transition duration-200 rounded-xl"
          >
            Chính sách bảo mật
          </a>
          <a
            href="#"
            className="hover:text-white transition duration-200 rounded-xl"
          >
            Điều khoản dịch vụ
          </a>
          <a
            href="#"
            className="hover:text-white transition duration-200 rounded-xl"
          >
            Sơ đồ trang web
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
