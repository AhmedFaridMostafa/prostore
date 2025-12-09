import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";
import ProductList from "@/components/shared/product/product-list";
import { Product } from "@/types";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ViewAllProductsButton from "@/components/view-all-products-button";

const Home = async () => {
  const latestProducts = (await getLatestProducts()) as unknown as Product[];
  const featuredProducts = await getFeaturedProducts();
  return (
    <div>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList title="Newest Arrivals" data={latestProducts} />
      <ViewAllProductsButton />
    </div>
  );
};

export default Home;
