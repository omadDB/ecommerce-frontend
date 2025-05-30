'use client';

import { Product } from '@/types/productModel';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Button } from './ui/button';

export default function UpdateProductOneQuantity({
  product,
  onQuantityChange,
  localQuantity,
}: {
  product: Product;
  onQuantityChange?: (newQuantity: number) => void;
  localQuantity: number;
}) {
  const { stock } = product;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= stock) {
      //   if (value > product.stock) {
      //     onQuantityChange?.(product.stock);
      //   } else if (value < 1) {
      //     onQuantityChange?.(1);
      //   } else {
      //     onQuantityChange?.(value);
      //   }
      onQuantityChange?.(value);
    }
  }

  function handleIncrement() {
    if (localQuantity < stock) {
      onQuantityChange?.(localQuantity + 1);
    }
  }

  function handleDecrement() {
    if (localQuantity > 1) {
      onQuantityChange?.(localQuantity - 1);
    }
  }

  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 2xs:h-8 2xs:w-8  w-6 rounded-none"
        onClick={handleDecrement}
        disabled={localQuantity <= 1}
      >
        <MinusIcon className="h-3 w-3" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <input
        className="w-8 2xs:w-10 text-center outline-none"
        type="number"
        value={localQuantity ?? 1}
        min={1}
        max={stock}
        onChange={handleChange}
      />
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 2xs:h-8 2xs:w-8 rounded-none"
        disabled={localQuantity >= stock}
        onClick={handleIncrement}
      >
        <PlusIcon className="h-3 w-3" />
      </Button>

      {/* <div>
        <button onClick={updateMutation.mutate({})}></button>
      </div> */}
    </div>
  );
}
