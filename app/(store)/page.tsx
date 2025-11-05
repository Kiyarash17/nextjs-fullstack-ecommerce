import { prisma } from '@/lib/prisma';
import ProductGrid from '@/components/ProductGrid';

export default async function CatalogPage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="main">
      <h1 className="text-2xl font-extrabold mb-4">فهرست کالا</h1>
      <ProductGrid products={products} />
    </main>
  );
}
