// app/about/page.tsx
export const metadata = {
  title: 'درباره ما | فروشگاه کیا استور',
  description:
    'فروشگاه کیا استور؛ ارائه‌دهنده محصولات باکیفیت و تجربه خرید سریع و شفاف با تمرکز بر طراحی مدرن و خدمات قابل اعتماد.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'درباره ما | فروشگاه کیا استور',
    description:
      'فروشگاه کیا استور؛ ارائه‌دهنده محصولات باکیفیت و تجربه خرید سریع و شفاف با تمرکز بر طراحی مدرن و خدمات قابل اعتماد.',
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
    url: 'https://kia-store.ir',
    logo: 'https://kia-store.ir/logo.png',
    sameAs: ['https://instagram.com/kiastore'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+989335444972',
      contactType: 'customer service',
      email: 'kiyarashhadidian@gmail.com',
    },
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
          فروشگاه <strong>کیا استور</strong> با هدف ارائه‌ی تجربه‌ای مدرن، سریع و
          شفاف در خرید آنلاین شکل گرفته است. ما تلاش می‌کنیم محصولات باکیفیت را
          با طراحی کاربرپسند، پشتیبانی پاسخ‌گو و فرآیند سفارش ساده در اختیار
          مشتریانمان قرار دهیم. تمرکز ما بر سادگی، اعتماد و تجربه‌ی کاربری لذت‌بخش است.
        </p>
      </section>

      {/* Values / Features */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="card-base p-4">
          <h3 className="font-bold mb-1">ماموریت ما</h3>
          <p className="text-sm text-slate-600 leading-7">
            ساخت یک بستر خرید آنلاین مطمئن که کاربر بدون پیچیدگی بتواند محصولات
            موردنیاز خود را با چند کلیک انتخاب و خریداری کند.
          </p>
        </div>
        <div className="card-base p-4">
          <h3 className="font-bold mb-1">ارزش‌های ما</h3>
          <ul className="text-sm text-slate-600 leading-7 list-disc pr-5">
            <li>کیفیت و اصالت کالا</li>
            <li>پشتیبانی شفاف و سریع</li>
            <li>طراحی و تجربه کاربری مینیمال</li>
          </ul>
        </div>
        <div className="card-base p-4">
          <h3 className="font-bold mb-1">تکنولوژی و توسعه</h3>
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
        <h3 className="font-bold mb-2">روند رشد و بهبود</h3>
        <ol className="text-sm text-slate-600 leading-7 list-decimal pr-5">
          <li>ایجاد هسته‌ی فروشگاه و نمایش محصولات</li>
          <li>افزودن سبد خرید و پرداخت ایمن</li>
          <li>بهینه‌سازی تجربه کاربری و افزودن جستجو</li>
          <li>توسعه نسخه موبایل و بهبود سرعت</li>
        </ol>
      </section>

      {/* Contact / CTA */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="card-base p-4">
          <h3 className="font-bold mb-1">ارتباط با ما</h3>
          <p className="text-sm text-slate-600 leading-7">
            برای پشتیبانی، همکاری یا پیشنهادات خود می‌توانید از طریق راه‌های زیر با ما در ارتباط باشید:
          </p>
          <div className="mt-3 space-y-1 text-sm text-left">
            <a
              href="mailto:kiyarashhadidian@gmail.com"
              dir="ltr"
              className="block text-blue-600 hover:underline"
            >
              📧 kiyarashhadidian@gmail.com
            </a>
            <a href="tel:09335444972" className="block text-blue-600 hover:underline">
              09335444972 📞
            </a>
            <a
              href="https://instagram.com/kiastore"
              target="_blank"
              className="block text-blue-600 hover:underline"
            >
              instagram.com/kiastore 📷
            </a>
          </div>
        </div>

        <div className="card-base p-4">
          <h3 className="font-bold mb-1">پرسش‌های متداول</h3>
          <ul className="text-sm text-slate-600 leading-7 list-disc pr-5">
            <li>ارسال سفارش‌ها در سریع‌ترین زمان ممکن انجام می‌شود.</li>
            <li>پرداخت‌ها به‌صورت امن از طریق درگاه رسمی انجام می‌گیرد.</li>
            <li>اطلاعات کاربران فقط برای پردازش سفارش‌ها استفاده می‌شود.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
