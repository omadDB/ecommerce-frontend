'use client';

import useCartActions from '@/hooks/useCartActions';
import { CartItem } from '@/types/cartItemModel';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Button } from './ui/button';

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
    <div className="flex items-center border rounded-md">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 2xs:h-8 2xs:w-8  w-6 rounded-none"
        onClick={handleDecrement}
        disabled={currentQuantity <= 1 || updateMutation.isPending}
      >
        <MinusIcon className="h-3 w-3" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <input
        className="w-8 2xs:w-10 text-center outline-none"
        type="number"
        value={currentQuantity ?? 1}
        min={1}
        max={totalStock}
        step={1}
        disabled={updateMutation.isPending}
        onChange={handleChange}
      />
      <Button
        variant="ghost"
        size="icon"
        disabled={currentQuantity >= totalStock || updateMutation.isPending}
        className="h-6 w-6 2xs:h-8 2xs:w-8 rounded-none"
        onClick={handleIncrement}
      >
        <PlusIcon className="h-3 w-3" />
        <span className="sr-only">Increase quantity</span>
      </Button>

      {/* <div>
        <button onClick={updateMutation.mutate({})}></button>
      </div> */}
    </div>
  );
}
