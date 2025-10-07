import { Decimal } from "@prisma/client/runtime/library";
import { Product as ProductPrisma } from "@prisma/client";

export type ReplaceDecimalWithString<T> = {
  [K in keyof T]: T[K] extends Decimal ? string : T[K];
};

export type Product = ReplaceDecimalWithString<ProductPrisma>;
