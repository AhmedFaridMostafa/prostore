import ProductImages from "@/components/shared/product/product-images";

interface ProductHeaderProps {
  images: string[];
}

const ProductHeader = ({ images }: ProductHeaderProps) => {
  return (
    <div className="col-span-2">
      <ProductImages images={images} />
    </div>
  );
};

export default ProductHeader;
