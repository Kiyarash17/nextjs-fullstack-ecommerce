'use client';
import { create } from 'zustand';

type State = {
  count: number;
  loading: boolean;
  add: (productId: string, qty?: number) => Promise<void>;
  refresh: () => Promise<void>;
};

export const useCart = create<State>((set) => ({
  count: 0,
  loading: false,

  add: async (productId: string, qty = 1) => {
    set({ loading: true });
    try {
      await fetch('/api/cart/add', {
        method: 'POST',
        body: JSON.stringify({ productId, qty }),
      });
      // شمارنده را از سرور بخوان
      const res = await fetch('/api/cart/count', { cache: 'no-store' });
      const data = await res.json();
      set({ count: data.count ?? 0 });
    } finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
    try {
      const res = await fetch('/api/cart/count', { cache: 'no-store' });
      const data = await res.json();
      set({ count: data.count ?? 0 });
    } catch {
      // ignore
    }
  },
}));
