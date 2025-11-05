import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrCreateCartId } from '@/lib/cookies';
import { CheckoutSchema } from '@/lib/checkout';

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = CheckoutSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'VALIDATION', issues: parsed.error.flatten() }, { status: 400 });
  }
  const { name, email, address, note } = parsed.data;

  const cartId = await getOrCreateCartId();
  const items = await prisma.cartItem.findMany({
    where: { cartId },
    include: { product: true },
  });

  if (items.length === 0) {
    return NextResponse.json({ ok: false, error: 'EMPTY_CART' }, { status: 400 });
  }

  // محاسبه مجموع و آماده‌سازی آیتم‌ها
  const orderItems = items.map((it) => ({
    productId: it.productId,
    quantity: it.quantity,
    price: it.product.price, // snapshot
  }));
  const total = orderItems.reduce((s, it) => s + it.price * it.quantity, 0);

  // ایجاد سفارش + آیتم‌ها
  const order = await prisma.order.create({
    data: {
      name, email, address, note: note || null, total,
      items: { createMany: { data: orderItems } },
    },
    select: { id: true },
  });

  // خالی‌کردن سبد
  await prisma.cartItem.deleteMany({ where: { cartId } });

  // برگشت نتیجه
  return NextResponse.json({ ok: true, orderId: order.id });
}
