"use client";
import { useEffect, useState } from "react";
import { useAppContextProvider } from "@/context/app-context";
import type { Order } from "../types";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { sessionToken } = useAppContextProvider();

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/orders`, {
        headers: sessionToken
          ? { Authorization: `Bearer ${sessionToken}` }
          : undefined,
        cache: "no-store",
      });
      if (!res.ok) return;
      const payload = await res.json();
      const list: any[] = payload?.data ?? payload?.content ?? payload ?? [];
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
    } catch {}
  };

  useEffect(() => {
    fetchOrders();
  }, [sessionToken]);

  const updateOrder = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
    );
    fetchOrders();
  };

  return { orders, updateOrder, refreshOrders: fetchOrders };
};
