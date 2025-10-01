import { Decimal } from "@prisma/client/runtime/library";
import { Product as ProductPrisma } from "@prisma/client";

type ReplaceDecimalWithNumber<T> = {
  [K in keyof T]: T[K] extends Decimal ? number : T[K];
};

export type Product = ReplaceDecimalWithNumber<ProductPrisma>;
