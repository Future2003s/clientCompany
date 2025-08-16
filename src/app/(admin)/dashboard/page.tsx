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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

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
  <Card>
    <CardHeader className="flex items-start justify-between pb-2">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <CardTitle className="text-3xl font-bold mt-1">{value}</CardTitle>
      </div>
      <div className="p-3 bg-pink-100 text-pink-600 rounded-full">{icon}</div>
    </CardHeader>
    <CardContent>
      <Badge variant="success" className="mt-2">{change}</Badge>
    </CardContent>
  </Card>
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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Còn hàng":
        return "success" as const;
      case "Hết hàng":
        return "destructive" as const;
      default:
        return "secondary" as const;
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
          <Badge variant={getStatusVariant(product.status)}>{product.status}</Badge>
          <h2 className="text-3xl font-bold text-gray-800 mt-4">{product.name}</h2>
          <p className="text-md text-gray-500 mt-1">{product.category}</p>
          <p className="text-3xl font-bold text-pink-600 my-4">{product.price}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
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
              <h2 className="text-2xl font-bold text-gray-800">Chỉnh sửa sản phẩm</h2>
              <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="mb-1 block">Tên sản phẩm</Label>
                <Input type="text" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <Label className="mb-1 block">Loại sản phẩm</Label>
                <Input type="text" name="category" value={formData.category} onChange={handleChange} />
              </div>
              <div>
                <Label className="mb-1 block">Giá (VNĐ)</Label>
                <Input type="text" name="price" value={formData.price} onChange={handleChange} />
              </div>
              <div>
                <Label className="mb-1 block">Tồn kho</Label>
                <Input type="number" name="stock" value={formData.stock} onChange={handleChange} />
              </div>
              <div className="col-span-2">
                <Label className="mb-1 block">Mô tả</Label>
                <Textarea name="description" value={formData.description} onChange={handleChange} rows={4} />
              </div>
              <div className="col-span-2">
                <Label className="mb-1 block">Ảnh sản phẩm</Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none">
                        <span>Tải lên một tệp</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">hoặc kéo và thả</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF lên đến 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-8 py-4 text-right rounded-b-lg sticky bottom-0">
            <Button type="button" variant="outline" onClick={onClose} className="mr-3">
              Huỷ
            </Button>
            <Button type="submit">Lưu thay đổi</Button>
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
      <StatCard title="Tổng Doanh Thu" value="75.890.000₫" icon={<ShoppingBag size={24} />} change="+12% so với tháng trước" />
      <StatCard title="Đơn Hàng Mới" value="1.204" icon={<ClipboardList size={24} />} change="+5.2% so với tháng trước" />
      <StatCard title="Tài Khoản Mới" value="86" icon={<Users size={24} />} change="+20% so với tháng trước" />
      <StatCard title="Sản Phẩm Tồn Kho" value="3.450" icon={<ShoppingBag size={24} />} change="-1.8% so với tháng trước" />
    </div>
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Phân Tích Doanh Thu</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Biểu đồ sẽ được hiển thị ở đây.</p>
        <div className="h-64 mt-4 rounded-md border bg-muted/30 flex items-center justify-center">[Chart Data]</div>
      </CardContent>
    </Card>
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
          categories: cats?.data || [],
          brands: brs?.data || [],
          tags: tgs?.data || [],
        });
      } catch (err) {
        console.error(err);
      }
    };
    if (isCreateOpen) loadMeta();
  }, [isCreateOpen]);

  const loadList = async () => {
    setLoading(true);
    try {
      const res: any = await productsApi.list();
      setItems(res?.data ?? []);
    } catch (err) {
      toast.error("Không tải được danh sách sản phẩm");
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
        product_price: form.product_price,
        category_id: form.category_id || undefined,
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

  const handleDelete = async (id: string) => {
    if (!sessionToken) {
      toast.error("Cần đăng nhập");
      return;
    }
    try {
      await productsApi.remove(sessionToken, id);
      toast.success("Đã xoá sản phẩm");
      await loadList();
    } catch {
      toast.error("Xoá thất bại");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Sản Phẩm</h2>
        <Button onClick={() => setIsCreateOpen(true)} className="w-full md:w-auto">
          <PlusCircle size={20} />
          <span>Thêm Sản Phẩm</span>
        </Button>
      </div>

      {isCreateOpen && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Thêm sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1 block">Tên sản phẩm</Label>
                <Input
                  value={form.product_name}
                  onChange={(e) => setForm({ ...form, product_name: e.target.value })}
                />
              </div>
              <div>
                <Label className="mb-1 block">Giá</Label>
                <Input
                  value={form.product_price}
                  onChange={(e) => setForm({ ...form, product_price: e.target.value })}
                />
              </div>
              <div>
                <Label className="mb-1 block">Danh mục</Label>
                <Select
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                >
                  <option value="">Chọn danh mục</option>
                  {meta.categories.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.categoryName}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label className="mb-1 block">Thương hiệu</Label>
                <Select
                  value={form.brand_id}
                  onChange={(e) => setForm({ ...form, brand_id: e.target.value })}
                >
                  <option value="">Chọn thương hiệu</option>
                  {meta.brands.map((b: any) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label className="mb-1 block">Ảnh (phân tách bởi dấu phẩy)</Label>
                <Input
                  value={form.image_urls}
                  onChange={(e) => setForm({ ...form, image_urls: e.target.value })}
                  placeholder="https://... , https://..."
                />
              </div>
              <div className="md:col-span-2">
                <Label className="mb-1 block">Tags (IDs, cách nhau bởi dấu phẩy)</Label>
                <Input
                  value={form.tag_ids}
                  onChange={(e) => setForm({ ...form, tag_ids: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Huỷ
                </Button>
                <Button type="submit" disabled={creating}>
                  {creating ? "Đang tạo..." : "Tạo"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-max">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-medium text-gray-600">Tên</th>
              <th className="p-4 font-medium text-gray-600">Loại</th>
              <th className="p-4 font-medium text-gray-600">Giá</th>
              <th className="p-4 font-medium text-gray-600">Tồn kho</th>
              <th className="p-4 font-medium text-gray-600">Trạng thái</th>
              <th className="p-4 font-medium text-gray-600"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((p: any) => (
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
                <td className="p-4 font-medium text-gray-800">{p.product_name}</td>
                <td className="p-4 text-gray-500">{p.categoryName || "-"}</td>
                <td className="p-4 text-gray-800 font-semibold">{p.product_price}</td>
                <td className="p-4 text-gray-500">{p.stock ?? "-"}</td>
                <td className="p-4">
                  <Badge variant={p.status === "Còn hàng" ? "success" : p.status === "Hết hàng" ? "destructive" : "secondary"}>{p.status || "—"}</Badge>
                </td>
                <td className="p-4 relative">
                  <button
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => setOpenMenuId(openMenuId === p.id ? null : p.id)}
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
                            onViewProduct(res?.data);
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
                              product_name: d?.product_name || p.product_name,
                              product_price: d?.product_price || p.product_price,
                              image_urls: (d?.image_urls || p.image_urls || []).join(", "),
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
                        <span>Chỉnh sửa</span>
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
                          await handleDelete(p.id);
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
            ))}
          </tbody>
        </table>
      </div>

      {contextMenu.open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setContextMenu({ open: false, x: 0, y: 0, product: null })}
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
                  const res: any = await productsApi.detail(contextMenu.product.id);
                  setDetail(res?.data ?? null);
                  onViewProduct(res?.data);
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
                    product_name: d?.product_name || p.product_name,
                    product_price: d?.product_price || p.product_price,
                    image_urls: (d?.image_urls || p.image_urls || []).join(", "),
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
              <span>Chỉnh sửa</span>
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
                await handleDelete(p.id);
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
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!sessionToken || !editingId) return;
                try {
                  await productsApi.update(sessionToken, editingId, {
                    product_name: editForm.product_name,
                    product_price: editForm.product_price,
                    image_urls: editForm.image_urls
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  });
                  toast.success("Đã cập nhật sản phẩm");
                  setIsEditOpen(false);
                  await loadList();
                } catch {
                  toast.error("Cập nhật thất bại");
                }
              }}
            >
              <div className="p-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Chỉnh sửa sản phẩm</h2>
                  <button type="button" onClick={() => setIsEditOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-1 block">Tên sản phẩm</Label>
                    <Input
                      value={editForm.product_name}
                      onChange={(e) => setEditForm({ ...editForm, product_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block">Giá</Label>
                    <Input
                      value={editForm.product_price}
                      onChange={(e) => setEditForm({ ...editForm, product_price: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="mb-1 block">Ảnh (URLs, cách nhau bởi dấu phẩy)</Label>
                    <Input
                      value={editForm.image_urls}
                      onChange={(e) => setEditForm({ ...editForm, image_urls: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-8 py-4 text-right rounded-b-lg">
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} className="mr-3">
                  Huỷ
                </Button>
                <Button type="submit" disabled={updating}>
                  {updating ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Orders View moved to components

// Accounts View
const AccountsView = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold">Quản lý Tài khoản</h2>
      <p className="text-gray-500">Tính năng đang được phát triển.</p>
    </div>
  );
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
  const [loading, setLoading] = useState(false);
  const [historyItems, setHistoryItems] = useState([
    { id: "1", date: "2024-11-10", action: "Cập nhật trạng thái", user: "Admin" },
    { id: "2", date: "2024-11-12", action: "Cập nhật thanh toán", user: "Admin" },
  ]);

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/orders/${orderId}/history`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          setHistoryItems(data.data || []);
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, [orderId]);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Lịch sử đơn hàng</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          <div className="mt-6">
            {loading ? (
              <p className="text-gray-500">Đang tải...</p>
            ) : historyItems.length === 0 ? (
              <p className="text-gray-500">Không có lịch sử.</p>
            ) : (
              <ul className="space-y-3">
                {historyItems.map((item) => (
                  <li key={item.id} className="border rounded p-3">
                    <div className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleString("vi-VN")}
                    </div>
                    <div className="mt-1 text-gray-800">{item.action}</div>
                    <div className="text-sm text-gray-600 mt-1">Bởi: {item.user}</div>
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

const AdminDashboardPage: NextPage = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [historyOrderId, setHistoryOrderId] = useState<string | null>(null);

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
      const list = Array.isArray(data?.content)
        ? data.content
        : Array.isArray(payload?.content)
        ? payload.content
        : [];
      const mapped: Order[] = list.map((it: any) => ({
        id: String(it.id),
        customerName: it?.customerName ?? it?.customer?.name ?? "Khách",
        date: it?.date ?? new Date(it?.createdAt ?? Date.now()).toLocaleDateString("vi-VN"),
        total: it?.totalAmount ? `${it.totalAmount.toLocaleString("vi-VN")}₫` : `${(it.total ?? 0).toLocaleString("vi-VN")}₫`,
        status:
          it?.status === "DELIVERED"
            ? "Đã giao"
            : it?.status === "CANCELLED"
            ? "Đã huỷ"
            : (it?.statusDisplay ?? "Đang xử lý"),
        items: Array.isArray(it?.items)
          ? it.items.map((p: any) => ({
              id: String(p?.id ?? p?.productId ?? Math.random()),
              name: p?.name ?? p?.productName ?? "Sản phẩm",
              price: p?.price ? `${p.price.toLocaleString("vi-VN")}₫` : `${(p?.amount ?? 0).toLocaleString("vi-VN")}₫`,
              quantity: p?.quantity ?? p?.qty ?? 1,
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
  }, [sessionToken]);

  // Ensure orders are (re)fetched when switching to Orders tab or changing page/size
  useEffect(() => {
    if (activeView === "orders") {
      fetchOrders(ordersPage, ordersSize);
    }
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

  useEffect(() => {
    const section = searchParams?.get("section") || "dashboard";
    setActiveView(section);
  }, [searchParams]);

  return (
    <div>
      {/* Content Area only (layout provides shell) */}
      {(() => {
        switch (activeView) {
          case "dashboard":
            return <DashboardView />;
          case "products":
            return (
              <ProductsView onViewProduct={handleViewProduct} onEditProduct={handleEditProduct} />
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
      })()}

      {/* Modals */}
      {viewingProduct && (
        <ProductViewModal product={viewingProduct} onClose={handleCloseViewModal} />
      )}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={handleCloseEditModal}
        />
      )}
      {viewingOrder && (
        <OrderViewModal order={viewingOrder} onClose={handleCloseOrderViewModal} />
      )}
      {editingOrder && (
        <OrderEditModal order={editingOrder} onSave={handleSaveOrder} onClose={handleCloseEditOrderModal} />
      )}
      {historyOrderId && (
        <LocalOrderHistoryModal orderId={historyOrderId} onClose={handleCloseOrderHistoryModal} />
      )}
    </div>
  );
};

export default AdminDashboardPage;
