'use client';

import React, { useEffect, useState } from 'react';
import { getAllProducts } from '@/services/apiProducts';
import { Product } from '@/types/productModel';
import Image from 'next/image';
import { useCategories } from '@/hooks/useCategories';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import useCartActions from '@/hooks/useCartActions';
import FilterSidebar from './FilterSidebar';
import { Button } from './ui/button';
import { Heart, ShoppingCart, SlidersHorizontal } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { useRouter } from 'next/navigation';

interface AllProductsPageProps {
  userId: number | null;
}

function AllProductsPage({ userId }: AllProductsPageProps) {
  const {
    data: allCategories,
    isLoading: loadingCategories,
    error: errorCategories,
  } = useCategories();
  const { addMutation } = useCartActions();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOption, setSortOption] = useState('price-asc');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      setLoadingProducts(true);
      try {
        const response = await getAllProducts(currentPage);
        if (response) {
          setProducts(response.products);
          setFilteredProducts(response.products);
          setTotalPages(response.totalPages);
        }
      } catch {
        setErrorProducts('Failed to fetch products');
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  function handleAddToCart(product: Product) {
    if (!userId) {
      return;
    }
    addMutation.mutate({
      productId: product.id,
      countForUpdate: 1,
      product,
    });
  }

  const applyFilters = () => {
    let result = [...products];
    console.log(result);

    // Filter by price range
    result = result.filter((product) => {
      const price = product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter by stock
    if (inStockOnly) {
      result = result.filter((product) => product.stock > 0);
      console.log(result);
    }

    // Apply sorting (keep existing sorting logic)
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    console.log(result);
  };

  // Apply filters whenever filter criteria change
  useEffect(() => {
    applyFilters();
  }, [priceRange, inStockOnly, sortOption]);

  // Sidebar: parent categories only
  const parentCategories = (allCategories || []).filter(
    (cat) => cat.parentCategoryId == null
  );

  return (
    <div className="container px-8 py-8 mx-auto">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Mobile filter dialog */}
        <div className="flex flex-col gap-3 lg:hidden">
          <div className="mb-4 sm:mb-6">
            <h2 className="mb-2 text-4xl font-bold">All Products</h2>
          </div>

          <div className="flex items-center justify-between mb-6">
            {!loadingProducts && (
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            )}
            <div className="flex gap-2 sm:gap-3">
              <Sheet
                open={mobileFiltersOpen}
                onOpenChange={setMobileFiltersOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader className="mb-5">
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Narrow down products by applying filters
                    </SheetDescription>
                  </SheetHeader>
                  <FilterSidebar
                    categories={parentCategories!}
                    errorCategoriesMessage={errorCategories?.message}
                    inStockOnly={inStockOnly}
                    setInStockOnly={setInStockOnly}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    loadingCategories={loadingCategories}
                  />
                </SheetContent>
              </Sheet>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="featured">Featured</SelectItem> */}
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  {/* <SelectItem value="discount">Biggest Discount</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Desktop filter sidebar */}
        <div className="hidden lg:block">
          <div className="mb-4 sm:mb-6">
            <h2 className="mb-2 text-4xl font-bold">All Products</h2>
          </div>

          <div className="sticky top-8">
            <h2 className="mb-6 text-xl font-semibold">Filters</h2>
            <FilterSidebar
              categories={parentCategories!}
              errorCategoriesMessage={errorCategories?.message}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              loadingCategories={loadingCategories}
            />
          </div>
        </div>

        {/* Product grid */}
        <div className="lg:col-span-3 sm:col-span-2 xs:col-span-2">
          <div className="flex-col items-start justify-between hidden mb-6 lg:flex sm:flex-row sm:items-center">
            {!loadingProducts && (
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            )}
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="featured">Featured</SelectItem> */}
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
                {/* <SelectItem value="discount">Biggest Discount</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          {loadingProducts ? (
            <div className="grid grid-cols-3 gap-8">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md"
                >
                  <div className="h-48 bg-gray-200 rounded-md" />
                  <div className="w-3/4 h-6 bg-gray-200 rounded-md" />
                  <div className="w-1/2 h-6 bg-gray-200 rounded-md" />
                </div>
              ))}
            </div>
          ) : errorProducts ? (
            <div className="text-red-500">{errorProducts}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 2xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="overflow-hidden transition-shadow border rounded-lg group hover:shadow-md cursor-pointer"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <div className="relative">
                      <Image
                        src={product.images[0] || '/placeholder.svg'}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-[150px] object-cover"
                      />
                      {/* {product.discount && (
                        <Badge className="absolute top-2 left-2 bg-rose-500 hover:bg-rose-500">
                          {product.discount}% OFF
                        </Badge>
                      )} */}
                      {!product.stock && (
                        <Badge
                          variant="outline"
                          className="absolute top-2 left-2 bg-background/80 border-muted"
                        >
                          Out of Stock
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute transition-opacity opacity-0 top-2 right-2 group-hover:opacity-100"
                      >
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-medium line-clamp-1">
                          {product.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        {/* {product.discountedPrice ? (
                          <>
                            <span className="text-lg font-bold">
                            ${product.discountedPrice.toFixed(2)}
                            </span>
                            <span className="text-sm line-through text-muted-foreground">
                              ${product.price.toFixed(2)}
                            </span>
                          </>
                        ) : ( */}
                        <span className="text-lg font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                        {/* )} */}
                      </div>
                      <Button
                        className="w-full"
                        variant={product.stock <= 0 ? 'secondary' : 'default'}
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock <= 0}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="flex items-center px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllProductsPage;
