"use client";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useAppContextProvider } from "@/context/app-context";
import { productsApi } from "@/apiRequests/products";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  PlusCircle,
  Pencil,
  Eye,
  Trash2,
  X,
  Upload,
  Menu,
  ClipboardList, // New Icon for Orders
} from "lucide-react";
import { envConfig } from "@/config";
import type { Product, Order } from "./types";
import { OrdersView, OrderEditModal, OrderViewModal } from "./components";
// Orders hook inlined below for now
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// --- Type Definitions moved to ./types ---

// --- Reusable UI Components ---

// Stat Card for Dashboard
const StatCard = ({
  title,
  value,
  icon,
  change,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className="p-3 bg-pink-100 text-pink-600 rounded-full">{icon}</div>
    </div>
    <p className="text-sm text-green-500 mt-4">{change}</p>
  </div>
);

// Product View Modal (Responsive)
const ProductViewModal = ({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) => {
  if (!product) return null;

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Còn hàng":
        return "bg-green-100 text-green-800";
      case "Hết hàng":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(
              product.status
            )}`}
          >
            {product.status}
          </span>
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            {product.name}
          </h2>
          <p className="text-md text-gray-500 mt-1">{product.category}</p>
          <p className="text-3xl font-bold text-pink-600 my-4">
            {product.price}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>
          <div className="mt-6 border-t pt-4">
            <p className="text-sm text-gray-800">
              <strong>Mã sản phẩm:</strong> {product.id}
            </p>
            <p className="text-sm text-gray-800 mt-1">
              <strong>Tồn kho:</strong> {product.stock} sản phẩm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Edit Modal
const ProductEditModal = ({
  product,
  onSave,
  onClose,
}: {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState(product);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSave}>
          <div className="p-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Chỉnh sửa sản phẩm
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loại sản phẩm
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá (VNĐ)
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tồn kho
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring-pink-500"
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ảnh sản phẩm
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none"
                      >
                        <span>Tải lên một tệp</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">hoặc kéo và thả</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF lên đến 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-8 py-4 text-right rounded-b-lg sticky bottom-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 mr-3"
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-lg hover:bg-pink-700"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Order View Modal moved to components

// Order Edit Modal moved to components

// --- Page Components ---

// Dashboard View
const DashboardView = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Tổng Quan</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Tổng Doanh Thu"
        value="75.890.000₫"
        icon={<ShoppingBag size={24} />}
        change="+12% so với tháng trước"
      />
      <StatCard
        title="Đơn Hàng Mới"
        value="1.204"
        icon={<ClipboardList size={24} />}
        change="+5.2% so với tháng trước"
      />
      <StatCard
        title="Tài Khoản Mới"
        value="86"
        icon={<Users size={24} />}
        change="+20% so với tháng trước"
      />
      <StatCard
        title="Sản Phẩm Tồn Kho"
        value="3.450"
        icon={<ShoppingBag size={24} />}
        change="-1.8% so với tháng trước"
      />
    </div>
    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="font-bold text-lg">Phân Tích Doanh Thu</h3>
      <p className="text-gray-500">Biểu đồ sẽ được hiển thị ở đây.</p>
      <div className="h-64 bg-gray-100 mt-4 rounded-md flex items-center justify-center">
        [Chart Data]
      </div>
    </div>
  </div>
);

// Products View
const ProductsView = ({
  onViewProduct,
  onEditProduct,
}: {
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const { products } = useProducts();
  const { sessionToken } = useAppContextProvider();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<any | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    product_name: "",
    product_price: "",
    category_id: "",
    brand_id: "",
    image_urls: "",
    tag_ids: "",
  });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    product_name: "",
    product_price: "",
    image_urls: "",
  });
  const [updating, setUpdating] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    open: boolean;
    x: number;
    y: number;
    product: any | null;
  }>({ open: false, x: 0, y: 0, product: null });
  const [meta, setMeta] = useState<{
    categories: any[];
    brands: any[];
    tags: any[];
  }>({ categories: [], brands: [], tags: [] });
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    slug: "",
  });
  const [newBrand, setNewBrand] = useState({ name: "", slug: "" });
  const [newTag, setNewTag] = useState({ name: "", slug: "" });

  useEffect(() => {
    const loadMeta = async () => {
      try {
        const [cats, brs, tgs]: any = await Promise.all([
          (await import("@/apiRequests/meta")).metaApi.categories(),
          (await import("@/apiRequests/meta")).metaApi.brands(),
          (await import("@/apiRequests/meta")).metaApi.tags(),
        ]);
        setMeta({
          categories: cats?.data ?? [],
          brands: brs?.data ?? [],
          tags: tgs?.data ?? [],
        });
      } catch {}
    };
    if (isCreateOpen) loadMeta();
  }, [isCreateOpen]);

  const loadList = async () => {
    setLoading(true);
    try {
      const res: any = await productsApi.list();
      setItems(res?.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionToken) {
      toast.error("Cần đăng nhập");
      return;
    }
    setCreating(true);
    try {
      const payload: any = {
        product_name: form.product_name,
        product_price: Number(form.product_price) || 0,
        category_id: form.category_id ? Number(form.category_id) : undefined,
        brand_id: form.brand_id || undefined,
        image_urls: form.image_urls
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        tag_ids: form.tag_ids
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      await productsApi.create(sessionToken, payload);
      toast.success("Tạo sản phẩm thành công");
      setIsCreateOpen(false);
      await loadList();
    } catch (err) {
      toast.error("Tạo sản phẩm thất bại");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Sản Phẩm</h2>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700 transition w-full md:w-auto justify-center"
        >
          <PlusCircle size={20} />
          <span>Thêm Sản Phẩm</span>
        </button>
      </div>
      {isCreateOpen && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Tạo sản phẩm mới</h3>
          <form
            onSubmit={handleCreate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm text-gray-600">
                Tên sản phẩm
              </label>
              <input
                value={form.product_name}
                onChange={(e) =>
                  setForm({ ...form, product_name: e.target.value })
                }
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Giá</label>
              <input
                value={form.product_price}
                onChange={(e) =>
                  setForm({ ...form, product_price: e.target.value })
                }
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Danh mục</label>
              <select
                value={form.category_id}
                onChange={(e) =>
                  setForm({ ...form, category_id: e.target.value })
                }
                className="mt-1 w-full border rounded px-3 py-2"
              >
                <option value="">-- Chọn danh mục --</option>
                {meta.categories.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.categoryName}
                  </option>
                ))}
              </select>
              <div className="flex gap-2 mt-2">
                <input
                  value={newCategory.categoryName}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      categoryName: e.target.value,
                    })
                  }
                  placeholder="Tên danh mục mới"
                  className="border rounded px-3 py-2 w-full"
                />
                <button
                  type="button"
                  className="px-3 py-2 border rounded"
                  onClick={async () => {
                    if (!newCategory.categoryName.trim()) return;
                    if (!sessionToken) {
                      toast.error("Cần đăng nhập");
                      return;
                    }
                    try {
                      const slug =
                        newCategory.slug ||
                        newCategory.categoryName
                          .toLowerCase()
                          .replace(/\s+/g, "-");
                      await (
                        await import("@/apiRequests/meta")
                      ).metaApi.createCategory(
                        {
                          categoryName: newCategory.categoryName,
                          slug,
                        },
                        sessionToken
                      );
                      const cats: any = await (
                        await import("@/apiRequests/meta")
                      ).metaApi.categories();
                      setMeta((m) => ({ ...m, categories: cats?.data ?? [] }));
                      setNewCategory({ categoryName: "", slug: "" });
                      toast.success("Đã thêm danh mục");
                    } catch {
                      toast.error("Thêm danh mục thất bại");
                    }
                  }}
                >
                  Thêm danh mục
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600">Thương hiệu</label>
              <select
                value={form.brand_id}
                onChange={(e) => setForm({ ...form, brand_id: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2"
              >
                <option value="">-- Chọn thương hiệu --</option>
                {meta.brands.map((b: any) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-2 mt-2">
                <input
                  value={newBrand.name}
                  onChange={(e) =>
                    setNewBrand({ ...newBrand, name: e.target.value })
                  }
                  placeholder="Tên thương hiệu mới"
                  className="border rounded px-3 py-2 w-full"
                />
                <button
                  type="button"
                  className="px-3 py-2 border rounded"
                  onClick={async () => {
                    if (!newBrand.name.trim()) return;
                    if (!sessionToken) {
                      toast.error("Cần đăng nhập");
                      return;
                    }
                    try {
                      const slug =
                        newBrand.slug ||
                        newBrand.name.toLowerCase().replace(/\s+/g, "-");
                      await (
                        await import("@/apiRequests/meta")
                      ).metaApi.createBrand(
                        { name: newBrand.name, slug },
                        sessionToken
                      );
                      const brs: any = await (
                        await import("@/apiRequests/meta")
                      ).metaApi.brands();
                      setMeta((m) => ({ ...m, brands: brs?.data ?? [] }));
                      setNewBrand({ name: "", slug: "" });
                      toast.success("Đã thêm thương hiệu");
                    } catch {
                      toast.error("Thêm thương hiệu thất bại");
                    }
                  }}
                >
                  Thêm thương hiệu
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600">
                Ảnh (URL, cách nhau bởi dấu phẩy)
              </label>
              <input
                value={form.image_urls}
                onChange={(e) =>
                  setForm({ ...form, image_urls: e.target.value })
                }
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600">Tags</label>
              <select
                multiple
                value={form.tag_ids.split(",").filter(Boolean)}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions).map(
                    (o) => o.value
                  );
                  setForm({ ...form, tag_ids: values.join(",") });
                }}
                className="mt-1 w-full border rounded px-3 py-2 h-28"
              >
                {meta.tags.map((t: any) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-2 mt-2">
                <input
                  value={newTag.name}
                  onChange={(e) =>
                    setNewTag({ ...newTag, name: e.target.value })
                  }
                  placeholder="Tên tag mới"
                  className="border rounded px-3 py-2 w-full"
                />
                <button
                  type="button"
                  className="px-3 py-2 border rounded"
                  onClick={async () => {
                    if (!newTag.name.trim()) return;
                    if (!sessionToken) {
                      toast.error("Cần đăng nhập");
                      return;
                    }
                    try {
                      const slug =
                        newTag.slug ||
                        newTag.name.toLowerCase().replace(/\s+/g, "-");
                      await (
                        await import("@/apiRequests/meta")
                      ).metaApi.createTag(
                        { name: newTag.name, slug },
                        sessionToken
                      );
                      const tgs: any = await (
                        await import("@/apiRequests/meta")
                      ).metaApi.tags();
                      setMeta((m) => ({ ...m, tags: tgs?.data ?? [] }));
                      setNewTag({ name: "", slug: "" });
                      toast.success("Đã thêm tag");
                    } catch {
                      toast.error("Thêm tag thất bại");
                    }
                  }}
                >
                  Thêm tag
                </button>
              </div>
            </div>
            <div className="md:col-span-2 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Huỷ
              </button>
              <button
                disabled={creating}
                className="px-4 py-2 bg-pink-600 text-white rounded"
              >
                {creating ? "Đang tạo..." : "Tạo sản phẩm"}
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-max">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-medium text-gray-600">Mã</th>
              <th className="p-4 font-medium text-gray-600">Tên</th>
              <th className="p-4 font-medium text-gray-600">
                Danh mục / Thương hiệu
              </th>
              <th className="p-4 font-medium text-gray-600">Giá</th>
              <th className="p-4 font-medium text-gray-600"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  Đang tải...
                </td>
              </tr>
            ) : (
              items.map((p) => (
                <tr
                  key={p.id}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setOpenMenuId(null);
                    setContextMenu({
                      open: true,
                      x: e.clientX,
                      y: e.clientY,
                      product: p,
                    });
                  }}
                >
                  <td className="p-4 text-gray-500 font-mono text-xs">
                    {p.id}
                  </td>
                  <td className="p-4 font-medium text-gray-800">{p.name}</td>
                  <td className="p-4 text-gray-500">
                    {p.categoryName || p.brandName || "-"}
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Number(p.price))}
                  </td>
                  <td className="p-4 relative">
                    <button
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      onClick={() =>
                        setOpenMenuId(openMenuId === p.id ? null : p.id)
                      }
                    >
                      <MoreHorizontal size={18} />
                    </button>
                    {openMenuId === p.id && (
                      <div className="absolute right-8 w-56 bg-white rounded-md shadow-xl z-10 border border-gray-100">
                        <a
                          href="#"
                          onClick={async (e) => {
                            e.preventDefault();
                            try {
                              const res: any = await productsApi.detail(p.id);
                              setDetail(res?.data ?? null);
                            } catch {
                              toast.error("Không tải được chi tiết");
                            } finally {
                              setOpenMenuId(null);
                            }
                          }}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Eye size={16} />
                          <span>Xem chi tiết</span>
                        </a>
                        <a
                          href="#"
                          onClick={async (e) => {
                            e.preventDefault();
                            try {
                              const res: any = await productsApi.detail(p.id);
                              const d = res?.data;
                              setEditingId(p.id);
                              setEditForm({
                                product_name: d?.name ?? p.name ?? "",
                                product_price: String(
                                  d?.price ?? p.price ?? ""
                                ),
                                image_urls: Array.isArray(d?.imageUrls)
                                  ? d.imageUrls.join(", ")
                                  : Array.isArray(p?.imageUrls)
                                  ? p.imageUrls.join(", ")
                                  : "",
                              });
                              setIsEditOpen(true);
                            } catch {
                              toast.error("Không tải được dữ liệu sửa");
                            } finally {
                              setOpenMenuId(null);
                            }
                          }}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Pencil size={16} />
                          <span>Sửa</span>
                        </a>
                        <a
                          href="#"
                          onClick={async (e) => {
                            e.preventDefault();
                            setOpenMenuId(null);
                            if (!sessionToken) {
                              toast.error("Cần đăng nhập");
                              return;
                            }
                            if (!confirm("Xoá sản phẩm này?")) return;
                            try {
                              await productsApi.remove(sessionToken, p.id);
                              toast.success("Đã xoá sản phẩm");
                              await loadList();
                            } catch {
                              toast.error("Xoá sản phẩm thất bại");
                            }
                          }}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          <span>Xoá</span>
                        </a>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {contextMenu.open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() =>
              setContextMenu({ open: false, x: 0, y: 0, product: null })
            }
          />
          <div
            className="fixed z-50 w-56 bg-white rounded-md shadow-xl border border-gray-100"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <a
              href="#"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const res: any = await productsApi.detail(
                    contextMenu.product.id
                  );
                  setDetail(res?.data ?? null);
                } catch {
                  toast.error("Không tải được chi tiết");
                } finally {
                  setContextMenu({ open: false, x: 0, y: 0, product: null });
                }
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Eye size={16} />
              <span>Xem chi tiết</span>
            </a>
            <a
              href="#"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const p = contextMenu.product;
                  const res: any = await productsApi.detail(p.id);
                  const d = res?.data;
                  setEditingId(p.id);
                  setEditForm({
                    product_name: d?.name ?? p.name ?? "",
                    product_price: String(d?.price ?? p.price ?? ""),
                    image_urls: Array.isArray(d?.imageUrls)
                      ? d.imageUrls.join(", ")
                      : Array.isArray(p?.imageUrls)
                      ? p.imageUrls.join(", ")
                      : "",
                  });
                  setIsEditOpen(true);
                } catch {
                  toast.error("Không tải được dữ liệu sửa");
                } finally {
                  setContextMenu({ open: false, x: 0, y: 0, product: null });
                }
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Pencil size={16} />
              <span>Sửa</span>
            </a>
            <a
              href="#"
              onClick={async (e) => {
                e.preventDefault();
                const p = contextMenu.product;
                setContextMenu({ open: false, x: 0, y: 0, product: null });
                if (!sessionToken) {
                  toast.error("Cần đăng nhập");
                  return;
                }
                if (!confirm("Xoá sản phẩm này?")) return;
                try {
                  await productsApi.remove(sessionToken, p.id);
                  toast.success("Đã xoá sản phẩm");
                  await loadList();
                } catch {
                  toast.error("Xoá sản phẩm thất bại");
                }
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />
              <span>Xoá</span>
            </a>
          </div>
        </>
      )}
      {isEditOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
          onClick={() => setIsEditOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!sessionToken || !editingId) {
                  toast.error("Cần đăng nhập");
                  return;
                }
                setUpdating(true);
                try {
                  const payload: any = {
                    product_name: editForm.product_name,
                    product_price: Number(editForm.product_price) || 0,
                    image_urls: editForm.image_urls
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  };
                  await productsApi.update(sessionToken, editingId, payload);
                  toast.success("Đã cập nhật sản phẩm");
                  setIsEditOpen(false);
                  await loadList();
                } catch (err) {
                  toast.error("Cập nhật thất bại");
                } finally {
                  setUpdating(false);
                }
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Sửa sản phẩm</h3>
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={22} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div>
                    <label className="block text-sm text-gray-600">
                      Tên sản phẩm
                    </label>
                    <input
                      value={editForm.product_name}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          product_name: e.target.value,
                        })
                      }
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Giá</label>
                    <input
                      value={editForm.product_price}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          product_price: e.target.value,
                        })
                      }
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Ảnh (URL, cách nhau bởi dấu phẩy)
                    </label>
                    <input
                      value={editForm.image_urls}
                      onChange={(e) =>
                        setEditForm({ ...editForm, image_urls: e.target.value })
                      }
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-2 rounded-b-lg">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Huỷ
                </button>
                <button
                  disabled={updating}
                  className="px-4 py-2 bg-pink-600 text-white rounded"
                >
                  {updating ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {detail && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
          onClick={() => setDetail(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {detail?.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {detail?.brandName}
                    {detail?.categoryName ? ` • ${detail.categoryName}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => setDetail(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      detail?.imageUrls?.[0] || "https://placehold.co/800x800"
                    }
                    alt={detail?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-pink-600 font-semibold text-xl">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Number(detail?.price))}
                  </div>
                  {Array.isArray(detail?.tags) && detail.tags.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs text-gray-500">Tags</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {detail.tags.map((t: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded-full bg-gray-100 border"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {Array.isArray(detail?.variants) &&
                    detail.variants.length > 0 && (
                      <div className="mt-4">
                        <div className="text-sm font-medium">Biến thể</div>
                        <div className="mt-2 space-y-2">
                          {detail.variants.map((v: any) => (
                            <div
                              key={v.id}
                              className="flex items-center justify-between text-sm border rounded p-2"
                            >
                              <div>
                                {v.name}{" "}
                                <span className="text-gray-400">({v.sku})</span>
                              </div>
                              <div className="text-gray-600">
                                SL: {v.stockQuantity ?? 0}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Orders View moved to components

// Accounts View
const AccountsView = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Tài Khoản</h2>
    <div className="bg-white rounded-lg shadow-sm p-6">
      <p>Chức năng quản lý tài khoản sẽ được phát triển tại đây.</p>
    </div>
  </div>
);

// --- Custom Hooks for Data Management ---
const useProducts = () => {
  const initialProducts: Product[] = [
    {
      id: "P001",
      name: "Trà Vải Lài",
      category: "Trà Trái Cây",
      price: "45.000₫",
      stock: 120,
      status: "Còn hàng",
      imageUrl: "https://placehold.co/600x600/fecdd3/be185d?text=Trà+Vải",
      description:
        "Sự kết hợp tinh tế giữa vị ngọt thanh của vải và hương thơm dịu nhẹ của hoa lài, mang lại cảm giác sảng khoái.",
    },
    {
      id: "P002",
      name: "Hồng Trà Vải",
      category: "Trà Trái Cây",
      price: "42.000₫",
      stock: 80,
      status: "Còn hàng",
      imageUrl: "https://placehold.co/600x600/fbcfe8/be185d?text=Hồng+Trà",
      description:
        "Hồng trà đậm vị kết hợp với vải tươi, tạo nên một thức uống vừa quen thuộc vừa mới lạ.",
    },
    {
      id: "P003",
      name: "Matcha Vải",
      category: "Matcha",
      price: "55.000₫",
      stock: 0,
      status: "Hết hàng",
      imageUrl: "https://placehold.co/600x600/d9f99d/be185d?text=Matcha",
      description:
        "Vị đắng nhẹ đặc trưng của matcha Nhật Bản hoà quyện cùng vị ngọt của vải, một trải nghiệm độc đáo.",
    },
    {
      id: "P004",
      name: "Latte Vải",
      category: "Cà Phê",
      price: "50.000₫",
      stock: 35,
      status: "Sắp hết",
      imageUrl: "https://placehold.co/600x600/f5d0a9/be185d?text=Latte",
      description:
        "Cà phê latte mềm mịn với một chút biến tấu từ siro vải, mang lại hương vị bất ngờ và thú vị.",
    },
  ];
  const [products, setProducts] = useState(initialProducts);

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  return { products, updateProduct };
};

// Orders hook moved to hooks/useOrders

// Order History Modal
const LocalOrderHistoryModal = ({
  orderId,
  onClose,
}: {
  orderId: string;
  onClose: () => void;
}) => {
  const [items, setItems] = useState<
    {
      id: string;
      oldStatus: "Đang xử lý" | "Đã giao" | "Đã huỷ";
      newStatus: "Đang xử lý" | "Đã giao" | "Đã huỷ";
      changedBy?: string;
      note?: string;
      createdAt: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const { sessionToken } = useAppContextProvider();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/orders/${orderId}/history`, {
          cache: "no-store",
        });
        if (!res.ok) {
          setItems([]);
          return;
        }
        const payload = await res.json();
        const list = payload?.data ?? payload ?? [];
        const mapStatus = (s: string) =>
          s === "DELIVERED"
            ? "Đã giao"
            : s === "CANCELLED"
            ? "Đã huỷ"
            : "Đang xử lý";
        setItems(
          list.map((h: any) => ({
            id: h.id,
            oldStatus: mapStatus(h.oldStatus) as any,
            newStatus: mapStatus(h.newStatus) as any,
            changedBy: h.changedBy,
            note: h.note,
            createdAt: h.createdAt,
          }))
        );
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [orderId, sessionToken]);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Lịch sử chỉnh sửa
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={22} />
            </button>
          </div>
          <div className="mt-4">
            {loading ? (
              <div className="text-gray-500">Đang tải...</div>
            ) : items.length === 0 ? (
              <div className="text-gray-500">Chưa có lịch sử</div>
            ) : (
              <ul className="space-y-3">
                {items.map((h) => (
                  <li key={h.id} className="border rounded p-3">
                    <div className="text-sm text-gray-500">
                      {new Date(h.createdAt).toLocaleString("vi-VN")}
                    </div>
                    <div className="mt-1 text-gray-800">
                      Trạng thái:{" "}
                      <span className="font-semibold">{h.oldStatus}</span> →{" "}
                      <span className="font-semibold">{h.newStatus}</span>
                    </div>
                    {h.changedBy && (
                      <div className="text-sm text-gray-600 mt-1">
                        Bởi: {h.changedBy}
                      </div>
                    )}
                    {h.note && (
                      <div className="text-sm text-gray-600 mt-1">
                        Ghi chú: {h.note}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Admin Dashboard Component ---
const AdminDashboardPage: NextPage = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar hidden by default on mobile
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Sync activeView with URL (?section=...)
  useEffect(() => {
    const section = searchParams?.get("section") || "dashboard";
    setActiveView(section);
  }, [searchParams]);

  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [historyOrderId, setHistoryOrderId] = useState<string | null>(null);

  const { updateProduct } = useProducts();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersPage, setOrdersPage] = useState(0);
  const [ordersSize, setOrdersSize] = useState(10);
  const [ordersTotalPages, setOrdersTotalPages] = useState(1);
  const { sessionToken } = useAppContextProvider();

  const fetchOrders = async (page = 0, size = ordersSize) => {
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("size", String(size));
      const res = await fetch(`/api/orders?${params.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const payload = await res.json();
      const data = payload?.data ?? payload ?? {};
      const list: any[] = data?.content ?? payload?.content ?? [];
      const mapped: Order[] = list.map((o: any) => ({
        id: o.id,
        customerName: o.customerFullName || o.customerName || "",
        date: o.createdAt || "",
        total: new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(Number(o.amount || 0)),
        status:
          o.status === "DELIVERED"
            ? "Đã giao"
            : o.status === "CANCELLED"
            ? "Đã huỷ"
            : "Đang xử lý",
        items: Array.isArray(o.items)
          ? o.items.map((it: any) => ({
              id: it.id,
              name: it.productName,
              quantity: it.quantity,
              price: new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(Number(it.price || 0)),
            }))
          : [],
      }));
      setOrders(mapped);
      const totalPages =
        Number(data?.totalPages ?? payload?.totalPages ?? 1) || 1;
      setOrdersTotalPages(totalPages);
      setOrdersPage(Number(data?.page ?? payload?.page ?? page) || 0);
      setOrdersSize(Number(data?.size ?? payload?.size ?? size) || size);
    } catch {}
  };

  useEffect(() => {
    fetchOrders(ordersPage, ordersSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken]);

  // Ensure orders are (re)fetched when switching to Orders tab or changing page/size
  useEffect(() => {
    if (activeView === "orders") {
      fetchOrders(ordersPage, ordersSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView, ordersPage, ordersSize]);

  const updateOrder = (updated: Order) => {
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    fetchOrders(ordersPage, ordersSize);
  };

  const handleViewProduct = (product: Product) => setViewingProduct(product);
  const handleCloseViewModal = () => setViewingProduct(null);

  const handleEditProduct = (product: Product) => setEditingProduct(product);
  const handleCloseEditModal = () => setEditingProduct(null);
  const handleSaveProduct = (updatedProduct: Product) => {
    console.log("Saving product:", updatedProduct);
    updateProduct(updatedProduct);
    setEditingProduct(null);
  };

  const handleViewOrder = (order: Order) => setViewingOrder(order);
  const handleCloseOrderViewModal = () => setViewingOrder(null);

  const handleEditOrder = (order: Order) => setEditingOrder(order);
  const handleCloseEditOrderModal = () => setEditingOrder(null);
  const handleSaveOrder = (updatedOrder: Order) => {
    console.log("Saving order:", updatedOrder);
    updateOrder(updatedOrder);
    setEditingOrder(null);
  };
  const handleViewOrderHistory = (order: Order) => setHistoryOrderId(order.id);
  const handleCloseOrderHistoryModal = () => setHistoryOrderId(null);

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "products":
        return (
          <ProductsView
            onViewProduct={handleViewProduct}
            onEditProduct={handleEditProduct}
          />
        );
      case "orders":
        return (
          <OrdersView
            orders={orders}
            page={ordersPage}
            size={ordersSize}
            totalPages={ordersTotalPages}
            onChangePage={(p) => setOrdersPage(p)}
            onViewOrder={handleViewOrder}
            onEditOrder={handleEditOrder}
            onViewHistory={handleViewOrderHistory}
          />
        );
      case "accounts":
        return <AccountsView />;
      default:
        return <DashboardView />;
    }
  };

  const navItems: { id: string; label: string; icon: React.ReactNode }[] = [
    {
      id: "dashboard",
      label: "Tổng Quan",
      icon: <LayoutDashboard size={20} />,
    },
    { id: "orders", label: "Đơn Hàng", icon: <ClipboardList size={20} /> },
    { id: "products", label: "Sản Phẩm", icon: <ShoppingBag size={20} /> },
    { id: "accounts", label: "Tài Khoản", icon: <Users size={20} /> },
    { id: "settings", label: "Cài Đặt", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 mt-25">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-20 border-b">
          <img
            src={envConfig.NEXT_PUBLIC_URL_LOGO}
            height={"50px"}
            width={"50px"}
          />
          <h1 className="text-xl font-bold text-pink-600 ml-2">LALA-LYCHEEE</h1>
        </div>
        <nav className="flex-1 mt-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveView(item.id);
                const params = new URLSearchParams(
                  Array.from(searchParams?.entries?.() || [])
                );
                params.set("section", item.id);
                router.push(`${pathname}?${params.toString()}`);
              }}
              className={`flex items-center py-3 px-6 my-1 transition-colors duration-200 ${
                activeView === item.id
                  ? "bg-pink-100 text-pink-600 border-r-4 border-pink-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="ml-4 font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <aside className="relative z-10 w-64 h-full bg-white shadow-lg flex flex-col">
          <div className="flex items-center justify-center h-20 border-b">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-pink-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 20.5a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-1.28a1 1 0 01.3-.7l5.2-5.2a5.5 5.5 0 00-7.78-7.78l-5.2 5.2a1 1 0 01-.7.3v1.28a.5.5 0 00.5.5h3v-1a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.5 5.5a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
            <h1 className="text-xl font-bold text-pink-600 ml-2">
              LALA-LYCHEE
            </h1>
          </div>
          <nav className="flex-1 mt-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveView(item.id);
                  const params = new URLSearchParams(
                    Array.from(searchParams?.entries?.() || [])
                  );
                  params.set("section", item.id);
                  router.push(`${pathname}?${params.toString()}`);
                  setSidebarOpen(false);
                }}
                className={`flex items-center py-3 px-6 my-1 transition-colors duration-200 ${
                  activeView === item.id
                    ? "bg-pink-100 text-pink-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="ml-4 font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </aside>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-20 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-500"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-lg">
              <Search className="text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="bg-transparent ml-2 outline-none w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <button className="md:hidden text-gray-500">
              <Search size={24} />
            </button>
            <Bell className="text-gray-500 cursor-pointer" size={24} />
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src="https://placehold.co/40x40/fecdd3/be185d?text=A"
                alt="Admin Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="hidden md:block">
                <p className="font-semibold text-sm">Admin</p>
                <p className="text-xs text-gray-500">Quản trị viên</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          {renderView()}
        </main>
      </div>

      {/* Modals */}
      {viewingProduct && (
        <ProductViewModal
          product={viewingProduct}
          onClose={handleCloseViewModal}
        />
      )}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={handleCloseEditModal}
        />
      )}
      {viewingOrder && (
        <OrderViewModal
          order={viewingOrder}
          onClose={handleCloseOrderViewModal}
        />
      )}
      {editingOrder && (
        <OrderEditModal
          order={editingOrder}
          onSave={handleSaveOrder}
          onClose={handleCloseEditOrderModal}
        />
      )}
      {historyOrderId && (
        <LocalOrderHistoryModal
          orderId={historyOrderId}
          onClose={handleCloseOrderHistoryModal}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;
