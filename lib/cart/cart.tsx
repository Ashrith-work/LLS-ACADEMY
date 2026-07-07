"use client";

import { createContext, useContext, useEffect, useState } from "react";

/**
 * Cart state — a list of course ids the visitor has added, persisted to
 * localStorage so it survives reloads. Deliberately lightweight (ids only);
 * course details are resolved from the catalogue when rendering.
 */
interface CartState {
  items: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
  count: number;
  ready: boolean;
}

const CartContext = createContext<CartState>({
  items: [],
  add: () => {},
  remove: () => {},
  toggle: () => {},
  has: () => false,
  clear: () => {},
  count: 0,
  ready: false,
});

const STORAGE_KEY = "lls-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  // Load once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* blocked/corrupt storage — start empty */
    }
    setReady(true);
  }, []);

  // Persist whenever the cart changes (but not before the initial load).
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* private mode — session-only cart is fine */
    }
  }, [items, ready]);

  const add = (id: string) => setItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const remove = (id: string) => setItems((prev) => prev.filter((x) => x !== id));
  const toggle = (id: string) =>
    setItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const has = (id: string) => items.includes(id);
  const clear = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, add, remove, toggle, has, clear, count: items.length, ready }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
