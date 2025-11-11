'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/store/cart';

type Product = {
  id: string;
  title: string;
  price: number;
  imageUrl?: string | null;
  slug: string;
};

const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#eef2ff"/><stop offset="1" stop-color="#f8fafc"/>
      </linearGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="28" fill="#94a3b8">No Image</text>
    </svg>`
  );

export default function ProductDetails({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const loading = useCart((s) => s.loading);

  const imgSrc = product.imageUrl || FALLBACK;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* تصویر اصلی */}
      <div className={cn('card-base overflow-hidden')}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSrc} alt={product.title} className="w-full h-auto object-cover" />
      </div>

      {/* اطلاعات */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-extrabold">{product.title}</h1>
        <p className="text-slate-600 mt-2">
          {product.price.toLocaleString('fa-IR')} تومان
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="inline-flex items-center rounded-xl border border-border">
            <button
              className="px-3 py-2 text-lg"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="decrease"
            >
              −
            </button>
            <div className="w-10 text-center">{qty}</div>
            <button
              className="px-3 py-2 text-lg"
              onClick={() => setQty((q) => q + 1)}
              aria-label="increase"
            >
              +
            </button>
          </div>

          <Button
            className="rounded-xl"
            disabled={loading}
            onClick={() => add(product.id, qty)}
          >
            افزودن به سبد
          </Button>
        </div>

        <div className="mt-8 text-sm text-slate-500 leading-7">
این محصول از بهترین متریال استفاده شده تا بهترین خروجی را داشته باشد        </div>
      </div>
    </div>
  );
}
