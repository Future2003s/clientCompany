"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  ClipboardList,
  Menu,
  Bell,
  Search as SearchIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const navItems = [
  { id: "dashboard", label: "Tổng Quan", icon: <LayoutDashboard size={18} /> },
  { id: "orders", label: "Đơn Hàng", icon: <ClipboardList size={18} /> },
  { id: "products", label: "Sản Phẩm", icon: <ShoppingBag size={18} /> },
  { id: "accounts", label: "Tài Khoản", icon: <Users size={18} /> },
  { id: "settings", label: "Cài Đặt", icon: <Settings size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const baseHref = useMemo(() => {
    // assume dashboard is the base page for admin
    return "/dashboard";
  }, [pathname]);

  const currentSection = searchParams?.get("section") || "dashboard";

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white shadow-lg">
        <div className="h-20 border-b flex items-center px-6">
          <div className="h-10 w-10 rounded-md bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
            L
          </div>
          <div className="ml-3">
            <div className="font-bold">LALA-LYCHEE</div>
            <div className="text-xs text-muted-foreground">Admin</div>
          </div>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const href = `${baseHref}?section=${item.id}`;
            const isActive = currentSection === item.id;
            return (
              <Link
                key={item.id}
                href={href}
                className={`flex items-center gap-3 py-3 px-6 my-1 transition-colors ${
                  isActive
                    ? "bg-pink-100 text-pink-600 border-r-4 border-pink-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
          <aside className="relative z-10 w-64 h-full bg-white shadow-lg flex flex-col">
            <div className="h-16 border-b flex items-center px-4">
              <div className="h-9 w-9 rounded-md bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                L
              </div>
              <div className="ml-2 font-semibold">LALA-LYCHEE</div>
            </div>
            <nav className="flex-1 py-3">
              {navItems.map((item) => {
                const href = `${baseHref}?section=${item.id}`;
                const isActive = currentSection === item.id;
                return (
                  <Link
                    key={item.id}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 py-3 px-4 my-1 transition-colors ${
                      isActive ? "bg-pink-100 text-pink-600" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </Button>
            <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg">
              <SearchIcon className="text-gray-500" size={18} />
              <Input placeholder="Tìm kiếm..." className="bg-transparent border-0 focus-visible:ring-0 ml-2 w-[260px]" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="text-gray-500" size={20} />
            <div className="flex items-center gap-2">
              <img src="https://placehold.co/36x36/fecdd3/be185d?text=A" alt="Admin" className="w-9 h-9 rounded-full" />
              <div className="hidden md:block">
                <div className="text-sm font-medium">Admin</div>
                <div className="text-xs text-muted-foreground">Quản trị viên</div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}