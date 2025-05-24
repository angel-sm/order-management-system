import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.orders.createMany({
    data: [
      {
        products: ['product1', 'product2'],
        quantity: 1,
        total: 29.99,
        date: new Date('2024-05-01T10:00:00Z'),
        status: 'PENDING',
        userId: '',
      },
      {
        products: ['product3'],
        quantity: 1,
        total: 10.13,
        date: new Date('2024-05-02T14:30:00Z'),
        status: 'COMPLETED',
        userId: '',
      },
    ],
  });
}

main()
  .then(() => {
    console.log('Seed completed.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
