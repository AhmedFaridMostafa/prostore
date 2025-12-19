import { User } from "lucide-react";

const ReviewsEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <User className="h-8 w-8 text-muted-foreground" />
      </div>
      <p className="text-lg font-medium mb-2">No reviews yet</p>
      <p className="text-sm text-muted-foreground max-w-md">
        Be the first to share your thoughts about this product!
      </p>
    </div>
  );
};

export default ReviewsEmpty;
