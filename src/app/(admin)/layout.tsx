"use client";
import React, { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  ClipboardList,
} from "lucide-react";
import { envConfig } from "@/config";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeView = searchParams?.get("section") || "dashboard";

  const navItems = useMemo(
    () => [
      { id: "dashboard", label: "Tổng Quan", icon: <LayoutDashboard size={20} /> },
      { id: "orders", label: "Đơn Hàng", icon: <ClipboardList size={20} /> },
      { id: "products", label: "Sản Phẩm", icon: <ShoppingBag size={20} /> },
      { id: "accounts", label: "Tài Khoản", icon: <Users size={20} /> },
      { id: "settings", label: "Cài Đặt", icon: <Settings size={20} /> },
    ],
    []
  );

  const onNavClick = (id: string) => {
    const params = new URLSearchParams(
      Array.from(searchParams?.entries?.() || [])
    );
    params.set("section", id);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <aside className="hidden lg:flex lg:flex-col w-72 bg-white border-r">
        <div className="flex items-center h-16 px-6 border-b">
          <img
            src={envConfig.NEXT_PUBLIC_URL_LOGO}
            height="36"
            width="36"
            alt="Logo"
          />
          <span className="ml-3 text-lg font-semibold text-pink-600">
            LALA-LYCHEEE
          </span>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className={`w-full flex items-center py-3 px-6 my-0.5 text-left transition-colors ${
                activeView === item.id
                  ? "bg-pink-50 text-pink-600 border-r-4 border-pink-500"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              <span className="ml-4 font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white h-16 border-b px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-gray-600"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg">
              <Search className="text-gray-500" size={18} />
              <input
                className="bg-transparent ml-2 outline-none w-64"
                placeholder="Tìm kiếm..."
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="text-gray-500" size={20} />
            <img
              src="https://placehold.co/32x32/fecdd3/be185d?text=A"
              alt="Admin"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-8">{children}</main>
      </div>

      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isSidebarOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-72 bg-white shadow-xl transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center h-16 px-6 border-b">
            <img
              src={envConfig.NEXT_PUBLIC_URL_LOGO}
              height="32"
              width="32"
              alt="Logo"
            />
            <span className="ml-3 text-lg font-semibold text-pink-600">
              LALA-LYCHEEE
            </span>
          </div>
          <nav className="py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavClick(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center py-3 px-6 my-0.5 text-left transition-colors ${
                  activeView === item.id
                    ? "bg-pink-50 text-pink-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                <span className="ml-4 font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}