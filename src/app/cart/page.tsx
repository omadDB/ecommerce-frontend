"use client"

import Container from "@/components/Container"
import ItemCounter from "@/components/ItemCounter"
import { TrashIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type Product = {
  id: number
  name: string
  price: number
  count: number
}

export default function Page() {
  const [count, setCount] = useState<number>(1)

  // const [products, setProducts] = useState<Product[]>([
  //   { id: 1, name: "Product 1", price: 310000, count: 1 },
  //   { id: 2, name: "Product 2", price: 310000, count: 1 },
  //   { id: 3, name: "Product 3", price: 310000, count: 1 },
  //   { id: 4, name: "Product 4", price: 310000, count: 1 },
  // ])

  // // Function to update the count for a specific product
  // const updateProductCount = (id: number, newCount: number) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) =>
  //       product.id === id ? { ...product, count: newCount } : product
  //     )
  //   )
  // }

  return (
    <Container>
      <div className="flex flex-col my-8">
        <div className="flex justify-between ">
          <h2 className="text-4xl font-semibold mb-7">Корзина</h2>
          <Link
            href="/categories/all"
            className="text-primary underline-offset-4 hover:underline duration-400"
          >
            Продолжить покупки
          </Link>
        </div>

        <div className="mt-1 w-full">
          <table className="w-full border-collapse ">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="p-4 text-left" colSpan={2}>
                  Товар
                </th>
                <th className="p-4 text-center" colSpan={1}>
                  Количество
                </th>
                <th className="p-4 text-center" colSpan={1}>
                  Всего
                </th>
              </tr>
            </thead>
            <tbody className="border-b border-gray-300">
              {Array.from({ length: 5 }).map((product, index) => (
                <tr key={index} className="">
                  {/* Product and Image */}
                  <td className="p-4" colSpan={2}>
                    <div className="flex items-center gap-4">
                      <div className="w-[80px] h-[80px] relative">
                        <Image
                          src="/example-product.webp"
                          fill
                          className="object-cover"
                          alt="Product image"
                        />
                      </div>
                      <div>
                        {/* <h4 className="font-medium">{product.name}</h4> */}
                        <h4 className="font-medium">Product 1</h4>
                        <p className="text-gray-500">310.000 so'm</p>
                      </div>
                    </div>
                  </td>

                  {/* Quantity */}
                  <td className="p-4  text-center">
                    <div className="flex items-center justify-center gap-2">
                      <ItemCounter count={count} setCount={setCount} />
                      {/* <ItemCounter
                        count={product.count}
                        setCount={(newCount) =>
                          updateProductCount(product.id, newCount)
                        }
                      /> */}
                      <button className="cursor-pointer">
                        <TrashIcon
                          width={20}
                          height={20}
                          stroke="black"
                          className="ml-4 hover:scale-110 duration-300"
                          fill="none"
                        />
                      </button>
                    </div>
                  </td>

                  {/* Total */}
                  <td className="p-4 text-center">
                    <p className="tracking-widest text-lg">310 000 so'm</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full mt-6 flex justify-end">
            <div className="w-[30%] flex flex-col gap-5">
              <div className="flex gap-6">
                <h4>Ориентировочная общая сумма</h4>
                <p>1 250 000 UZS</p>
              </div>
              <p>
                Налоги, скидки и стоимость доставки рассчитываются при
                оформлении заказа.
              </p>
              <button className="w-full mt-5 py-3 text-center bg-[#3b4f8b] text-white hover:bg-white hover:text-primary-950 duration-200 rounded-md border-transparent border hover:border-[#3b4f8b]">
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
