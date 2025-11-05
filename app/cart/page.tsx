import { prisma } from '@/lib/prisma';
import { getOrCreateCartId } from '@/lib/cookies';
import CartView from './CartView';

export default async function CartPage() {
  const cartId = await getOrCreateCartId();
  const items = await prisma.cartItem.findMany({
    where: { cartId },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="main">
      <h1 className="text-2xl font-extrabold mb-4">سبد خرید</h1>
      <CartView initialItems={items} />
    </main>
  );
}
