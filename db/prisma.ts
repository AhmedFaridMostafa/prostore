import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

// Ensure WebSocket constructor is set for Neon
neonConfig.webSocketConstructor = ws;

// Ensure DATABASE_URL is provided
if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL environment variable");
}
const connectionString = process.env.DATABASE_URL;

// Create Neon pool
const pool = new Pool({ connectionString });

// Create adapter
// @ts-expect-error (missing types)
const adapter = new PrismaNeon(pool);

// Extend Prisma to convert Decimal/number fields to strings.
// Note: model names are case-sensitive and match the Prisma schema (e.g. Product).
export const prisma = new PrismaClient({ adapter }).$extends({
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
