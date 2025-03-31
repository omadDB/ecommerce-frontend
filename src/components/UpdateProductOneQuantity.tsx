'use client';

import { Product } from '@/types/productModel';

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
    <div className="flex rounded-md border border-[#1c284b]">
      <button
        className="px-4 py-2 disabled:cursor-not-allowed"
        onClick={handleDecrement}
        disabled={localQuantity <= 1}
      >
        -
      </button>
      <input
        className="w-14 text-center outline-none"
        type="number"
        value={localQuantity ?? 1}
        min={1}
        max={stock}
        onChange={handleChange}
      />
      <button
        disabled={localQuantity >= stock}
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
