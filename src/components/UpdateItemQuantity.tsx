'use client';

import useCartActions from '@/hooks/useCartActions';
import { CartItem } from '@/types/cartItemModel';

export default function UpdateItemQuantity({
  cartItem,
  currentQuantity,
}: {
  cartItem: CartItem;
  currentQuantity: number;
}) {
  const { updateMutation } = useCartActions();
  const {
    product: { stock },
  } = cartItem;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= stock) {
      updateMutation.mutate({
        ...cartItem,
        count: value,
      });
    }
  }

  function handleIncrement() {
    if (currentQuantity < stock) {
      updateMutation.mutate({
        ...cartItem,
        count: currentQuantity + 1,
      });
    }
  }

  function handleDecrement() {
    if (currentQuantity > 1) {
      console.log(cartItem.product.price, currentQuantity);
      updateMutation.mutate({
        ...cartItem,
        count: currentQuantity - 1,
      });
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
