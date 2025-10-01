import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient().$extends({
    result: {
      product: {
        price: {
          needs: { price: true },
          compute(product) {
            // price is usually a Decimal - convert to string
            return product.price?.toString();
          },
        },
        rating: {
          needs: { rating: true },
          compute(product) {
            return product.rating?.toString();
          },
        },
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
