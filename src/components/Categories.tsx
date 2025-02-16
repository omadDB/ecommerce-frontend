"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import axiosInstance from "@/lib/axios"
import { Category } from "@/types/categoryModel"

// const categories = [
//   {
//     name: "Electronics",
//     image: "/example-product.webp",
//     link: "/categories/electronics",
//   },
//   {
//     name: "Fashion",
//     image: "/example-product.webp",
//     link: "/categories/fashion",
//   },
//   {
//     name: "Home & Kitchen",
//     image: "/example-product.webp",
//     link: "/categories/home-kitchen",
//   },
//   {
//     name: "Beauty",
//     image: "/example-product.webp",
//     link: "/categories/beauty",
//   },
//   {
//     name: "Sports",
//     image: "/example-product.webp",
//     link: "/categories/sports",
//   },
// ]

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        const response = await axiosInstance.get<Category[]>("/categories")
        setCategories(response.data)
      } catch (err) {
        console.error(err)
        setError("Failed to fetch categories")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories?.map((category, index) => (
          <Link
            key={index}
            href={`/categories/${category.name}?id=${category.id}`}
          >
            <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                // src={category?.image}
                src="/example-product.webp"
                alt={category.name}
                width={300} // Desired width of the image
                height={192} // Desired height of the image
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
