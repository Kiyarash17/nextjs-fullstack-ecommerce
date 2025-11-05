'use client';
import { create } from 'zustand';

type CartState = {
  count: number;
  loading: boolean;
  setCount: (n: number) => void;
  add: (productId: string, qty?: number) => Promise<void>;
  refresh: () => Promise<void>;
};

export const useCart = create<CartState>((set) => ({
  count: 0,
  loading: false,
  setCount: (n) => set({ count: n }),

  add: async (productId, qty = 1) => {
    set((s) => ({ loading: true, count: s.count + qty })); // optimistic
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        body: JSON.stringify({ productId, qty }),
      });
      if (!res.ok) throw new Error('add failed');
      // می‌توانی بعد از موفقیت، refresh هم کنی
      // await get().refresh();
    } catch {
      set((s) => ({ count: Math.max(0, s.count - qty) })); // rollback
    } finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
    const res = await fetch('/api/cart/count', { cache: 'no-store' });
    if (res.ok) {
      const { count } = await res.json();
      set({ count });
    }
  },
}));
