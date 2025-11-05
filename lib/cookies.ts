// lib/cookies.ts
import { cookies } from 'next/headers';
import { prisma } from './prisma';
import { randomUUID } from 'crypto';

export const CART_COOKIE = 'cartId';

type SetCookieOpts = {
  name: string;
  value: string;
  httpOnly?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  path?: string;
  secure?: boolean;
  maxAge?: number; // seconds
};

// NOTE (Next 15): cookies() → Promise<ReadonlyRequestCookies>
async function setCookie({
  name,
  value,
  httpOnly = true,
  sameSite = 'lax',
  path = '/',
  secure,
  maxAge,
}: SetCookieOpts) {
  const jar = await cookies();
  jar.set({
    name,
    value,
    httpOnly,
    sameSite,
    path,
    secure: secure ?? process.env.NODE_ENV === 'production',
    maxAge: maxAge ?? 60 * 60 * 24 * 30, // 30 days
  });
}

/** فقط cartId موجود را برمی‌گرداند؛ چیزی نمی‌سازد. */
export async function getCartId(): Promise<string | undefined> {
  const jar = await cookies();
  return jar.get(CART_COOKIE)?.value;
}

/**
 * اگر cartId نبود، یک شناسه جدید می‌سازد، در DB یک Cart با همان id ایجاد می‌کند
 * و کوکی را ست می‌کند؛ در نهایت cartId را برمی‌گرداند.
 */
export async function getOrCreateCartId(): Promise<string> {
  const existing = await getCartId();
  if (existing) return existing;

  const id = randomUUID();
  await prisma.cart.create({ data: { id } });
  await setCookie({ name: CART_COOKIE, value: id });

  return id;
}
