"use client";
import React, { useState, useEffect, useRef, Fragment } from "react";

const navLinks = [
  { href: "/", label: "Trang Chủ" },
  {
    label: "Sản Phẩm",
    subItems: [
      { href: "/products", label: "Vải Thanh Hà" },
      { href: "/products", label: "Nước Cốt Vải" },
      { href: "/products", label: "Mật Ong" },
    ],
  },
  { href: "/about", label: "Về Chúng Tôi" },
  { href: "/contact", label: "Liên Hệ" },
  { href: "/short", label: "SHORT VIDEO" },
  {
    // href không cần thiết cho mục cha có subItems
    label: "Chức Năng",
    subItems: [
      { href: "/payment", label: "Thanh Toán" },
      { href: "/login", label: "Đăng Nhập" },
      { href: "/register", label: "Đăng Ký" },
      { href: "/quantri", label: "Quản Trị" },
    ],
  },
];

const Logo = "https://d3enplyig2yenj.cloudfront.net/logo";

// --- Các Icon SVG ---
const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    // FIX: Xoay icon dựa trên trạng thái `isOpen`
    className={`transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <circle cx="8" cy="21" r="1" /> <circle cx="19" cy="21" r="1" />{" "}
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16" />{" "}
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <line x1="4" x2="20" y1="12" y2="12" />{" "}
    <line x1="4" x2="20" y1="6" y2="6" />{" "}
    <line x1="4" x2="20" y1="18" y2="18" />{" "}
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <path d="M18 6 6 18" /> <path d="m6 6 12 12" />{" "}
  </svg>
);

// --- Các Component UI ---

// Link tùy chỉnh với hiệu ứng
const CustomLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <a
      href={href}
      className={`text-gray-800 hover:text-red-600 transition-colors duration-300 ${className}`}
    >
      {" "}
      {children}{" "}
    </a>
  );
};

// Menu dropdown cho desktop
const DesktopProductDropdown = ({
  subItems,
}: {
  subItems: { href: string; label: string }[];
}) => {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white/50 backdrop-blur-lg rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-20 border border-white/20">
      {" "}
      <div className="py-2">
        {" "}
        {subItems.map((item) => (
          <CustomLink
            key={item.label}
            href={item.href}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-white/20 hover:text-red-600"
          >
            {" "}
            {item.label}{" "}
          </CustomLink>
        ))}{" "}
      </div>{" "}
    </div>
  );
};

// Menu cho mobile
const MobileNav = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  // FIX: Thay đổi state để lưu label của menu đang mở, thay vì chỉ true/false
  const [openSubMenuLabel, setOpenSubMenuLabel] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // FIX: Hàm xử lý việc mở/đóng từng sub-menu riêng biệt
  const handleSubMenuToggle = (label: string) => {
    // Nếu menu được nhấn đang mở, thì đóng nó lại. Ngược lại, mở nó ra.
    setOpenSubMenuLabel(openSubMenuLabel === label ? null : label);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out lg:hidden ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={menuRef}
        className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-red-700">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Đóng menu"
          >
            {" "}
            <XIcon />{" "}
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.subItems ? (
                  <>
                    <button
                      // FIX: Gọi hàm xử lý mới với label của link hiện tại
                      onClick={() => handleSubMenuToggle(link.label)}
                      className="w-full flex justify-between items-center py-3 text-lg font-semibold text-gray-800 hover:text-red-600 transition-colors"
                    >
                      <span>{link.label}</span>
                      {/* FIX: Truyền trạng thái mở/đóng vào icon để xoay nó */}
                      <ChevronDownIcon
                        isOpen={openSubMenuLabel === link.label}
                      />
                    </button>
                    {/* FIX: Chỉ hiển thị sub-menu nếu label của nó khớp với state */}
                    {openSubMenuLabel === link.label && (
                      <ul className="pl-4 mt-2 space-y-2 border-l-2 border-red-100">
                        {link.subItems.map((item) => (
                          <li key={item.label}>
                            {" "}
                            <CustomLink
                              href={item.href}
                              className="block py-2 text-md text-gray-600 hover:text-red-600"
                            >
                              {" "}
                              {item.label}{" "}
                            </CustomLink>{" "}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <CustomLink
                    href={link.href!}
                    className="block py-3 text-lg font-semibold text-gray-800 hover:text-red-600"
                  >
                    {" "}
                    {link.label}{" "}
                  </CustomLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

// --- Component Header Chính ---
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed w-full top-0 z-40 transition-all duration-300 ease-in-out border-b ${
          isHeaderScrolled
            ? "bg-white/70 backdrop-blur-lg shadow-lg h-20 border-white/20"
            : "bg-white/30 backdrop-blur-md h-24 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <CustomLink href="/" className="flex items-center gap-3">
              <div className="relative w-17 h-17">
                <img
                  src={Logo}
                  alt="LALA-LYCHEEE Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <span className="text-4xl font-extrabold tracking-wider bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-transparent bg-clip-text italic">
                Lala-lycheee
              </span>
            </CustomLink>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.subItems ? (
                  <div key={link.label} className="relative group">
                    <span className="flex items-center gap-1 cursor-pointer py-2 text-md font-medium text-gray-800 hover:text-red-600 transition-colors duration-300">
                      {link.label}
                      {/* Truyền `isOpen` là false vì đây là desktop, chỉ dùng cho mobile */}
                      <ChevronDownIcon isOpen={false} />
                    </span>
                    <DesktopProductDropdown subItems={link.subItems} />
                  </div>
                ) : (
                  <CustomLink
                    key={link.href}
                    href={link.href!}
                    className="text-md font-medium"
                  >
                    {link.label}
                  </CustomLink>
                )
              )}
            </nav>

            {/* Icons & Mobile Menu Trigger */}
            <div className="flex items-center gap-3">
              <button
                aria-label="Giỏ hàng"
                className="p-2 text-gray-700 hover:text-red-600 hover:bg-white/30 rounded-full transition-colors"
              >
                <ShoppingCartIcon />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-gray-700 hover:text-red-600 hover:bg-white/30 rounded-full transition-colors lg:hidden"
                aria-label="Mở menu"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Component */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
