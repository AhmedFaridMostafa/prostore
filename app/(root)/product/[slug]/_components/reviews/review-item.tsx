import { Review } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StarRating from "@/components/shared/product/star-rating";
import { Calendar, User } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

const ReviewItem = ({ reviews }: { reviews: Review[] }) => {
  return reviews.map((review) => (
    <Card key={review.id} className="transition-shadow hover:shadow-md">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg leading-tight">
            {review.title}
          </CardTitle>
          <div className="flex-shrink-0">
            <StarRating
              size={20}
              maxRating={5}
              defaultRating={review.rating}
              readOnly={true}
            />
          </div>
        </div>
        <CardDescription className="text-base leading-relaxed">
          {review.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t pt-4">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span className="font-medium">
              {review.user ? review.user.name : "Deleted User"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <time>{formatDateTime(review.createdAt).dateTime}</time>
          </div>
        </div>
      </CardContent>
    </Card>
  ));
};

export default ReviewItem;
