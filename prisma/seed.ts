import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      birthdate: new Date(new Date().setDate(new Date().getDate() + 6)), // Upcoming birthday
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'emma@example.com',
      birthdate: new Date(new Date().setDate(new Date().getDate() + 3)), // Upcoming birthday
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'alex@example.com',
      birthdate: new Date('2000-09-15'), // Past birthday
    },
  });

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: 'Smartphone',
      description: 'Latest model smartphone with high-end specs',
      price: 699.99,
      image_url: 'https://example.com/smartphone.jpg',
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Headphones',
      description: 'Noise-canceling over-ear headphones',
      price: 199.99,
      image_url: 'https://example.com/headphones.jpg',
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Smartwatch',
      description: 'Waterproof smartwatch with fitness tracking',
      price: 149.99,
      image_url: 'https://example.com/smartwatch.jpg',
    },
  });

  // Create user-product preferences
  await prisma.userProductPreference.createMany({
    data: [
      { user_id: user1.id, product_id: product1.id },
      { user_id: user1.id, product_id: product2.id },
      { user_id: user2.id, product_id: product2.id },
      { user_id: user2.id, product_id: product3.id },
      { user_id: user3.id, product_id: product1.id },
      { user_id: user3.id, product_id: product3.id },
    ],
  });

  console.log('✅ Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
