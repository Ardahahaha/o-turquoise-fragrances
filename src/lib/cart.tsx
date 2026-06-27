import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  size: string;
  quantity: number;
};

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  setQty: (id: string, size: string, qty: number) => void;
  remove: (id: string, size: string) => void;
  clear: () => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "oturquoise_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add: CartCtx["add"] = (item, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id && p.size === item.size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const setQty: CartCtx["setQty"] = (id, size, qty) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id && p.size === size ? { ...p, quantity: Math.max(0, qty) } : p))
        .filter((p) => p.quantity > 0),
    );
  };

  const remove: CartCtx["remove"] = (id, size) =>
    setItems((prev) => prev.filter((p) => !(p.id === id && p.size === size)));

  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.quantity * i.price, 0);

  return <Ctx.Provider value={{ items, add, setQty, remove, clear, count, total }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const PRODUCT = {
  id: "baccarat-rouge-540",
  name: "Baccarat Rouge 540",
  brand: "Maison Francis Kurkdjian",
  price: 325,
  sizes: ["70 ml"],
  short:
    "Une signature olfactive iconique. Une trace lumineuse, ambrée et florale, à la fois aérienne et magnétique.",
  long:
    "Baccarat Rouge 540 est une fragrance signature de la Maison Francis Kurkdjian. Composée comme une alchimie poétique, elle conjugue la délicatesse florale du jasmin et du safran à la profondeur boisée du cèdre et à la chaleur sensuelle de l'ambre gris. Son sillage lumineux et minéral évoque la sophistication des grands cristaux Baccarat.",
  notes: {
    tete: ["Safran", "Jasmin égyptien"],
    coeur: ["Bois d'ambre", "Résinoïde de cèdre"],
    fond: ["Ambre gris", "Cèdre du Maroc"],
  },
};

export function formatPrice(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}
