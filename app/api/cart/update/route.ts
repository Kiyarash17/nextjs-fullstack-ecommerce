import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrCreateCartId } from '@/lib/cookies';

export async function PATCH(req: Request) {
  const { productId, qty } = (await req.json()) as { productId: string; qty: number };

  if (!productId || typeof qty !== 'number') {
    return NextResponse.json({ ok: false, error: 'BAD_REQUEST' }, { status: 400 });
  }

  const cartId = await getOrCreateCartId();

  // qty <= 0 → حذف آیتم
  if (qty <= 0) {
    await prisma.cartItem.deleteMany({ where: { cartId, productId } });
    return NextResponse.json({ ok: true });
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || !product.active) {
    return NextResponse.json({ ok: false, error: 'NOT_FOUND' }, { status: 404 });
  }

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId, productId } },
    update: { quantity: qty },
    create: { cartId, productId, quantity: qty },
  });

  return NextResponse.json({ ok: true });
}
