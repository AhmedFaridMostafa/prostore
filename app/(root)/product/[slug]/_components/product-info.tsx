import { Product } from "@/types";
import StarRating from "@/components/shared/product/star-rating";
import ProductPrice from "@/components/shared/product/product-price";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className="col-span-2 p-5">
      <div className="flex flex-col gap-6">
        {/* Brand & Category */}
        <p className="text-sm text-muted-foreground uppercase tracking-wide">
          {product.brand} {product.category}
        </p>

        {/* Product Name */}
        <h1 className="h3-bold">{product.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <StarRating
            size={24}
            maxRating={5}
            defaultRating={Number(product.rating)}
            readOnly={true}
            allowHalf={true}
          />
          <span className="text-sm text-muted-foreground">
            ({product.numReviews}{" "}
            {product.numReviews === 1 ? "Review" : "Reviews"})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <ProductPrice
            value={Number(product.price)}
            className="text-2xl font-bold"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 space-y-3">
        <h3 className="font-semibold text-lg">Description</h3>
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
