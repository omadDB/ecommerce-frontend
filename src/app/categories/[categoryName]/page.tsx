import Container from "@/components/Container"
import { Button } from "@/components/ui/button"
import { ShoppingBagIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"

export default function Page({ params }) {
  //   const category = params.categoryName || "All"

  return (
    <Container>
      <div className="my-8">
        <h2 className="text-4xl font-bold mb-6">All</h2>

        <div className="grid grid-cols-4 gap-8">
          {Array.from({ length: 26 }).map((_, index) => (
            <div
              className="flex flex-col gap-4 border border-gray-300 rounded-md p-4 leading-5 group duration-400"
              key={index}
            >
              <div className="relative w-full aspect-[4/4]">
                <Image
                  src="/example-product.webp"
                  fill
                  className="object-cover rounded-md"
                  alt="Product image"
                />

                <Button className="opacity-0 -translate-y-[140px] group-hover:translate-y-0 pointer-events-none group-hover:block group-hover:bottom-4 group-hover:pointer-events-auto group-hover:opacity-100 button-add absolute duration-400 bg-blue-500 left-[50%]  bottom-[-50%] transition-all  -translate-x-1/2 hover:bg-blue-700">
                  <Link
                    href="/categories/all/1"
                    className="flex items-center gap-2"
                  >
                    <ShoppingBagIcon></ShoppingBagIcon>
                    Add to cart
                  </Link>
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <h4>Универсальный регулируемый ключ-мультиинструмент</h4>
                <p>310.000 so'm</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
