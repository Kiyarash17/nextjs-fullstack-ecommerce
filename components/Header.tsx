'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '@/lib/store/cart';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const count = useCart(s => s.count);
  const refresh = useCart(s => s.refresh);

  useEffect(() => { refresh(); }, [refresh]);

  const nav = [
    { href: '/', label: 'فهرست کالا', active: pathname === '/' },
    { href: '/about', label: 'درباره ما', active: pathname?.startsWith('/about') },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b shadow-header">
      <div className="container h-14 flex items-center gap-4">
        <Link href="/" className="ml-auto font-extrabold text-lg">فروشگاه کیا استور</Link>

        <nav className="hidden md:flex items-center gap-2">
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-1.5 rounded-xl text-sm',
                item.active ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/cart" className="relative inline-flex">
          <ShoppingCart className="h-6 w-6 text-slate-700" aria-label="سبد خرید" />
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
