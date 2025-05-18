'use server';

import { prisma } from '@/lib/db';

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    return { users };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { error: 'Failed to fetch users' };
  }
}

export async function createUser(data: { email: string; name: string; password: string }) {
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password, // Note: In production, hash the password!
      },
    });
    return { user };
  } catch (error) {
    console.log(error);
    
    return { error: 'Failed to create user' };
  }
}

export async function getProducts() {
  try {
    const products = await prisma.product.findMany();
    return { products };
  } catch (error) {
    console.log(error);
    return { error: 'Failed to fetch products' };
  }
}

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return { orders };
  } catch (error) {
    console.log(error);
    return { error: 'Failed to fetch orders' };
  }
} 