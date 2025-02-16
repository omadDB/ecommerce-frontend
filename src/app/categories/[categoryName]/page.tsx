"use client"

import Container from "@/components/Container"
import Spinner from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/lib/axios"
import { Category } from "@/types/categoryModel"
import { Product } from "@/types/productModel"
import { ShoppingBagIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { use, useEffect, useState } from "react"

export default function Page({
  params,
}: {
  params: Promise<{ categoryName: string }>
}) {
  //   const category = params.categoryName || "All"
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const { categoryName } = use(params)
  const isAll = String(categoryName) === "all"

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    async function fetchProducts() {
      let response
      try {
        setLoading(true)
        if (isAll) {
          response = await axiosInstance.get<Product[]>(`/products`)
          setProducts(response.data)
          console.log(response)
        } else {
          response = await axiosInstance.get<Category>(`/categories/${id}`)
          setProducts(response.data.products)
        }
      } catch (err) {
        console.error(err)
        setError("Faield to fetch products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [id, isAll])

  if (loading) return <Spinner />
  if (error) return <p>Error: {error}</p>

  return (
    <Container>
      <div className="my-8">
        <h2 className="text-4xl font-bold mb-6">
          {(categoryName.charAt(0).toUpperCase() + categoryName.slice(1))
            .split("%20")
            .join(" ")}
        </h2>

        <div className="grid grid-cols-4 gap-8">
          {products.map((product, index) => (
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
                    href={`/categories/${categoryName}/${product.id}`}
                    scroll={true}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBagIcon></ShoppingBagIcon>
                    Add to cart
                  </Link>
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <h4>{product.name}</h4>
                <p>{product.price} so'm</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
