/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/store/cart';

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

export default function ProductCard({ product }: { product: any }) {
  const add = useCart(s => s.add);
  const loading = useCart(s => s.loading);
  const imgSrc = product.imageUrl || FALLBACK;

  return (
    <div className={cn('card-base flex flex-col w-full')}>
      <Link href={`/products/${product.slug}`} className="block">
        <div className="w-full aspect-[16/10] overflow-hidden rounded-t-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={product.title}
            className="h-full w-full object-cover"
            onError={(e: any) => { e.currentTarget.src = FALLBACK; }}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold truncate">{product.title}</h3>
          <p className="text-sm text-slate-500 mt-1">
            {product.price.toLocaleString('fa-IR')} تومان
          </p>
        </div>
      </Link>
      <div className="p-4 pt-0 mt-auto">
        <Button
          className="w-full rounded-xl"
          disabled={loading}
          onClick={() => add(product.id, 1)}
        >
          افزودن به سبد
        </Button>
      </div>
    </div>
  );
}
