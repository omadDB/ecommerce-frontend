'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCategories } from '@/hooks/useCategories';
import { Skeleton } from './ui/skeleton';
import { motion } from 'framer-motion';
import { Category } from '@/types/categoryModel';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';
import { useState } from 'react';

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
  const { data: categories, isLoading, error } = useCategories();
  const [visibleCounts, setVisibleCounts] = useState<Record<number, number>>(
    {}
  );
  const INITIAL_VISIBLE = 6;
  const SHOW_MORE_STEP = 6;

  if (isLoading)
    return (
      <div className="container px-4 py-12 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-blue-900">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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

  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  console.log(categories);
  // Group categories by parent
  const parentCategories = (categories as Category[]).filter(
    (cat) => !cat.parentCategoryId
  );
  const subCategoriesMap = (categories as Category[]).reduce((acc, cat) => {
    if (cat.parentCategoryId) {
      if (!acc[cat.parentCategoryId]) acc[cat.parentCategoryId] = [];
      acc[cat.parentCategoryId].push(cat);
    }
    return acc;
  }, {} as Record<number, Category[]>);

  return (
    <div className="container px-4 py-12 mx-auto">
      <h2 className="mb-8 text-3xl font-bold text-center text-blue-900">
        Shop by Category
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {parentCategories.map((parent) => {
          const total = subCategoriesMap[parent.id]?.length || 0;
          const visible = visibleCounts[parent.id] ?? INITIAL_VISIBLE;
          const allVisible = visible >= total;
          const showButton = total > INITIAL_VISIBLE;
          const subCategoriesToShow =
            subCategoriesMap[parent.id]?.slice(0, visible) || [];
          return (
            <AccordionItem key={parent.id} value={parent.id.toString()}>
              <AccordionTrigger className="text-xl font-semibold">
                {parent.name}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {subCategoriesToShow.map((subCategory, index) => (
                    <motion.div
                      key={subCategory.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={`/categories/${subCategory.name}?id=${subCategory.id}`}
                      >
                        <div className="relative overflow-hidden transition-all duration-300 rounded-lg shadow-lg group hover:shadow-xl">
                          <div className="relative aspect-square">
                            <Image
                              src="/example-product.webp"
                              alt={subCategory.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="px-4 text-lg font-semibold text-center text-white transition-transform duration-300 transform group-hover:scale-105">
                              {subCategory.name}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                  {showButton && (
                    <div className="flex items-center justify-center">
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors rounded-full shadow bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                        onClick={() =>
                          setVisibleCounts((prev) => ({
                            ...prev,
                            [parent.id]: allVisible
                              ? INITIAL_VISIBLE
                              : Math.min(visible + SHOW_MORE_STEP, total),
                          }))
                        }
                      >
                        {allVisible ? 'Show less' : 'Show more'}
                        {allVisible ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 15l-7-7-7 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 9l7 7 7-7"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
