import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import baccaratAsset from "@/assets/baccarat-rouge-540.png.asset.json";
import baccaratAlt1 from "@/assets/baccarat-alt-1.png.asset.json";
import baccaratAlt2 from "@/assets/baccarat-alt-2.png.asset.json";
import bleuAsset from "@/assets/bleu-de-chanel.png.asset.json";
import bleuAlt1 from "@/assets/bleu-de-chanel-alt-1.png.asset.json";
import grandSoirAsset from "@/assets/grand-soir.png.asset.json";
import grandSoirAlt1 from "@/assets/grand-soir-alt-1.png.asset.json";
import grandSoirAlt2 from "@/assets/grand-soir-alt-2.png.asset.json";

export type CartItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  size: string;
  image: string;
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
const KEY = "eauturquoise_cart_v2";

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

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  sizes: string[];
  size: string;
  image: string;
  images?: string[];
  tagline: string;
  description: string;
  notes: { tete: string[]; coeur: string[]; fond: string[] };
};

export const PRODUCTS: Product[] = [
  {
    id: "baccarat-rouge-540",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    price: 230,
    sizes: ["70 ml"],
    size: "70 ml",
    image: baccaratAsset.url,
    images: [baccaratAsset.url, baccaratAlt2.url, baccaratAlt1.url],
    tagline: "Extrait de parfum",
    description:
      "Une signature olfactive iconique. Un sillage lumineux et minéral, à la fois floral, ambré et boisé, qui évoque la sophistication du cristal Baccarat.",
    notes: {
      tete: ["Safran", "Jasmin égyptien"],
      coeur: ["Bois d'ambre", "Résinoïde de cèdre"],
      fond: ["Ambre gris", "Cèdre du Maroc"],
    },
  },
  {
    id: "bleu-de-chanel",
    name: "Bleu de Chanel",
    brand: "Chanel",
    price: 80,
    sizes: ["100 ml"],
    size: "100 ml",
    image: bleuAsset.url,
    images: [bleuAsset.url, bleuAlt1.url],
    tagline: "Eau de Parfum",
    description:
      "Une fragrance boisée et aromatique d'une grande liberté. Une signature masculine et intemporelle, à la fois fraîche, minérale et profondément sensuelle.",
    notes: {
      tete: ["Pamplemousse", "Citron", "Menthe"],
      coeur: ["Encens", "Gingembre", "Iso E Super"],
      fond: ["Santal", "Cèdre", "Labdanum"],
    },
  },
  {
    id: "grand-soir",
    name: "Grand Soir",
    brand: "Maison Francis Kurkdjian",
    price: 190,
    sizes: ["70 ml"],
    size: "70 ml",
    image: grandSoirAsset.url,
    images: [grandSoirAsset.url, grandSoirAlt2.url, grandSoirAlt1.url],
    tagline: "Eau de Parfum",
    description:
      "Un hymne à Paris, la nuit. Une fragrance chaleureuse, ambrée et enveloppante, où l'élégance se conjugue à la douceur sensuelle du benjoin et de la vanille.",
    notes: {
      tete: ["Lavande", "Bergamote"],
      coeur: ["Amyris", "Benjoin du Laos"],
      fond: ["Ambre", "Tonka", "Vanille"],
    },
  },
];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatPrice(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}
