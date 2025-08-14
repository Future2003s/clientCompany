"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  productId?: string;
  variantId?: string | null;
  variantName?: string | null;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variantId?: string | null) => void;
  updateQuantity: (
    id: string,
    quantity: number,
    variantId?: string | null
  ) => void;
  clear: () => void;
  totalQuantity: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "app_cart_v1";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (it) =>
          it.id === item.id &&
          (it.variantId || null) === (item.variantId || null)
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + item.quantity,
        };
        return next;
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string, variantId?: string | null) => {
    setItems((prev) =>
      prev.filter(
        (it) =>
          !(it.id === id && (it.variantId || null) === (variantId || null))
      )
    );
  };

  const updateQuantity = (
    id: string,
    quantity: number,
    variantId?: string | null
  ) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id && (it.variantId || null) === (variantId || null)
          ? { ...it, quantity: Math.max(1, quantity) }
          : it
      )
    );
  };

  const clear = () => setItems([]);

  const { totalQuantity, totalPrice } = useMemo(() => {
    const tq = items.reduce((s, it) => s + it.quantity, 0);
    const tp = items.reduce((s, it) => s + it.quantity * it.price, 0);
    return { totalQuantity: tq, totalPrice: tp };
  }, [items]);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    totalQuantity,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
