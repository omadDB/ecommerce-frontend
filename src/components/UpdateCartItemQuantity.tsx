'use client';

import useCartActions from '@/hooks/useCartActions';
import { CartItem } from '@/types/cartItemModel';

export default function UpdateCartItemQuantity({
  onQuantityChange,
  cartItem,
}: {
  cartItem: CartItem;
  onQuantityChange?: (newQuantity: number) => void;
}) {
  const { productId, product, count: currentQuantity = 1 } = cartItem;
  const { updateMutation } = useCartActions();
  const totalStock = currentQuantity + product.stock;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value;
    value = Number(e.target.value);
    if (value < 1) value = 1;
    if (
      !isNaN(value) &&
      value >= 1 &&
      value <= totalStock &&
      value !== currentQuantity
    ) {
      updateMutation.mutate({
        productId,
        countForUpdate: value,
        product,
        updateType: 'set',
      });
      onQuantityChange?.(value);
    }
  }

  function handleIncrement() {
    if (currentQuantity < totalStock) {
      updateMutation.mutate({
        productId,
        countForUpdate: 1,
        product,
        updateType: 'increment',
      });

      onQuantityChange?.(currentQuantity + 1);
    }
  }

  function handleDecrement() {
    if (currentQuantity > 1) {
      updateMutation.mutate({
        productId,
        product,
        countForUpdate: 1,
        updateType: 'decrement',
      });
      onQuantityChange?.(currentQuantity - 1);
    }
  }

  return (
    <div className="flex rounded-md border border-[#1c284b]">
      <button
        className="px-4 py-2 disabled:cursor-not-allowed"
        onClick={handleDecrement}
        disabled={currentQuantity <= 1 || updateMutation.isPending}
      >
        -
      </button>
      <input
        className="w-14 text-center outline-none"
        type="number"
        value={currentQuantity ?? 1}
        min={1}
        max={totalStock}
        step={1}
        disabled={updateMutation.isPending}
        onChange={handleChange}
      />
      <button
        disabled={currentQuantity >= totalStock || updateMutation.isPending}
        className="px-4 py-2 disabled:cursor-not-allowed"
        onClick={handleIncrement}
      >
        +
      </button>

      {/* <div>
        <button onClick={updateMutation.mutate({})}></button>
      </div> */}
    </div>
  );
}
