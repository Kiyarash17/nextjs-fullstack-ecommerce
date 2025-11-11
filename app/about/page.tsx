// app/about/page.tsx
export const metadata = {
  title: 'درباره ما | فروشگاه کیا استور',
  description:
    'معرفی کوتاه فروشگاه کیا استور: مأموریت، ارزش‌ها، تکنولوژی و راه‌های ارتباطی.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'درباره ما | فروشگاه کیا استور',
    description:
      'معرفی کوتاه فروشگاه کیا استور: مأموریت، ارزش‌ها، تکنولوژی و راه‌های ارتباطی.',
    url: '/about',
    siteName: 'فروشگاه کیا استور',
    type: 'website',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'فروشگاه کیا استور',
    url: 'https://example.com',
    logo: 'https://example.com/logo.png',
    sameAs: ['https://instagram.com/yourbrand'],
  };

  return (
    <main className="main">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="mb-8">
        <h1 className="text-3xl font-extrabold">درباره ما</h1>
        <p className="text-slate-600 mt-2 leading-7">
          ما یک فروشگاه آنلاین ساده و دانشجویی هستیم که با هدف ارائهٔ تجربهٔ خرید
          سریع، شفاف و قابل‌اعتماد ساخته شده‌ایم. این پروژه با Next.js، Prisma و
          Postgres توسعه داده شده و تمرکزمان روی سادگی، سرعت و UX تمیز است.
        </p>
      </section>

      {/* Values / Features */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="card-base p-4">
          <h3 className="font-bold mb-1">ماموریت</h3>
          <p className="text-sm text-slate-600 leading-7">
            ساخت یک تجربهٔ خرید حداقلی اما بی‌دردسر؛ از مرور کالا تا پرداخت و
            ثبت سفارش.
          </p>
        </div>
        <div className="card-base p-4">
          <h3 className="font-bold mb-1">ارزش‌ها</h3>
          <ul className="text-sm text-slate-600 leading-7 list-disc pr-5">
            <li>سادگی رابط کاربری</li>
            <li>شفافیت قیمت و موجودی</li>
            <li>پاسخ‌گویی سریع</li>
          </ul>
        </div>
        <div className="card-base p-4">
          <h3 className="font-bold mb-1">تکنولوژی</h3>
          <ul className="text-sm text-slate-600 leading-7 list-disc pr-5">
            <li>Next.js (App Router)</li>
            <li>Prisma + PostgreSQL</li>
            <li>Tailwind + shadcn/ui</li>
            <li>Zustand برای state سراسری</li>
          </ul>
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-8 card-base p-4">
        <h3 className="font-bold mb-2">مسیر توسعه</h3>
        <ol className="text-sm text-slate-600 leading-7 list-decimal pr-5">
          <li>MVP: فهرست کالا، جزئیات، سبد، پرداخت و صفحهٔ موفقیت</li>
          <li>گام بعدی: فیلتر/جستجو، سئو بهتر، تست واحد</li>
          <li>بهبود: به‌روزرسانی موجودی بعد از سفارش، لاگ سفارش‌ها</li>
        </ol>
      </section>

      {/* Contact / CTA */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="card-base p-4">
          <h3 className="font-bold mb-1">ارتباط با ما</h3>
          <p className="text-sm text-slate-600 leading-7">
            برای پیشنهاد یا همکاری، به ایمیل زیر پیام بدهید:
          </p>
          <a
            href="mailto:hello@example.com"
            dir="ltr"
            className="inline-block mt-2 rounded-xl border px-3 py-2 text-sm"
          >
            hello@example.com
          </a>
        </div>
        <div className="card-base p-4">
          <h3 className="font-bold mb-1">سوالات متداول (کوتاه)</h3>
          <ul className="text-sm text-slate-600 leading-7 list-disc pr-5">
            <li>ارسال: دانشگاهی/کیا استور؛ ارسال واقعی ندارد.</li>
            <li>پرداخت: شبیه‌سازی‌شده؛ فقط ثبت سفارش تست.</li>
            <li>حریم خصوصی: فقط کوکی سبد ناشناس ذخیره می‌شود.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
