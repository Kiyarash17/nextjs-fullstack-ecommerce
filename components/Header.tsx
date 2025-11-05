'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '@/lib/store/cart';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Header() {
  const count = useCart(s => s.count);
  const refresh = useCart(s => s.refresh);

  useEffect(() => { refresh(); }, []); // فقط یک بار

  return (
    <header className={cn(
      'sticky top-0 z-40 backdrop-blur bg-white/70 border-b shadow-header'
    )}>
      <div className="container h-14 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-lg">فروشگاه نمونه</Link>
        <Link href="/cart" className="relative inline-flex">
          <ShoppingCart className="h-6 w-6 text-slate-700" />
          {count > 0 && (
            <Badge className="absolute -top-2 -left-3 rounded-full px-2 py-0.5 text-xs">
              {count}
            </Badge>
          )}
        </Link>
      </div>
    </header>
  );
}
