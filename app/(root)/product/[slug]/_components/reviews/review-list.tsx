"use client";

import { use, useState } from "react";
import { Review } from "@/types";

import Link from "next/link";
import ReviewForm from "./review-form";

import { toast } from "sonner";
import { getReviews } from "@/lib/actions/review.actions";
import ReviewItem from "./review-item";
import ReviewsEmpty from "./reviews-empty";

const ReviewList = ({
  userId,
  productId,
  productSlug,
  reviewsPromise,
}: {
  userId: string;
  productId: string;
  productSlug: string;
  reviewsPromise: Promise<{ data: Review[] }>;
}) => {
  const res = use(reviewsPromise);
  const [reviews, setReviews] = useState(res.data);

  // Reload reviews when a review is submitted
  const reload = async () => {
    try {
      const res = await getReviews({ productId });
      setReviews([...res.data]);
    } catch (err) {
      console.log(err);
      toast.error("Error in fetching reviews");
    }
  };

  return (
    <div className="space-y-6">
      {/* Review Form Section */}
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold">Customer Reviews</h3>
        {userId ? (
          <ReviewForm
            userId={userId}
            productId={productId}
            onReviewSubmitted={reload}
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

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <ReviewsEmpty />
      ) : (
        <div className="space-y-4">
          <ReviewItem reviews={reviews} />
        </div>
      )}
    </div>
  );
};

export default ReviewList;
