"use client"

import Container from "@/components/Container"
import ItemCounter from "@/components/ItemCounter"
import { ChevronRightIcon, ShoppingBagIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function Page({ params }) {
  const [size, setSize] = useState("s")
  const [count, setCount] = useState<number>(1)
  const stock = 19200
  //   const id = 1
  const price = 319990

  return (
    <Container>
      <div className="grid grid-cols-[50%_1fr] gap-12 my-8">
        <div className="w-[100%] relative aspect-square">
          <Image
            src="/example-product.webp"
            fill
            className="object-cover rounded-md"
            alt="Product image"
          />
        </div>
        <div>
          <h2 className="text-[#1c284b] font-medium text-3xl">
            Универсальный регулируемый ключ-мультиинструмент
          </h2>
          <div className="mt-6">
            <p className="tracking-tight text-[#1c284b] font-bold text-4xl">
              {price} so'm
            </p>
            <p className="mt-4">
              Стоимость доставки расчитывается при оформлении заказа
            </p>
          </div>
          <div className=" relative flex flex-col gap-2 mt-8 pt-6 before:w-[95%] before:content-[''] before:absolute before:top-0 before:left-[2.5%] before:bg-gray-300 before:h-[1px]">
            <div className="flex items-center gap-3">
              <p className="font-medium">Size</p>
              <span className="text-gray-400 font-normal">
                <ChevronRight width={18} />
              </span>
              <p className="text-gray-400 font-normal">
                {size === "s" ? "Small" : "Medium"}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className={clsx(
                  "border border-gray-300 hover:bg-[#1c284b] duration-200 py-2 px-4 rounded-lg hover:text-white",
                  size.toLowerCase() === "s" ? "bg-[#1c284b] text-white" : ""
                )}
                onClick={() => setSize("s")}
              >
                S
              </button>
              <button
                className={clsx(
                  "border border-gray-300 hover:bg-[#1c284b] duration-200 py-2 px-4 rounded-lg hover:text-white",
                  size.toLowerCase() === "m" ? "bg-[#1c284b] text-white" : ""
                )}
                onClick={() => setSize("m")}
              >
                M
              </button>
            </div>
          </div>
          <div className="relative mt-6 pb-6 mb-8 flex flex-col items-start gap-3 after:w-[95%] after:content-[''] after:absolute after:bottom-0 after:left-[2.5%] after:bg-gray-300 after:h-[1px]">
            <div className="flex items-center gap-3">
              <p className="font-medium">Количество</p>
              <span className="text-gray-400 font-normal">
                <ChevronRight width={18} />
              </span>
              <p className="text-gray-400 font-normal">
                {stock - count} in stock
              </p>
            </div>
            <ItemCounter count={count} setCount={setCount} />
          </div>
          <div className="relative pb-8 mt-4 after:w-[95%] after:content-[''] after:absolute after:bottom-0 after:left-[2.5%] after:bg-gray-300 after:h-[1px]">
            <h5 className="">Многофункциональный инструмент HandyFix Pro</h5>
            <ul className="flex flex-col gap-2 !list-disc pl-6 mt-3">
              <li>Надежный металлический корпус и эргономичная ручка.</li>
              <li>Идеально подходит для работы с трубами и фитингами.</li>
              <li>Удобный механизм регулировки для различных диаметров.</li>
              <li>
                Компактный размер, легко помещается в сумку или ящик для
                инструментов.
              </li>
              <li>
                Поставляется в фирменной упаковке HandyFix с набором наклеек в
                подарок.
              </li>
            </ul>
          </div>
          <div className="flex justify-between items-center my-8">
            <p className="  font-semibold text-4xl text-right">Total: </p>
            <h3 className="text-[#182242]  font-bold text-5xl text-right">
              {count * price} so'm
            </h3>
          </div>
          <button className="flex items-center justify-center gap-2 w-full mt-5 py-3 text-center bg-[#1c284b] text-white hover:bg-white group hover:text-primary-950 duration-200 rounded-md border-transparent border hover:border-[#1c284b]">
            <ShoppingBagIcon
              className="hover:scale-110 group-hover:stroke-[#1c284b] duration-300"
              width={24}
              height={24}
              fill="none"
              stroke="white"
            />{" "}
            Добавить в корзину
          </button>
        </div>
      </div>
    </Container>
  )
}
