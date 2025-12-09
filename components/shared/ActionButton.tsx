import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionButtonProps<T> {
  actionProps: T;
  action: (props: T) => Promise<{ success: boolean; message: string }>;
  label: string | React.ReactNode;
  loadingLabel?: string | React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
}

const ActionButton = <T,>({
  actionProps,
  action,
  label,
  loadingLabel = "processing...",
  variant = "default",
  className = "",
}: ActionButtonProps<T>) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        const res = await action(actionProps);
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error(error);
      }
    });
  };

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      variant={variant}
      className={className}
    >
      {isPending ? loadingLabel : label}
    </Button>
  );
};

export default ActionButton;
