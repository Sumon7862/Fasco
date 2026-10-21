import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const CART_KEY = 'fasco_cart';

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function normalizeLineItem(item) {
  const price = item.price ?? item.product?.price ?? 0;
  return { ...item, price: Number(price) || 0 };
}

function mapApiCart(cart = []) {
  return cart.map((entry) =>
    normalizeLineItem({
      id: entry._id,
      productId: entry.product?._id ?? entry.product,
      product: entry.product,
      quantity: entry.quantity,
      size: entry.size,
      color: entry.color,
      price: entry.product?.price,
      title: entry.product?.title,
      image: entry.product?.images?.[0],
    }),
  );
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState(loadCartFromStorage);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const syncAddToApi = useCallback(async (item) => {
    if (!isAuthenticated) return;
    try {
      await api.post('/cart', {
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      });
    } catch {
      /* local cart remains source of truth when offline or unauthenticated */
    }
  }, [isAuthenticated]);

  const syncCartFromApi = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const { data } = await api.get('/cart');
      setItems(mapApiCart(data.cart));
    } catch {
      /* keep local cart */
    }
  }, [isAuthenticated]);

  useEffect(() => {
    syncCartFromApi();
  }, [syncCartFromApi]);

  const addItem = useCallback(
    (item) => {
      const normalized = normalizeLineItem(item);
      setItems((prev) => {
        const idx = prev.findIndex(
          (line) =>
            line.productId === normalized.productId &&
            line.size === normalized.size &&
            line.color?.toLowerCase() === normalized.color?.toLowerCase(),
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = {
            ...next[idx],
            quantity: next[idx].quantity + normalized.quantity,
          };
          syncAddToApi(next[idx]);
          return next;
        }
        syncAddToApi(normalized);
        return [...prev, { ...normalized, id: normalized.id ?? crypto.randomUUID() }];
      });
    },
    [syncAddToApi],
  );

  const removeItem = useCallback(
    async (id) => {
      setItems((prev) => prev.filter((line) => line.id !== id));
      if (isAuthenticated) {
        try {
          await api.delete(`/cart/${id}`);
        } catch {
          /* ignore */
        }
      }
    },
    [isAuthenticated],
  );

  const updateQty = useCallback(
    async (id, quantity) => {
      const qty = Math.max(1, quantity);
      setItems((prev) =>
        prev.map((line) => (line.id === id ? { ...line, quantity: qty } : line)),
      );
      if (isAuthenticated) {
        try {
          await api.put(`/cart/${id}`, { quantity: qty });
        } catch {
          /* ignore */
        }
      }
    },
    [isAuthenticated],
  );

  const clear = useCallback(async () => {
    setItems([]);
    if (isAuthenticated) {
      try {
        await api.delete('/cart');
      } catch {
        /* ignore */
      }
    }
  }, [isAuthenticated]);

  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clear,
      subtotal,
      itemCount: items.reduce((n, line) => n + line.quantity, 0),
    }),
    [items, addItem, removeItem, updateQty, clear, subtotal],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
