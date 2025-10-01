import { getLatestProducts } from "@/lib/actions/product.actions";
import ProductList from "@/components/shared/product/product-list";
import { Product } from "@/types/prisma.types";

const Home = async () => {
  let latestProducts: Product[] = [];
  try {
    latestProducts = (await getLatestProducts()) as unknown as Product[];
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "Failed to load latest products during build/runtime:",
        err
      );
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="h2-bold">Latest Products</h2>
      <ProductList title="Newest Arrivals" data={latestProducts} />
    </div>
  );
};

export default Home;
