import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function runSeed() {
  await prisma.user.deleteMany();
  await prisma.creditCard.deleteMany();
  await prisma.image.deleteMany();
}

runSeed()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeded successfully");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
