import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const orderStatuses = await prisma.orderStatus.createMany({
        data: [
          { name: 'NIEZATWIERDZONE' },
          { name: 'ZATWIERDZONE' },
          { name: 'ANULOWANE' },
          { name: 'ZREALIZOWANE' },
        ],
      });
    const category1 = await prisma.category.create({
      data: {
        name: 'AGD',
      },
    });

    const category2 = await prisma.category.create({
      data: {
        name: 'RTV',
      },
    });
    
    console.log('Inserted order statuses:', orderStatuses);
    console.log('Inserted categories:', category1, category2);
  } catch (error) {
    console.error('Error inserting categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });