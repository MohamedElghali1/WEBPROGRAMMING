import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  id: string; // composite: productId-size-color
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (p: Product, opts: { size: string; color: string; quantity: number }) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartState | null>(null);

const STORAGE_KEY = "shopco.cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartState>(() => {
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

    return {
      items,
      count,
      subtotal,
      addItem: (p, { size, color, quantity }) => {
        const id = `${p.id}-${size}-${color}`;
        setItems((curr) => {
          const existing = curr.find((i) => i.id === id);
          if (existing) {
            return curr.map((i) => (i.id === id ? { ...i, quantity: i.quantity + quantity } : i));
          }
          return [
            ...curr,
            {
              id,
              productId: p.id,
              name: p.name,
              image: p.image,
              price: p.price,
              size,
              color,
              quantity,
            },
          ];
        });
      },
      removeItem: (id) => setItems((curr) => curr.filter((i) => i.id !== id)),
      updateQty: (id, qty) =>
        setItems((curr) =>
          curr
            .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i))
            .filter((i) => i.quantity > 0)
        ),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
