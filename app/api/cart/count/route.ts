import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrCreateCartId } from '@/lib/cookies';

export async function GET() {
  const cartId = await getOrCreateCartId();
  const agg = await prisma.cartItem.aggregate({
    where: { cartId },
    _sum: { quantity: true },
  });
  return NextResponse.json({ count: agg._sum.quantity ?? 0 });
}
