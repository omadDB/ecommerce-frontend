'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { axiosPublic } from '@/lib/axios/axios';
import { Category } from '@/types/categoryModel';
import { Skeleton } from './ui/skeleton';

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await axiosPublic.get<Category[]>('/categories');
        setCategories(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading)
    return (
      <div className="text-center">
        <h2 className="mb-8 text-3xl font-bold">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg shadow-lg group"
            >
              <Skeleton height="h-48" rounded="rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton height="h-8" width="w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="text-center">
      <h2 className="mb-8 text-3xl font-bold">Shop by Category</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories?.map((category, index) => (
          <Link
            key={index}
            href={`/categories/${category.name}?id=${category.id}`}
          >
            <div className="relative overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg group hover:shadow-xl">
              <Image
                // src={category?.image}
                src="/example-product.webp"
                alt={category.name}
                width={300}
                height={192}
                className="object-cover w-full h-48 transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <h3 className="text-xl font-semibold text-white">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
