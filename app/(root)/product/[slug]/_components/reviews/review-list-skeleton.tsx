import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ReviewListSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Review Form Section Skeleton */}
      <div className="flex items-center justify-between border-b pb-4">
        <Skeleton className="h-7 w-48" /> {/* "Customer Reviews" title */}
        <Skeleton className="h-10 w-32" /> {/* "Write a review" button */}
      </div>

      {/* Reviews List Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="transition-shadow">
            <CardHeader className="space-y-3 pb-3">
              <div className="flex items-start justify-between gap-4">
                {/* Review Title Skeleton */}
                <Skeleton className="h-6 w-3/4" />
                {/* Star Rating Skeleton */}
                <div className="flex-shrink-0 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-5 w-5 rounded-sm" />
                  ))}
                </div>
              </div>
              {/* Review Description Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {/* User Info and Date Skeleton */}
              <div className="flex flex-wrap items-center gap-4 border-t pt-4">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4 rounded-sm" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewListSkeleton;
