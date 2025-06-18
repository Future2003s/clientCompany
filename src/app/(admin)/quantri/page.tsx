"use client";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
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

// --- Type Definitions ---
interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "Còn hàng" | "Sắp hết" | "Hết hàng";
  imageUrl: string;
  description: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: string;
}

interface Order {
  id: string;
  customerName: string;
  date: string;
  total: string;
  status: "Đang xử lý" | "Đã giao" | "Đã huỷ";
  items: OrderItem[];
}

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

// Order View Modal
const OrderViewModal = ({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) => {
  if (!order) return null;

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Đã giao":
        return "bg-green-100 text-green-800";
      case "Đã huỷ":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
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
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Chi tiết Đơn hàng
              </h2>
              <p className="text-gray-500">Mã ĐH: {order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700">
                Thông tin khách hàng
              </h3>
              <p className="text-gray-600">{order.customerName}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Ngày đặt</h3>
              <p className="text-gray-600">{order.date}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Trạng thái</h3>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Tổng tiền</h3>
              <p className="text-gray-800 font-bold">{order.total}</p>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold text-gray-700 mb-4">Các sản phẩm</h3>
            <ul className="space-y-4">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-gray-600">{item.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Edit Modal (New)
const OrderEditModal = ({
  order,
  onSave,
  onClose,
}: {
  order: Order;
  onSave: (updatedOrder: Order) => void;
  onClose: () => void;
}) => {
  const [status, setStatus] = useState(order.status);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...order, status });
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSave}>
          <div className="p-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Cập nhật đơn hàng
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-500 mt-2">Mã ĐH: {order.id}</p>
            <div className="mt-6">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Trạng thái đơn hàng
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as "Đang xử lý" | "Đã giao" | "Đã huỷ"
                  )
                }
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring-pink-500"
              >
                <option>Đang xử lý</option>
                <option>Đã giao</option>
                <option>Đã huỷ</option>
              </select>
            </div>
          </div>
          <div className="bg-gray-50 px-8 py-4 text-right rounded-b-lg">
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
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Sản Phẩm</h2>
        <button className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700 transition w-full md:w-auto justify-center">
          <PlusCircle size={20} />
          <span>Thêm Sản Phẩm</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-max">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-medium text-gray-600">Mã SP</th>
              <th className="p-4 font-medium text-gray-600">Tên Sản Phẩm</th>
              <th className="p-4 font-medium text-gray-600">Loại</th>
              <th className="p-4 font-medium text-gray-600">Giá</th>
              <th className="p-4 font-medium text-gray-600">Tồn Kho</th>
              <th className="p-4 font-medium text-gray-600">Trạng Thái</th>
              <th className="p-4 font-medium text-gray-600"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-4 text-gray-500">{p.id}</td>
                <td className="p-4 font-medium text-gray-800">{p.name}</td>
                <td className="p-4 text-gray-500">{p.category}</td>
                <td className="p-4 text-gray-500">{p.price}</td>
                <td className="p-4 text-gray-500">{p.stock}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      p.status === "Còn hàng"
                        ? "bg-green-100 text-green-800"
                        : p.status === "Hết hàng"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-4 relative">
                  <button
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() =>
                      setOpenMenuId(openMenuId === p.id ? null : p.id)
                    }
                  >
                    <MoreHorizontal size={20} />
                  </button>
                  {openMenuId === p.id && (
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-48 bg-white rounded-md shadow-xl z-10 border border-gray-100">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onViewProduct(p);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Eye size={16} />
                        <span>Xem chi tiết</span>
                      </a>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onEditProduct(p);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Pencil size={16} />
                        <span>Chỉnh sửa</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
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
    </div>
  );
};

// Orders View
const OrdersView = ({
  onViewOrder,
  onEditOrder,
}: {
  onViewOrder: (order: Order) => void;
  onEditOrder: (order: Order) => void;
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const { orders } = useOrders();

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Đã giao":
        return "bg-green-100 text-green-800";
      case "Đã huỷ":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Đơn hàng</h2>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-max">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-medium text-gray-600">Mã ĐH</th>
              <th className="p-4 font-medium text-gray-600">Khách Hàng</th>
              <th className="p-4 font-medium text-gray-600">Ngày Đặt</th>
              <th className="p-4 font-medium text-gray-600">Tổng Tiền</th>
              <th className="p-4 font-medium text-gray-600">Trạng Thái</th>
              <th className="p-4 font-medium text-gray-600"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="p-4 text-gray-500 font-mono">{o.id}</td>
                <td className="p-4 font-medium text-gray-800">
                  {o.customerName}
                </td>
                <td className="p-4 text-gray-500">{o.date}</td>
                <td className="p-4 text-gray-800 font-semibold">{o.total}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                      o.status
                    )}`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="p-4 relative">
                  <button
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() =>
                      setOpenMenuId(openMenuId === o.id ? null : o.id)
                    }
                  >
                    <MoreHorizontal size={20} />
                  </button>
                  {openMenuId === o.id && (
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-52 bg-white rounded-md shadow-xl z-10 border border-gray-100">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onViewOrder(o);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Eye size={16} />
                        <span>Xem chi tiết</span>
                      </a>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onEditOrder(o);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Pencil size={16} />
                        <span>Cập nhật trạng thái</span>
                      </a>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

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

const useOrders = () => {
  const initialOrders: Order[] = [
    {
      id: "#12567",
      customerName: "Trần Văn An",
      date: "18/06/2025",
      total: "87.000₫",
      status: "Đã giao",
      items: [
        { id: "P001", name: "Trà Vải Lài", quantity: 1, price: "45.000₫" },
        { id: "P002", name: "Hồng Trà Vải", quantity: 1, price: "42.000₫" },
      ],
    },
    {
      id: "#12568",
      customerName: "Nguyễn Thị Bình",
      date: "18/06/2025",
      total: "55.000₫",
      status: "Đang xử lý",
      items: [
        { id: "P003", name: "Matcha Vải", quantity: 1, price: "55.000₫" },
      ],
    },
    {
      id: "#12569",
      customerName: "Lê Hoàng Cường",
      date: "17/06/2025",
      total: "100.000₫",
      status: "Đang xử lý",
      items: [
        { id: "P004", name: "Latte Vải", quantity: 2, price: "100.000₫" },
      ],
    },
    {
      id: "#12570",
      customerName: "Phạm Mai Duyên",
      date: "16/06/2025",
      total: "42.000₫",
      status: "Đã huỷ",
      items: [
        { id: "P002", name: "Hồng Trà Vải", quantity: 1, price: "42.000₫" },
      ],
    },
  ];
  const [orders, setOrders] = useState(initialOrders);

  const updateOrder = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
    );
  };

  return { orders, updateOrder };
};

// --- Main Admin Dashboard Component ---
const AdminDashboardPage: NextPage = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar hidden by default on mobile
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const { updateProduct } = useProducts();
  const { updateOrder } = useOrders();

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
            onViewOrder={handleViewOrder}
            onEditOrder={handleEditOrder}
          />
        );
      case "accounts":
        return <AccountsView />;
      default:
        return <DashboardView />;
    }
  };

  const navItems = [
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
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-20 border-b">
          <img
            src={"https://d3enplyig2yenj.cloudfront.net/logo"}
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
    </div>
  );
};

export default AdminDashboardPage;
