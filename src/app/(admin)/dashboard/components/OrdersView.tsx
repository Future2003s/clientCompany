"use client";
import { useState } from "react";
import { Eye, Pencil, MoreHorizontal, ClipboardList } from "lucide-react";
import type { Order } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Đã giao":
        return "success" as const;
      case "Đã huỷ":
        return "destructive" as const;
      default:
        return "secondary" as const;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quản lý Đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã ĐH</TableHead>
              <TableHead>Khách Hàng</TableHead>
              <TableHead>Ngày Đặt</TableHead>
              <TableHead>Tổng Tiền</TableHead>
              <TableHead>Trạng Thái</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow
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
                <TableCell className="text-muted-foreground font-mono">
                  {o.id}
                </TableCell>
                <TableCell className="font-medium">{o.customerName}</TableCell>
                <TableCell className="text-muted-foreground">{o.date}</TableCell>
                <TableCell className="font-semibold">{o.total}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(o.status)}>{o.status}</Badge>
                </TableCell>
                <TableCell className="relative text-right">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Trang {page + 1} / {Math.max(totalPages, 1)}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 0}
              onClick={() => onChangePage(Math.max(page - 1, 0))}
            >
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page + 1 >= totalPages}
              onClick={() => onChangePage(Math.min(page + 1, totalPages - 1))}
            >
              Sau
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
