"use client";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Loader } from "lucide-react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import { toast } from "sonner";
import Link from "next/link";
import { useCallback, useMemo, useTransition } from "react";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const [isPending, startTransition] = useTransition();
  // Find if the item already exists in the cart
  const existItem = useMemo(
    () => cart && cart.items.find((x) => x.productId === item.productId),
    [cart, item.productId]
  );

  // Add item to cart
  const handleAddToCart = useCallback(async () => {
    try {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast(res.message, {
        action: (
          <Button aria-label="Go to cart" asChild>
            <Link href="/cart">Go to cart</Link>
          </Button>
        ),
      });
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Unable to add item to cart"
      );
      // Optionally log error
    }
  }, [item]);

  // Remove item from cart
  const handleRemoveFromCart = useCallback(async () => {
    try {
      const res = await removeItemFromCart(item.productId);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast(res.message);
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Unable to remove item from cart"
      );
    }
  }, [item.productId]);

  return existItem ? (
    <div>
      <Button
        type="button"
        variant="outline"
        onClick={() => startTransition(() => handleRemoveFromCart())}
        disabled={isPending}
      >
        {isPending ? (
          <Loader className="w-4 h-4  animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button
        type="button"
        variant="outline"
        onClick={() => startTransition(() => handleAddToCart())}
        disabled={isPending}
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full"
      type="button"
      onClick={() => startTransition(() => handleAddToCart())}
      disabled={isPending}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      Add to Cart
    </Button>
  );
};

export default AddToCart;
