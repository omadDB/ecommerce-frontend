'use client';

import useCartActions from '@/hooks/useCartActions';
import { useQueryClient } from '@tanstack/react-query';
import { CartItem } from '@/types/cartItemModel';

export default function UpdateProductQuantity({
  productId,
  currentQuantity,
  stock,
}: {
  productId: number;
  currentQuantity: number;
  stock: number;
}) {
  const { updateMutation } = useCartActions();
  const queryClient = useQueryClient();

  function updateQuantity(newCount: number) {
    // Get the full cart from cache
    const cart: CartItem[] | undefined = queryClient.getQueryData(['cart']);

    // Find the item to update
    const itemToUpdate = cart?.find((item) => item.productId === productId);

    if (!itemToUpdate) return;

    // Create the updated item with the new count
    const updatedItem: CartItem = {
      ...itemToUpdate,
      count: newCount,
      sum: newCount * itemToUpdate.product!.price!, // Update total sum
    };

    // Mutate with full updated item
    updateMutation.mutate(updatedItem);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= stock) {
      updateQuantity(value);
    }
  }

  function handleIncrement() {
    if (currentQuantity < stock) {
      updateQuantity(currentQuantity + 1);
    }
  }

  function handleDecrement() {
    if (currentQuantity > 1) {
      updateQuantity(currentQuantity - 1);
    }
  }

  return (
    <div className="flex rounded-md border border-[#1c284b]">
      <button
        className="px-4 py-2 disabled:cursor-not-allowed"
        onClick={handleDecrement}
        disabled={currentQuantity <= 1}
      >
        -
      </button>
      <input
        className="w-14 text-center outline-none"
        type="number"
        value={currentQuantity}
        min={1}
        max={stock}
        onChange={handleChange}
      />
      <button
        disabled={currentQuantity >= stock}
        className="px-4 py-2 disabled:cursor-not-allowed"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}
