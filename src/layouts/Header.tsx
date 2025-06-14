"use client";
import React, { useState, useEffect, useRef, Fragment } from "react";
import Logo from "../../public/logo_company-min.jpg";
import Image from "next/image";
// --- Dữ liệu cho các liên kết điều hướng ---
// Quản lý các link ở một nơi giúp dễ dàng cập nhật và bảo trì
const navLinks = [
  { href: "/", label: "Trang Chủ" },
  {
    label: "Sản Phẩm",
    // Các mục con cho menu sản phẩm
    subItems: [
      { href: "/products", label: "Vải Thanh Hà" },
      { href: "/products", label: "Nước Cốt Vải" },
      { href: "/products", label: "Mật Ong" },
    ],
  },
  { href: "/about", label: "Về Chúng Tôi" },
  { href: "/contact", label: "Liên Hệ" },
];

// --- Các Icon SVG ---
// Sử dụng component cho icon để dễ dàng tái sử dụng và quản lý
const ChevronDownIcon = () => (
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
    className="transition-transform duration-300 group-hover:rotate-180"
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
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16" />
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
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

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
      className={`text-gray-700 hover:text-red-600 transition-colors duration-300 ${className}`}
    >
      {children}
    </a>
  );
};

const DesktopProductDropdown = ({
  subItems,
}: {
  subItems: { href: string; label: string }[];
}) => {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-20">
      <div className="py-2">
        {subItems.map((item) => (
          <CustomLink
            key={item.href}
            href={item.href}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
          >
            {item.label}
          </CustomLink>
        ))}
      </div>
    </div>
  );
};

const MobileNav = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Xử lý đóng menu khi nhấn phím Escape
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
      {/* Lớp nền mờ */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Nội dung menu trượt */}
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
            <XIcon />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.subItems ? (
                  <>
                    <button
                      onClick={() => setOpenSubMenu(!openSubMenu)}
                      className="w-full flex justify-between items-center py-3 text-lg font-semibold text-gray-800 hover:text-red-600 transition-colors"
                    >
                      <span>{link.label}</span>
                      <ChevronDownIcon />
                    </button>
                    {openSubMenu && (
                      <ul className="pl-4 mt-2 space-y-2 border-l-2 border-red-100">
                        {link.subItems.map((item) => (
                          <li key={item.href}>
                            <CustomLink
                              href={item.href}
                              className="block py-2 text-md text-gray-600 hover:text-red-600"
                            >
                              {item.label}
                            </CustomLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <CustomLink
                    href={link.href}
                    className="block py-3 text-lg font-semibold text-gray-800 hover:text-red-600"
                  >
                    {link.label}
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

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  // Xử lý hiệu ứng header khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed w-full top-0 z-40 transition-all duration-300 ease-in-out ${
          isHeaderScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-md h-20" // Chiều cao khi cuộn
            : "bg-white/80 h-24" // Chiều cao ban đầu
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <CustomLink href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                {/* Thay thế Next/Image bằng thẻ img thông thường để tương thích */}
                <Image
                  src={Logo}
                  alt="LALA-LYCHEEE Logo"
                  className="absolute top-0 left-0 w-full h-full object-contain rounded-full"
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
                  // Item có menu con
                  <div key={link.label} className="relative group">
                    <span className="flex items-center gap-1 cursor-pointer py-2 text-md font-medium text-gray-700 hover:text-red-600 transition-colors duration-300">
                      {link.label}
                      <ChevronDownIcon />
                    </span>
                    <DesktopProductDropdown subItems={link.subItems} />
                  </div>
                ) : (
                  // Item không có menu con
                  <CustomLink
                    key={link.href}
                    href={link.href}
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
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              >
                <ShoppingCartIcon />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors lg:hidden"
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
