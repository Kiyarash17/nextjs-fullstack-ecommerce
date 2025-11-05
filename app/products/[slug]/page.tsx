import { prisma } from '@/lib/prisma';
import ProductDetails from './product-details';

type Props = { params: { slug: string } };

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
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
