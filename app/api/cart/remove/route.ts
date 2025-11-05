import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrCreateCartId } from '@/lib/cookies';

export async function POST(req: Request) {
  const { productId } = (await req.json()) as { productId: string };
  if (!productId) {
    return NextResponse.json({ ok: false, error: 'BAD_REQUEST' }, { status: 400 });
  }
  const cartId = await getOrCreateCartId();
  await prisma.cartItem.deleteMany({ where: { cartId, productId } });
  return NextResponse.json({ ok: true });
}
