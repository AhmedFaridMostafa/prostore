import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { Product, SearchParamProps } from "@/types";
import { getMyCart } from "@/lib/actions/cart.actions";
import { auth } from "@/auth";
import ReviewList from "./_components/reviews/review-list";
import ReviewListSkeleton from "./_components/reviews/review-list-skeleton";
import { getReviews } from "@/lib/actions/review.actions";
import { Suspense } from "react";
import ProductHeader from "./_components/product-header";
import ProductInfo from "./_components/product-info";
import ProductPurchaseCard from "./_components/product-purchase-card";

const ProductDetail = async ({ params }: SearchParamProps) => {
  const { slug } = await params;
  // Parallel data fetching for better performance
  const [product, session, cart] = await Promise.all([
    getProductBySlug(slug) as Promise<Product | null>,
    auth(),
    getMyCart(),
  ]);

  if (!product) notFound();

  const userId = session?.user?.id;

  // Lazy load reviews
  const reviewsPromise = getReviews({ productId: product.id });

  return (
    <>
      {/* Product Details Section */}
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Images Column */}
          <ProductHeader images={product.images} />

          {/* Details Column */}
          <ProductInfo product={product} />

          {/* Action Column */}
          <ProductPurchaseCard product={product} cart={cart} />
        </div>
      </section>
      {/* Reviews Section */}
      <section className="mt-10">
        <h2 className="h2-bold  mb-5">Customer Reviews</h2>
        <Suspense fallback={<ReviewListSkeleton />}>
          <ReviewList
            productId={product.id}
            productSlug={product.slug}
            userId={userId || ""}
            reviewsPromise={reviewsPromise}
          />
        </Suspense>
      </section>
    </>
  );
};

export default ProductDetail;
