export const Footer = () => {
  return (
    <footer className="py-10 px-4 bg-gray-900 text-gray-300 text-center text-sm">
      <div className="max-w-6xl mx-auto space-y-4">
        <p>
          &copy; {new Date().getFullYear()} Lalalycheee. Tất cả các quyền được
          bảo lưu.
        </p>
        <nav className="flex justify-center space-x-6">
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
        </nav>
        <p>Địa chỉ: 123 Đường Vải Thiều, Thành phố Hà Nội, Việt Nam</p>
        <p>Email: info@lalalycheee.com | Điện thoại: (84) 987 654 321</p>
      </div>
    </footer>
  );
};
