"use client"

import React, { useState } from "react"

export default function ItemCounter({
  count,
  setCount,
}: {
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
}) {
  const stock = 19200

  function handleAdd() {
    if (count < stock) {
      setCount((c) => c + 1)
    }
  }

  function handleSubtract() {
    if (count > 1) {
      setCount((c) => c - 1)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value)

    if (!isNaN(value) && value >= 1 && value <= stock) {
      setCount(value)
    }
  }

  return (
    <div className="flex rounded-md border border-[#1c284b]">
      <button className="px-4 py-2" onClick={handleSubtract}>
        -
      </button>
      <input
        className="w-14 text-center outline-none"
        type="number"
        value={count}
        min={1}
        max={stock}
        onChange={handleChange}
      />
      <button className="px-4 py-2" onClick={handleAdd}>
        +
      </button>
    </div>
  )
}
