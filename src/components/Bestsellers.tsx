import Image from "next/image"
import { Button } from "./ui/button"
import { ShoppingBagIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import ContainerBig from "./ContainerBig"
import { formatCurrency } from "@/utils/helpers"

export default function Bestsellers() {
  return (
    <div className="bg-[#1E3A8A] py-10">
      <ContainerBig>
        <h2 className="text-4xl text-white font-bold mb-6">Bestsellers</h2>

        <div className="grid grid-cols-4 gap-8">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              className="flex flex-col justify-center items-center gap-4 text-white leading-5 group duration-400 shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-md 
              bg-[#3d5cb8b9] 
              p-4"
              key={index}
            >
              <div className="relative w-full aspect-[4/4]">
                <Image
                  src="/example-product.webp"
                  fill
                  className="object-cover rounded-md"
                  alt="Product image"
                />

                <Button className="opacity-0 -translate-y-[140px] group-hover:translate-y-0 pointer-events-none group-hover:block group-hover:bottom-4 group-hover:pointer-events-auto group-hover:opacity-100 button-add absolute duration-400 bg-[#ecbb21] left-[50%]  bottom-[-50%] transition-all  -translate-x-1/2 hover:bg-[#d3a107]">
                  <Link
                    href={`/categories/all/${index + 1}`}
                    scroll={true}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBagIcon></ShoppingBagIcon>
                    Add to cart
                  </Link>
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <h4>Универсальный регулируемый ключ-мультиинструмент</h4>
                <p>{formatCurrency("310000")}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href="/categories/all"
            className="text-xl text-gray-300 hover:text-white underline-offset-4 hover:underline duration-400"
          >
            More products {"->"}
          </Link>
        </div>
      </ContainerBig>
    </div>
  )
}
