// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // دسته پیش‌فرض
  const cat = await prisma.category.upsert({
    where: { slug: 'general' },
    update: {},
    create: { name: 'عمومی', slug: 'general' },
  });

  const products = [
    {
      title: 'تی‌شرت ساده',
      slug: 'tshirt-basic',
      price: 250_000,
      stock: 30,
      imageUrl:
        'https://images.unsplash.com/photo-1520975922284-9bcd8a4c3a49?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'ماگ سفید',
      slug: 'mug-white',
      price: 150_000,
      stock: 50,
      imageUrl:
        'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'استیکر پک',
      slug: 'sticker-pack',
      price: 50_000,
      stock: 200,
      imageUrl:
        'https://images.unsplash.com/photo-1602524206316-1b1b5d1f8f38?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'هودی مشکی',
      slug: 'hoodie-black',
      price: 690_000,
      stock: 20,
      imageUrl:
        'https://images.unsplash.com/photo-1542060748-10c28b62716b?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'کلاه کپ',
      slug: 'cap-classic',
      price: 180_000,
      stock: 40,
      imageUrl:
        'https://images.unsplash.com/photo-1534213990223-a31a8f4461a1?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'دفترچه خط‌دار',
      slug: 'notebook-lined',
      price: 85_000,
      stock: 120,
      imageUrl:
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...p, categoryId: cat.id, active: true },
      create: { ...p, categoryId: cat.id, active: true },
    });
  }

  console.log('✅ Seed done');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
