"use client"

import {
  decrementCount,
  incrementCount,
  setItemCount,
} from "@/lib/store/cartSlice"
import { useAppDispatch } from "@/lib/store/hooks"

export default function UpdateProductQuantity({
  productId,
  currentQuantity,
  stock,
}: {
  productId: number
  currentQuantity: number
  stock: number
}) {
  const dispatch = useAppDispatch()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value)

    if (!isNaN(value) && value >= 1 && value <= stock) {
      dispatch(setItemCount({ id: productId, count: value }))
    }
  }

  function handleIncrement() {
    if (currentQuantity < stock) {
      dispatch(incrementCount(productId))
      // setInputCount((v) => v + 1)
    }
  }

  function handleDecrement() {
    if (currentQuantity > 1) {
      dispatch(decrementCount(productId))
      // setInputCount((v) => v - 1)
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
  )
}
