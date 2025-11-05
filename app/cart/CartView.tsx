'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';

type Item = {
  id: string;
  productId: string;
  quantity: number;
  product: { id: string; title: string; price: number; imageUrl?: string | null };
};

export default function CartView({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [busyId, setBusyId] = useState<string | null>(null);
  const refreshCount = useCart(s => s.refresh);

  const total = useMemo(
    () => items.reduce((s, it) => s + it.quantity * (it.product.price ?? 0), 0),
    [items]
  );

  async function setQty(productId: string, qty: number) {
    setBusyId(productId);
    // optimistic
    setItems(prev =>
      prev
        .map(it => (it.productId === productId ? { ...it, quantity: Math.max(0, qty) } : it))
        .filter(it => it.quantity > 0)
    );
    try {
      const res = await fetch('/api/cart/update', {
        method: 'PATCH',
        body: JSON.stringify({ productId, qty }),
      });
      if (!res.ok) throw new Error('update failed');
      await refreshCount(); // نوار هدر را هم تازه کن
    } catch {
      location.reload(); // fallback ساده
    } finally {
      setBusyId(null);
    }
  }

  async function remove(productId: string) {
    setBusyId(productId);
    setItems(prev => prev.filter(it => it.productId !== productId));
    try {
      const res = await fetch('/api/cart/remove', {
        method: 'POST',
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) throw new Error('remove failed');
      await refreshCount();
    } catch {
      location.reload();
    } finally {
      setBusyId(null);
    }
  }

  if (items.length === 0) {
    return <p className="text-slate-600">سبد شما خالی است.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* لیست آیتم‌ها */}
      <div className="md:col-span-2 space-y-3">
        {items.map(it => (
          <div
            key={it.id}
            className="card-base p-3 flex items-center gap-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={it.product.imageUrl ?? '/placeholder.svg'}
              alt={it.product.title}
              className="h-16 w-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="font-semibold">{it.product.title}</div>
              <div className="text-sm text-slate-500 mt-0.5">
                {(it.product.price * it.quantity).toLocaleString('fa-IR')} تومان
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="h-8 w-8 rounded-lg border text-lg disabled:opacity-50"
                onClick={() => setQty(it.productId, it.quantity - 1)}
                disabled={busyId === it.productId}
                aria-label="decrease"
              >
                −
              </button>
              <div className="w-8 text-center">{it.quantity}</div>
              <button
                className="h-8 w-8 rounded-lg border text-lg disabled:opacity-50"
                onClick={() => setQty(it.productId, it.quantity + 1)}
                disabled={busyId === it.productId}
                aria-label="increase"
              >
                +
              </button>
            </div>

            <button
              className="h-8 px-2 rounded-lg border text-red-600 disabled:opacity-50"
              onClick={() => remove(it.productId)}
              disabled={busyId === it.productId}
              aria-label="remove"
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      {/* خلاصه سبد */}
      <div className="card-base p-4 h-max sticky top-20">
        <div className="flex justify-between">
          <span className="text-slate-600">جمع کل</span>
          <span className="font-extrabold">
            {total.toLocaleString('fa-IR')} تومان
          </span>
        </div>
        <Button asChild className="w-full rounded-xl mt-4">
          <Link href="/checkout">ادامه پرداخت</Link>
        </Button>
      </div>
    </div>
  );
}
