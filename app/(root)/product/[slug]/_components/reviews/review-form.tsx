"use client";

import { useCallback, useState } from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// import {
//   createUpdateReview,
//   getReviewByProductId,
// } from "@/lib/actions/review.actions";
import { reviewFormDefaultValues } from "@/lib/constants";
import { insertReviewSchema } from "@/lib/validator";
import { z } from "zod";
import { StarIcon } from "lucide-react";
import {
  createUpdateReview,
  getReviewByProductId,
} from "@/lib/actions/review.actions";
import { toast } from "sonner";

type CustomerReview = z.infer<typeof insertReviewSchema>;

const ReviewForm = ({
  userId,
  productId,
  onReviewSubmitted,
}: {
  userId: string;
  productId: string;
  onReviewSubmitted?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoadingReview, setIsLoadingReview] = useState(false);
  const form = useForm<CustomerReview>({
    resolver: zodResolver(insertReviewSchema) as Resolver<CustomerReview>,
    defaultValues: {
      ...reviewFormDefaultValues,
      userId,
      productId,
    },
  });
  // Memoize submit handler
  const onSubmit: SubmitHandler<CustomerReview> = useCallback(
    async (values) => {
      const res = await createUpdateReview(values);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      onReviewSubmitted?.();
      toast.success(res.message);
      form.reset();
      setOpen(false);
    },
    [onReviewSubmitted, form]
  );

  // Memoize open handler
  const handleOpenForm = useCallback(async () => {
    setIsLoadingReview(true);
    try {
      const review = await getReviewByProductId({ productId });
      if (review) {
        form.setValue("title", review.title);
        form.setValue("description", review.description);
        form.setValue("rating", review.rating);
      }
      setOpen(true);
    } catch (error) {
      console.error("Error loading review:", error);
      toast.error("Failed to load existing review");
    } finally {
      setIsLoadingReview(false);
    }
  }, [productId, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={handleOpenForm}
        variant="default"
        disabled={isLoadingReview}
      >
        {isLoadingReview ? "Loading..." : "Write a review"}
      </Button>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Write a review</DialogTitle>
              <DialogDescription>
                Share your thoughts with other customers
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <Select
                      name={field.name}
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(v) => field.onChange(Number(v))}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <SelectItem
                            key={`Star-${index + 1}`}
                            value={String(index + 1)}
                          >
                            {index + 1} <StarIcon className="inline h-4 w-4" />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
