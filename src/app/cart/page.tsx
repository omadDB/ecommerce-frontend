"use client"

import Container from "@/components/Container"
import CartItem from "@/features/cart/CartItem"
import { useAppSelector } from "@/lib/store/hooks"
import { formatCurrency } from "@/utils/helpers"
import { ShoppingBagIcon, TagIcon } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function Page() {
  const cartItems = useAppSelector((state) => state.cart.cartItems)

  useEffect(() => {
    window.scrollTo(0, 0) // Scroll to top when the component mounts
  }, [])

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
          <table className="w-full border-collapse">
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
            <tbody
              className={`${
                cartItems.length > 0 && "border-b border-gray-300"
              } w-full`}
            >
              {cartItems.length ? (
                cartItems.map((product) => (
                  <CartItem product={product} key={product.productId} />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-2">
                    <div className="flex flex-col justify-center items-center w-full text-center gap-4 my-14">
                      <ShoppingBagIcon size={50} color="gray" />
                      <p className="text-xl font-semibold text-gray-600">
                        Корзина пуста
                      </p>
                      <Link
                        href="/categories/all"
                        className="mt-4 py-2 px-4 text-white bg-primary-600 rounded-lg hover:bg-primary-700 duration-200 flex items-center gap-3"
                      >
                        Перейти в каталог <TagIcon width={18} height={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {cartItems.length > 0 && (
            <div className="w-full mt-6 flex justify-end">
              <div className="w-[30%] flex flex-col gap-5">
                <div className="flex gap-6">
                  <h4>Ориентировочная общая сумма</h4>
                  <p>
                    {formatCurrency(
                      cartItems.reduce(
                        (acc, cur) => acc + cur.price * cur.count,
                        0
                      )
                    )}
                  </p>
                </div>
                <p>
                  Налоги, скидки и стоимость доставки рассчитываются при
                  оформлении заказа.
                </p>
                <button className="w-full mt-5 py-3 text-center bg-primary-700 text-white hover:bg-white hover:text-primary-950 duration-200 rounded-md border-transparent border hover:border-primary-700">
                  Оформить заказ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
