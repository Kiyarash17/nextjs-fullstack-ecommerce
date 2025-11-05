// app/products/[slug]/page.tsx
import { prisma } from '@/lib/prisma';
import ProductDetails from './product-details';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product || !product.active) {
    return (
      <main className="main">
        <h1 className="text-xl font-bold">کالا یافت نشد</h1>
      </main>
    );
  }

  return (
    <main className="main">
      <ProductDetails product={product} />
    </main>
  );
}
