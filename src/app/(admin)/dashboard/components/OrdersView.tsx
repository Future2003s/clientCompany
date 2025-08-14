"use client";
import { useState } from "react";
import { Eye, Pencil, MoreHorizontal, ClipboardList } from "lucide-react";
import type { Order } from "../types";

export const OrdersView = ({
  orders,
  page,
  size,
  totalPages,
  onChangePage,
  onViewOrder,
  onEditOrder,
  onViewHistory,
}: {
  orders: Order[];
  page: number;
  size: number;
  totalPages: number;
  onChangePage: (nextPage: number) => void;
  onViewOrder: (order: Order) => void;
  onEditOrder: (order: Order) => void;
  onViewHistory: (order: Order) => void;
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    open: boolean;
    x: number;
    y: number;
    order: Order | null;
  }>({ open: false, x: 0, y: 0, order: null });

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
              <tr
                key={o.id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setOpenMenuId(null);
                  setContextMenu({
                    open: true,
                    x: e.clientX,
                    y: e.clientY,
                    order: o,
                  });
                }}
              >
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
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onViewHistory(o);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <ClipboardList size={16} />
                        <span>Lịch sử chỉnh sửa</span>
                      </a>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Trang {page + 1} / {Math.max(totalPages, 1)}
        </div>
        <div className="flex gap-2">
          <button
            disabled={page <= 0}
            onClick={() => onChangePage(Math.max(page - 1, 0))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Trước
          </button>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => onChangePage(Math.min(page + 1, totalPages - 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>
      {contextMenu.open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() =>
              setContextMenu({ open: false, x: 0, y: 0, order: null })
            }
          />
          <div
            className="fixed z-50 w-56 bg-white rounded-md shadow-xl border border-gray-100"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (contextMenu.order) onViewOrder(contextMenu.order);
                setContextMenu({ open: false, x: 0, y: 0, order: null });
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
                if (contextMenu.order) onEditOrder(contextMenu.order);
                setContextMenu({ open: false, x: 0, y: 0, order: null });
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Pencil size={16} />
              <span>Cập nhật trạng thái</span>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (contextMenu.order) onViewHistory(contextMenu.order);
                setContextMenu({ open: false, x: 0, y: 0, order: null });
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <ClipboardList size={16} />
              <span>Lịch sử chỉnh sửa</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
};
