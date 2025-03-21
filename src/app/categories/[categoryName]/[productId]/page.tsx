'use client';

import Container from '@/components/Container';
import Spinner from '@/components/Spinner';
import useCartActions from '@/hooks/useCartActions';
import axiosInstance from '@/lib/axios';
import { useAppSelector } from '@/lib/store/hooks';
import { CartItem } from '@/types/cartItemModel';
import { Product } from '@/types/productModel';
import { formatCurrency } from '@/utils/helpers';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export default function Page({
  params,
}: {
  params: Promise<{ productId: number }>;
}) {
  const { addMutation, updateMutation } = useCartActions();
  const queryClient = useQueryClient();
  const { items } = useAppSelector((state) => state.cart);

  const router = useRouter();
  const [size, setSize] = useState('s');
  const [localQuantity, setLocalQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { productId: id } = use(params);
  const cartItem = items.find((item) => item.productId === id);

  useEffect(() => {
    // Sync the UI quantity with the cart if the item exists
    if (cartItem) {
      setLocalQuantity(cartItem.count);
    }
  }, [cartItem]);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await axiosInstance.get<Product>(`/products/${id}`);

        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (loading || !product) return <Spinner />;

  function handleAddToCart() {
    if (!product) return;

    // const cartItems = queryClient.getQueryData<CartItem[]>(['cart']) || [];
    // console.log(cartItems, cartItem);
    // const existingItem = cartItems.find((item) => item.productId === id);

    // If the item is already in the cart, update the quantity instead of adding a duplicate
    if (cartItem) {
      updateMutation.mutate({
        productId: id,
        count: cartItem.count + localQuantity,
        sum: product.price * (cartItem.count + localQuantity),
        product,
      });
    } else {
      // If the item is not in the cart, add a new entry
      addMutation.mutate({
        productId: id,
        count: localQuantity,
        sum: product.price * localQuantity,
        product,
      });
    }

    console.log(cartItem);

    router.push('/cart');
  }

  console.log(cartItem, items);

  function handleLocalQuantityChange(newQuantity: number) {
    if (product && newQuantity >= 1 && newQuantity <= product.stock) {
      updateMutation.mutate({
        productId: id,
        count: newQuantity,
        sum: product.price * newQuantity,
        product: {
          ...product,
          stock: product.stock - newQuantity,
        },
      });
      setLocalQuantity(newQuantity);
    }
  }

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
            {product?.name}
          </h2>
          <div className="mt-6">
            <p className="tracking-tight text-[#1c284b] font-bold text-4xl">
              {formatCurrency(product?.price)}
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
                {size === 's' ? 'Small' : 'Medium'}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className={clsx(
                  'border border-gray-300 hover:bg-[#1c284b] duration-200 py-2 px-4 rounded-lg hover:text-white',
                  size.toLowerCase() === 's' ? 'bg-[#1c284b] text-white' : ''
                )}
                onClick={() => setSize('s')}
              >
                S
              </button>
              <button
                className={clsx(
                  'border border-gray-300 hover:bg-[#1c284b] duration-200 py-2 px-4 rounded-lg hover:text-white',
                  size.toLowerCase() === 'm' ? 'bg-[#1c284b] text-white' : ''
                )}
                onClick={() => setSize('m')}
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
                {product?.stock - localQuantity} in stock
              </p>
            </div>

            <div className="flex rounded-md border border-[#1c284b]">
              <button
                onClick={() => handleLocalQuantityChange(localQuantity - 1)}
                disabled={localQuantity <= 1}
                className="px-4 py-2 disabled:cursor-not-allowed"
              >
                -
              </button>
              <input
                type="number"
                value={localQuantity}
                min={1}
                max={product?.stock}
                onChange={(e) =>
                  handleLocalQuantityChange(Number(e.target.value))
                }
                className="w-14 text-center outline-none"
              />
              <button
                onClick={() => handleLocalQuantityChange(localQuantity + 1)}
                disabled={localQuantity >= product?.stock}
                className="px-4 py-2 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
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
          <div className="flex flex-col gap-3 justify-between items-center my-8">
            <p className="font-bold text-4xl text-right">Total: </p>
            <h3 className="text-primary-800  font-bold text-[44px] text-right">
              {formatCurrency(localQuantity * product.price)}
            </h3>
          </div>
          <button
            className="flex items-center justify-center gap-2 w-full mt-5 py-3 text-center bg-primary-800 text-white hover:bg-white group hover:text-primary-950 duration-200 rounded-md border-transparent border hover:border-[#1c284b]"
            onClick={handleAddToCart}
          >
            <ShoppingBagIcon
              className="hover:scale-110 group-hover:stroke-[#1c284b] duration-300"
              width={24}
              height={24}
              fill="none"
              stroke="white"
            />{' '}
            Добавить в корзину
          </button>
        </div>
      </div>
    </Container>
  );
}
