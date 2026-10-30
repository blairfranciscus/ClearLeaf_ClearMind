import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { teas, packs, type Tea, type Pack } from "./content";
export type CartItem = { teaId: string; packId: string; quantity: number };
const key = "clearleaf-cart-v2";
function readCart(): CartItem[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(key) || "[]");
    if (!Array.isArray(saved)) return [];
    const valid: CartItem[] = [];
    for (const item of saved) {
      if (
        !item ||
        !teas.some((t) => t.id === item.teaId) ||
        !packs.some((p) => p.id === item.packId) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      )
        continue;
      const existing = valid.find(
        (i) => i.teaId === item.teaId && i.packId === item.packId,
      );
      if (existing)
        existing.quantity = Math.min(99, existing.quantity + item.quantity);
      else
        valid.push({
          teaId: item.teaId,
          packId: item.packId,
          quantity: Math.min(99, item.quantity),
        });
    }
    return valid;
  } catch {
    return [];
  }
}
type CartContextType = {
  items: CartItem[];
  count: number;
  notice: string;
  storageUnavailable: boolean;
  add: (tea: Tea, pack: Pack, quantity: number) => void;
  update: (teaId: string, packId: string, quantity: number) => void;
  remove: (teaId: string, packId: string) => void;
  clear: () => void;
};
const CartContext = createContext<CartContextType | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);
  const [notice, setNotice] = useState("");
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch {
      setStorageUnavailable(true);
    }
  }, [items]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);
  function add(tea: Tea, pack: Pack, quantity: number) {
    setItems((current) => {
      const found = current.find(
        (i) => i.teaId === tea.id && i.packId === pack.id,
      );
      return found
        ? current.map((i) =>
            i === found
              ? { ...i, quantity: Math.min(99, i.quantity + quantity) }
              : i,
          )
        : [
            ...current,
            {
              teaId: tea.id,
              packId: pack.id,
              quantity: Math.min(99, Math.max(1, quantity)),
            },
          ];
    });
    setNotice(`${tea.name} added to your cart.`);
  }
  const remove = (teaId: string, packId: string) =>
    setItems((current) =>
      current.filter((i) => !(i.teaId === teaId && i.packId === packId)),
    );
  function update(teaId: string, packId: string, quantity: number) {
    if (quantity <= 0) {
      remove(teaId, packId);
      return;
    }
    setItems((current) =>
      current.map((i) =>
        i.teaId === teaId && i.packId === packId
          ? { ...i, quantity: Math.min(99, quantity) }
          : i,
      ),
    );
  }
  return (
    <CartContext.Provider
      value={{
        items,
        count: items.reduce((n, i) => n + i.quantity, 0),
        notice,
        storageUnavailable,
        add,
        update,
        remove,
        clear: () => setItems([]),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("Cart provider missing");
  return cart;
}
