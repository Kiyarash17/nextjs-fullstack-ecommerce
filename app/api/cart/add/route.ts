import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrCreateCartId } from '@/lib/cookies';

export async function POST(req: Request) {
  const { productId, qty } = (await req.json()) as { productId: string; qty?: number };
  if (!productId) return NextResponse.json({ ok: false, error: 'BAD_REQUEST' }, { status: 400 });

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || !product.active) {
    return NextResponse.json({ ok: false, error: 'NOT_FOUND' }, { status: 404 });
  }

  const cartId = await getOrCreateCartId();
  const quantity = Math.max(1, qty ?? 1);

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId, productId } },
    update: { quantity: { increment: quantity } },
    create: { cartId, productId, quantity },
  });

  return NextResponse.json({ ok: true });
}
