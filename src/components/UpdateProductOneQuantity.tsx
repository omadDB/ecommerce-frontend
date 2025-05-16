'use client';

import { Product } from '@/types/productModel';
import { MinusIcon, PlusIcon } from 'lucide-react';

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
    <div className="flex items-center gap-4">
      <div className="flex items-center overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <button
          className="p-4 transition-colors border-r border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleDecrement}
          disabled={localQuantity <= 1}
          aria-label="Уменьшить количество"
        >
          <MinusIcon className="w-5 h-5 text-gray-600" />
        </button>
        <input
          className="w-20 py-4 text-lg font-medium text-center text-gray-900 outline-none"
          type="number"
          value={localQuantity ?? 1}
          min={1}
          max={stock}
          onChange={handleChange}
          aria-label="Количество товара"
        />
        <button
          className="p-4 transition-colors border-l border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={localQuantity >= stock}
          onClick={handleIncrement}
          aria-label="Увеличить количество"
        >
          <PlusIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* <div>
        <button onClick={updateMutation.mutate({})}></button>
      </div> */}
    </div>
  );
}
