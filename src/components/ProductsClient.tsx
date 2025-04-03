'use client';

import { useCart } from '@/hooks/useCart';
import useCartActions from '@/hooks/useCartActions';
import { axiosPublic } from '@/lib/axios/axios';
import { Category } from '@/types/categoryModel';
import { Product } from '@/types/productModel';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import Container from './Container';
import Image from 'next/image';
import { Button } from './ui/button';
import { ShoppingBagIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface ProductsClientProps {
  userId: number | null;
  categoryName: string;
}

export default function ProductsClient({
  categoryName,
  userId,
}: ProductsClientProps) {
  const searchParams = useSearchParams();

  // Track mounted state to ensure we don't use client-only APIs during SSR.
  const [mounted, setMounted] = useState(false);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Now that we're on the client, we can read search params.
    setId(searchParams.get('id'));
  }, [searchParams]);

  const isAll = String(categoryName).toLowerCase() === 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    cart: { cartItems },
    isLoading: isFetchingCart,
    error: cartError,
  } = useCart(userId);
  const { addMutation } = useCartActions();

  function handleAddToCart(product: Product) {
    addMutation.mutate({
      productId: product.id,
      countForUpdate: 1,
      product,
    });
  }

  useEffect(() => {
    // Do nothing until we know we're mounted.
    if (!mounted) return;

    window.scrollTo(0, 0);

    async function fetchProducts() {
      let response;
      try {
        setLoading(true);
        if (isAll) {
          response = await axiosPublic.get<Product[]>(`/products`);
          setProducts(response.data);
        } else if (id) {
          response = await axiosPublic.get<Category>(`/categories/${id}`);
          setProducts(response.data.products);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [id, isAll, mounted]);

  // Until mounted, show a spinner so the initial HTML stays consistent.
  if (!mounted || loading || isFetchingCart) return <Spinner />;
  if (error || cartError) return <p>Error: {error || cartError?.message}</p>;

  return (
    <Container>
      <div className="my-8">
        <h2 className="text-4xl font-bold mb-6">
          {categoryName.charAt(0).toUpperCase() +
            categoryName.slice(1).replace(/%20/g, ' ')}
        </h2>
        <div className="grid grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              className="flex flex-col gap-4 border border-gray-300 rounded-md p-4 leading-5 group duration-400"
              key={product.id}
            >
              <div className="relative w-full aspect-[4/4]">
                <Image
                  src="/example-product.webp"
                  fill
                  className="object-cover rounded-md"
                  alt="Product image"
                />

                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock <= 0}
                  className="opacity-0 disabled:bg-slate-500 cursor-pointer disabled:opacity-0 group-hover:flex items-center hover:items-center -translate-y-[140px] group-hover:translate-y-0 pointer-events-none group-hover:bottom-4 group-hover:pointer-events-auto group-hover:opacity-100 button-add absolute duration-400 bg-blue-500 left-[50%] bottom-[-50%] transition-all -translate-x-1/2 hover:bg-blue-700"
                >
                  <ShoppingBagIcon />
                  <p>{product.stock > 0 ? 'Add to cart' : 'Out of stock'}</p>
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href={`/categories/${categoryName}/${product.id}`}
                  scroll={true}
                >
                  <h4 className="text-lg">{product.name}</h4>
                </Link>
                <p className="font-bold text-xl">{product.price} so'm</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
