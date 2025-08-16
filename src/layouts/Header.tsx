"use client";
import { envConfig } from "@/config";
import Link from "next/link";
import { useAppContextProvider } from "@/context/app-context";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import { authApiRequest } from "@/apiRequests/auth";
import accountApiRequest from "@/apiRequests/account";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

const MobileNav = ({
  isOpen,
  onClose,
  isAdmin,
}: {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
}) => {
  const t = useTranslations('navigation');
  
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <XIcon />
          </button>
        </div>
        <nav className="p-6 space-y-4">
          <Link
            href="/"
            className="block py-2 text-lg font-medium hover:text-rose-700"
            onClick={onClose}
          >
            {t('home')}
          </Link>
          <Link
            href="/products"
            className="block py-2 text-lg font-medium hover:text-rose-700"
            onClick={onClose}
          >
            {t('products')}
          </Link>
          <Link
            href="/about"
            className="block py-2 text-lg font-medium hover:text-rose-700"
            onClick={onClose}
          >
            {t('about')}
          </Link>
          <Link
            href="/contact"
            className="block py-2 text-lg font-medium hover:text-rose-700"
            onClick={onClose}
          >
            {t('contact')}
          </Link>
          {isAdmin && (
            <Link
              href="/dashboard"
              className="block py-2 text-lg font-medium text-rose-700"
              onClick={onClose}
            >
              {t('dashboard')}
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default function Header() {
  const t = useTranslations('navigation');
  const { sessionToken, setSessionToken } = useAppContextProvider();
  const { items } = useCartStore();
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const router = useRouter();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "/", label: t('home') },
    {
      label: t('products'),
      href: "/products",
      subItems: [
        { href: "/products", label: t('products') },
        { href: "/products?q=m%E1%BA%ADt+ong", label: "Mật Ong" },
        { href: "/products?q=v%E1%BA%A3i", label: "Sản phẩm Vải" },
      ],
    },
    { href: "/about", label: t('about') },
    {
      label: "Chức Năng",
      subItems: [
        { href: "/payment", label: "Thanh Toán" },
        { href: "/login", label: t('login') },
        { href: "/register", label: t('register') },
        { href: "/dashboard", label: t('dashboard') },
      ],
    },
  ];

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (sessionToken) {
        try {
          const account = await accountApiRequest.me(sessionToken);
          setIsAdmin(account.role === "admin");
        } catch {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [sessionToken]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                LALA-LYCHEEE
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="py-3 text-base font-medium text-gray-700 hover:text-rose-700 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button className="py-3 text-base font-medium text-gray-700 hover:text-rose-700 transition-colors duration-300 flex items-center gap-1">
                      {link.label}
                      <ChevronDownIcon className="w-4 h-4" />
                    </button>
                  )}
                  {link.subItems && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      {link.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                  <span className="absolute bottom-0 left-0 block h-[1.5px] w-full bg-rose-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                </div>
              ))}
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className="py-3 text-base font-semibold text-rose-700"
                >
                  Trang Quản Trị
                </Link>
              )}
            </nav>

            {/* Icons & Mobile Menu Trigger */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              {sessionToken ? (
                <div className="relative" ref={accountRef}>
                  <button
                    onClick={() => setIsAccountOpen((v) => !v)}
                    aria-label="Tài khoản"
                    className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-all duration-300"
                  >
                    <UserIcon />
                    <span className="hidden sm:block">Tài khoản</span>
                    <ChevronDownIcon className="hidden sm:block" />
                  </button>
                  {isAccountOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-50">
                      <Link
                        href="/me"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-rose-50 hover:text-rose-700"
                        onClick={() => setIsAccountOpen(false)}
                      >
                        Trang cá nhân
                      </Link>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-rose-50 hover:text-rose-700"
                        onClick={async () => {
                          try {
                            await authApiRequest.logout();
                            setSessionToken("");
                            setIsAccountOpen(false);
                            toast.success("Đã đăng xuất");
                            router.push("/login");
                            router.refresh();
                          } catch {
                            toast.error("Đăng xuất thất bại");
                          }
                        }}
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  aria-label="Đăng nhập"
                  className="p-2 text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-all duration-300"
                >
                  <UserIcon />
                </Link>
              )}
              <Link
                href="/cart"
                aria-label="Giỏ hàng"
                className="relative p-2 text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-all duration-300"
              >
                <ShoppingCartIcon />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] leading-none px-1.5 py-1 rounded-full">
                    {totalQuantity}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-colors lg:hidden"
                aria-label="Mở menu"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAdmin={isAdmin}
      />
    </>
  );
}
