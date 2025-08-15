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
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const navItems = [
  { id: "dashboard", label: "Tổng Quan", icon: <LayoutDashboard size={18} /> },
  { id: "orders", label: "Đơn Hàng", icon: <ClipboardList size={18} /> },
  { id: "products", label: "Sản Phẩm", icon: <ShoppingBag size={18} /> },
  { id: "accounts", label: "Tài Khoản", icon: <Users size={18} /> },
  {
    id: "settings",
    label: "Cài Đặt",
    icon: <Settings size={18} />,
    children: [
      { id: "settings-general", label: "Chung" },
      { id: "settings-payments", label: "Thanh Toán" },
      { id: "settings-notifications", label: "Thông Báo" },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ settings: true });

  const baseHref = useMemo(() => {
    return "/dashboard";
  }, [pathname]);

  const currentSection = searchParams?.get("section") || "dashboard";

  const toggleGroup = (id: string) =>
    setOpenGroups((s) => ({ ...s, [id]: !s[id] }));

  const renderBreadcrumb = () => {
    const parts = currentSection.split("-");
    const crumbs = [
      { id: "dashboard", label: "Tổng Quan", href: `${baseHref}?section=dashboard` },
    ];
    if (parts[0] === "settings") {
      crumbs.push({ id: "settings", label: "Cài Đặt", href: `${baseHref}?section=settings` });
      if (currentSection === "settings-general")
        crumbs.push({ id: currentSection, label: "Chung", href: `${baseHref}?section=${currentSection}` });
      if (currentSection === "settings-payments")
        crumbs.push({ id: currentSection, label: "Thanh Toán", href: `${baseHref}?section=${currentSection}` });
      if (currentSection === "settings-notifications")
        crumbs.push({ id: currentSection, label: "Thông Báo", href: `${baseHref}?section=${currentSection}` });
    } else if (currentSection !== "dashboard") {
      const map: Record<string, string> = {
        orders: "Đơn Hàng",
        products: "Sản Phẩm",
        accounts: "Tài Khoản",
      };
      crumbs.push({ id: currentSection, label: map[currentSection] ?? currentSection, href: `${baseHref}?section=${currentSection}` });
    }
    return (
      <nav className="text-sm text-muted-foreground">
        <ol className="flex items-center gap-2">
          {crumbs.map((c, idx) => (
            <li key={c.id} className="flex items-center gap-2">
              {idx > 0 && <span>/</span>}
              <Link href={c.href} className="hover:text-foreground">
                {c.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    );
  };

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
            if (!("children" in item)) {
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
            }
            // group with children (settings)
            const isOpen = !!openGroups[item.id];
            const isAnyActive = currentSection.startsWith(item.id);
            return (
              <div key={item.id} className="px-2">
                <button
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-md ${
                    isAnyActive ? "text-pink-600 bg-pink-100" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => toggleGroup(item.id)}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </span>
                  <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} size={16} />
                </button>
                {isOpen && (
                  <div className="mt-1 mb-2 ml-8 border-l pl-3 space-y-1">
                    {(item.children || []).map((c) => {
                      const href = `${baseHref}?section=${c.id}`;
                      const active = currentSection === c.id;
                      return (
                        <Link
                          key={c.id}
                          href={href}
                          className={`block py-2 px-2 rounded-md text-sm ${
                            active ? "text-pink-600 bg-pink-50" : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {c.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
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
                if (!("children" in item)) {
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
                }
                const isOpen = !!openGroups[item.id];
                const isAnyActive = currentSection.startsWith(item.id);
                return (
                  <div key={item.id} className="px-2">
                    <button
                      className={`w-full flex items-center justify-between py-3 px-3 rounded-md ${
                        isAnyActive ? "text-pink-600 bg-pink-100" : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => toggleGroup(item.id)}
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </span>
                      <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} size={16} />
                    </button>
                    {isOpen && (
                      <div className="mt-1 mb-2 ml-6 border-l pl-3 space-y-1">
                        {(item.children || []).map((c) => {
                          const href = `${baseHref}?section=${c.id}`;
                          const active = currentSection === c.id;
                          return (
                            <Link
                              key={c.id}
                              href={href}
                              onClick={() => setSidebarOpen(false)}
                              className={`block py-2 px-2 rounded-md text-sm ${
                                active ? "text-pink-600 bg-pink-50" : "text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              {c.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
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
        <div className="px-4 lg:px-8 py-3 bg-white border-b">
          {renderBreadcrumb()}
        </div>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}