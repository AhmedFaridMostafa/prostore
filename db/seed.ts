import sampleData from "./sample-data";
import { prisma } from "./prisma";

export async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: sampleData.products,
  });
  return await prisma.product.findMany();
}
main();
