import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductPrice from "@/components/shared/product/product-price";
import AddToCart from "@/components/shared/product/add-to-cart";
import { Product } from "@/types";
import { Cart } from "@/types";

interface ProductPurchaseCardProps {
  product: Product;
  cart: Cart;
}

const ProductPurchaseCard = ({ product, cart }: ProductPurchaseCardProps) => {
  const isInStock = product.stock > 0;

  return (
    <div className="col-span-1">
      <Card className="sticky top-4">
        <CardContent className="p-4 space-y-4 [&>div]:flex [&>div]:justify-between [&>div]:items-center">
          {/* Price */}
          <div className=" pb-3 border-b">
            <span className="text-sm font-medium">Price</span>
            <ProductPrice
              value={Number(product.price)}
              className="text-lg font-bold"
            />
          </div>

          {/* Stock Status */}
          <div className=" pb-3 border-b">
            <span className="text-sm font-medium">Status</span>
            {isInStock ? (
              <Badge variant="outline" className="bg-green-50">
                In stock ({product.stock})
              </Badge>
            ) : (
              <Badge variant="destructive">Unavailable</Badge>
            )}
          </div>

          {/* Add to Cart */}
          {isInStock && (
            <AddToCart
              cart={cart}
              item={{
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                qty: 1,
                image: product.images![0],
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPurchaseCard;
