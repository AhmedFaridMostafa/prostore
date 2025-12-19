import Link from "next/link";
import ReviewForm from "./review-form";

interface ReviewsHeaderProps {
  userId: string;
  productId: string;
  productSlug: string;
  onReviewSubmitted: () => void;
}

const ReviewsHeader = ({
  userId,
  productId,
  productSlug,
  onReviewSubmitted,
}: ReviewsHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <h3 className="text-lg font-semibold">Customer Reviews</h3>
      {userId ? (
        <ReviewForm
          userId={userId}
          productId={productId}
          onReviewSubmitted={onReviewSubmitted}
        />
      ) : (
        <div className="text-sm text-muted-foreground">
          Please
          <Link
            className="text-primary hover:underline px-1 font-medium"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>
          to write a review
        </div>
      )}
    </div>
  );
};

export default ReviewsHeader;
