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

    const products = await prisma.product.createMany({
      data: [
        {
          name: "TV",
          description: "Telewizor",
          price: 600,
          weight: 10,
          categoryId:2,
        },
        {
          name: "Monitor",
          description: "Mały telewizor",
          price: 400,
          weight: 10,
          categoryId:2,
        },
        {
          name: "Mikrofala",
          description: "MMMMM",
          price: 300,
          weight: 100,
          categoryId:1,
        },
        {
          name: "PS6",
          description: "Konsoleta",
          price: 30000,
          weight: 1,
          categoryId:2,
        },
        {
          name: "Lodówka",
          description: "Zimno",
          price: 200,
          weight: 1000,
          categoryId:1,
        },
        {
          name: "Drukarka",
          description: "print print",
          price: 50,
          weight: 10,
          categoryId:2,
        },
        
      ],
    });
    
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