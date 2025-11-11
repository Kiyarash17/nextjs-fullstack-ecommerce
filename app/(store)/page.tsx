/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(store)/page.tsx
import { prisma } from '@/lib/prisma';
import ProductGrid from '@/components/ProductGrid';
import SearchBox from '@/components/SearchBox';

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const where: any = { active: true };
  if (q && q.trim().length > 0) {
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { slug: { contains: q, mode: 'insensitive' } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="main">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="text-2xl font-extrabold">فهرست کالا</h1>
        <div className="w-full max-w-sm">
          <SearchBox defaultValue={q ?? ''} />
        </div>
      </div>

      {products.length === 0 ? (
        <div className="card-base p-6 text-slate-600">
          نتیجه‌ای برای «{q}» یافت نشد.
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </main>
  );
}
