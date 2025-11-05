'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckoutSchema, type CheckoutInput } from '@/lib/checkout';
import { Button } from '@/components/ui/button';

export default function CheckoutPage() {
  const router = useRouter();
  const [form, setForm] = useState<CheckoutInput>({ name: '', email: '', address: '', note: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError(null);
    setErrors({});
    const parsed = CheckoutSchema.safeParse(form);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const err: Record<string, string> = {};
      Object.entries(flat).forEach(([k, v]) => { if (v && v[0]) err[k] = v[0]; });
      setErrors(err);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || 'FAILED');
      router.replace(`/checkout/success?orderId=${data.orderId}`);
    } catch {
      setApiError('ثبت سفارش با خطا مواجه شد. دوباره تلاش کنید.');
    } finally {
      setBusy(false);
    }
  }

  function input<K extends keyof CheckoutInput>(key: K) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: (form[key] as any) ?? '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(s => ({ ...s, [key]: e.target.value })),
    };
  }

  return (
    <main className="main">
      <h1 className="text-2xl font-extrabold mb-4">اطلاعات پرداخت</h1>

      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-1 space-y-3">
          <div>
            <label className="block text-sm mb-1">نام و نام خانوادگی</label>
            <input className="w-full rounded-xl border p-2"
                   placeholder="مثلاً علی رضایی" {...input('name')} />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">ایمیل</label>
            <input className="w-full rounded-xl border p-2"
                   placeholder="you@example.com" dir="ltr" {...input('email')} />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">آدرس</label>
            <input className="w-full rounded-xl border p-2"
                   placeholder="تهران، ..." {...input('address')} />
            {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">یادداشت (اختیاری)</label>
            <textarea className="w-full rounded-xl border p-2" rows={4}
                      placeholder="در صورت نیاز توضیحی بنویسید..." {...input('note')} />
          </div>

          {apiError && <p className="text-red-600 text-sm">{apiError}</p>}

          <Button disabled={busy} className="rounded-xl">{busy ? 'در حال ثبت...' : 'ثبت سفارش'}</Button>
        </div>

        <div className="md:col-span-1 card-base p-4 h-max">
          <h2 className="font-bold mb-2">توضیحات</h2>
          <p className="text-sm text-slate-600 leading-7">
            این یک نمونهٔ دانشگاهی است. بعد از ثبت سفارش، سبد شما خالی می‌شود و شمارهٔ سفارش نمایش داده خواهد شد.
          </p>
        </div>
      </form>
    </main>
  );
}
