// components/SearchBox.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SearchBox({ defaultValue = '' }: { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const timer = useRef<NodeJS.Timeout | null>(null);

  // وقتی back/forward می‌زنی، مقدار اینپوت با URL همگام بماند
  useEffect(() => {
    const q = params.get('q') ?? '';
    setValue(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function pushQuery(next: string) {
    const usp = new URLSearchParams(params.toString());
    if (next.trim()) usp.set('q', next.trim());
    else usp.delete('q');
    router.replace(`${pathname}?${usp.toString()}`);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setValue(next);
    // debounce 300ms
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => pushQuery(next), 300);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    pushQuery(value);
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        className="w-full rounded-xl border p-2 text-sm"
        placeholder="جستجو..."
        value={value}
        onChange={onChange}
        aria-label="Search products"
      />
    </form>
  );
}
